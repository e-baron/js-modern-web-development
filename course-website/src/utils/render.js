/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerTitle} headerTitle
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 */

let backToTopButton;

function setLayout(headerTitle, pageTitle, footerText) {
  document.querySelector("#headerTitle").innerText = headerTitle;
  document.querySelector("title").innerText = pageTitle;
  document.querySelector("#pageTitle").innerText = pageTitle;
  document.querySelector("#footerText").innerText = footerText;
  // deal with the back to the top button
  backToTopButton = document.getElementById("backToTopButton");
  backToTopButton.addEventListener("click", onClick);
  window.addEventListener("scroll", onScroll);
}

// deal with the back to the top button. Inspired from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
const onScroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
const onClick = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const printDynamicHtmlTableWithInnerHtml = (headerRow, arrayToDisplay) => {
  // Neat way to loop through all data in the array, create a new array of string elements (HTML tr/td tags)
  // with map(), and create one string from the resulting array with join(''). '' means that the separator is a void string.
  let linesHtml = arrayToDisplay
    .map(
      (line) =>
        `<tr>${Object.keys(line)
          .map((key) => `<td>${line[key]}</td>`)
          .join("")}</tr>`
    )
    .join("");
  const tableHtml = `<div class="table-responsive">
          <table class="table table-bordered text-nowrap">
          <thead>
            ${headerRow}    
          </thead>
          <tbody>
            ${linesHtml}
          </tbody>
                    </table>
                    </div>`;
  return tableHtml;
};

const printDynamicHtmlTable = (containerId, headerArray, arrayToDisplay) => {
  // access to the div container where we want to create a dynamic html table
  const divContainer = document.getElementById(containerId);
  // Clear any table from the div_container
  divContainer.innerHTML = "";
  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered text-nowrap";

  console.log("array", arrayToDisplay);

  const dataColumns = Object.keys(arrayToDisplay[0]);

  // Deal with the header line
  const myHeaders = document.createElement("tr");
  myTable.appendChild(myHeaders);
  for (let index = 0; index < headerArray.length; index++) {
    const header = document.createElement("th");
    header.textContent = headerArray[index];
    myHeaders.appendChild(header);
  }

  for (let x = 0; x < arrayToDisplay.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    for (let y = 0; y < headerArray.length; y++) {
      const myCell = document.createElement("td");
      if (y < dataColumns.length) {
        if (Array.isArray(arrayToDisplay[x][dataColumns[y]])) {
          console.log("column ", y);
          myCell.innerHTML =
            "<ul class='list-group'>" +
            arrayToDisplay[x][dataColumns[y]]
              .map((subItem) => `<li class='list-group-item'>${subItem}</td>`)
              .join("") +
            "</ul>";
        } else myCell.textContent = arrayToDisplay[x][dataColumns[y]];
      } else {
        // add buttons
        if (y === dataColumns.length) {
          const joinBtn = document.createElement("a");
          joinBtn.className = "join btn btn-dark";
          //joinBtn.addEventListener("click", onJoinClick);
          joinBtn.textContent = "Join";
          joinBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(joinBtn);
        } else if (y === dataColumns.length + 1) {
          const quitBtn = document.createElement("a");
          quitBtn.className = "quit btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          quitBtn.textContent = "Quit";
          quitBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(quitBtn);
        }
        else if (y === dataColumns.length + 2) {
          const updateBtn = document.createElement("a");
          updateBtn.className = "update btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          updateBtn.textContent = "Update";
          updateBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(updateBtn);
        }
        else if (y === dataColumns.length + 3) {
          const deleteBtn = document.createElement("a");
          deleteBtn.className = "delete btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          deleteBtn.textContent = "Delete";
          deleteBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(deleteBtn);
        }
      }
      //myCell.textContent = "test";
      myLine.appendChild(myCell);
    }
  }
  // append the new empty table element to the div container
  divContainer.appendChild(myTable);
};

// named export
export { setLayout, printDynamicHtmlTableWithInnerHtml, printDynamicHtmlTable };
