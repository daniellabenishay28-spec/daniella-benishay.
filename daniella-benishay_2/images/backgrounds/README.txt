Ce dossier est destiné aux images d'ambiance (décoratives), par
opposition aux photos "de contenu" (photo de l'autrice, couvertures des
livres) qui se trouvent dans images/author/ et images/books/.

Actuellement, un seul emplacement est relié au design du site :

  hero.jpg  ->  arrière-plan de la grande section d'accueil (le "hero"
                de index.html), affiché en surimpression discrète
                derrière les dégradés existants.

Tant que ce fichier n'existe pas, le hero garde son apparence actuelle
(dégradés uniquement) : aucune image cassée, aucun changement visuel.
Dès que vous déposez une image nommée exactement "hero.jpg" ici, elle
apparaît automatiquement en fondu derrière le texte, avec une légère
transparence pour rester lisible.

Conseils pour cette image :
  - format paysage, assez large (1600 px de large ou plus est idéal) ;
  - une scène plutôt sombre ou contrastée fonctionnera mieux, puisque le
    texte du hero est clair et se lit sur un fond sombre ;
  - formats acceptés : .jpg, .jpeg, .png, .webp (adaptez alors le nom de
    fichier ET la référence dans index.html, voir GUIDE-IMAGES-ET-PDF.md
    à la racine du projet).

Vous voulez ajouter une image d'ambiance à une autre section du site
(par exemple derrière l'en-tête de la page "Mes livres" ou "Contact) ?
C'est possible en réutilisant exactement le même principe (une balise
<img data-fond-optionnel> + la classe CSS correspondante) : demandez
à ce que ce soit branché, ou suivez le point 5 du guide.
