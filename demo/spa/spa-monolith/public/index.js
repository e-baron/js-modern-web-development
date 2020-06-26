import { setLayout } from "./utils/render.js";
const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : Monolith SPA";
const FOOTER_TEXT = "Happy learning : )";
import HomePage from "./Components/HomePage.js";
import UserListPage from "./Components/UserListPage.js";
import LoginPage from "./Components/LoginPage.js";
import RegisterPage from "./Components/RegisterPage.js";
import LogoutComponent from "./Components/LogoutComponent.js";

// dictionnary of routes
const routes = {
  "/": HomePage,
  "/list": UserListPage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/logout": LogoutComponent,
};

let root = document.querySelector("#root");
let navBar = document.querySelector("#navBar");

/* root to HomePage when the page is loaded for the first time */
root.innerHTML = routes["/"];

/* manage click on the navBar*/
const onNavigate = (e) => {
  let uri;
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.text === "Home") {
      uri = "/";
    } else {
      uri = "/" + e.target.text.toLowerCase();
    }
  }
  if (uri) {
    console.log(
      "onNavigate() uri:",
      uri,
      " location:",
      window.location.pathname,
      " origin :",
      window.location.origin
    );
    // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
    window.history.pushState({}, uri, window.location.origin + uri);
    // render the requested component
    // for the components that include JS, we want to assure that the JS included is not runned when the JS file is charged by the browser
    // therefore, those components have to be either a function or a class
    let componentToRender = routes[uri];
    console.log(typeof componentToRender );
    if (routes[uri]) {
      if (typeof componentToRender === "function")
        // this is just a convention to render what the function component return (aka React)
        root.innerHTML = componentToRender();
      else if (typeof componentToRender === "object")
        // this is just a convention to call the render() method (aka React)
        root.innerHTML = componentToRender.render();
      else if (typeof componentToRender === "string")
        // note that a "html string component" should not include scripting, else it is run when the Component file is loaded by the browser
        // see the listUserComponent to understand that it should not be done : the alert("UserListComponent is loaded.") is runned when the component shall not be rendered
        root.innerHTML = componentToRender;
    } else root.innerHTML = "The " + uri + " ressource does not exist";
  }
};

navBar.addEventListener("click", onNavigate);

// Display the right component when the user use the browsing history
window.addEventListener("popstate", () => {
  root.innerHTML = routes[window.location.pathname];
});

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);
