// import "./index.css";
// import { createApp } from "vue";
// import App from "./App.vue";

// import PrimeVue from 'primevue/config';

// const app = createApp(App);
// app.use(PrimeVue);

// createApp(App).mount("#app");
import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";

// Импорт PrimeVue и CSS стилей
import PrimeVue from "primevue/config";


const app = createApp(App);

app.use(PrimeVue).mount("#app");

const information = document.getElementById("overlay");
information.innerText = `This app is using: Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), Electron (v${versions.electron()})}`;
information.style = "font-size: 12px; color: #fff; position: fixed; bottom: 0; right: 0; padding: 5px; background-color: rgba(0, 0, 0, 0.5);";

// const startButton = document.getElementById("startButton");
// const stopButton = document.getElementById("stopButton");
// const video = document.querySelector("video");

// startButton.addEventListener("click", () => {
//   navigator.mediaDevices
//     .getDisplayMedia()
//     .then((stream) => {
//       video.srcObject = stream;
//       video.onloadedmetadata = (e) => video.play();
//       alert("Стартануло");
//     })
//     .catch((e) => console.log(e));
// });

// stopButton.addEventListener("click", () => {
//   alert("Остановилось");
//   video.pause();
// });
