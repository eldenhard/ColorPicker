<script setup lang="ts">
import { ref } from 'vue'
import { ToastAction, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
import './styles.css'

const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)

const props = defineProps({
    stylesTeam: {
        type: Boolean,
    }
})

function oneWeekAway() {
  const now = new Date()
  const inOneWeek = now.setDate(now.getDate() + 7)
  return new Date(inOneWeek)
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

function handleClick() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true
  }, 100)
}
</script>

<template>
  <ToastProvider>
    <button
      :class="{stylesTeam : Boolean == true ? 'Button large grass' : ''}"
      style="cursor: pointer;"
      @click="handleClick"
    >
     <slot></slot>
    </button>

    <ToastRoot
      v-model:open="open"
      class="ToastRoot"
    >
      <ToastTitle class="ToastTitle">
        Копирование
      </ToastTitle>
      <ToastDescription as-child>
        <p class="ToastDescription">Данные скопированы в буфер обмена</p>
        <!-- <time
          class="ToastDescription"
          :dateTime="eventDateRef.toISOString()"
        >
          {{ prettyDate(eventDateRef) }}
        </time> -->
      </ToastDescription>
      <ToastAction
        class="ToastAction"
        as-child
        alt-text="Goto schedule to undo"
      >
        <button class="Button small green">
          Закрыть
        </button>
      </ToastAction>
    </ToastRoot>
    <ToastViewport class="ToastViewport" />
  </ToastProvider>
</template>