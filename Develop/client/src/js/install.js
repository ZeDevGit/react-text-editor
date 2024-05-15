const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 76 and later from showing the mini-infobar
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check if the deferred prompt is available
    if (window.deferredPrompt) {
      // Show the install prompt
      window.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const choiceResult = await window.deferredPrompt.userChoice;
      // Reset the deferred prompt variable, as it is no longer needed
      window.deferredPrompt = null;
      // Hide the install button
      if (choiceResult.outcome === 'accepted') {
        butInstall.style.display = 'none';
      }
    }
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the event details
    console.log('App was installed.', event);
    // Hide the install button
    butInstall.style.display = 'none';
});
