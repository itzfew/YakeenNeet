document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    document.querySelectorAll('.project-card img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightbox.querySelector('img').src = img.src;
        });
    });
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
});
