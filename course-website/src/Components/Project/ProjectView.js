import {

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
  transformArrayOfObjectsTo2DArray,
  transpose2DArray,
} from "../../utils/array/array.js";

import ProjectUpdate from "./ProjectUpdate";


const ProjectView = async (projectId, index, projectData, admin, userName) => {
  try {
    let projectModal = document.querySelector("#projectModal");
    // add a generic modal to the project page
    // Warning : an update to the page remove the eventListener on the Add Project button...
    projectModal.innerHTML = genericModalOuterHtml;
    // deal with the modal events when clicks on close buttons (hide the modal)
    genericModalOnClose();
    

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
    if (userHasSufficientPrivilege){
      const btn = document.getElementById("updateProjectBtn");
      btn.addEventListener("click", onUpdateClick(projectId));
    }

  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};



const onUpdateClick = (projectId) => async (e) => {
  // because the projectData row could be refreshed, ensure that you
  // get the last version of the data when it is asked to update this project
  // deal with a modal  
  ProjectUpdate(projectId);
};

export default ProjectView;
