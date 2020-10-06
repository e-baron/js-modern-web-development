import callAPI from "../../utils/api/fetch.js";
import { getIdToken } from "../../utils/auths/authPopup.js";
import { getTableOuterHtmlFrom2DArray , getTableOuterHtmlFromArray} from "../../utils/render.js";

import {
  addRowAtIndex,
  addColumnRightFromGivenIndex,
  transformArrayOfObjectsTo2DArray,
  array2DContains,
  addPropertyWithDataToAllObjects,
} from "../../utils/array/array.js";

import ProjectView from "./ProjectView.js";

const TABLE_ID = "projectTable";
const MAX_PROJ_MEMBERS = 4;
const API_CALL_RATE = 5000; // 5seconds

const ProjectTable = async (admin, userName) => {
  try {
    // 1st call to project api
    renderProjectTable(admin, userName);
    // deal with indefinite periodic calls to project API
    const periodicCallRef = setInterval(
      () => renderProjectTable(admin, userName),
      API_CALL_RATE
    );

    // Create an observer instance linked to the page div mutations
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    const pageDiv = document.getElementById("page");
    const observer = new MutationObserver(onPageDivMutation(periodicCallRef));
    // Start observing the target node for configured mutations
    observer.observe(pageDiv, config);
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

/**
 * Observe for mutation in the page div in order to find out when the
 * project table has been removed. Stop the calls to the API when it's the case.
 * NB : the project Table is removed when the user click on another nav item.
 * @param {*} periodicCallRef
 */
const onPageDivMutation = (periodicCallRef) => (mutationList, observer) => {
  for (const mutation of mutationList) {
    //console.log("mutation:", mutation);
    if (mutation.removedNodes) {
      for (let removedNode of mutation.removedNodes) {
        if (removedNode.id === TABLE_ID) {
          //console.log("Table removed from the DOM");
          // stop observing
          observer.disconnect();
          clearInterval(periodicCallRef);
          return;
        }
      }
    }
  }
};

const renderProjectTable = async (admin, userName) => {
  try {
    let projectData = await callAPI(
      "/api/projects",
      "get",
      getIdToken(),
      undefined
    );

    const tableDiv = document.getElementById(TABLE_ID);

    if (!projectData || projectData.length === 0) {
      // ensure that the table is cleared
      tableDiv.innerHTML = "";
      return;
    }

    const columnConfiguration = [
      { dataKey: "_id", columnTitle: "Id", hidden: true },
      { dataKey: "name", columnTitle: "Nom", hidden: false },
      { dataKey: "description", columnTitle: "projectMembers", hidden: false },
      {
        dataKey: "projectMembers",
        columnTitle: "Membres du projet",
        hidden: false,
      },
      { dataKey: "status", columnTitle: "Statut", hidden: true },
      // when there is no data given, the dataKey will be added later
      // it could be added here, but it won't change anything
      { columnTitle: "Joindre", hidden: false },
      { columnTitle: "Quitter", hidden: false },
      { columnTitle: "Voir", hidden: false },
      { columnTitle: "Effacer", hidden: true },
    ];

    let headerRow = [
      "Id",
      "Nom",
      "Description",
      "Membres du projet",
      "Statut",
      "Joindre",
      "Quitter",
      "Voir",
    ];

    if (admin) {
      headerRow.push("Effacer");
      columnConfiguration.find(
        (conf) => conf.columnTitle === "Effacer"
      ).hidden = false;
    }

    const dataPropertiesNeeded = [
      "_id",
      "name",
      "description",
      "projectMembers",
      "status",
    ];

    let visibleHeaderRow = [
      "Nom",
      "Description",
      "Membres du projet",
      "Joindre",
      "Quitter",
      "Voir",
    ];

    if (admin) visibleHeaderRow.push("Effacer");

    /*
    tableDiv.innerHTML = projectTableOuterHtml(
      projectData,
      headerRow,
      dataPropertiesNeeded,
      visibleHeaderRow,
      admin,
      userName
    );*/

    tableDiv.innerHTML = projectTableOuterHtml(
      projectData,
      columnConfiguration,
      admin,
      userName
    );

    // attach button click handlers
    let joinBtns = document.querySelectorAll(".join");
    let quitBtns = document.querySelectorAll(".quit");
    let viewBtns = document.querySelectorAll(".view");
    let deleteBtns = document.querySelectorAll(".delete");
    joinBtns.forEach((btn) =>
      btn.addEventListener("click", onJoinClick(admin, userName))
    );
    quitBtns.forEach((btn) =>
      btn.addEventListener("click", onQuitClick(admin, userName))
    );
    viewBtns.forEach((btn) =>
      btn.addEventListener("click", onViewClick(projectData, admin, userName))
    );
    deleteBtns.forEach((btn) =>
      btn.addEventListener("click", onDeleteClick(admin, userName))
    );
  } catch (err) {
    console.error("Project Table::Error:", err);
  }
};

const projectTableOuterHtml = (
  dataArray,
  columnConfiguration,
  admin,
  userName
) => {
  // make a deep clone of the dataArray
  let dataArrayCloned = JSON.parse(JSON.stringify(dataArray));
  /*// transform objects to arrays for the dataPropertiesNeeded
  let data2DArray = transformArrayOfObjectsTo2DArray(
    dataArrayCloned,
    dataPropertiesNeeded
  );*/

  const deleteButtonOuterHtml = `<a class="delete btn btn-dark"
                                >Effacer</a>`;
  const viewButtonOuterHtml = `<a class="view btn btn-dark"
                                >Voir</a>`;

  // Join shall only be visible if the userName has not already joined a project.
  //if (userName && data2DArray && array2DContains(data2DArray, 3, userName)) {
  if (
    userName &&
    dataArrayCloned &&
    dataArrayCloned.find((project) => project.projectMembers.includes(userName))
  ) {
    //visibleHeaderRow.splice(visibleHeaderRow.indexOf("Joindre"), 1);
    columnConfiguration.find(
      (conf) => conf.columnTitle === "Joindre"
    ).hidden = true;
    // add an empty column in the data2DArray (column will be hidden after render of table)
    //addColumnRightFromGivenIndex(data2DArray, headerArray.indexOf("Joindre"));
    // add a new property for all the object in the array, with an empty value
    addPropertyWithDataToAllObjects(dataArrayCloned, "joindre");
  } else {
    /*addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Joindre"),
      undefined,
      getJoinColumnCellValueFromRowData
    );*/
    // add a property to all object in the array, with a value based on passed callback
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "joindre",
      undefined,
      getJoinItemPropertyValueFromObject
    );
  }

  // quit column shall only be visible if the userName has join a project
  //if (userName && data2DArray && !array2DContains(data2DArray, 3, userName)) {
  if (
    userName &&
    dataArrayCloned &&
    !dataArrayCloned.find((project) =>
      project.projectMembers.includes(userName)
    )
  ) {
    //if the user has not joined a project, remove the column from the visibleHeader
    // the column will be hidden after render of the table;
    //visibleHeaderRow.splice(visibleHeaderRow.indexOf("Quitter"), 1);
    columnConfiguration.find(
      (conf) => conf.columnTitle === "Quitter"
    ).hidden = true;
    // add an empty column in the data2DArray (column will be hidden after render of table)
    //addColumnRightFromGivenIndex(data2DArray, headerArray.indexOf("Quitter"));
    // add a new property for all the object in the array, with an empty value
    addPropertyWithDataToAllObjects(dataArrayCloned, "quitter");
  } else {
    // add a column with Quit button only where the userName is Project Member
    /*addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Quitter"),
      undefined,
      getQuitColumnCellValueFromRowData(userName)
    );*/
    // add a property to all object in the array, with a value based on passed callback
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "quitter",
      undefined,
      getQuitItemPropertyValueFromObject(userName)
    );
  }

  /*
  addColumnRightFromGivenIndex(
    data2DArray,
    headerArray.indexOf("Voir"),
    viewButtonOuterHtml
  );*/
  // add a property to all object in the array, with given value for all objects
  addPropertyWithDataToAllObjects(dataArrayCloned, "voir", viewButtonOuterHtml);

  if (admin)
    /*addColumnRightFromGivenIndex(
      data2DArray,
      headerArray.indexOf("Effacer"),
      deleteButtonOuterHtml
    );*/
    // add a property to all object in the array, with given value for all objects
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "effacer",
      deleteButtonOuterHtml
    );

  //addRowAtIndex(data2DArray, headerArray, 0);
  //return getTableOuterHtmlFrom2DArray(data2DArray, visibleHeaderRow, ["Id"]);
  return getTableOuterHtmlFromArray(dataArrayCloned, columnConfiguration, ["_id"]);
};

