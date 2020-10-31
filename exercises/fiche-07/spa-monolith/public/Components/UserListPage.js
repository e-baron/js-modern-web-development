import { RedirectUrl } from "./Router.js";
import { setLayout } from "../utils/render.js";


let page = document.querySelector("#page");

const UserListPage = () => {
  setLayout("List of users");
  
  fetch("/api/users")
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onUserList(data))
    .catch((err) => onError(err));
};

const onUserList = (data) => {
  console.log("onUserList");
  let userListPage = `<h5>List of MyCMS users</h5>
<ul class="list-group list-group-horizontal-lg">`;
  let userList = document.querySelector("ul");
  // Neat way to loop through all data in the array, create a new array of string elements (HTML li tags)
  // with map(), and create one string from the resulting array with join(''). '' means that the separator is a void string.
  userListPage += data
    .map((user) => `<li class="list-group-item">${user.username}</li>`)
    .join("");
  userListPage += "</ul>";
  return (page.innerHTML = userListPage);
};

const onError = (err) => {
  console.error("UserListPage::onError:", err);
  let errorMessage = "Error";
  if (err.message) {
    if (err.message.includes("401"))
      errorMessage =
        "Unauthorized access to this ressource : you must first login.";
    else errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default UserListPage;

