// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD54FxWUlPn03bxD0UnD0oxVcMkI9ovCeQ",
  authDomain: "community-604af.firebaseapp.com",
  projectId: "community-604af",
  storageBucket: "community-604af.appspot.com",
  messagingSenderId: "735063146170",
  appId: "1:735063146170:web:725bce2c3c64afc0f30c83",
  measurementId: "G-7YD8RLH33Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Reference to the posts in Firebase
const postsRef = ref(database, 'posts/');

// Create a new post
function createPost() {
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('Post content cannot be empty.');
        return;
    }

    // Create a new post with a unique key
    const newPostRef = ref(database, 'posts/' + Date.now());
    set(newPostRef, {
        content: postContent
    }).then(() => {
        document.getElementById('postContent').value = ''; // Clear the textarea
    }).catch((error) => {
        console.error('Error adding post: ', error);
    });
}

// Delete a post
function deletePost(postId) {
    remove(ref(database, 'posts/' + postId)).catch((error) => {
        console.error('Error deleting post: ', error);
    });
}

// Display posts
function displayPosts() {
    onValue(postsRef, (snapshot) => {
        const posts = snapshot.val();
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';

        if (posts) {
            Object.keys(posts).forEach(postId => {
                const post = posts[postId];
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <p>${post.content}</p>
                    <button class="delete-btn" onclick="deletePost('${postId}')">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        }
    });
}

// Load posts on page load
window.onload = displayPosts;
