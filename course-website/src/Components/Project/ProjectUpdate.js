import callAPI from "../../utils/api/fetch.js";
import { getIdToken } from "../../utils/auths/authPopup.js";
import {
  updateGenericModal,
  updateGenericModal2,
  closeGenericModal,
  getFormOuterHtmlFromObject,
  getFormDataOnSubmit,
} from "../../utils/render.js";

const ProjectUpdate = async (projectId) => {
  // because the projectData row could be refreshed, ensure that you
  // get the last version of the data when it is asked to update this project
  // deal with a modal
  try {
    const projectFound = await callAPI(
      "/api/projects/" + projectId,
      "GET",
      getIdToken()
    );

    if (!projectFound) return;

    /* textearea is considered if rows exists and is bigger than 1 */
    const configuration = [
      {
        title: "Identifiant du projet",
        dataKey: "_id",
        type: "text",
        hidden: true,
      },
      { title: "Nom du projet", dataKey: "name", type: "text", hidden: true },
      {
        title: "Description du projet",
        dataKey: "description",        
        rows:4,
        hidden: false,
      },
      { title: "Membres du projet", 
      dataKey: "projectMembers", 
      type:"text",
      hidden: true },
      { title: "Statut du projet", 
      dataKey: "status", 
      type:"text",
      hidden: true },
      {
        title: "Date de création du projet",
        dataKey: "creationDate",
        type:"time",
        hidden: true,
      },
      {
        title: "Url du repository pour le frontend",
        dataKey: "frontendRepo",
        type:"url",
        hidden: false,
      },
      {
        title: "Url du repository pour le backend",
        dataKey: "backendRepo",
        type:"url",
        hidden: false,
      },
      {
        title: "Url de la vidéo de présentation du projet",
        dataKey: "presentationUrl",
        type:"url",
        hidden: false,
      },
      {
        title: "Url du frontend déployé",
        dataKey: "frontendProductionUrl",
        type:"url",
        hidden: false,
      },
      {
        title: "Url du backend déployé",
        dataKey: "frontendProductionUrl",
        type:"url",
        hidden: false,
      },
      {
        title: "Nom du groupe de projets associés",
        dataKey: "projectGroupName",
        type:"text",
        hidden: true,
      },
      {
        title: "Projet public ?",
        dataKey: "isPublic",
        type:"text",
        hidden: true,
      },
      {
        title: "Nom du projet pour le public",
        dataKey: "publicName",
        type:"text",
        hidden: true,
      },
      {
        title: "Description pour le public",
        dataKey: "publicDescription",
        type:"text",
        hidden: true,
      },
      {
        title: "Description des auteurs pour le public",
        dataKey: "publicAuthors",
        type:"text",
        hidden: true,
      },
      {
        title: "Sauver",        
        type:"submit", 
        id:"sauverBtn",       
      },
    ];

    const modalForm = getFormOuterHtmlFromObject(projectFound, configuration);

    const modalBody = `
    <form>            
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
                  projectFound.frontendRepo ? projectFound.frontendRepo : ""
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
                  projectFound.backendRepo ? projectFound.backendRepo : ""
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
   updateGenericModal2("Vue du projet", modalForm);
    //updateGenericModal("Vue du projet", modalBody);
    //showGenericModal();

    document
      .querySelector("form")
      .addEventListener("submit", onSaveClick(projectId, configuration));
  } catch (err) {
    console.error("Project update :: error", err);
  }
};

const onSaveClick = (projectId, configuration) => async (e) => {
  // send the new data to the api
  e.preventDefault();  

  //let name = document.getElementById("name").value;
  /*let description = document.getElementById("description").value;
  let frontendRepo = document.getElementById("frontendRepo").value;
  let backendRepo = document.getElementById("backendRepo").value;
  let presentationUrl = document.getElementById("presentationUrl").value;
  let frontendProductionUrl = document.getElementById("frontendProductionUrl")
    .value;
  let backendProductionUrl = document.getElementById("backendProductionUrl")
    .value;

  let data = {
    //name: name ? name : "",
    description: description ? description : "",
    frontendRepo: frontendRepo ? frontendRepo : "",
    backendRepo: backendRepo ? backendRepo : "",
    presentationUrl: presentationUrl ? presentationUrl : "",
    frontendProductionUrl: frontendProductionUrl ? frontendProductionUrl : "",
    backendProductionUrl: backendProductionUrl ? backendProductionUrl : "",
  };*/

  const data = getFormDataOnSubmit(configuration);

  try {
    const updatedProject = await callAPI(
      "/api/projects/" + projectId,
      "PATCH",
      getIdToken(),
      data
    );
    closeGenericModal();
  } catch (err) {
    console.error("onUpdateClick::fetch", err);
  }
};

export default ProjectUpdate;
