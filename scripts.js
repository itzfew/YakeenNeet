document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    displayCurrentDateTime();
    document.body.classList.add('loaded');
});

const posts = [
    { id: 1, title: 'First Post', summary: 'This is the summary of the first post.', date: '2024-08-15', content: 'Full content of the first post.' },
    { id: 2, title: 'Second Post', summary: 'Summary of the second post.', date: '2024-08-14', content: 'Full content of the second post.' },
    // Add more posts here
];

const comments = {
    1: [],
    2: [],
    // Add more post IDs as needed
};

let currentPage = 1;
const postsPerPage = 5;

function loadPosts() {
    displayPosts(posts);
}

function displayPosts(postsToDisplay) {
    const postsList = document.getElementById('postsList');
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = postsToDisplay.slice(start, end);

    postsList.innerHTML = paginatedPosts.map(post => `
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

    displayPaginationControls(postsToDisplay.length);
}

function displayPaginationControls(totalPosts) {
    const paginationControls = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    let controls = '';

    if (currentPage > 1) {
        controls += `<button onclick="changePage(${currentPage - 1})">Previous</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        controls += `<button onclick="changePage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages) {
        controls += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
    }

    paginationControls.innerHTML = controls;
}

function changePage(page) {
    currentPage = page;
    displayPosts(posts);
}

function filterPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm) || post.summary.toLowerCase().includes(searchTerm));
    displayPosts(filteredPosts);
}

function displayCurrentDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('currentDateTime').innerText = `Current Date and Time: ${dateTimeString}`;
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Thank you for subscribing with ${email}!`);
    // Add logic to handle subscription, e.g., sending email to server
}

function toggleMenu() {
    const menu = document.getElementById('mainMenu');
    menu.classList.toggle('open');
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settings');
    settingsPanel.classList.toggle('open');
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    document.body.style.fontSize = fontSize;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('postContent').innerHTML = `
            <h1>${post.title}</h1>
            <p><small>${post.date}</small></p>
            <p>${post.content}</p>
            <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20post:%20${encodeURIComponent(window.location.href)}" target="_blank">Share this post</a>
        `;

        displayComments(postId);
    } else {
        document.getElementById('postContent').innerHTML = '<p>Post not found.</p>';
    }
}

function displayComments(postId) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments[postId].map(comment => `
        <div class="comment">
            <p>${comment}</p>
        </div>
    `).join('');
}

function submitComment(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const commentText = document.getElementById('comment').value;

    if (comments[postId]) {
        comments[postId].push(commentText);
    } else {
        comments[postId] = [commentText];
    }

    displayComments(postId);
    document.getElementById('comment').value = '';
}
