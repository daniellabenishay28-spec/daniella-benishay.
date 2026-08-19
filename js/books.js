/* ==========================================================================
   Daniella Benishay — Site officiel d'autrice
   js/books.js — Données des romans (fichier centralisé, à éditer soi-même)

   C'EST ICI QUE VOUS AJOUTEZ UN NOUVEAU LIVRE. Aucune autre modification de
   code n'est nécessaire : dès qu'un livre est ajouté ci-dessous, il apparaît
   automatiquement sur la page d'accueil, dans la bibliothèque ("Mes livres")
   et sur sa propre page (book.html?id=...).

   Voir GUIDE-IMAGES-ET-PDF.md à la racine du projet pour la marche à suivre
   complète (où mettre la couverture, le PDF, etc.).

   Champs de chaque livre :
     id          (obligatoire) identifiant unique, sans espace ni accent,
                 utilisé dans l'adresse de la page du livre
                 (book.html?id=cet-identifiant). Doit être unique.
     title       (obligatoire) titre du roman.
     cover       (obligatoire) chemin vers la couverture, dans images/books/.
     genre       genre littéraire. Laissez "" si inconnu : le site affichera
                 "Genre à ajouter" automatiquement.
     description résumé du roman. Laissez "" si inconnu : le site affichera
                 "Résumé à venir." automatiquement.
     status      statut de publication, texte libre — par exemple "À venir",
                 "En cours", "Disponible", "Terminé", "Bientôt disponible".
     wattpad     lien Wattpad du roman. Laissez "" tant qu'il n'existe pas :
                 le bouton "Lire sur Wattpad" reste discrètement désactivé.
     pdf         chemin vers le PDF, dans books/ (pas dans images/). Laissez
                 "" si ce roman n'aura pas de PDF ; sinon indiquez le chemin
                 même si le fichier n'est pas encore déposé — le site
                 affiche "Bientôt disponible" tant qu'il est absent, et
                 active les boutons automatiquement dès qu'il est présent.

   Champs facultatifs (peuvent être omis ou laissés à "") :
     year        année de publication, ex. "2026".
     citation    courte citation mise en avant sur la page du roman.
     excerpt     extrait plus long du roman, affiché dans la section
                 "Extrait" de sa page.
     universe    présentation de l'univers du roman, affichée dans la
                 section "L'univers du roman" de sa page.
   ========================================================================== */

const books = [
  {
    id: "les-couleurs-du-noir",
    title: "Les Couleurs du Noir",
    cover: "images/books/les-couleurs-du-noir.jpg",
    genre: "Roman contemporain • Romance psychologique • New Adult",
    description: "Certaines personnes portent la lumière. D'autres apprennent à la laisser entrer.\n\nMaëlys Reed a toujours préféré le silence aux conversations et l'obscurité aux couleurs. Étudiante en art, elle s'est construite autour de ses blessures et de sa solitude.\n\nMais lorsque Solène, une jeune femme solaire et débordante de vie, s'impose dans son quotidien, son univers parfaitement contrôlé commence à se fissurer.\n\nPuis il y a Hélios Knight.\nUn regard.\nUne bibliothèque.\nUne rencontre qui pourrait tout changer.\n\nAlors que les couleurs font peu à peu leur apparition dans un monde qu'elle croyait condamné au noir, Maëlys devra affronter son passé et apprendre à accepter ce qu'elle a toujours refusé : l'amitié, l'amour et l'espoir.",
    status: "Terminé",
    // Pas encore publié sur Wattpad : laisser vide tant que l'histoire n'y
    // est pas. Le bouton "Lire sur Wattpad" affiche alors automatiquement
    // "Bientôt disponible" à la place, sans lien cassé. Ajoutez l'URL ici
    // dès que l'histoire sera en ligne : le bouton s'activera de lui-même.
    wattpad: "",
    pdf: "books/les-couleurs-du-noir.pdf",
    year: "",
    citation: "",
    excerpt: "",
    universe: ""
  },
  {
    id: "deteste-moi-si-tu-peux",
    title: "Déteste-moi si tu peux",
    cover: "images/books/deteste-moi-si-tu-peux.jpg",
    genre: "Dark romance psychologique",
    description: "Scarlett Blackwood a passé toute sa vie à haïr la famille Castellano.\n\nFille du chef de la mafia américaine, elle est convaincue que les Castellano sont responsables des cauchemars qui la poursuivent depuis son enfance. Alors, lorsqu'elle apprend qu'elle devra épouser Enzo Castellano afin de sceller une alliance entre leurs familles, elle n'a qu'un seul objectif : se venger.\n\nEnzo Castellano, héritier de la mafia italienne, déteste tout autant cette union. Pour lui, ce mariage n'est rien d'autre qu'une décision imposée par leurs pères, une alliance inutile dont il se serait volontiers passé.\n\nEntre eux, il n'existe que de la haine, du mépris et des rancœurs accumulées pendant des années.\n\nMais lorsque Scarlett commence à découvrir des secrets soigneusement enfouis dans le passé, tout ce qu'elle croyait savoir vole en éclats. Les ennemis ne sont peut-être pas ceux qu'elle imaginait. Et certaines vérités sont bien plus dangereuses que les mensonges.\n\nDans un monde où la loyauté s'achète, où la trahison se cache derrière chaque sourire et où le pouvoir vaut plus qu'une vie, Scarlett et Enzo devront affronter leurs démons autant que leurs familles.\n\nCar parfois, la haine n'est que le début de l'histoire.\nEt certaines vérités ont le pouvoir de tout détruire... ou de tout changer.",
    status: "En cours",
    // Histoire déjà publiée sur Wattpad : lien direct vers la page du récit
    // (et non le profil général). Le bouton "Lire sur Wattpad" pointe donc
    // vers cette page précise.
    wattpad: "https://www.wattpad.com/story/412045795-d%C3%A9teste-moi-si-tu-peux",
    pdf: "books/deteste-moi-si-tu-peux.pdf",
    year: "",
    citation: "",
    excerpt: "",
    universe: ""
  }

  /* Pour ajouter un troisième roman, copiez le bloc ci-dessus (de "{" à
     "}") juste après celui-ci, ajoutez une virgule après l'accolade
     précédente, puis remplissez vos propres informations, par exemple :

  ,{
    id: "mon-nouveau-livre",
    title: "Mon Nouveau Livre",
    cover: "images/books/mon-nouveau-livre.jpg",
    genre: "Romance",
    description: "Mon résumé...",
    status: "En cours",
    wattpad: "",
    pdf: "books/mon-nouveau-livre.pdf"
  }
  */
];

/* Ne pas modifier ce qui suit : cela rend le tableau "books" disponible
   pour js/script.js, qui s'occupe de l'affichage. */
window.DBBooks = books;
