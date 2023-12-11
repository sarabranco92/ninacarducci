// Expression de fonction immédiatement invoquée (IIFE) pour créer une portée privée pour jQuery ($) et éviter les conflits avec d'autres bibliothèques
(function ($) {
  "use strict"; // Activer le mode strict pour une meilleure vérification des erreurs et des performances améliorées

  // Définition d'un nouveau plugin jQuery appelé 'mauGallery'
  $.fn.mauGallery = function (options) {
    // Étendre les paramètres par défaut avec les options fournies
    const settings = $.extend($.fn.mauGallery.defaults, options);
    let tagsCollection = []; // Initialiser un tableau pour conserver les tags uniques de la galerie

    // Itérer sur chaque élément correspondant, 'this' fait référence à chaque élément individuel auquel le plugin est appliqué
    return this.each(function () {
      const $gallery = $(this); // Mettre en cache l'objet jQuery pour la galerie courante
      // Créer un conteneur pour les lignes de la galerie
      $.fn.mauGallery.methods.createRowWrapper($gallery);

      // Si la lightbox est activée dans les paramètres, créer la lightbox
      if (settings.lightBox) {
        $.fn.mauGallery.methods.createLightBox($gallery, settings.lightboxId, settings.navigation);
      }

      // Attacher des écouteurs d'événements à la galerie pour les interactions utilisateur
      $.fn.mauGallery.listeners($gallery, settings);

      // Itérer sur chaque élément de la galerie pour appliquer un comportement adaptatif et des éléments d'enrobage
      $gallery.find(".gallery-item").each(function () {
        const $item = $(this);
        // Rendre l'image réactive
        $.fn.mauGallery.methods.responsiveImageItem($item);
        // Déplacer l'élément dans le conteneur de ligne
        $.fn.mauGallery.methods.moveItemInRowWrapper($item);
        // Enrober l'élément dans une colonne, en fonction du nombre de colonnes spécifié dans les paramètres
        $.fn.mauGallery.methods.wrapItemInColumn($item, settings.columns);

        // Si les tags doivent être affichés, les recueillir à partir des éléments de la galerie
        const theTag = $item.data("gallery-tag");
        if (settings.showTags && theTag !== undefined && !tagsCollection.includes(theTag)) {
          tagsCollection.push(theTag);
        }
      });

      // Si les tags sont activés dans les paramètres, afficher les tags
      if (settings.showTags) {
        $.fn.mauGallery.methods.showItemTags($gallery, settings.tagsPosition, tagsCollection);
      }

      // Révéler la galerie avec un effet d'apparition progressive
      $gallery.fadeIn(500);
    });
  };

  // Paramètres par défaut pour le plugin
  $.fn.mauGallery.defaults = {
    columns: 3, // Nombre de colonnes dans la galerie
    lightBox: true, // Activer la fonctionnalité de lightbox
    lightboxId: null, // L'ID à utiliser pour la lightbox, si null, un ID par défaut sera utilisé
    showTags: true, // Montrer les tags pour le filtrage
    tagsPosition: "bottom", // La position de la barre de tags, peut être 'top' ou 'bottom'
    navigation: true, // Activer les boutons de navigation dans la lightbox
  };

  // Écouteurs d'événements pour le plugin de galerie
  $.fn.mauGallery.listeners = function ($gallery, options) {
    // Écouteur pour cliquer sur un élément de la galerie pour l'ouvrir dans la lightbox
    $gallery.on("click", ".gallery-item", function () {
      const $this = $(this);
      // Si la lightbox est activée et que l'élément cliqué est une image, l'ouvrir dans la lightbox
      if (options.lightBox && $this.is("img")) {
        $.fn.mauGallery.methods.openLightBox($this, options.lightboxId);
      }
    });

    // Écouteur pour les tags de filtrage pour filtrer les éléments de la galerie
    $gallery.on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    // Écouteurs pour les boutons de navigation précédent et suivant dans la lightbox
    $gallery.on("click", ".mg-prev", () => $.fn.mauGallery.methods.prevImage($gallery, options.lightboxId));
    $gallery.on("click", ".mg-next", () => $.fn.mauGallery.methods.nextImage($gallery, options.lightboxId));
  };

  // Méthodes contenant la logique du plugin
  $.fn.mauGallery.methods = {
    // D'autres méthodes iraient ici, chacune effectuant des tâches spécifiques pour le plugin
  };

  // Fermer l'IIFE et passer l'objet jQuery pour éviter les conflits avec d'autres bibliothèques qui pourraient utiliser $
})(jQuery);
