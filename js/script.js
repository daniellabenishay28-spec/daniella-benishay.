/* ==========================================================================
   Daniella Benishay — Site officiel d'autrice
   script.js — JavaScript vanilla uniquement (aucune dépendance externe)
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     0. Préférences & capacités
     ------------------------------------------------------------------ */
  var mqReduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var prefersReducedMotion = mqReduitMotion.matches;

  var mqPointeurFin = window.matchMedia("(hover: hover) and (pointer: fine)");
  var capacitePointeurFin = mqPointeurFin.matches;

  var effetsInteractifsActifs = capacitePointeurFin && !prefersReducedMotion;

  /* ------------------------------------------------------------------
     1. Rendu dynamique de la bibliothèque
     Les informations de chaque roman vivent désormais dans le fichier
     js/books.js (chargé avant celui-ci), sous la forme d'un tableau
     "books" exposé via window.DBBooks. Ce bloc se contente de LIRE ce
     tableau et de générer automatiquement :
       - les deux couvertures en éventail du hero (page d'accueil) ;
       - les cartes de la section "Mes romans" (page d'accueil) ;
       - les cartes de la bibliothèque complète (books.html) ;
       - le contenu de la page individuelle d'un roman (book.html?id=...).
     Ajouter un roman dans js/books.js suffit donc à le faire apparaître
     partout, dans le même style que les romans existants, sans toucher
     à ce fichier.
     ------------------------------------------------------------------ */
  var LISTE_LIVRES = Array.isArray(window.DBBooks) ? window.DBBooks : [];

  // Échappe une valeur avant de l'insérer dans un gabarit HTML (protège
  // contre tout caractère spécial qu'un texte saisi dans books.js pourrait
  // contenir, par exemple une esperluette ou un guillemet).
  function echapperHtml(valeur) {
    var div = document.createElement("div");
    div.textContent = valeur === undefined || valeur === null ? "" : String(valeur);
    return div.innerHTML;
  }

  // Renvoie soit la valeur fournie (si non vide), soit un texte de secours,
  // avec une indication pour appliquer (ou non) le style "placeholder".
  function texteOuChamp(valeur, texteParDefaut) {
    var v = (valeur === undefined || valeur === null) ? "" : String(valeur).trim();
    return v ? { texte: v, estPlaceholder: false } : { texte: texteParDefaut, estPlaceholder: true };
  }

  function classeSiPlaceholder(info) {
    return info.estPlaceholder ? " placeholder-texte" : "";
  }

  function urlPageLivre(id) {
    return "book.html?id=" + encodeURIComponent(id);
  }

  // Fait correspondre un statut en texte libre (voir js/books.js) à une
  // petite catégorie utilisée uniquement pour la couleur du repère visuel
  // ; un statut inconnu ou personnalisé reste affiché tel quel, simplement
  // sans coloration particulière.
  function statutClasse(statut) {
    var s = (statut || "").toString().trim().toLowerCase();
    if (!s) return "";
    if (s.indexOf("bientôt") !== -1 || s.indexOf("bientot") !== -1) return "bientot-disponible";
    if (s.indexOf("dispo") !== -1) return "disponible";
    if (s.indexOf("en cours") !== -1) return "en-cours";
    if (s.indexOf("termin") !== -1) return "termine";
    if (s.indexOf("venir") !== -1) return "a-venir";
    return "";
  }

  function rendreMetaLivre(livre) {
    var genre = texteOuChamp(livre.genre, "Genre à ajouter");
    var statut = texteOuChamp(livre.status, "Statut à ajouter");
    var slugStatut = statutClasse(livre.status);
    var html =
      '<div class="livre-hero__meta-item">' +
        '<span class="livre-hero__meta-label">Genre</span>' +
        '<span class="livre-hero__meta-valeur' + classeSiPlaceholder(genre) + '">' + echapperHtml(genre.texte) + '</span>' +
      '</div>' +
      '<div class="livre-hero__meta-item"' + (slugStatut ? ' data-statut="' + slugStatut + '"' : "") + '>' +
        '<span class="livre-hero__meta-label">Statut</span>' +
        '<span class="livre-hero__meta-valeur' + classeSiPlaceholder(statut) + '">' +
          '<span class="statut-puce" aria-hidden="true"></span>' + echapperHtml(statut.texte) +
        '</span>' +
      '</div>';
    if ((livre.year || "").toString().trim()) {
      html +=
        '<div class="livre-hero__meta-item">' +
          '<span class="livre-hero__meta-label">Année</span>' +
          '<span class="livre-hero__meta-valeur">' + echapperHtml(livre.year) + '</span>' +
        '</div>';
    }
    return html;
  }

  function rendreBoutonsLivre(livre) {
    // Tant qu'aucun lien Wattpad n'est renseigné dans books.js, on affiche
    // la même mention discrète "Bientôt disponible" que pour un PDF absent
    // (jamais de lien factice, jamais de lien cassé, jamais le lien de
    // profil général en remplacement).
    var wattpad = (livre.wattpad || "").toString().trim();
    var boutonWattpad = wattpad
      ? '<a href="' + echapperHtml(wattpad) + '" class="btn btn--primaire" target="_blank" rel="noopener noreferrer">Lire sur Wattpad</a>'
      : '<span class="note-indisponible">Bientôt disponible</span>';

    var pdf = (livre.pdf || "").toString().trim();
    var blocPdf = pdf
      ? '<div class="groupe-boutons" data-pdf-check="' + echapperHtml(pdf) + '">' +
          '<a href="' + echapperHtml(pdf) + '" class="btn btn--secondaire" data-pdf-lien hidden target="_blank" rel="noopener noreferrer">Ouvrir le PDF</a>' +
          '<a href="' + echapperHtml(pdf) + '" class="btn btn--or" data-pdf-lien hidden download>Télécharger</a>' +
          '<span class="note-indisponible" data-pdf-indisponible>Bientôt disponible</span>' +
        '</div>'
      : '<span class="note-indisponible">Bientôt disponible</span>';

    return '<div class="groupe-boutons">' + boutonWattpad + blocPdf + '</div>';
  }

  // ---- Éventail de couvertures du hero (accueil), à partir des 2 premiers livres ----
  function rendreHeroVitrine(livres) {
    var conteneur = document.querySelector("[data-hero-vitrine]");
    if (!conteneur) return;
    var deux = livres.slice(0, 2);
    if (!deux.length) return;
    var html = "";
    deux.forEach(function (livre, i) {
      var srcAttr = livre.cover ? ' src="' + echapperHtml(livre.cover) + '"' : "";
      html +=
        '<div class="hero__carte-livre hero__carte-livre--' + (i + 1) + '" data-cadre-couverture data-texte-absent="Couverture à venir">' +
          '<img data-couverture' + srcAttr + ' alt="" loading="eager" width="440" height="660" />' +
        '</div>';
    });
    conteneur.innerHTML = html;
  }

  // ---- Cartes "Mes romans" (accueil) ----
  function rendreCarteAccueil(livre, index) {
    var genre = texteOuChamp(livre.genre, "Genre à ajouter");
    var resume = texteOuChamp(livre.description, "Résumé à venir.");
    var retard = Math.min(index * 0.08, 0.4).toFixed(2);
    var srcAttr = livre.cover ? ' src="' + echapperHtml(livre.cover) + '"' : "";
    var titreEch = echapperHtml(livre.title);
    return (
      '<article class="carte-livre au-scroll" style="--retard:' + retard + 's">' +
        '<div class="carte-livre__couverture" data-cadre-couverture data-texte-absent="Couverture à venir">' +
          '<img data-couverture' + srcAttr + ' alt="Couverture du roman ' + titreEch + ' de Daniella Benishay" loading="lazy" width="800" height="1200" />' +
          '<div class="carte-livre__brillance" aria-hidden="true"></div>' +
        '</div>' +
        '<div class="carte-livre__corps">' +
          '<span class="carte-livre__genre' + classeSiPlaceholder(genre) + '">' + echapperHtml(genre.texte) + '</span>' +
          '<h3 class="carte-livre__titre">' + titreEch + '</h3>' +
          '<p class="carte-livre__description' + classeSiPlaceholder(resume) + '">' + echapperHtml(resume.texte) + '</p>' +
          '<a href="' + urlPageLivre(livre.id) + '" class="btn btn--or btn--petit carte-livre__action">Découvrir <span class="btn__fleche">→</span></a>' +
        '</div>' +
      '</article>'
    );
  }

  function rendreGrilleLivresAccueil(livres) {
    var conteneur = document.querySelector("[data-grille-livres]");
    if (!conteneur) return;
    conteneur.innerHTML = livres.map(rendreCarteAccueil).join("");
  }

  // ---- Cartes de la bibliothèque complète (books.html) ----
  function rendreCarteCollection(livre, index) {
    var numero = String(index + 1).padStart(2, "0");
    var genre = texteOuChamp(livre.genre, "Genre à ajouter");
    var resume = texteOuChamp(livre.description, "Résumé à venir.");
    var retard = Math.min(index * 0.08, 0.4).toFixed(2);
    var srcAttr = livre.cover ? ' src="' + echapperHtml(livre.cover) + '"' : "";
    var titreEch = echapperHtml(livre.title);
    return (
      '<article class="collection__item au-scroll" style="--retard:' + retard + 's">' +
        '<div class="collection__couverture-cadre">' +
          '<span class="collection__index" aria-hidden="true">' + numero + '</span>' +
          '<div class="grande-couverture collection__couverture" data-cadre-couverture data-texte-absent="Couverture à venir">' +
            '<img data-couverture' + srcAttr + ' alt="Couverture du roman ' + titreEch + ' de Daniella Benishay" loading="lazy" width="800" height="1200" />' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<span class="collection__genre' + classeSiPlaceholder(genre) + '">' + echapperHtml(genre.texte) + '</span>' +
          '<h2 class="collection__titre">' + titreEch + '</h2>' +
          '<p class="collection__description' + classeSiPlaceholder(resume) + '">' + echapperHtml(resume.texte) + '</p>' +
          '<div class="groupe-boutons collection__boutons">' +
            '<a href="' + urlPageLivre(livre.id) + '" class="btn btn--or">Découvrir le livre <span class="btn__fleche">→</span></a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function rendreCollectionLivres(livres) {
    var conteneur = document.querySelector("[data-collection-livres]");
    if (!conteneur) return;
    conteneur.innerHTML = livres.map(rendreCarteCollection).join("");
  }

  // ---- Page individuelle d'un roman (book.html?id=...) ----
  function trouverLivreParId(id) {
    for (var i = 0; i < LISTE_LIVRES.length; i++) {
      if (LISTE_LIVRES[i].id === id) return LISTE_LIVRES[i];
    }
    return null;
  }

  function rendrePageLivre() {
    var sectionsLivre = document.querySelectorAll('[data-champ-section="livre"]');
    var sectionAutre = document.querySelector('[data-champ-section="autre-livre"]');
    var sectionIntrouvable = document.querySelector('[data-champ-section="introuvable"]');
    if (!sectionsLivre.length && !sectionIntrouvable) return; // pas sur book.html

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var livre = id ? trouverLivreParId(id) : null;

    if (!livre) {
      sectionsLivre.forEach(function (s) { s.hidden = true; });
      if (sectionAutre) sectionAutre.hidden = true;
      if (sectionIntrouvable) sectionIntrouvable.hidden = false;
      document.title = "Roman introuvable — Daniella Benishay";
      return;
    }

    document.title = livre.title + " — Daniella Benishay";
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      var resumePourMeta = (livre.description || "").toString().trim() || ("Découvrez " + livre.title + ", un roman de Daniella Benishay.");
      metaDescription.setAttribute("content", resumePourMeta);
    }
    var ogTitre = document.querySelector('meta[property="og:title"]');
    if (ogTitre) ogTitre.setAttribute("content", livre.title + " — Daniella Benishay");
    var ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", "Découvrez " + livre.title + ", un roman de Daniella Benishay.");
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && livre.cover) ogImage.setAttribute("content", livre.cover);

    document.querySelectorAll('[data-champ="fil-ariane-titre"]').forEach(function (el) {
      el.textContent = livre.title;
    });

    var imgCouverture = document.querySelector('[data-champ="cover"]');
    if (imgCouverture) {
      if (livre.cover) imgCouverture.src = livre.cover;
      else imgCouverture.removeAttribute("src");
      imgCouverture.alt = "Couverture du roman " + livre.title + " de Daniella Benishay";
    }

    var genreInfo = texteOuChamp(livre.genre, "Genre à ajouter");
    var elGenre = document.querySelector('[data-champ="genre"]');
    if (elGenre) {
      elGenre.textContent = genreInfo.texte;
      elGenre.classList.toggle("placeholder-texte", genreInfo.estPlaceholder);
    }

    var elTitre = document.querySelector('[data-champ="titre"]');
    if (elTitre) elTitre.textContent = livre.title;

    var resumeInfo = texteOuChamp(livre.description, "Résumé à venir.");
    var elResume = document.querySelector('[data-champ="resume"]');
    if (elResume) {
      elResume.textContent = resumeInfo.texte;
      elResume.classList.toggle("placeholder-texte", resumeInfo.estPlaceholder);
    }

    var citation = (livre.citation || "").toString().trim();
    var blocCitation = document.querySelector('[data-champ-bloc="citation"]');
    if (blocCitation) {
      if (citation) {
        blocCitation.hidden = false;
        var elCitation = blocCitation.querySelector('[data-champ="citation"]');
        if (elCitation) elCitation.textContent = citation;
      } else {
        blocCitation.hidden = true;
      }
    }

    var elMeta = document.querySelector('[data-champ="meta"]');
    if (elMeta) elMeta.innerHTML = rendreMetaLivre(livre);

    var elBoutons = document.querySelector('[data-champ="boutons"]');
    if (elBoutons) elBoutons.innerHTML = rendreBoutonsLivre(livre);

    var universInfo = texteOuChamp(livre.universe, "Présentation de l'univers à venir.");
    var elUnivers = document.querySelector('[data-champ="univers"]');
    if (elUnivers) {
      elUnivers.textContent = universInfo.texte;
      elUnivers.classList.toggle("placeholder-texte", universInfo.estPlaceholder);
    }

    var extraitInfo = texteOuChamp(livre.excerpt, "Extrait à venir.");
    var elExtrait = document.querySelector('[data-champ="extrait"]');
    if (elExtrait) {
      elExtrait.textContent = extraitInfo.texte;
      elExtrait.classList.toggle("placeholder-texte", extraitInfo.estPlaceholder);
    }

    if (sectionAutre) {
      if (LISTE_LIVRES.length < 2) {
        sectionAutre.hidden = true;
      } else {
        var indexActuel = LISTE_LIVRES.indexOf(livre);
        var suivant = LISTE_LIVRES[(indexActuel + 1) % LISTE_LIVRES.length];
        sectionAutre.hidden = false;
        var elAutreTitre = sectionAutre.querySelector('[data-champ="autre-livre-titre"]');
        if (elAutreTitre) elAutreTitre.textContent = suivant.title;
        var elAutreLien = sectionAutre.querySelector('[data-champ="autre-livre-lien"]');
        if (elAutreLien) elAutreLien.setAttribute("href", urlPageLivre(suivant.id));
      }
    }
  }

  rendreHeroVitrine(LISTE_LIVRES);
  rendreGrilleLivresAccueil(LISTE_LIVRES);
  rendreCollectionLivres(LISTE_LIVRES);
  rendrePageLivre();

  /* ------------------------------------------------------------------
     2. Année courante dans le pied de page
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-annee-courante]").forEach(function (el) {
    el.textContent = "2026";
    try {
      var annee = new Date().getFullYear();
      if (annee && !isNaN(annee)) el.textContent = String(annee);
    } catch (erreur) {
      /* on conserve la valeur par défaut */
    }
  });

  /* ------------------------------------------------------------------
     3. En-tête : effet de fond au scroll
     ------------------------------------------------------------------ */
  var entete = document.querySelector(".entete");
  if (entete) {
    var majEntete = function () {
      if (window.scrollY > 24) entete.classList.add("entete--scrolled");
      else entete.classList.remove("entete--scrolled");
    };
    majEntete();
    window.addEventListener("scroll", majEntete, { passive: true });
  }

  /* ------------------------------------------------------------------
     4. Menu mobile (hamburger)
     ------------------------------------------------------------------ */
  var boutonHamburger = document.querySelector(".nav__hamburger");
  var navMobile = document.querySelector(".nav__liens--mobile");
  var voileMenu = document.querySelector(".voile-menu");

  if (navMobile) {
    navMobile.querySelectorAll(".nav__liste li").forEach(function (li, i) {
      li.style.setProperty("--retard-menu", i * 0.06 + "s");
    });
  }

  function ouvrirMenu() {
    if (!navMobile || !boutonHamburger) return;
    navMobile.classList.add("ouvert");
    boutonHamburger.setAttribute("aria-expanded", "true");
    if (voileMenu) voileMenu.classList.add("visible");
    document.body.style.overflow = "hidden";
    var premierLien = navMobile.querySelector("a");
    if (premierLien) premierLien.focus();
  }

  function fermerMenu() {
    if (!navMobile || !boutonHamburger) return;
    navMobile.classList.remove("ouvert");
    boutonHamburger.setAttribute("aria-expanded", "false");
    if (voileMenu) voileMenu.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (boutonHamburger && navMobile) {
    boutonHamburger.addEventListener("click", function () {
      var estOuvert = boutonHamburger.getAttribute("aria-expanded") === "true";
      if (estOuvert) fermerMenu();
      else ouvrirMenu();
    });
    navMobile.querySelectorAll("a").forEach(function (lien) {
      lien.addEventListener("click", fermerMenu);
    });
    if (voileMenu) voileMenu.addEventListener("click", fermerMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fermerMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) fermerMenu();
    });
  }

  /* ------------------------------------------------------------------
     5. Décalage du scroll fluide sous l'en-tête fixe
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (lien) {
    lien.addEventListener("click", function (e) {
      var cible = document.querySelector(lien.getAttribute("href"));
      if (!cible) return;
      e.preventDefault();
      var decalage = 96;
      var position = cible.getBoundingClientRect().top + window.pageYOffset - decalage;
      window.scrollTo({ top: position, behavior: prefersReducedMotion ? "auto" : "smooth" });
      cible.setAttribute("tabindex", "-1");
      cible.focus({ preventScroll: true });
    });
  });

  /* ------------------------------------------------------------------
     6. Animations d'apparition au scroll (IntersectionObserver)
     ------------------------------------------------------------------ */
  var elementsAuScroll = document.querySelectorAll(".au-scroll, .trait");

  if (elementsAuScroll.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elementsAuScroll.forEach(function (el) { el.classList.add("visible"); });
    } else {
      var observateur = new IntersectionObserver(
        function (entrees) {
          entrees.forEach(function (entree) {
            if (entree.isIntersecting) {
              entree.target.classList.add("visible");
              observateur.unobserve(entree.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      elementsAuScroll.forEach(function (el) { observateur.observe(el); });
    }
  }

  /* ------------------------------------------------------------------
     7. Bouton retour en haut
     ------------------------------------------------------------------ */
  var boutonRetourHaut = document.querySelector(".retour-haut");
  if (boutonRetourHaut) {
    var majRetourHaut = function () {
      if (window.scrollY > 640) boutonRetourHaut.classList.add("visible");
      else boutonRetourHaut.classList.remove("visible");
    };
    majRetourHaut();
    window.addEventListener("scroll", majRetourHaut, { passive: true });
    boutonRetourHaut.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     8. Barre de progression de lecture (pages livres)
     ------------------------------------------------------------------ */
  var barreLecture = document.querySelector(".barre-lecture");
  if (barreLecture) {
    var majBarre = function () {
      var hauteurTotale = document.documentElement.scrollHeight - window.innerHeight;
      var pourcentage = hauteurTotale > 0 ? (window.scrollY / hauteurTotale) * 100 : 0;
      barreLecture.style.width = Math.min(100, Math.max(0, pourcentage)) + "%";
    };
    majBarre();
    window.addEventListener("scroll", majBarre, { passive: true });
    window.addEventListener("resize", majBarre);
  }

  /* ------------------------------------------------------------------
     9. Vérification de disponibilité des fichiers PDF
     ------------------------------------------------------------------ */
  function verifierFichierDisponible(chemin) {
    return fetch(chemin, { method: "HEAD", cache: "no-store" })
      .then(function (reponse) { return reponse.ok; })
      .catch(function () { return false; });
  }

  document.querySelectorAll("[data-pdf-check]").forEach(function (conteneur) {
    var chemin = conteneur.getAttribute("data-pdf-check");
    var liensDisponibles = conteneur.querySelectorAll("[data-pdf-lien]");
    var noteIndisponible = conteneur.querySelector("[data-pdf-indisponible]");
    if (!chemin) return;

    verifierFichierDisponible(chemin).then(function (disponible) {
      if (disponible) {
        liensDisponibles.forEach(function (lien) {
          lien.hidden = false;
          lien.setAttribute("href", chemin);
        });
        if (noteIndisponible) noteIndisponible.hidden = true;
      } else {
        liensDisponibles.forEach(function (lien) { lien.hidden = true; });
        if (noteIndisponible) noteIndisponible.hidden = false;
      }
    });
  });

  /* ------------------------------------------------------------------
     10. Masquage gracieux des images manquantes (photo d'autrice et
     couvertures des livres). Dès qu'un fichier attendu (voir images/author/,
     images/books/) est absent ou invalide, le cadre bascule sur le
     placeholder élégant ".image-absente" plutôt que d'afficher une image
     cassée. Fonctionne pour toutes les images du site : il suffit de poser
     data-couverture sur l'<img> et data-cadre-couverture sur son cadre.
     ------------------------------------------------------------------ */
  function signalerImageAbsente(img) {
    var cadre = img.closest("[data-cadre-couverture]");
    if (cadre) cadre.classList.add("image-absente");
  }
  document.querySelectorAll("img[data-couverture]").forEach(function (img) {
    // Cas où l'image a déjà échoué à charger avant l'exécution de ce script
    // (image absente et navigateur rapide).
    if (img.complete && img.naturalWidth === 0) {
      signalerImageAbsente(img);
      return;
    }
    img.addEventListener("error", function () { signalerImageAbsente(img); });
  });

  /* ------------------------------------------------------------------
     10bis. Image d'ambiance optionnelle (dossier images/backgrounds/)
     Contrairement aux images ci-dessus, celles-ci sont invisibles par
     défaut : elles ne s'affichent QUE si le fichier existe réellement,
     pour ne jamais modifier le design tant qu'aucune image n'est fournie.
     ------------------------------------------------------------------ */
  document.querySelectorAll("img[data-fond-optionnel]").forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("visible");
      return;
    }
    img.addEventListener("load", function () { img.classList.add("visible"); });
  });

  /* ------------------------------------------------------------------
     11. Transition de page (fondu à la sortie des liens internes)
     Le fondu d'entrée est géré en CSS pur (fonctionne même sans JS).
     Ce bloc ne gère que le fondu de sortie, purement décoratif.
     ------------------------------------------------------------------ */
  var toileTransition = document.querySelector(".transition-page");

  if (toileTransition && !prefersReducedMotion) {
    var enTransition = false;

    document.querySelectorAll("a[href]").forEach(function (lien) {
      var cible = lien.getAttribute("href");
      if (!cible) return;
      if (cible.charAt(0) === "#") return;
      if (lien.target && lien.target !== "_self") return;
      if (lien.hasAttribute("download")) return;
      if (/^https?:\/\//i.test(cible) || cible.indexOf("//") === 0) return;
      if (cible.indexOf("mailto:") === 0 || cible.indexOf("tel:") === 0) return;
      if (lien.hasAttribute("aria-disabled")) return;

      lien.addEventListener("click", function (e) {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (enTransition) { e.preventDefault(); return; }

        e.preventDefault();
        enTransition = true;
        toileTransition.classList.add("sortie");

        // La navigation part dès que l'animation de sortie se termine ;
        // un filet de sécurité (setTimeout) garantit qu'elle a bien lieu
        // même si l'événement d'animation ne se déclenche pas (onglet en
        // arrière-plan, navigateur qui limite les timers, etc.).
        var dejaNavigue = false;
        function partir() {
          if (dejaNavigue) return;
          dejaNavigue = true;
          window.location.href = cible;
        }
        toileTransition.addEventListener("animationend", partir, { once: true });
        window.setTimeout(partir, 900);
      });
    });

    // Sécurité navigation arrière/avant (bfcache) : on réaffiche la page.
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) {
        toileTransition.classList.remove("sortie");
        enTransition = false;
      }
    });
  }

  /* ------------------------------------------------------------------
     12. Curseur personnalisé (desktop à pointeur précis uniquement)
     ------------------------------------------------------------------ */
  if (effetsInteractifsActifs) {
    var pointCurseur = document.querySelector(".curseur-point");
    var anneauCurseur = document.querySelector(".curseur-anneau");
    var heroEl = document.querySelector(".hero");

    if (pointCurseur && anneauCurseur) {
      document.documentElement.classList.add("curseur-actif");

      var dejaVisible = false;
      window.addEventListener("mousemove", function (e) {
        if (!dejaVisible) {
          dejaVisible = true;
          document.documentElement.classList.add("curseur-visible");
        }
        pointCurseur.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px) translate(-50%, -50%)";
        anneauCurseur.style.transform = "translate(" + e.clientX + "px, " + e.clientY + "px) translate(-50%, -50%)";

        if (heroEl) {
          var rect = heroEl.getBoundingClientRect();
          if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            var px = ((e.clientX - rect.left) / rect.width) * 100;
            var py = ((e.clientY - rect.top) / rect.height) * 100;
            heroEl.style.setProperty("--sx", px + "%");
            heroEl.style.setProperty("--sy", py + "%");
          }
        }
      });

      window.addEventListener("mouseout", function (e) {
        if (!e.relatedTarget && !e.toElement) {
          document.documentElement.classList.remove("curseur-visible");
        }
      });

      // Couvre les liens, boutons, cartes de livres (accueil et bibliothèque,
      // couverture comprise) et tout élément interactif standard : le
      // curseur indique alors discrètement qu'un clic est possible.
      var selecteurSurvol = "a, button, .carte-livre, .collection__item, input, textarea, [role='button'], .nav__hamburger";
      document.addEventListener("mouseover", function (e) {
        if (e.target.closest && e.target.closest(selecteurSurvol)) {
          document.documentElement.classList.add("curseur-survol");
        }
      });
      document.addEventListener("mouseout", function (e) {
        if (e.target.closest && e.target.closest(selecteurSurvol)) {
          document.documentElement.classList.remove("curseur-survol");
        }
      });

      // Très léger retour visuel au clic (resserrement bref de l'anneau).
      document.addEventListener("mousedown", function () {
        document.documentElement.classList.add("curseur-clic");
      });
      document.addEventListener("mouseup", function () {
        document.documentElement.classList.remove("curseur-clic");
      });
      window.addEventListener("blur", function () {
        document.documentElement.classList.remove("curseur-clic");
      });
    }
  }

  /* ------------------------------------------------------------------
     13. Effet de profondeur (tilt) sur les couvertures de livres
     ------------------------------------------------------------------ */
  if (effetsInteractifsActifs) {
    document.querySelectorAll(".carte-livre").forEach(function (carte) {
      var couverture = carte.querySelector(".carte-livre__couverture");
      if (!couverture) return;
      var angleMax = 7;

      carte.addEventListener("mousemove", function (e) {
        var rect = carte.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var rotY = px * angleMax * 2;
        var rotX = py * -angleMax * 2;
        couverture.style.transform =
          "perspective(900px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) translateZ(0)";
      });

      carte.addEventListener("mouseleave", function () {
        couverture.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      });
    });
  }
})();
