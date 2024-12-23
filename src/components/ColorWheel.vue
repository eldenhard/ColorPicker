// Компонент кольцевого выбора цвета

<script setup>
  import { ref, watch } from "vue";
  import ColorPicker from "primevue/colorpicker";
  import Toast from "../ui/Toast/Toast.vue";

  const color = ref("ff0000");
  const saveColor = (val) => {
    if (val == "") {
      val = "#ffffff";
    }
    navigator.clipboard.writeText(val);
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
      <!-- <PopOver /> -->
    </div>

    <div class="RGBAOutput_block__body_fdcolumn">
      <ColorPicker v-model="color" inline />
      <div class="RGBAOutput_block__body__current_color" :style="{ backgroundColor: '#' + color }" @click="saveColor('#' + color)">
        <Toast :stylesTeam="false" style="cursor: pointer;">
          <p @click="saveColor('#' + color)">HEX: #{{ color }}</p>
        </Toast>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @use "../styles/ColorPicker.scss";
</style>
