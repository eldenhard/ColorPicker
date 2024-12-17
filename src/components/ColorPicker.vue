// Основной компонент, который включает в себя другие

<script setup>
import RGBAOutput from './RGBAOutput.vue';
import ColorDisplay from './ColorDisplay.vue';
</script>

<template>
  <div class="ColorPicker__content">
    <ColorDisplay />
    <RGBAOutput />
    <RGBAOutput />
  </div>
</template>

<style lang="scss">
@use "../styles/ColorPicker.scss";
</style>
