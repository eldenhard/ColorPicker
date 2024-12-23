import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";

// Импорт PrimeVue и CSS стилей
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(PrimeVue).mount("#app");


const information = document.getElementById("overlay") as HTMLDivElement; // Указываем, что это HTMLDivElement
if (information) {
  information.innerText = `This app is using: Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()})`;
  information.style.cssText = `
    font-size: 12px; 
    color: #fff; 
    position: fixed; 
    bottom: 0; 
    right: 0; 
    padding: 5px; 
    background-color: rgba(0, 0, 0, 0.5);
  `;
}

window.electronAPI.onGlobalShortcut((message: string) => {
  console.log("Shortcut triggered:", message);
});

window.electronAPI.getCursorPosition().then((position) => {
  console.log("Cursor position:", position);
});
