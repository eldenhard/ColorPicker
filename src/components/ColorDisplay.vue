// Компонент для отображения цвета

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import PopOver from "../ui/PopOver/PopOver.vue";

  const canvas = ref(null);
  let ctx = null;
  const mousePosition = ref({ x: 0, y: 0 });

  // Функция для обновления координат мыши
  const updateMousePosition = async () => {
    try {
      const position = await window.electronAPI.getCursorPosition(); // Получаем координаты мыши через IPC
      mousePosition.value = position; // Обновляем координаты мыши в state
    } catch (error) {
      console.error("Ошибка получения позиции мыши:", error);
    }
  };

  let intervalId;

  // Инициализация контекста и добавление обработчиков событий после монтирования компонента
  onMounted(() => {
    intervalId = setInterval(updateMousePosition, 100);
    ctx = canvas.value.getContext("2d"); // Получаем контекст после монтирования
    canvas.value.addEventListener("mousemove", handleMouseMove);
    canvas.value.addEventListener("mouseout", handleMouseOut);
  });

  // Удаление обработчиков событий при размонтировании компонента
  onBeforeUnmount(() => {
    clearInterval(intervalId); 
    if (canvas.value) {
      canvas.value.removeEventListener("mousemove", handleMouseMove);
      canvas.value.removeEventListener("mouseout", handleMouseOut);
    }
  });

  function writeMsg(msg) {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); // Очищаем канвас перед новым рисованием
      ctx.font = "14pt Calibri";
      ctx.fillStyle = "#222";
      ctx.fillText(msg, 10, 25);
    }
  }

  function handleMouseMove(e) {
    let pos = getPos(e); // Получаем позицию мыши
    let msg = `Mouse position: x: ${pos.x}, y: ${pos.y}`;
    writeMsg(msg); // Отображаем позицию на канвасе
  }

  function handleMouseOut() {
    // if (ctx) {
    //   ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); // Очищаем канвас при выходе мыши
    // }
  }

  function getPos(e) {
    let rect = canvas.value.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left), // Вычисляем координаты мыши относительно канваса
      y: Math.round(e.clientY - rect.top),
    };
  }
</script>

<template>
  <div class="RGBAOutput_block">
    <div class="RGBAOutput_block__header">
      <div class="RGBAOutput_block__header__circle_block">
        <div class="circle red"></div>
        <div class="circle orange"></div>
        <div class="circle green"></div>
      </div>
      <PopOver />
    </div>

    <div class="RGBAOutput_block__body_fdcolumn">
      <button id="startButton">Start</button>
      <button id="stopButton">Stop</button>
      <p>Позиция мыши: x: {{ mousePosition.x }}, y: {{ mousePosition.y }}</p>
      <video ref="videoElement"></video>
      <canvas ref="canvas"></canvas>

      <!-- <div v-for="(color, index) in pixelColors" :key="index">
          <div :style="{ backgroundColor: color }" class="pixel"></div>
        </div> -->
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
  video {
    width: 100%;
    height: 100%;
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
