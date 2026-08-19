# Guide simple — ajouter vos livres, vos images et vos PDF

Vous n'avez besoin d'aucune connaissance en code pour ajouter votre
contenu. Il suffit de déposer les bons fichiers, avec les bons noms,
dans les bons dossiers. Le site se met à jour tout seul.

## Ajouter un nouveau livre (aucune limite de nombre)

Le site est conçu pour accueillir autant de romans que vous le
souhaitez, aujourd'hui comme dans plusieurs années. Chaque roman est
décrit une seule fois, dans un seul fichier — **`js/books.js`** — et
apparaît alors automatiquement partout : sur la page d'accueil, dans
"Mes livres", et sur sa propre page (`book.html?id=...`), avec exactement
la même mise en forme, les mêmes animations et les mêmes effets que les
romans déjà en ligne.

Pour ajouter un livre, trois étapes seulement :

1. **La couverture** — déposez l'image dans `images/books/` (voir
   section 2 ci-dessous).
2. **Le PDF** (si vous en avez un) — déposez-le dans `books/` (voir
   section 3 ci-dessous). Vous pouvez très bien indiquer le chemin du
   PDF dans `books.js` avant même d'avoir le fichier : le site affichera
   "Bientôt disponible" à sa place jusqu'à ce qu'il soit déposé.
3. **La fiche du livre** — ouvrez `js/books.js` avec un simple éditeur
   de texte (Bloc-notes, TextEdit, ou tout éditeur de code) et copiez le
   bloc d'exemple déjà présent en commentaire à la fin du fichier, juste
   après le dernier livre. Remplissez vos propres informations : titre,
   genre, résumé, statut ("À venir", "En cours", "Disponible",
   "Terminé", "Bientôt disponible", ou tout autre texte de votre choix),
   lien Wattpad, etc. Le fichier `js/books.js` contient des instructions
   détaillées pour chaque champ.

