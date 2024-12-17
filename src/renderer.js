import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

const information = document.getElementById("overlay");
information.innerText = `This app is using:\n Chrome (v${versions.chrome()}),\n Node.js (v${versions.node()}),\n Electron (v${versions.electron()})}`;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const video = document.querySelector("video");

startButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getDisplayMedia()
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => video.play();
      alert("Стартануло");
    })
    .catch((e) => console.log(e));
});

stopButton.addEventListener("click", () => {
  alert("Остановилось");
  video.pause();
});
