import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import {removeSessionData} from "../utils/session.js";

const Logout = () => {
  removeSessionData();
  // re-render the navbar for a non-authenticated user
  Navbar();
  RedirectUrl("/login");
  /*fetch("/api/users/logout")
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return onUserLogout();
    })
    .catch((err) => onError(err));*/
};

/*
const onUserLogout = () => {
  console.log("onUserLogout");
  // re-render the navbar for a non-authenticated user
  Navbar();
  RedirectUrl("/login");
};

const onError = (err) => {
  let errorMessage = "";
  if (err.message) errorMessage = err.message;
  else errorMessage = "It seems we could not log you out.";
  RedirectUrl("/error", errorMessage);
};*/
export default Logout;
