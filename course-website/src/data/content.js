//const CODE_BASE_URL =  "https://github.com/e-baron/js-modern-web-development/tree/master/demo/";
const CODE_BASE_URL =
  "https://gitlab.vinci.be/web2/js-modern-web-development/-/tree/master/demo/";
const SLIDES_BASE_URL = "/course-files/slides/";
const OTHERS_BASE_URL = "/course-files/others/";
const INSTRUCTIONS_BASE_URL = "/course-files/instructions/";

const COURSE_CONTENT = [
  {
    contentType: "presentation",
    subject: "Informations générales à destination des participants",
    week: 1,
    courseFiles: [
      {
        name: "01-JS-Node-InfosGénérales-EtudiantsVinciOnly",
        url:
          SLIDES_BASE_URL + "01-JS-Node-InfosGénérales-EtudiantsVinciOnly.pdf",
      },
      {
        name: "01-JS-Node-InfosGénérales-ParticipantsExternesOnly",
        url:
          SLIDES_BASE_URL +
          "01-JS-Node-InfosGénérales-ParticipantsExternesOnly.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Contexte d’utilisation de JS",
    week: 1,
    courseFiles: [
      {
        name: "02-JS-Node-Contexte",
        url: SLIDES_BASE_URL + "02-JS-Node-Contexte.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Introduction au langage JS côté client",
    week: 1,
    courseFiles: [
      {
        name: "03-JS-Node-IntroLangageJS",
        url: SLIDES_BASE_URL + "03-JS-Node-IntroLangageJS.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "JS interne dans une fonction",
        url: CODE_BASE_URL + "js-location/internal-function",
      },
      {
        contentType: "code",
        name: "JS dans la balise script",
        url: CODE_BASE_URL + "js-location/internal-script",
      },
      {
        contentType: "code",
        name: "JS dans un script externe",
        url: CODE_BASE_URL + "js-location/external-script",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 01 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche01.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Introduction à Git",
    week: 1,
    courseFiles: [
      {
        name: "04-JS-Node-Git",
        url: SLIDES_BASE_URL + "04-JS-Node-Git.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [
      {
        name: "Fiche 01 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche01.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Le DOM et la gestion d’événements",
    week: 2,
    courseFiles: [
      {
        name: "05-JS-Node-DOM-Events",
        url: SLIDES_BASE_URL + "05-JS-Node-DOM-Events.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Gestion d’un clic et du DOM",
        url: CODE_BASE_URL + "dom-event/click-button",
      },
      {
        contentType: "code",
        name: "Gestion de mouseover et du DOM",
        url: CODE_BASE_URL + "dom-event/mouse-over-div",
      },
      {
        contentType: "code",
        name: "Création d’une callback",
        url: CODE_BASE_URL + "dom-event/callback",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 02 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche02.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Bootstrap, génération dynamique d’HTML et gestion d’événements",
    week: 2,
    courseFiles: [
      {
        name: "06-JS-Node-Bootstrap-HtmlDynamique-Events",
        url: SLIDES_BASE_URL + "06-JS-Node-Bootstrap-HtmlDynamique-Events.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Validation d’un formulaire côté client suite à un submit",
        url: CODE_BASE_URL + "dom-event/submit-form",
      },
      {
        contentType: "code",
        name: "Génération dynamique d’HTML",
        url: CODE_BASE_URL + "dom-event/dynamic-html",
      },
      {
        contentType: "code",
        name: "Création d’une callback",
        url: CODE_BASE_URL + "dom-event/callback",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 02 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche02.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Les contraintes de validation",
    week: 2,
    courseFiles: [
      {
        name: "07-JS-Node-ContraintesDeValidation",
        url: SLIDES_BASE_URL + "07-JS-Node-ContraintesDeValidation.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name:
          "Validation d’un formulaire via les contraintes de validation (html5)",
        url: CODE_BASE_URL + "validation-constraints",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 02 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche02.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Debugging d’une application côté client",
    week: 2,
    courseFiles: [
      {
        name: "08-JS-Node-Debugging-Frontend",
        url: SLIDES_BASE_URL + "08-JS-Node-Debugging-Frontend.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Animations via l’API Canvas",
    week: 3,
    courseFiles: [
      {
        name: "09-JS-Node-Canvas",
        url: SLIDES_BASE_URL + "09-JS-Node-Canvas.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Design d’une animation avec l’API Canvas",
        url: CODE_BASE_URL + "canvas",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 03 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche03.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Animations via une librairie externe",
    week: 3,
    courseFiles: [
      {
        name: "10-JS-Node-Animation-ExtLibrary",
        url: SLIDES_BASE_URL + "10-JS-Node-Animation-ExtLibrary.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Design d’une animation avec Anime.js",
        url: CODE_BASE_URL + "animejs",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 03 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche03.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "JQuery",
    week: 4,
    courseFiles: [
      {
        name: "11-JS-Node-JQuery",
        url: SLIDES_BASE_URL + "11-JS-Node-JQuery.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "JQuery et la génération dynamique d’HTML",
        url: CODE_BASE_URL + "jquery",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 04 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche04.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "L’orienté objet en JS",
    week: 4,
    courseFiles: [
      {
        name: "12-JS-Node-OrientéObjet",
        url: SLIDES_BASE_URL + "12-JS-Node-OrientéObjet.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Programmation orienté objet en JS",
        url: CODE_BASE_URL + "object-oriented",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 04 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche04.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Les modules côté client",
    week: 4,
    courseFiles: [
      {
        name: "13-JS-Node-Modules",
        url: SLIDES_BASE_URL + "13-JS-Node-Modules.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Les modules ES6",
        url: CODE_BASE_URL + "modules",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 04 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche04.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Communications client / serveur",
    week: 5,
    courseFiles: [
      {
        name: "14-JS-Node-CommsClientServeur",
        url: SLIDES_BASE_URL + "14-JS-Node-CommsClientServeur.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Node.js, les modules côté serveur & les packages",
    week: 5,
    courseFiles: [
      {
        name: "15-JS-Node-Node-Modules-Packages",
        url: SLIDES_BASE_URL + "15-JS-Node-Node-Modules-Packages.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Appel d’une méthode au sein d’un script externe via Node",
        url: CODE_BASE_URL + "node/start",
      },
      {
        contentType: "code",
        name: "Serveur web minimaliste avec Node.js",
        url: CODE_BASE_URL + "node/web-server",
      },
      {
        contentType: "code",
        name:
          "Serveur web minimaliste avec Node.js, des modules et des packages",
        url: CODE_BASE_URL + "node/node-modules",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 05 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche05.pdf",
      },
    ],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Debugging d’une application Node.js",
    week: 5,
    courseFiles: [
      {
        name: "16-JS-Node-Debugging-Node",
        url: SLIDES_BASE_URL + "16-JS-Node-Debugging-Node.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "MPA & Framework Express",
    week: 6,
    courseFiles: [
      {
        name: "17-JS-Node-MPA-Express",
        url: SLIDES_BASE_URL + "17-JS-Node-MPA-Express.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Serveur web sous Express (hbs)",
        url: CODE_BASE_URL + "mpa-express/more-than-hello-world-hbs",
      },
      {
        contentType: "code",
        name: "Serveur web sous Express (pug)",
        url: CODE_BASE_URL + "mpa-express/more-than-hello-world",
      },
      {
        contentType: "code",
        name: "MPA avec un formulaire d'enregistrement d'utilisateurs (hbs)",
        url: CODE_BASE_URL + "mpa-express/user-registration-hbs",
      },
      {
        contentType: "code",
        name: "MPA avec un formulaire d'enregistrement d'utilisateurs (pug)",
        url: CODE_BASE_URL + "mpa-express/user-registration",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 06 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche06.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Les sessions côté serveur et MVC via Express",
    week: 6,
    courseFiles: [
      {
        name: "18-JS-Node-SessionServeur-MVC",
        url: SLIDES_BASE_URL + "18-JS-Node-SessionServeur-MVC.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Gestion de session via express-session & MVC (hbs)",
        url: CODE_BASE_URL + "mpa-express/user-session-hbs",
      },
      {
        contentType: "code",
        name: "Gestion de session via express-session & MVC (pug)",
        url: CODE_BASE_URL + "mpa-express/user-session",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 06 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche06.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "JSON",
    week: 7,
    courseFiles: [
      {
        name: "19-JS-Node-JSON",
        url: SLIDES_BASE_URL + "19-JS-Node-JSON.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "MPA & modèle persistant via un fichier JSON (hbs)",
        url: CODE_BASE_URL + "json/json-record-hbs",
      },
      {
        contentType: "code",
        name: "MPA & modèle persistant via un fichier JSON (pug)",
        url: CODE_BASE_URL + "json/json-record",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 07 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche07.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "SPA monolithique & routage des composants",
    week: 7,
    courseFiles: [
      {
        name: "20-JS-Node-SPA-RoutingComposants",
        url: SLIDES_BASE_URL + "20-JS-Node-SPA-RoutingComposants.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Routage des composants d’une SPA",
        url: CODE_BASE_URL + "spa/spa-routing",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 07 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche07.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "RESTful API",
    week: 7,
    courseFiles: [
      {
        name: "21-JS-Node-RESTfulAPI",
        url: SLIDES_BASE_URL + "21-JS-Node-RESTfulAPI.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [
      {
        name: "Fiche 07 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche07.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "SPA monolithique, communications AJAX avec RESTful API",
    week: 7,
    courseFiles: [
      {
        name: "22-JS-Node-SPA-AJAX-API",
        url: SLIDES_BASE_URL + "22-JS-Node-SPA-AJAX-API.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "SPA monolithique & communications AJAX",
        url: CODE_BASE_URL + "spa/spa-monolith",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 07 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche07.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Promesses",
    week: 7,
    courseFiles: [
      {
        name: "23-JS-Node-Promesses",
        url: SLIDES_BASE_URL + "23-JS-Node-Promesses.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Création et utilisation d’une promesse",
        url: CODE_BASE_URL + "promises",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 07 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche07.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Gestion de session côté client",
    week: 8,
    courseFiles: [
      {
        name: "24-JS-Node-SessionClient",
        url: SLIDES_BASE_URL + "24-JS-Node-SessionClient.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "SPA monolithique avec session côté client via des cookies",
        url: CODE_BASE_URL + "client-session/session-cookie",
      },
      {
        contentType: "code",
        name: "SPA monolithique avec session côté client via le localStorage",
        url: CODE_BASE_URL + "client-session/session-storage",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Hachage d’information",
    week: 8,
    courseFiles: [
      {
        name: "25-JS-Node-HachageInfo",
        url: SLIDES_BASE_URL + "25-JS-Node-HachageInfo.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "Hachage des passwords au sein du backend",
        url: CODE_BASE_URL + "hashing",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject:
      "Authentification sécurisée et autorisation d’un utilisateur via JWT",
    week: 8,
    courseFiles: [
      {
        name: "26-JS-Node-JWT-auths",
        url: SLIDES_BASE_URL + "26-JS-Node-JWT-auths.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name:
          "SPA monolithique avec JWT auths (authentication & authorization)",
        url: CODE_BASE_URL + "jwt",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "SPA avec backend indépendant du frontend",
    week: 8,
    courseFiles: [
      {
        name: "27-JS-Node-SPABackendIndependant",
        url: SLIDES_BASE_URL + "27-JS-Node-SPABackendIndependant.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "SPA avec frontend indépendant du backend : problème de CORS",
        url: CODE_BASE_URL + "spa/backend-frontend-basic-issue",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Gestion de la sécurité du browser",
    week: 8,
    courseFiles: [
      {
        name: "28-JS-Node-JS-Node-Sécurité",
        url: SLIDES_BASE_URL + "28-JS-Node-Sécurité.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name: "SPA avec frontend indépendant du backend : gestion de CORS",
        url: CODE_BASE_URL + "spa/backend-frontend-basic-cors",
      },
      {
        contentType: "code",
        name: "SPA avec frontend indépendant du backend : gestion de proxy ",
        url: CODE_BASE_URL + "spa/backend-frontend-basic-proxy",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Module bundler",
    week: 8,
    courseFiles: [
      {
        name: "29-JS-Node-Bundler",
        url: SLIDES_BASE_URL + "29-JS-Node-Bundler.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [
      {
        contentType: "code",
        name:
          "Problème lors de l’utilisation d’un package dans le browser via require",
        url: CODE_BASE_URL + "bundler/frontend-package-issue",
      },
      {
        contentType: "code",
        name: "Utilisation d’un package bundler (webpack)",
        url: CODE_BASE_URL + "bundler/frontend-package-bundler",
      },
    ],
    exerciceInstructions: [
      {
        name: "Fiche 08 d'exercices",
        url: INSTRUCTIONS_BASE_URL + "fiche08.pdf",
      },
    ],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Déploiement d’applications web",
    week: 8,
    courseFiles: [
      {
        name: "30-JS-Node-Déploiement",
        url: SLIDES_BASE_URL + "30-JS-Node-Déploiement.pdf",
      },
      {
        name: "30-JS-Node-ProcédureDéploiementHeroku",
        url: OTHERS_BASE_URL + "30-JS-Node-ProcédureDéploiementHeroku.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "support",
    subject: "Bibliographie",
    courseFiles: [
      {
        name: "JS-Node-Bibliographie",
        url: OTHERS_BASE_URL + "JS-Node-Bibliographie.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
];

export default COURSE_CONTENT;
