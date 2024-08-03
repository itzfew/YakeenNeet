 // Handle slide menu
function openMenu() {
    document.querySelector('.slide-menu').style.left = '0';
}

function closeMenu() {
    document.querySelector('.slide-menu').style.left = '-250px';
}

// Handle search box
function toggleSearch() {
    const searchBox = document.getElementById('search-box');
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
}

// Dummy data and functions for store and posts
const products = [
    { id: 'product1', name: 'Product 1', price: '$10' },
    { id: 'product2', name: 'Product 2', price: '$20' },
    // Add more products here
];

const posts = [
    { title: 'Post 1', content: 'Content for post 1.' },
    { title: 'Post 2', content: 'Content for post 2.' },
    // Add more posts here
];

function renderProducts() {
    const productList = document.getElementById('products');
    productList.innerHTML = products.map(product =>
        `<div class="product">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
            <button onclick="buyNow('${product.id}')">Buy Now</button>
        </div>`
    ).join('');
}

function renderPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = posts.map(post =>
        `<div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        </div>`
    ).join('');
}

function addToCart(productId) {
    alert(`Added product ${productId} to cart.`);
    // Implement cart functionality
}

function buyNow(productId) {
    alert(`Buying product ${productId}.`);
    // Implement buying functionality
}

function viewCart() {
    alert('Viewing cart.'); // Placeholder for cart functionality
}

function signOut() {
    // Implement Google Sign-Out functionality
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    document.getElementById('profile-info').innerHTML = `
        <h3>${profile.getName()}</h3>
        <p>Email: ${profile.getEmail()}</p>
        <img src="${profile.getImageUrl()}" alt="Profile Picture">
    `;
}

// Initialize the page with products and posts
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPosts();
});
