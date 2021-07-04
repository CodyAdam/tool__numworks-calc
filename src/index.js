const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')

function createWindow() {
    // Créer la fenêtre de navigation.

    const mainWindow = new BrowserWindow({
        // width: 470,
        // height: 910,

        width: 486,
        height: 955,
        icon: 'static/logo.png',
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // et charger l'index.html de l'application.
    mainWindow.loadFile('static/simulator.html')
    mainWindow.setMenu(null)
    mainWindow.setMaximizable(false)

    //mainWindow.webContents.openDevTools();
}

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // Sur macOS il est d'usage de recréer une fenêtre dans l'application quand
        // l'icône du dock est cliquée et qu'il n'y a pas d'autre fenêtre ouverte.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Sur macOS, il est courant
// pour les applications et leur barre de menu de rester actives jusqu’à ce que l’utilisateur quitte
// explicitement avec Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// Dans ce fichier, vous pouvez inclure le reste du code spécifique du
// processus principal de votre application. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
