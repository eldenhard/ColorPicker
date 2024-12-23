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
  onGlobalShortcut: (callback: (message: string) => void) => {
    ipcRenderer.on("global-shortcut", (event : KeyboardEvent, message: string) => callback(message));
  },
  getCursorPosition: (): Promise<{ x: number; y: number }> => {
    return ipcRenderer.invoke("get-cursor-position");
  },
});