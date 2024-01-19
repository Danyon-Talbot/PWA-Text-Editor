const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA

function showInstallButton(show) {
    if (show) {
        butInstall.style.display = 'block'; // Show the button
    } else {
        butInstall.style.display = 'none'; // Hide the button
    }
}
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    deferredPrompt = event;

    showInstallButton(true);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === 'accepted') {
            console.log('PWA Installation Accepted');
        } else {
            console.log('PWA Installation Declined');
        }

        deferredPrompt = null;
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA Installed Successfully');
});