/*
const projectTableOuterHtml = (
  dataArray,
  headerArray,
  dataPropertiesNeeded,
  visibleHeaderRow,
  admin,
  userName
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
      getQuitColumnCellValueFromRowData(userName)
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
*/

/*
const getJoinColumnCellValueFromRowData = (dataRow) => {
  const joinButtonOuterHtml = `<a class="join btn btn-dark"
                                >Joindre</a>`;
  const projectMemberCount = dataRow[3].length;
  if (projectMemberCount >= MAX_PROJ_MEMBERS) return "";
  //if (userName && dataRow[3].includes(userName)) return "";
  return joinButtonOuterHtml;
};*/

const getJoinItemPropertyValueFromObject = (element) => {
  const joinButtonOuterHtml = `<a class="join btn btn-dark"
                                >Joindre</a>`;
  const projectMemberCount = element.projectMembers.length;
  if (projectMemberCount >= MAX_PROJ_MEMBERS) return "";
  //if (userName && dataRow[3].includes(userName)) return "";
  return joinButtonOuterHtml;
};

/*const getQuitColumnCellValueFromRowData = (userName) => (dataRow) => {
  const quitButtonOuterHtml = `<a class="quit btn btn-dark"
                                >Quitter</a>`;

  if (userName && dataRow[3].includes(userName)) return quitButtonOuterHtml;
  return "";
};*/

