import callAPI from "../../utils/api/fetch.js";
import { getIdToken, getUserName, getName } from "../../utils/auths/authPopup.js";
import {
  printDynamicHtmlTable,
  getTableOuterHtmlFrom2DArray,
  genericModalOuterHtml,
  genericModalOnClose,
  showGenericModal,
  updateGenericModal,
  closeGenericModal,
  updateTextToHyperlink,
} from "../../utils/render.js";

import {
  addRowAtIndex,
  addColumnRightFromGivenIndex,
  transformArrayOfObjectsTo2DArray,
  array2DContains,
  transpose2DArray,
} from "../../utils/array/array.js";

//import { loadFromSessionStorage } from "../utils/storage/sessionStorage.js";

let page = document.querySelector("#page");
let admin = false;
const TABLE_ID = "projectTable";
let tableDiv;
const MAX_PROJ_MEMBERS = 4;
let userName;
let projectData;
const API_CALL_RATE = 5000 ; // 5seconds

const ProjectPage = async () => {
  try {
    // set the user from the user session
    //const user = loadFromSessionStorage("user");
    //userName = user.userName;
    userName = getUserName();

    let projectPage = `<h5>Projets 2020</h5>
        <div id="${TABLE_ID}" class="table-responsive"></div>
    `;

    const userRole = await callAPI(
      "/api/users/role",
      "get",
      getIdToken(),
      undefined
    );

    console.log("user role:", userRole);
    if (userRole && userRole.role && userRole.role === "admin") admin = true;
    else admin = false;

    // show the Add Project button if admin
    if (admin)
      projectPage += `
        <button id="add" type="button mb-3" class="btn btn-primary">
          Add Project
        </button>`;

    // add a generic modal
    projectPage += genericModalOuterHtml;

    page.innerHTML = projectPage;

    if (admin) {
      const addBtn = document.getElementById("add");
      addBtn.addEventListener("click", onAddClick);
    }

    // deal with the modal events when clicks on close buttons (hide the modal)
    genericModalOnClose();
    // render the project table for the first time
    tableDiv = document.getElementById(TABLE_ID);
    // 1st call to project api    
    renderProjectTable();
    // deal with indefinite periodic calls to project API
    setInterval(renderProjectTable, API_CALL_RATE);
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const renderProjectTable = async () => {
  try {
    projectData = await callAPI(
      "/api/projects",
      "get",
      getIdToken(),
      undefined
    );

    if (!projectData || projectData.length === 0) {
      // ensure that the table is cleared
      tableDiv.innerHTML = "";
      return;
    }

    let headerRow = [
      "Id",
      "Nom",
      "Description",
      "Membres du projet",
      //"Vidéo de présentation",
      "Statut",
      "Joindre",
      "Quitter",
      "Voir",
    ];

    if (admin) headerRow.push("Effacer");

    const dataPropertiesNeeded = [
      "_id",
      "name",
      "description",
      "projectMembers",
      //"presentationUrl",
      "status",
    ];

    let visibleHeaderRow = [
      "Nom",
      "Description",
      "Membres du projet",
      //"Vidéo de présentation",
      "Joindre",
      "Quitter",
      "Voir",
    ];

    if (admin) visibleHeaderRow.push("Effacer");

    tableDiv.innerHTML = projectTableOuterHtml(
      projectData,
      headerRow,
      dataPropertiesNeeded,
      visibleHeaderRow
    );

    // attach button click handlers
    let joinBtns = document.querySelectorAll(".join");
    let quitBtns = document.querySelectorAll(".quit");
    let viewBtns = document.querySelectorAll(".view");
    let deleteBtns = document.querySelectorAll(".delete");
    joinBtns.forEach((btn) => btn.addEventListener("click", onJoinClick));
    quitBtns.forEach((btn) => btn.addEventListener("click", onQuitClick));
    viewBtns.forEach((btn) => btn.addEventListener("click", onViewClick));
    deleteBtns.forEach((btn) => btn.addEventListener("click", onDeleteClick));
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const projectTableOuterHtml = (
  dataArray,
  headerArray,
  dataPropertiesNeeded,
  visibleHeaderRow
) => {
  // make a deep clone of the dataArray
  let dataArrayCloned = JSON.parse(JSON.stringify(dataArray));
  // transform objects to arrays for the dataPropertiesNeeded
  let data2DArray = transformArrayOfObjectsTo2DArray(
    dataArrayCloned,
    dataPropertiesNeeded
  );

  const deleteButtonOuterHtml = `<a class="delete btn btn-dark"
                                >Effacer</a>`;
  const viewButtonOuterHtml = `<a class="view btn btn-dark"
                                >Voir</a>`;

  // Join shall only be visible if the userName has not already joined a project.
  if (userName && data2DArray && array2DContains(data2DArray, 3, userName)) {
    visibleHeaderRow.splice(visibleHeaderRow.indexOf("Joindre"), 1);
    // add an empty column in the data2DArray (column will be hidden after render of table)
    addColumnRightFromGivenIndex(data2DArray, headerArray.indexOf("Joindre"));
  } else {
    addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Joindre"),
      undefined,
      getJoinColumnCellValueFromRowData
    );
  }

  // quit column shall only be visible if the userName has join a project
  if (userName && data2DArray && !array2DContains(data2DArray, 3, userName)) {
    //if the user has not joined a project, remove the column from the visibleHeader
    // the column will be hidden after render of the table;
    visibleHeaderRow.splice(visibleHeaderRow.indexOf("Quitter"), 1);
    // add an empty column in the data2DArray (column will be hidden after render of table)
    addColumnRightFromGivenIndex(data2DArray, headerArray.indexOf("Quitter"));
  } else {
    // add a column with Quit button only where the userName is Project Member
    addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Quitter"),
      undefined,
      getQuitColumnCellValueFromRowData
    );
  }
  addColumnRightFromGivenIndex(
    data2DArray,
    headerArray.indexOf("Voir"),
    viewButtonOuterHtml
  );
  if (admin)
    addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Effacer"),
      deleteButtonOuterHtml
    );

  addRowAtIndex(data2DArray, headerArray, 0);
  return getTableOuterHtmlFrom2DArray(data2DArray, visibleHeaderRow, ["Id"]);
};

const getJoinColumnCellValueFromRowData = (dataRow) => {
  const joinButtonOuterHtml = `<a class="join btn btn-dark"
                                >Joindre</a>`;
  const projectMemberCount = dataRow[3].length;
  if (projectMemberCount >= MAX_PROJ_MEMBERS) return "";
  //if (userName && dataRow[3].includes(userName)) return "";
  return joinButtonOuterHtml;
};

const getQuitColumnCellValueFromRowData = (dataRow) => {
  const quitButtonOuterHtml = `<a class="quit btn btn-dark"
                                >Quitter</a>`;

  if (userName && dataRow[3].includes(userName)) return quitButtonOuterHtml;
  return "";
};

const onAddClick = async () => {
  try {
    const newProject = await callAPI(
      "/api/projects",
      "post",
      getIdToken(),
      undefined
    );

    await renderProjectTable();
  } catch (err) {
    console.error("onAddClick::error", err);
  }
};

const onJoinClick = async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset.id;
  console.log(
    "projectId: endpoint:",
    "POST /api/projects/" + projectId + "/member"
  );
  const newProject = await callAPI(
    "/api/projects/" + projectId + "/member",
    "POST",
    getIdToken(),
    undefined
  );
  await renderProjectTable();
};

