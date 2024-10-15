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

    // Создание контекстного меню
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Открыть камеру',
            click: () => {
                // Открываем новое окно с камерой
                const cameraWindow = new BrowserWindow({
                    width: 800,
                    height: 600,
                    webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false,
                    }
                });

                cameraWindow.loadFile('camera.html');

                // Обработка получения снимка
                ipcMain.once('sendImage', (event, imgData) => {
                    // Передаем изображение в главное окно
                    mainWindow.webContents.send('receiveImage', imgData);
                });
            }
        }
    ]);

    // Отображение контекстного меню на главном окне при клике правой кнопкой
    mainWindow.webContents.on('context-menu', (event) => {
        contextMenu.popup();
    });
});

// Получение изображения от камеры
ipcMain.on('sendImage', (event, imgData) => {
    mainWindow.webContents.send('receiveImage', imgData);
});
