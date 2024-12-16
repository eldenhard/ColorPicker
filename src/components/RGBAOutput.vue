<script setup>
  import { ref } from "vue";

  // Реактивные данные для отображения цвета и значений
  const hexValue = ref("#FFFFFF");
  const rgbaValue = ref("rgba(255, 255, 255, 1)");

  // Логика для начала и завершения выбора цвета
  const startColorPicker = () => {

  };

  const stopColorPicker = () => {

  };
</script>

<template>
  <div class="RGBAOutput_block">
    <div class="RGBAOutput_block__header">
      <div class="RGBAOutput_block__header__circle_block">
        <div class="circle red"></div>
        <div class="circle orange"></div>
        <div class="circle green"></div>
      </div>
      <p>Colors</p>
      <!-- Кнопка для начала и остановки выбора цвета -->
      <button @mousedown="startColorPicker" @mouseup="stopColorPicker">🔶</button>
    </div>

    <div class="RGBAOutput_block__body">
      <!-- Цвет -->
      <div class="RGBAOutput_block__body__hex">
        <div class="hex_color" :style="{ backgroundColor: hexValue }"></div>
        <div class="hex_value">{{ hexValue }}</div>
      </div>
      <div class="RGBAOutput_block__body__rgba">
        <div class="rgba_color" :style="{ backgroundColor: rgbaValue }"></div>
        <div class="rgba_value">{{ rgbaValue }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "../styles/ColorPicker.scss";
</style>

<style lang="scss">
  @use "../styles/ColorPicker.scss";
</style>
