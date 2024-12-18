// Компонент для отображения цвета

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import PopOver from "../ui/PopOver/PopOver.vue";

  const canvas = ref(null);
  const mousePosition = ref({ x: 0, y: 0 });

  const ZOOM_REGION_SIZE = 50;
  const ZOOM_SCALE = ref(8);

  let ctx = null;
  let animationFrameId = null;
  let intervalId;
  const emit = defineEmits(['colorCurrentPixel'])
  // Функция для обновления координат мыши
  const updateMousePosition = async () => {
    try {
      const position = await window.electronAPI.getCursorPosition(); // Получаем координаты мыши через IPC
      mousePosition.value = position; // Обновляем координаты мыши в state
    } catch (error) {
      console.error("Ошибка получения позиции мыши:", error);
    }
  };
  // Функция рисования сетки
  const drawGrid = (scaledWidth, scaledHeight) => {
    const cellSize = ZOOM_SCALE.value; // Размер одной ячейки в увеличении
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 0.5;

    // Рисуем вертикальные линии
    for (let x = 0; x <= scaledWidth; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, scaledHeight);
      ctx.stroke();
    }

    // Рисуем горизонтальные линии
    for (let y = 0; y <= scaledHeight; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(scaledWidth, y);
      ctx.stroke();
    }
  };
  // Основная функция для захвата экрана и отображения увеличенной области
  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Создаем скрытое видео для работы с потоком
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const drawZoomedArea = () => {
        if (ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
          const { x, y } = mousePosition.value;

          // Рассчитываем координаты для области увеличения
          // Центрируем область на позиции мыши, но учитываем размер увеличиваемой области
          const regionX = x - ZOOM_REGION_SIZE / 2;
          const regionY = y - ZOOM_REGION_SIZE / 2;
          // Ограничиваем область, чтобы она не выходила за пределы видео
          const regionXClamped = Math.max(0, Math.min(video.videoWidth - ZOOM_REGION_SIZE, regionX));
          const regionYClamped = Math.max(0, Math.min(video.videoHeight - ZOOM_REGION_SIZE, regionY));

          // Рассчитываем размеры увеличенной области с учетом масштабирования
          const scaledWidth = ZOOM_REGION_SIZE * ZOOM_SCALE.value;
          const scaledHeight = ZOOM_REGION_SIZE * ZOOM_SCALE.value;

          // Очищаем canvas
          ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

          // Рисуем увеличенную область
          ctx.drawImage(
            video,
            regionXClamped,
            regionYClamped,
            ZOOM_REGION_SIZE,
            ZOOM_REGION_SIZE, // Исходная область на видео
            0,
            0,
            scaledWidth,
            scaledHeight // Рисуем ее на canvas с масштабированием
          );

          // Рисуем сетку
          drawGrid(scaledWidth, scaledHeight);
        }

        // Рекурсивный вызов для обновления
        animationFrameId = requestAnimationFrame(drawZoomedArea);
      };

      drawZoomedArea();

      // Очищаем поток при завершении
      stream.getVideoTracks()[0].addEventListener("ended", stopCapture);
    } catch (error) {
      console.error("Ошибка захвата экрана:", error);
    }
  };

  // Функция для остановки захвата и очистки ресурсов
  const stopCapture = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId); // Останавливаем анимацию
  };
  const stopCaptureOnRightClick = (event) => {
    // Предотвращаем открытие контекстного меню
    event.preventDefault();

    // Останавливаем видео поток
    stopCapture(); // Это функция, которую мы определяли ранее, она очищает поток и останавливает анимацию

    // Также можем очистить canvas
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }

    alert("Поток остановлен по правому клику");
  };
  const getPixelColor = (event) => {
    const rect = canvas.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Получаем данные о пикселе
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;

    let color = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    emit('colorCurrentPixel', color);
  };
  // Инициализация canvas и потока
  onMounted(() => {
    ctx = canvas.value.getContext("2d");
    captureScreen();
    intervalId = setInterval(updateMousePosition, 1);
    // Добавляем обработчик правого клика
    window.electronAPI.onGlobalShortcut((message) => {
      stopCapture(); // Выводит сообщение в консоль Vue-приложения
    });
  });

  // Очистка ресурсов при размонтировании
  onBeforeUnmount(() => {
    stopCapture();
    if (canvas.value) {
      canvas.value.removeEventListener("contextmenu", stopCaptureOnRightClick);
    }
    clearInterval(intervalId);
  });
</script>
<template>
  <div class="RGBAOutput_block">
    <div class="RGBAOutput_block__header">
      <div class="RGBAOutput_block__header__circle_block">
        <div class="circle red"></div>
        <div class="circle orange"></div>
        <div class="circle green"></div>
      </div>
      <!-- <PopOver /> -->
    </div>

    <div class="RGBAOutput_block__body_fdcolumn">
      <button @click="captureScreen">Start Capture</button>
      <canvas ref="canvas" width="200" height="150" @click="getPixelColor"></canvas>
    </div>
  </div>
</template>

<style lang="scss">
  @use "../styles/ColorPicker.scss";
  .RGBAOutput_block__body_fdcolumn {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  canvas {
    margin: 10px;
    border: 1px solid black;
  }

  .pixel {
    width: 10px;
    height: 10px;
    display: inline-block;
  }
</style>
