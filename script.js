function toggleMenu() {
    const menu = document.getElementById('mainMenu');
    menu.classList.toggle('open');
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settings');
    settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    document.body.style.fontSize = fontSize;
}
