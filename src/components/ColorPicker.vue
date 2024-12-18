// Основной компонент, который включает в себя другие

<script setup>
import { ref } from 'vue';
import RGBAOutput from './RGBAOutput.vue';
import ColorDisplay from './ColorDisplay.vue';
import ColorWheel from './ColorWheel.vue';
let RGBAColor = ref("")

const colorCurrentPixel = (val = "rgba(255, 255, 255, 1") => {
  RGBAColor.value = val; // Устанавливаем значение цвета
}
</script>

<template>
  <div class="ColorPicker__content">
    <ColorDisplay @colorCurrentPixel="colorCurrentPixel"/>
    <RGBAOutput :RGBAColor="RGBAColor" />
    <ColorWheel />
  </div>
</template>

<style lang="scss">
@use "../styles/ColorPicker.scss";
</style>
