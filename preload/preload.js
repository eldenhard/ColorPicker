(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  const { contextBridge, ipcRenderer, desktopCapturer } = require("electron");
  contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping")
  });
  contextBridge.exposeInMainWorld("electronAPI", {
    onGlobalShortcut: (callback) => {
      ipcRenderer.on("global-shortcut", (event, message) => callback(message));
    },
    getCursorPosition: () => {
      return ipcRenderer.invoke("get-cursor-position");
    }
  });
});
