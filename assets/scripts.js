$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});
// Définition de la fonction lazyLoad
function lazyLoad() {
    // Sélection de toutes les images avec l'attribut 'data-src' (images non chargées)
    const images = document.querySelectorAll('img[data-src]');
    
    // Parcourir chaque image trouvée
    images.forEach(img => {
        // Vérifie si l'image est visible dans la fenêtre d'affichage (viewport)
        if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
            // Si l'image est visible, définir la source de l'image à la valeur de 'data-src'
            img.src = img.dataset.src;
            // Supprimer l'attribut 'data-src' car l'image est maintenant chargée
            img.removeAttribute('data-src');
        }
    });
}

// Ajouter des écouteurs d'événements pour déclencher lazyLoad lors du défilement de la page,
// du redimensionnement de la fenêtre ou du changement d'orientation (mobile)
window.addEventListener('scroll', lazyLoad);
window.addEventListener('resize', lazyLoad);
window.addEventListener('orientationchange', lazyLoad);
