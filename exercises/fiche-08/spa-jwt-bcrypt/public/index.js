import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js";
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";

const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : Monolith SPA with JWT auths";
const FOOTER_TEXT = "Happy learning : )";

Navbar();

Router();

setLayout(undefined, HEADER_TITLE, FOOTER_TEXT);
