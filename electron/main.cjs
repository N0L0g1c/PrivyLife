const { app, BrowserWindow, shell, nativeImage } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function getIconPath() {
  if (isDev) {
    return path.join(__dirname, "..", "build", "icon.png");
  }
  return path.join(__dirname, "..", "dist", "icon.png");
}

function getIndexPath() {
  return path.join(__dirname, "..", "dist", "index.html");
}

function createWindow() {
  const iconPath = getIconPath();
  const icon = nativeImage.createFromPath(iconPath);

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: "PrivyLife — Privacy Hub by VassDev",
    icon: icon.isEmpty() ? undefined : icon,
    backgroundColor: "#0a0f1a",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    autoHideMenuBar: true,
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(getIndexPath());
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("file:")) return;
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
