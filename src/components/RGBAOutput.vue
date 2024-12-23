<script setup>
  import { ref } from "vue";
  import DropdownMenu from "../ui/DropdownMenu/DropdownMenu.vue";
  import Toast from "../ui/Toast/Toast.vue";
  import { rgbaToHex } from "../composables/RgbaToHex";

  const props = defineProps({
    RGBAColor: {
      type: String,
      default: () => "rgba(255, 255, 255, 1)",
    },
  });
  const saveColor = (val) => {
    if (val == "") {
      val = "rgba(255, 255, 255, 1)";
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
      <p>Colors</p>
      <!-- Кнопка для начала и остановки выбора цвета -->
      <button @mousedown="startColorPicker" @mouseup="stopColorPicker">🔶</button>
    </div>

    <div class="RGBAOutput_block__body">
      <!-- Цвет -->
      <!-- <DropdownMenu /> -->
      <div class="RGBAOutput_block__body__hex">
        <div class="hex_color" :style="{ backgroundColor: RGBAColor }"></div>
        <div class="hex_value">
          <p style="white-space: nowrap; font-size: 12px;">HEX: {{  rgbaToHex(RGBAColor)  }}</p>
          <Toast :stylesTeam="false">
            <img src="../assets/copy.svg" class="copy_icon" alt="копировать элемент" @click="saveColor(rgbaToHex(RGBAColor))" />
          </Toast>
        </div>
      </div>
      <div class="RGBAOutput_block__body__rgba">
        <div class="rgba_value">
          <p style="white-space: nowrap; font-size: 12px;">RGB: {{ RGBAColor }}</p>
          
          <Toast :stylesTeam="false">
            <img src="../assets/copy.svg" class="copy_icon" alt="копировать элемент" @click="saveColor(RGBAColor)" />
          </Toast>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "../styles/ColorPicker.scss";
</style>
