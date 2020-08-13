import { RedirectUrl } from "./Router.js";

let page = document.querySelector("#page");



const ContentPage = () => {
  let contentPage = `<h5>Contenu du cours</h5>
  <a href="https://hevinci-my.sharepoint.com/:p:/g/personal/raphael_baroni_vinci_be/ERYvbeIxK39Mr2IFXqS_HPoB9NKvapBJgllWo5Nu6v83bA?e=w09Gc7" class="" target="_blank">Presentation Partie 1</a>
  
 
  `;
  page.innerHTML = contentPage;
};

const getBootstrapTableFromJSON = (data) => {
  let content = `
<ul class="list-group list-group-horizontal-lg">`;
  let userList = document.querySelector("ul");
  // Neat way to loop through all data in the array, create a new array of string elements (HTML li tags)
  // with map(), and create one string from the resulting array with join(''). '' means that the separator is a void string.
  userListPage += data
    .map((user) => `<li class="list-group-item">${user.username}</li>`)
    .join("");
  userListPage += "</ul>";
  return userListPage;
};

const onError = (err) => {
  console.error("UserListPage::onError:", err);
  let errorMessage;
  if (err.message) {
    errorMessage = err.message;
  } else errorMessage = err;
  if (errorMessage.includes("jwt expired"))
    errorMessage += "<br> Please logout first, then login.";
  RedirectUrl("/error", errorMessage);
};

export default ContentPage;
