// webpack asset management to load a picture
import Icon from "../images/logo_vinci.png";
import { getUserName } from "../utils/auths/authPopup";
let navBar = document.querySelector("#navBar");

// destructuring assignment
const Navbar = () => {
  let navbar;

  if (!getUserName()) {
    // unauthenticated user
    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/">myJScourse</a
  ><button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">      
      <a class="nav-item nav-link" href="#" data-uri="/contenu">Contenu</a>
      <a class="nav-item nav-link" href="#" data-uri="/about">About</a>
      <a class="nav-item nav-link" href="#" data-uri="/login"><img src="${Icon}" alt="" width="24" height="24">Login</a>
    </div>
  </div>
  </nav>`;
  }
  else{
    // authenticated user
    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/">myJScourse</a
  ><button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">      
      <a class="nav-item nav-link" href="#" data-uri="/contenu">Contenu</a>
      <a class="nav-item nav-link" href="#" data-uri="/about">About</a>
      <a class="nav-item nav-link" href="#" data-uri="/projects">Projets</a>
      <a class="nav-item nav-link" href="#" data-uri="/logout">Logout</a>
    </div>
  </div>
  </nav>`;

  }

  return (navBar.innerHTML = navbar);
};

export default Navbar;
