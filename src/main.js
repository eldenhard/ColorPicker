import { app, BrowserWindow, ipcMain, desktopCapturer, session, screen, globalShortcut } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

// Обработка создания/удаления ярлыков на Windows при установке/удалении
if (started) {
  app.quit();
}
let mainWindow

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    // подключение предварительной загрузки к проекту
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  globalShortcut.register("W", () => {  
    mainWindow.webContents.send('global-shortcut', 'Electron loves global shortcuts!');  
  });  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  // Обработчик для получения координат курсора и их отправки в рендерер
  ipcMain.handle("get-cursor-position", () => {
    return screen.getCursorScreenPoint();
  });

  session.defaultSession.setDisplayMediaRequestHandler(
    (request, callback) => {
      desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
        callback({ video: sources[0], audio: "loopback" });
      });
    },
    { useSystemPicker: true }
  );
  createWindow();
});

// Выйти из всего приложения если все окна закрыты
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
