// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer, desktopCapturer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("electronAPI", {
  captureScreen: async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    const screen = sources[0]; // Берем первый экран (можно добавить логику выбора)
    return screen.thumbnail.toDataURL(); // Возвращаем изображение экрана
  },
  getCursorPosition: () => ipcRenderer.invoke("get-cursor-position"), 
});
