const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

function showInstallButton(show) {
    butInstall.style.display = show ? 'block' : 'none';
}

// Event handler for 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButton(true); // Show the install button
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt

        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === 'accepted') {
            console.log('PWA Installation Accepted');
        } else {
            console.log('PWA Installation Declined');
            // Optionally, you can allow retrying installation here
            showInstallButton(true);
        }

        // Reset deferredPrompt regardless of the user's choice
        deferredPrompt = null;
    }
});

// Event handler for 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA Installed Successfully');
    showInstallButton(false); // Hide the install button after successful installation
});