const onQuitClick = async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset.id;
  console.log(
    "projectId: endpoint:",
    "DELETE /api/projects/" + projectId + "/member"
  );
  const newProject = await callAPI(
    "/api/projects/" + projectId + "/member",
    "DELETE",
    getIdToken(),
    undefined
  );
  await renderProjectTable();
};

const onDeleteClick = async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset.id;
  console.log("projectId: endpoint:", "DELETE /api/projects/" + projectId);

  const newProject = await callAPI(
    "/api/projects/" + projectId,
    "DELETE",
    getIdToken(),
    undefined
  );
  await renderProjectTable();
};

const onViewClick = async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset.id;
  const index = e.target.parentElement.parentElement.dataset.index;

  let data;

  let firstColumnData = [
    "<b>Identifiant du projet</b>",
    "<b>Nom du projet</b>",
    "<b>Description du projet</b>",
    "<b>Membres du projet</b>",
    "<b>Statut du projet</b>",
    "<b>Date de création du projet</b>",
    "<b>Url du repository pour le frontend</b>",
    "<b>Url du repository pour le backend</b>",
    "<b>Url de la vidéo de présentation du projet</b>",
    "<b>Url du frontend déployé</b>",
    "<b>Url du backend déployé</b>",
  ];

  let dataArrayCloned = JSON.parse(JSON.stringify(projectData));
  let data2DArray = transformArrayOfObjectsTo2DArray(dataArrayCloned);
  let secondColumnData = data2DArray[index];

  let arrayToDisplay = [firstColumnData, secondColumnData];
  // switch rows to columns
  arrayToDisplay = transpose2DArray(arrayToDisplay);
  // add hyperlinks where needed
  updateTextToHyperlink(arrayToDisplay,1,1);
  // add the headers
  addRowAtIndex(arrayToDisplay, ["Propriétés", "Valeurs"], 0);
  const tableOuterHtmlgetTable = getTableOuterHtmlFrom2DArray(
    arrayToDisplay,
    undefined,
    undefined,
    true
  );

  let modalBody = `
    <div class="table-responsive">            
        ${tableOuterHtmlgetTable}               
    </div>            
  `;

  // deal with the update button
  // privilege needed : project member or admin
  const userHasSufficientPrivilege =
    admin | projectData[index].projectMembers.includes(userName);
  if (userHasSufficientPrivilege)
    modalBody += `<input type="button" class="btn btn-primary" value="Modifier" id="updateProjectBtn"/>`;
  updateGenericModal("Vue du projet", modalBody);
  showGenericModal();
  if (userHasSufficientPrivilege)
    document
      .getElementById("updateProjectBtn")
      .addEventListener("click", onUpdateClick(projectId));
};