const getQuitItemPropertyValueFromObject = (userName) => (element) => {
  const quitButtonOuterHtml = `<a class="quit btn btn-dark"
                                >Quitter</a>`;

  if (userName && element.projectMembers.includes(userName))
    return quitButtonOuterHtml;
  return "";
};

/*
const getQuitColumnCellValueFromRowData = (userName) => (dataRow) => {
  const quitButtonOuterHtml = `<a class="quit btn btn-dark"
                                >Quitter</a>`;

  if (userName && dataRow[3].includes(userName)) return quitButtonOuterHtml;
  return "";
};*/

const onJoinClick = (admin, userName) => async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset._id;
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
  await renderProjectTable(admin, userName);
};

const onQuitClick = (admin, userName) => async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset._id;
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
  await renderProjectTable(admin, userName);
};

const onDeleteClick = (admin, userName) => async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset._id;
  console.log("projectId: endpoint:", "DELETE /api/projects/" + projectId);

  const newProject = await callAPI(
    "/api/projects/" + projectId,
    "DELETE",
    getIdToken(),
    undefined
  );
  await renderProjectTable(admin, userName);
};

const onViewClick = (projectData, admin, userName) => async (e) => {
  // the projectId is given in the current table row under data-id attribute
  const projectId = e.target.parentElement.parentElement.dataset._id;
  const index = e.target.parentElement.parentElement.dataset.index;

  ProjectView(projectId, index, projectData, admin, userName);
};

export default ProjectTable;
