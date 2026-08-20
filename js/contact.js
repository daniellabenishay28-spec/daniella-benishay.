/* ==========================================================================
   Daniella Benishay — Site officiel d'autrice
   js/contact.js — Coordonnées et réseaux sociaux (fichier centralisé, à
   éditer soi-même)

   C'EST ICI QUE VOUS MODIFIEZ VOS COORDONNÉES. Aucune autre modification de
   code n'est nécessaire : la page Contact (contact.html) lit ce fichier et
   affiche automatiquement ce qui est rempli ci-dessous — rien de plus,
   rien de moins.

   email
     Votre adresse email de contact. Elle s'affiche dans la section
     "Écrire directement", sous forme de lien cliquable ("mailto:"). Pour
     la changer (par exemple pour une adresse professionnelle liée à un
     futur nom de domaine), il suffit de remplacer le texte ci-dessous —
     un seul endroit à modifier, jamais besoin de toucher au HTML.
     Laissez "" pour masquer complètement cette ligne.

   socials
     Liste des réseaux à afficher dans "Me suivre ailleurs", EN PLUS de
     Wattpad (qui reste toujours affiché séparément, avec le lien de
     profil déjà configuré sur le site). Chaque réseau est un bloc avec
     trois informations :
       label   nom du réseau affiché (ex. "Instagram", "TikTok", "Goodreads").
       handle  texte du lien tel qu'il apparaît sur le site (ex. "@monpseudo").
       url     lien complet vers le profil.

     Pour ajouter un réseau (par exemple Goodreads dès que vous aurez un
     compte), copiez un bloc ci-dessous et remplissez vos informations —
     il apparaîtra automatiquement sur la page Contact, dans le même
     style que les autres. Pour retirer un réseau, supprimez simplement
     son bloc (ou laissez son "url" à "" : il restera masqué).
   ========================================================================== */

const contact = {
  email: "daniellabenishay28@gmail.com",

  socials: [
    {
      label: "Instagram",
      handle: "@benishay_dan16",
      url: "https://www.instagram.com/benishay_dan16?igsi=N3d2dDQzdzlkeW04"
    },
    {
      label: "TikTok",
      handle: "@deliab016",
      url: "https://www.tiktok.com/@deliab016?_r=1&_t=ZS-991gk4I8vQ5"
    }

    // Exemple pour ajouter Goodreads plus tard (retirez les "//" au début
    // des lignes ci-dessous, remplissez le lien, et gardez la virgule
    // après le bloc TikTok ci-dessus) :
    //
    // ,{
    //   label: "Goodreads",
    //   handle: "@monpseudo",
    //   url: "https://www.goodreads.com/monpseudo"
    // }
  ]
};

/* Ne pas modifier ce qui suit : cela rend l'objet "contact" disponible
   pour js/script.js, qui s'occupe de l'affichage sur contact.html. */
window.DBContact = contact;