const onUpdateClick = (projectId) => async (e) => {
  // because the projectData row could be refreshed, ensure that you
  // get the last version of the data when it is asked to update this project
  // deal with a modal
  try {
    const projectFound = await callAPI(
      "/api/projects/" + projectId,
      "GET",
      getIdToken(),
    );    
    
  
  
  const modalBody = `
    <form>
            <div class="form-group">
              <label for="title">Nom du projet</label>
              <input
                class="form-control"
                type="text"
                name="name"
                id="name"
                value="${projectFound.name}"
                required                
              />
            </div>
            <div class="form-group">
              <label for="description">Description du projet</label>
              <textarea
                class="form-control"
                type="text"
                name="description"
                id="description"                  
                rows="4"             
              >${projectFound.description}</textarea>
            </div>
            <div class="form-group">
              <label for="frontendRepo">URL du frontend</label>
              <input
                class="form-control"
                type="text"
                name="frontendRepo"
                id="frontendRepo"   
                value="${
                  projectFound.frontendRepo
                    ? projectFound.frontendRepo
                    : ""
                }"             
              />
            </div>
            <div class="form-group">
              <label for="backendRepo">URL du backend</label>
              <input
                class="form-control"
                type="text"
                name="backendRepo"
                id="backendRepo"    
                value="${
                  projectFound.backendRepo
                    ? projectFound.backendRepo
                    : ""
                }"            
              />
            </div>
            <div class="form-group">
              <label for="presentationUrl">URL de la vidéo de présentation du projet</label>
              <input
                class="form-control"
                type="text"
                name="presentationUrl"
                id="presentationUrl"  
                value="${
                  projectFound.presentationUrl
                    ? projectFound.presentationUrl
                    : ""
                }"              
              />
            </div>
            <div class="form-group">
              <label for="frontendUrl">URL du frontend déployé</label>
              <input
                class="form-control"
                type="text"
                name="frontendProductionUrl"
                id="frontendProductionUrl"   
                value="${
                  projectFound.frontendProductionUrl
                    ? projectFound.frontendProductionUrl
                    : ""
                }"             
              />
            </div>
            <div class="form-group">
              <label for="backendUrl">URL du backend déployé</label>
              <input
                class="form-control"
                type="text"
                name="backendProductionUrl"
                id="backendProductionUrl" 
                value="${
                  projectFound.backendProductionUrl
                    ? projectFound.backendProductionUrl
                    : ""
                }"               
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Sauver" id="sauverBtn" />
          </form>   
  `;
  updateGenericModal("Vue du projet", modalBody);
  //showGenericModal();

  document
    .querySelector("form")
    .addEventListener("submit", onSaveClick(projectId));

  } catch (err) {
    console.error("onUpdateClick::fetch", err);
  }
};

const onSaveClick = (projectId) => async (e) => {
  // send the new data to the api
  e.preventDefault();

  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let frontendRepo = document.getElementById("frontendRepo").value;
  let backendRepo = document.getElementById("backendRepo").value;
  let presentationUrl = document.getElementById("presentationUrl").value;
  let frontendProductionUrl = document.getElementById("frontendProductionUrl")
    .value;
  let backendProductionUrl = document.getElementById("backendProductionUrl")
    .value;

  let data = {
    name: name ? name : "",
    description: description ? description : "",
    frontendRepo: frontendRepo ? frontendRepo : "",
    backendRepo: backendRepo ? backendRepo : "",
    presentationUrl: presentationUrl ? presentationUrl : "",
    frontendProductionUrl: frontendProductionUrl ? frontendProductionUrl : "",
    backendProductionUrl: backendProductionUrl ? backendProductionUrl : "",
  };

  try {
    const updatedProject = await callAPI(
      "/api/projects/" + projectId,
      "PATCH",
      getIdToken(),
      data
    );
    closeGenericModal();
    await renderProjectTable();
  } catch (err) {
    console.error("onUpdateClick::fetch", err);
  }
};

export default ProjectPage;
