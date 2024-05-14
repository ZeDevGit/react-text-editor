const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 76 and later from showing the mini-infobar
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Hide the install button
    butInstall.style.display = 'none';
    // Log the result of prompting the user
    console.log(`User response to the install prompt: ${outcome}`);
    // Reset the deferred prompt variable
    deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the result of the installation
    console.log('App was installed.', event);
    // Hide the install button
    butInstall.style.display = 'none';
});
