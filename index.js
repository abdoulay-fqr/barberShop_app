const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

try {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
} catch (_) {}

let mainWindow;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    resizable: true,
    movable: true,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, "assets", "icon.png"),
  });

  mainWindow.loadFile("src/html/home.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

ipcMain.handle("show-popup", () => {
  const parentWindow = BrowserWindow.getFocusedWindow();

  parentWindow.webContents.send("show-overlay");

  const popup = new BrowserWindow({
    width: 600,
    height: 300,
    parent: parentWindow,
    modal: true,
    show: false,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  popup.loadFile("src/html/popups/barberslist.html");

  popup.once("ready-to-show", () => {
    popup.show();
  });

  popup.on("closed", () => {
    parentWindow.webContents.send("hide-overlay");
  });
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
