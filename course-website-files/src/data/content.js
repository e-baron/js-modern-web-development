const CODE_BASE_URL =
  "https://github.com/e-baron/js-modern-web-development/tree/master/demo/";
const SLIDES_BASE_URL = "/course-files/slides/";

const COURSE_CONTENT = [
  {
    contentType: "presentation",
    subject: "Informations générales",
    week: 1,
    courseFiles: [
      {
        name: "JS-Node-InfosGénérales",
        url: SLIDES_BASE_URL + "JS-Node-InfosGénérales.pdf",
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
        name: "JS-Node-Contexte",
        url: SLIDES_BASE_URL + "JS-Node-Contexte.pdf",
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
        name: "JS-Node-IntroLangageJS",
        url: SLIDES_BASE_URL + "JS-Node-IntroLangageJS.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Introduction à Git",
    week: 1,
    courseFiles: [
      {
        name: "JS-Node-Git",
        url: SLIDES_BASE_URL + "JS-Node-Git.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Le DOM et la gestion d’événements",
    week: 2,
    courseFiles: [
      {
        name: "JS-Node-DOM-Events",
        url: SLIDES_BASE_URL + "JS-Node-DOM-Events.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Bootstrap, génération dynamique d’HTML et gestion d’événements",
    week: 2,
    courseFiles: [
      {
        name: "JS-Node-Bootstrap-HtmlDynamique-Events",
        url: SLIDES_BASE_URL + "JS-Node-Bootstrap-HtmlDynamique-Events.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Les contraintes de validation",
    week: 2,
    courseFiles: [
      {
        name: "JS-Node-ContraintesDeValidation",
        url: SLIDES_BASE_URL + "JS-Node-ContraintesDeValidation.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Debugging d’une application côté client",
    week: 2,
    courseFiles: [
      {
        name: "JS-Node-Debugging-Frontend",
        url: SLIDES_BASE_URL + "JS-Node-Debugging-Frontend.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
  },
  {
    contentType: "presentation",
    subject: "Animations via l’API Canvas",
    week: 3,
    courseFiles: [
      {
        name: "JS-Node-Canvas",
        url: SLIDES_BASE_URL + "JS-Node-Canvas.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Animations via une librairie externe",
    week: 3,
    courseFiles: [
      {
        name: "JS-Node-Animation-ExtLibrary",
        url: SLIDES_BASE_URL + "JS-Node-Animation-ExtLibrary.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "JQuery",
    week: 4,
    courseFiles: [
      {
        name: "JS-Node-JQuery",
        url: SLIDES_BASE_URL + "JS-Node-JQuery.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Les modules côté client",
    week: 4,
    courseFiles: [
      {
        name: "JS-Node-Modules",
        url: SLIDES_BASE_URL + "JS-Node-Modules.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "L’orienté objet en JS",
    week: 4,
    courseFiles: [
      {
        name: "JS-Node-OrientéObjet",
        url: SLIDES_BASE_URL + "JS-Node-OrientéObjet.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Communications client / serveur",
    week: 5,
    courseFiles: [
      {
        name: "JS-Node-CommsClientServeur",
        url: SLIDES_BASE_URL + "JS-Node-CommsClientServeur.pdf",
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
        name: "JS-Node-Node-Modules-Packages",
        url: SLIDES_BASE_URL + "JS-Node-Node-Modules-Packages.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },
  {
    contentType: "presentation",
    subject: "Debugging d’une application Node.js",
    week: 5,
    courseFiles: [
      {
        name: "JS-Node-Debugging-Node",
        url: SLIDES_BASE_URL + "JS-Node-Debugging-Node.pdf",
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
        name: "JS-Node-MPA-Express",
        url: SLIDES_BASE_URL + "JS-Node-MPA-Express.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Les sessions côté serveur et MVC via Express",
    week: 6,
    courseFiles: [
      {
        name: "Node-SessionServeur-MVC",
        url: SLIDES_BASE_URL + "Node-SessionServeur-MVC.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "JSON",
    week: 7,
    courseFiles: [
      {
        name: "JS-Node-JSON",
        url: SLIDES_BASE_URL + "JS-Node-JSON.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "SPA monolithique & routage des composants",
    week: 7,
    courseFiles: [
      {
        name: "JS-Node-SPA-RoutingComposants",
        url: SLIDES_BASE_URL + "JS-Node-SPA-RoutingComposants.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "RESTful API",
    week: 7,
    courseFiles: [
      {
        name: "JS-Node-RESTfulAPI",
        url: SLIDES_BASE_URL + "JS-Node-RESTfulAPI.pdf",
      },
    ],
    courseVideos: [],
    courseDemos: [],
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "SPA monolithique, communications AJAX avec RESTful API",
    week: 7,
    courseFiles: [
      {
        name: "JS-Node-SPA-AJAX-API",
        url: SLIDES_BASE_URL + "JS-Node-SPA-AJAX-API.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Promesses",
    week: 7,
    courseFiles: [
      {
        name: "JS-Node-Promesses",
        url: SLIDES_BASE_URL + "JS-Node-Promesses.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Gestion de session côté client",
    week: 8,
    courseFiles: [
      {
        name: "JS-Node-SessionClient",
        url: SLIDES_BASE_URL + "JS-Node-SessionClient.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

  {
    contentType: "presentation",
    subject: "Hachage d’information",
    week: 8,
    courseFiles: [
      {
        name: "JS-Node-HachageInfo",
        url: SLIDES_BASE_URL + "JS-Node-HachageInfo.pdf",
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
    exerciceInstructions: [],
    exerciceSolutions: [],
  },

];

export default COURSE_CONTENT;
