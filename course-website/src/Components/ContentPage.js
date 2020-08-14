import { RedirectUrl } from "./Router.js";
import COURSE_CONTENT from "../data/content.js";

let page = document.querySelector("#page");

const ContentPage = () => {
  let contentPage = `<h5>Contenu du cours</h5>`;
  contentPage += getBootstrapTableFromJSON(COURSE_CONTENT);
  page.innerHTML = contentPage;
};

const getBootstrapTableFromJSON = (data) => {
  if (!data || data.length === 0) return "";
  // deal with table definition
  let content = `<div class="table-responsive"><table class="table">`;
  // deal with table header
  content += `<thead>
  <tr>
  <th scope="col">Partie</th>`;
  // Object.keys creates an array that contains the properties of an object
  const headers = Object.keys(data[0]);
  content += headers
    .map((header) => {
      switch (header) {
        case "contentType":
        case "exerciceSolutions":
        case "week":
          return "";
        case "subject":
          return `<th scope="col">Sujet</th>`;
        case "courseFiles":
          return `<th scope="col">Documentation de présentation</th>`;
        case "courseVideos":
          return `<th scope="col">Vidéos de présentation</th>`;
        case "courseDemos":
          return `<th scope="col">Code de démonstration</th>`;
        case "exerciceInstructions":
          return `<th scope="col">Enoncé d'exercice</th>`;
        default:
          return `<th scope="col">${header}</th>`;
      }
    })
    .join("");
  content += `</tr>
</thead>`;

  // deal with table body
  // deal with header
  content += `<tbody>`;
  let rowIndex = 0;
  // loop throug all data items to create rows
  content += data
    .map((contentItem) => {
      let tableRow = `<tr>`;
      // Add an id to each row based on the index of the data item. Here the id is specific to the "Partie" column
      ++rowIndex;
      tableRow += `<td>${rowIndex}</td>`;
      // Object.entries creates an array of arrays. Each inner array has two item. The first item is the property; the second item is the value.
      const keysAndValuesArray = Object.entries(contentItem);
      tableRow += keysAndValuesArray
        .map((keyValue) => {
          if (
            keyValue[0] == "contentType" ||
            keyValue[0] == "exerciceSolutions" ||
            keyValue[0] == "week"
          ){
            //console.log("Column to be discarded:", keyValue[0], keyValue[1]);
            return "";
          }
          // if there is no value
          if (!keyValue[1]) {
           //console.log("No Value:", keyValue[0], keyValue[1]);
            return "<td></td>";
          }
          // if there is an array
          if (Array.isArray(keyValue[1])) {
            // loop through the array of objects
            if (keyValue[1].length === 0) {
              //console.log("Empty Array:", keyValue[0], keyValue[1]);
              return "<td></td>"};
            let tableCell = `<td><ul class="list-group">`;
            tableCell += keyValue[1]
              .map((item) => {
                // deal with specific treatments
                // if there is an URL property and a name property, create a link
                if (item["url"])
                  return `<a href="${item["url"]}" target="_blank" class="list-group-item">${item["name"]}</a>`;
                else return `<li class="list-group-item">${item["name"]}</li>`;
                // this should never be called
                return `<li>${JSON.stringify(item)}</li>`;
              })
              .join("");
            tableCell += `</ul></td>`;
            return tableCell;
          }
          // if it is a primitive
          if (
            typeof keyValue[1] === "string" ||
            typeof keyValue[1] === "number"
          ) {
            //console.log("Primitive value:", keyValue[0], keyValue[1]);
            return `<td>${keyValue[1]}</td>`;
          }

          // this is an object (but not an array)
          // there are currently no such properties
          return `<td>${JSON.stringify(keyValue[1])}</td>`;
        })
        .join("");
      tableRow += `</tr>`;
      return tableRow;
    })
    .join("");

  content += `</tbody>`;

  content += `
  </table>
</div>`;
  return content;
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