Dès que ces trois étapes sont faites, le nouveau livre apparaît de
lui-même — sans qu'aucune autre page ou fichier n'ait besoin d'être
modifié. L'ordre d'affichage des livres correspond simplement à l'ordre
dans lequel ils sont écrits dans `js/books.js` (le premier du tableau
s'affiche en premier partout).

Un champ laissé vide (`""`) ne casse jamais rien : le site affiche
alors un texte de remplacement élégant ("Résumé à venir.", "Genre à
ajouter"...) en attendant que vous complétiez l'information plus tard.
De même, tant qu'aucun lien Wattpad n'est renseigné, le bouton
correspondant reste discrètement désactivé plutôt que de pointer vers
nulle part.

## Structure des dossiers

```
daniella-benishay/
├── js/
│   └── books.js                          <- la fiche de chaque livre (à éditer soi-même)
├── images/
│   ├── author/
│   │   └── daniella.jpg                  <- votre photo
│   ├── books/
│   │   ├── les-couleurs-du-noir.jpg      <- couverture du roman 1
│   │   ├── deteste-moi-si-tu-peux.jpg    <- couverture du roman 2
│   │   └── ...                           <- une image par nouveau roman
│   └── backgrounds/
│       └── hero.jpg                      <- image d'ambiance (facultative)
└── books/
    ├── les-couleurs-du-noir.pdf          <- PDF du roman 1
    ├── deteste-moi-si-tu-peux.pdf        <- PDF du roman 2
    └── ...                               <- un PDF par nouveau roman (facultatif)
```

## 1. Où mettre votre photo

Dans `images/author/`, sous le nom exact **daniella.jpg**.
Elle apparaît automatiquement sur la page d'accueil (section "À propos
de moi") et sur la page "À propos".

## 2. Où mettre la couverture de chaque livre

Dans `images/books/`, sous les noms exacts déjà utilisés dans
`js/books.js` :
- **les-couleurs-du-noir.jpg**
- **deteste-moi-si-tu-peux.jpg**

Pour un nouveau roman, choisissez vous-même le nom de fichier (par
exemple `mon-nouveau-livre.jpg`) et indiquez ce même nom dans le champ
`cover` de sa fiche dans `js/books.js` — c'est cette correspondance qui
permet au site de retrouver la bonne image. Chaque couverture apparaît
alors automatiquement partout où elle est utilisée sur le site :
accueil, page "Mes livres", et page du roman correspondant.

## 3. Où mettre les PDF

Dans `books/` (à la racine du projet, pas dans `images/`), sous les
noms exacts déjà utilisés dans `js/books.js` :
- **les-couleurs-du-noir.pdf**
- **deteste-moi-si-tu-peux.pdf**

Comme pour les couvertures, un nouveau roman peut utiliser le nom de
fichier de votre choix, du moment qu'il correspond au champ `pdf` de sa
fiche dans `js/books.js`. Dès qu'un PDF est présent au bon endroit, les
boutons "Ouvrir le PDF" et "Télécharger" apparaissent automatiquement
sur la page du roman concerné. Tant qu'il est absent, le site affiche
discrètement "Bientôt disponible" — jamais de lien cassé.

## 4. Comment remplacer une image

Il suffit d'écraser (remplacer) le fichier existant par le vôtre, en
gardant **exactement le même nom** et **le même emplacement**. Par
exemple, pour changer la couverture de "Les Couleurs du Noir" :

1. Préparez votre image (format `.jpg` de préférence, portrait, environ
   800 x 1200 pixels pour une couverture, 900 x 1100 pour la photo).
2. Renommez-la en `les-couleurs-du-noir.jpg`.
3. Copiez-la dans `images/books/`, en remplaçant l'ancien fichier.
4. Rechargez le site : la nouvelle image s'affiche partout où l'ancienne
   apparaissait, sans avoir touché à une seule ligne de code.

Si un jour un fichier est manquant, mal nommé, ou corrompu, le site
n'affichera jamais une image cassée : un cadre élégant avec la mention
"Photo à venir" ou "Couverture à venir" s'affiche automatiquement à la
place.

## 5. Comment ajouter une nouvelle image d'ambiance

Le dossier `images/backgrounds/` est réservé aux images décoratives
(par opposition aux photos "de contenu" ci-dessus). Un emplacement est
déjà prêt à l'emploi :

- Déposez un fichier nommé **hero.jpg** dans `images/backgrounds/` pour
  qu'il apparaisse automatiquement en arrière-plan discret de la grande
  section d'accueil (le "hero"), derrière le texte, avec une légère
  transparence pour rester lisible.
- Tant que ce fichier n'existe pas, le hero garde son apparence actuelle
  (dégradés de couleur uniquement) : aucun changement, aucune image
  cassée.

Vous souhaitez ajouter une image d'ambiance ailleurs sur le site (par
exemple derrière l'en-tête de "Mes livres" ou de "Contact") ? Le même
principe peut être branché à n'importe quelle section sur simple
demande — il suffit de le signaler pour qu'un nouvel emplacement soit
créé selon le même mécanisme (invisible tant qu'aucun fichier n'est
fourni, automatique dès qu'il l'est).

## Formats et tailles conseillés

| Emplacement                        | Format conseillé | Dimensions indicatives |
|-------------------------------------|-------------------|--------------------------|
| Photo (`images/author/`)            | .jpg               | ~900 x 1100 px (portrait) |
| Couvertures (`images/books/`)       | .jpg               | ~800 x 1200 px (portrait) |
| Image d'ambiance (`images/backgrounds/`) | .jpg          | 1600 px de large ou plus (paysage) |
| PDF (`books/`)                      | .pdf               | —                          |

Vous pouvez utiliser un autre format d'image (`.png`, `.webp`...) : il
faudra alors aussi renommer la référence correspondante dans le fichier
HTML concerné (le nom du fichier doit correspondre exactement à ce que
le site va chercher). Si vous n'êtes pas à l'aise avec cette étape,
convertissez simplement votre image en `.jpg` avant de la déposer —
c'est le plus simple.
