document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    displayDateTime();
    window.addEventListener('scroll', handleScroll);
});

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

function loadPosts() {
    const posts = [
        { id: 1, title: 'First Post', summary: 'This is the summary of the first post.', date: '2024-08-15', content: 'Full content of the first post.' },
        { id: 2, title: 'Second Post', summary: 'Summary of the second post.', date: '2024-08-14', content: 'Full content of the second post.' },
        // Add more posts here
    ];

    const postsList = document.getElementById('postsList');
    postsList.innerHTML = posts.map(post => `
        <div class="post-summary">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.summary}</p>
            <small>${post.date}</small>
            <div>
                <a href="post.html?id=${post.id}">Read More</a> | 
                <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20post:%20${encodeURIComponent(window.location.href + 'post.html?id=' + post.id)}" target="_blank">Share</a>
            </div>
        </div>
    `).join('');
}

function displayDateTime() {
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    document.getElementById('currentDateTime').textContent = `Current Date and Time: ${dateTime}`;
}

function handleScroll() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
