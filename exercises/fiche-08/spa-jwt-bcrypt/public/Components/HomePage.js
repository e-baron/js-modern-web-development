import { setLayout } from "../utils/render.js";
let homePage = `<p>Welcome to MyCMS...</p>
`;
let page = document.querySelector("#page");
let timer;

const HomePage = async () => {
  setLayout("Home");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
};

export default HomePage;