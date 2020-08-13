let navBar = document.querySelector("#navBar");
// destructuring assignment
const Navbar = () => {
  let navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/">MyCMS</a
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
      <a class="nav-item nav-link" href="#">Home</a>    
      <a class="nav-item nav-link" href="#">Contenu</a>
    </div>
  </div>
  </nav>`;
 

  

  return (navBar.innerHTML = navbar);
};

export default Navbar;
