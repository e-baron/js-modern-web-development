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
        } else if (y === dataColumns.length + 2) {
          const updateBtn = document.createElement("a");
          updateBtn.className = "update btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          updateBtn.textContent = "Update";
          updateBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(updateBtn);
        } else if (y === dataColumns.length + 3) {
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

/**
 * Provide an outerHtml representation (string) of a 2D array
 * @param {Array} dataArray : input data to be represented as a table : 2D array.
 * It shall contain a header.
 * @param {Array} visibleColumnHeaders : onlyDisplayRequestedColumn based on array of column headers. If undefined, display all columns.
 * @param {Array} hiddenDataAttributeKeys : add data attributes to each table row, except for the header. An index is always added as data-index.
 * If no hiddenDataAttributeKeys, don't add extra data attributes, else add all values in table row for each column corresponding to a key.
 * Format of the name for the data-attribute : data-hiddenDataAttributeKeys[i].toLowerCase() & any space is replaced by "-"
 * @param {boolean} headerRowIsHidden : ask to hide all headers
 * @returns {string} myTable.outerHtml : provides with the outerHtml of the table element
 * A data attribute data-column-name is added to each cell in order to be able to hide columns based on their headerName
 */
const getTableOuterHtmlFrom2DArray = (
  dataArray,
  visibleColumnHeaders,
  hiddenDataAttributeKeys,
  headerRowIsHidden = false
) => {
  // prepare the visibleColumnHeaders array to wear the correct name to be used as dataAttributes
  if (visibleColumnHeaders && visibleColumnHeaders.length > 0)
    visibleColumnHeaders = visibleColumnHeaders.map((columnHeader) =>
      columnHeader.toLowerCase().replace(/\s/g, "")
    );

  let columnsToAddDataAttributes;
  if (
    dataArray &&
    dataArray.length > 0 &&
    hiddenDataAttributeKeys &&
    hiddenDataAttributeKeys.length > 0
  ) {
    columnsToAddDataAttributes = hiddenDataAttributeKeys.map((columnHeader) =>
      dataArray[0].indexOf(columnHeader)
    );
  }

  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered";

  for (let x = 0; x < dataArray.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // deal with column width : add flex support
    //myLine.classList.add("d-flex");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    for (let y = 0; y < dataArray[0].length; y++) {
      if (x === 0) {
        // deal with the header
        const header = document.createElement("th");
        header.innerHTML = dataArray[0][y];
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribute
        const currentColumnName = dataArray[0][y]
          .toLowerCase()
          .replace(/\s/g, "");
        header.dataset.columnName = currentColumnName;
        // hide the header if all headers shall not be displayed
        if (headerRowIsHidden) header.classList.add("d-none");
        // hide the header if not in visibleColumnHeaders
        else if (
          visibleColumnHeaders &&
          visibleColumnHeaders.length > 0 &&
          !visibleColumnHeaders.includes(currentColumnName)
        )
          header.classList.add("d-none");

        // deal with column width
        //header.classList.add("col-3");
        //header.classList.add("text-break");
        myLine.appendChild(header);
      } else {
        // deal with hidden data
        // add the data-index attribute
        myLine.dataset.index = x - 1;
        if (
          columnsToAddDataAttributes &&
          columnsToAddDataAttributes.length > 0
        ) {
          columnsToAddDataAttributes.forEach((hiddenColumnIndex, index) => {
            const dataAttributeName = hiddenDataAttributeKeys[index]
              .toLowerCase()
              .replace(/\s/g, "");
            // find column index
            myLine.dataset[dataAttributeName] = dataArray[x][hiddenColumnIndex];
          });
        }
        // deal with regular column content
        const myCell = document.createElement("td");
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribute
        const currentColumnName = dataArray[0][y]
          .toLowerCase()
          .replace(/\s/g, "");
        myCell.dataset.columnName = currentColumnName;
        // hide the cell if not in visibleColumnHeaders
        if (
          visibleColumnHeaders &&
          visibleColumnHeaders.length > 0 &&
          !visibleColumnHeaders.includes(currentColumnName)
        )
          myCell.classList.add("d-none");
        if (Array.isArray(dataArray[x][y])) {
          myCell.innerHTML =
            "<ul class='list-group'>" +
            dataArray[x][y]
              .map(
                (subItem) =>
                  `<li class='list-group-item text-break'>${subItem}</td>`
              )
              .join("") +
            "</ul>";
        } else if (dataArray[x][y]) myCell.innerHTML = dataArray[x][y];
        else myCell.innerHTML = "";
        // deal with column width
        //myCell.classList.add("col-3");
        myLine.appendChild(myCell);
      }
    }
  }
  return myTable.outerHTML;
};

