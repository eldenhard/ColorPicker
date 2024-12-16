// Основной компонент, который включает в себя другие

<script setup>
import RGBAOutput from './RGBAOutput.vue';
</script>

<template>
  <div class="ColorPicker__content">
    <RGBAOutput />
    <RGBAOutput />
    <RGBAOutput />
  </div>
</template>

<style lang="scss">
@use "../styles/ColorPicker.scss";
</style>
