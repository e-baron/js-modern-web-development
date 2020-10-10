import callAPI from "../../utils/api/fetch.js";
import { getIdToken } from "../../utils/auths/authPopup.js";
import { getTableOuterHtmlFromArray } from "../../utils/render.js";

import { addPropertyWithDataToAllObjects } from "../../utils/array/array.js";

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
      { dataKey: "name", columnTitle: "Nom", hidden: false },
      {
        dataKey: "description",
        columnTitle: "Description",
        hidden: false,
      },
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

    const rowConfiguration = {
      hiddenDataAttributes: ["_id"],
      isHeaderRowHidden: false,
    };

    if (admin) {
      columnConfiguration.find(
        (conf) => conf.columnTitle === "Effacer"
      ).hidden = false;
    }

    
    /*
    tableDiv.innerHTML = projectTableOuterHtml(
      projectData,
      columnConfiguration,
      rowConfiguration,
      admin,
      userName
    );*/
    const tableHtmlElement = projectTableOuterHtml(
      projectData,
      columnConfiguration,
      rowConfiguration,
      admin,
      userName
    );
    
    tableDiv.innerHTML = "";
    tableDiv.appendChild(tableHtmlElement);

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
  rowConfiguration,
  admin,
  userName
) => {
  // make a deep clone of the dataArray
  let dataArrayCloned = JSON.parse(JSON.stringify(dataArray));

  const deleteButtonOuterHtml = `<a class="delete btn btn-dark"
                                >Effacer</a>`;
  const viewButtonOuterHtml = `<a class="view btn btn-dark"
                                >Voir</a>`;

  // Join shall only be visible if the userName has not already joined a project.
  if (
    userName &&
    dataArrayCloned &&
    dataArrayCloned.find((project) => project.projectMembers.includes(userName))
  ) {
    columnConfiguration.find(
      (conf) => conf.columnTitle === "Joindre"
    ).hidden = true;
    // add a new property for all the object in the array, with an empty value
    addPropertyWithDataToAllObjects(dataArrayCloned, "joindre");
  } else {
    // add a property to all object in the array, with a value based on passed callback
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "joindre",
      undefined,
      getJoinItemPropertyValueFromObject
    );
  }

  // quit column shall only be visible if the userName has join a project
  if (
    userName &&
    dataArrayCloned &&
    !dataArrayCloned.find((project) =>
      project.projectMembers.includes(userName)
    )
  ) {
    //if the user has not joined a project, remove the column from the visibleHeader
    // the column will be hidden after render of the table;
    columnConfiguration.find(
      (conf) => conf.columnTitle === "Quitter"
    ).hidden = true;
    // add a new property for all the object in the array, with an empty value
    addPropertyWithDataToAllObjects(dataArrayCloned, "quitter");
  } else {
    // add a column with Quit button only where the userName is Project Member
    // add a property to all object in the array, with a value based on passed callback
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "quitter",
      undefined,
      getQuitItemPropertyValueFromObject(userName)
    );
  }

  // add a property to all object in the array, with given value for all objects
  addPropertyWithDataToAllObjects(dataArrayCloned, "voir", viewButtonOuterHtml);

  if (admin)
    // add a property to all object in the array, with given value for all objects
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "effacer",
      deleteButtonOuterHtml
    );

  return getTableOuterHtmlFromArray(
    dataArrayCloned,
    columnConfiguration,
    rowConfiguration
  );
};

const getJoinItemPropertyValueFromObject = (element) => {
  const joinButtonOuterHtml = `<a class="join btn btn-dark"
                                >Joindre</a>`;
  const projectMemberCount = element.projectMembers.length;
  if (projectMemberCount >= MAX_PROJ_MEMBERS) return "";
  //if (userName && dataRow[3].includes(userName)) return "";
  return joinButtonOuterHtml;
};

const getQuitItemPropertyValueFromObject = (userName) => (element) => {
  const quitButtonOuterHtml = `<a class="quit btn btn-dark"
                                >Quitter</a>`;

  if (userName && element.projectMembers.includes(userName))
    return quitButtonOuterHtml;
  return "";
};

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