/**
 *
 * @param {string} tableSelector : CSS selector providing an access to the table to be updated
 * @param {Array} columnsToBeDeletedArray : array with columns header to be deleted
 * @return {Number} numberOfColDeleted : returns the number of columns deleted
 */
const deleteColumnsFromTable = (tableSelector, columnsToBeDeletedArray) => {
  let numberOfColDeleted = 0;
  let tableToUpdate = document.querySelector(tableSelector);
  columnsToBeDeletedArray.forEach((element) => {
    for (let col = 0; col < tableToUpdate.rows[0].cells.length; col++) {
      if (
        element.toLowerCase() ===
        tableToUpdate.rows[0].cells[col].textContent.toLowerCase()
      ) {
        // delete the whole column
        for (let row = 0; row < tableToUpdate.rows.length; row++) {
          tableToUpdate.rows[row].deleteCell(col);
        }
        ++numberOfColDeleted;
      }
    }
  });

  return numberOfColDeleted;
};

/**
 * This functions replace the text elements with hyperlinks.
 * Currently it does not try to provide links for cells that contains an Array.
 * @param {Array} dataArray : 2D array containing a column with text and another with href elements
 * @param {Number} textColumnId : column index of 2D array containing pointing to text for the hyperlinks
 * @param {Number} hrefColumnId : column index of 2D array containing pointing to href for the hyperlinks
 * @returns {Boolean} isUpdated
 */
const updateTextToHyperlink = (dataArray, textColumnId, hrefColumnId) => {
  let isUpdated = false;
  dataArray.forEach((row) => {
    // create absolute links (www.google.com is not absolute,
    // we need to add the protocol such as http://www.google.com)
    let href;
    let hyperlinkToBeCreated = false;
    if (row[hrefColumnId] && ! Array.isArray(row[hrefColumnId])) {
      if (row[hrefColumnId].match(/^(http|https)/)) {
        href = row[hrefColumnId];
        hyperlinkToBeCreated = true;
      } else if (row[hrefColumnId].match(/^(www\.)/)) {
        href = "http://" + row[hrefColumnId];
        hyperlinkToBeCreated = true;
      }

      if (hyperlinkToBeCreated) {
        row[
          textColumnId
        ] = `<a href="${href}" target="_blank">${row[textColumnId]}</a>`;
        isUpdated = true;
      }
    }
  });
  return isUpdated;
};

const genericModalOuterHtml = `<div class="modal" tabindex="-1" role="dialog" id="genericModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>  
          </div>
        </div>
      </div>
    </div>`;

// deal with closing events on the generic Modal (to be independant of JQuery)
const genericModalOnClose = () => {
  const modalCloseButtons = document.querySelectorAll(".close");
  modalCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeGenericModal();
    });
  });
};

// deal with closing events on the generic Modal (to be independant of JQuery)
const closeGenericModal = () => {
  const genericModal = document.getElementById("genericModal");
  genericModal.classList.remove("show");
  genericModal.style.display = "none";
};

const showGenericModal = () => {
  // display a modal without using JQuery
  const genericModal = document.getElementById("genericModal");
  genericModal.style.display = "block";
  genericModal.classList.add("show");
};

const updateGenericModal = (title, body) => {
  const genericModalTitle = document.querySelector(".modal-title");
  genericModalTitle.textContent = title;
  const genericModalBody = document.querySelector(".modal-body");
  genericModalBody.innerHTML = body;
};

// named export
export {
  setLayout,
  //getTableInnerHtmlFromArrayOfObjects,
  getTableOuterHtmlFrom2DArray,
  deleteColumnsFromTable,
  updateTextToHyperlink,
  //printDynamicHtmlTableWithInnerHtml,
  printDynamicHtmlTable,
  genericModalOuterHtml,
  genericModalOnClose,
  showGenericModal,
  updateGenericModal,
  closeGenericModal,
};

// named export
//export { setLayout, printDynamicHtmlTableWithInnerHtml, printDynamicHtmlTable };
