// import { setLayout } from "./utils/render.js";
import Navbar from "./Navbar.js";
import {PageRouter} from "./Router.js";
import HomePage from "./HomePage.js";

const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : Monolith SPA";
const FOOTER_TEXT = "Happy learning : )";

let pageLayout = `<div class="container-fluid h-100 d-flex flex-column">
<!-- Header row : dark background, white text -->
<div class="row bg-dark py-2">
  <div class="col">
    <header class="text-center text-white font-weight-bold">
      <h4 id="headerTitle">${HEADER_TITLE}</h4>
    </header>
  </div>
</div>

<!-- Page content row. 
  flex-grow-1: Fill available space 
  mb-5 : to ensure that we see all of the content of the page row -->
<div class="row flex-grow-1 mb-5">
  <div class="d-none d-md-block col-md bg-dark"></div>
  <div class="col col-md-10 mt-2">

    <div data-component-name="NavBar"></div>  

    <h4 id="pageTitle">${PAGE_TITLE}</h4>

    <div data-component-name="HomePage"></div>  

  </div>
  <div class="d-none d-md-block col-md bg-dark"></div>
</div>
<!-- Footer row -->
<div class="row bg-dark fixed-bottom">
  <div class="col">
    <footer class="py-2 text-center text-white font-weight-bold">
      <h5 id="footerText">${FOOTER_TEXT}</h5>
    </footer>
  </div>
</div>
</div>`;



const PageLayout = () => {
    /* Render this element with containers for children elements */
    let element = document.querySelector("data-component-name='PageLayout'");
    element.innerHTML = pageLayout;  
    /* Render the children elements */
    Navbar();
    HomePage();

};

export default PageLayout;