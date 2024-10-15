const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');

    // Створення контекстного меню
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Відкрити камеру',
            click: () => {
                // Відкриття нової сторінки з камерою
                const cameraWindow = new BrowserWindow({
                    width: 800,
                    height: 600,
                    webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false,
                    }
                });

                cameraWindow.loadFile('camera.html');
            }
        }
    ]);

    mainWindow.webContents.on('context-menu', (event) => {
        contextMenu.popup();
    });
});

// Отримання зображення від камери
ipcMain.on('sendImage', (event, imgData) => {
    mainWindow.webContents.send('receiveImage', imgData);
});
