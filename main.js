const {app, BrowserWindow} = require('electron')

function createWindow() {
    // Cria uma janela de navegação.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        resizable: false,
        icon: __dirname + "/icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    })

 //   win.setAutoHideMenuBar(true);

    win.once('ready-to-show', () => {
        win.show()
    })

    // e carregar o index.html do aplicativo.
    win.loadFile('index.html')
}

app.on('ready', createWindow)