const electron = require("electron")
const app = electron.app
const Tray = electron.Tray;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win
let isQuit = false;

var menu = Menu.buildFromTemplate([
    {label: "Show App", click: () => {
        win.show();
    }},
    {label: "Quit", click: () => {
        app.quit();
    }}
])

function createWindow() {
    win = new BrowserWindow({width: 1280, height:720, 
                                                resizable: true, title: "Floatplanet",
                                                icon: path.join(__dirname, "build/icons/icons/32x32.png")})

    win.loadURL("https://floatplane.com")

    win.on("close", function(event) {
        if (!isQuit) {
            event.preventDefault();
            win.hide()
        }
    })

    tray = new Tray("./build/icons/icons/32x32.png")
    tray.setToolTip("Floatplanet");
    tray.setContextMenu(menu);
    tray.name = "Floatplanet"
}

app.on('before-quit', () => {
    isQuit = true;
})

app.on('ready', createWindow)