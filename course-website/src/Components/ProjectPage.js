import callAPI from "../utils/api/fetch.js";
import { getIdToken } from "../utils/auths/authPopup";
import {
  printDynamicHtmlTableWithInnerHtml,
  printDynamicHtmlTable,
} from "../utils/render.js";

let page = document.querySelector("#page");
let admin = false;
const TABLE_ID = "projectTable";
//let tableDiv;

const ProjectPage = async () => {
  try {
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
    if (admin)
      projectPage += `
        <button id="add" type="button mb-3" class="btn btn-primary">
          Add Project
        </button>`;

    page.innerHTML = projectPage;
    //tableDiv = document.getElementById(TABLE_ID);
    await renderProjectTable();

    if (admin) {
      const saveBtn = document.getElementById("add");
      saveBtn.addEventListener("click", async () => {
        const newProject = await callAPI(
          "/api/projects",
          "post",
          getIdToken(),
          undefined
        );

        await renderProjectTable();
      });
    }
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const renderProjectTable = async () => {
  try {
    const projectArray = await callAPI(
      "/api/projects",
      "get",
      getIdToken(),
      undefined
    );

    let headerTable = [
        "Id",
        "Name",
        "Description",
        "Project Members",
        "Status",
        "Join",
        "Quit",
        "Update",
      ];

    if(admin)
        headerTable.push("Delete")
   
    printDynamicHtmlTable(
      TABLE_ID,
      headerTable,
      projectArray
    );

    // attach button click handlers
    let joinBtns = document.querySelectorAll(".join");
    let quitBtns = document.querySelectorAll(".quit");
    let updateBtns = document.querySelectorAll(".update");
    let deleteBtns = document.querySelectorAll(".delete");
    joinBtns.forEach((btn) => btn.addEventListener("click", onJoinClick));
    quitBtns.forEach((btn) => btn.addEventListener("click", onQuitClick));
    updateBtns.forEach((btn) => btn.addEventListener("click", onUpdateClick));
    deleteBtns.forEach((btn) => btn.addEventListener("click", onDeleteClick));
  

} catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const onJoinClick = async (e) => {
  const projectId = e.target.dataset.itemId;
  console.log("projectId: endpoint:","POST /api/projects/"+projectId+"/member");
  const newProject = await callAPI(
    "/api/projects/"+projectId+"/member",
    "POST",
    getIdToken(),
    undefined
  );
  await renderProjectTable();
};

const onQuitClick = async (e) => {
    const projectId = e.target.dataset.itemId;
    console.log("projectId: endpoint:","DELETE /api/projects/"+projectId+"/member");
    const newProject = await callAPI(
      "/api/projects/"+projectId+"/member",
      "DELETE",
      getIdToken(),
      undefined
    );
    await renderProjectTable();
};

const onUpdateClick = async (e) => {
    const projectId = e.target.dataset.itemId;
    console.log("projectId: endpoint:","PATCH /api/projects/"+  projectId);
    let data;

    /*
    const newProject = await callAPI(
      "/api/projects/"+projectId,
      "PATCH",
      getIdToken(),
      data,
    );*/

    await renderProjectTable();
};

const onDeleteClick = async (e) => {
    const projectId = e.target.dataset.itemId;
    console.log("projectId: endpoint:","DELETE /api/projects/"+projectId);
   
    const newProject = await callAPI(
      "/api/projects/"+projectId,
      "DELETE",
      getIdToken(),
      undefined,
    );
    await renderProjectTable();
};

export default ProjectPage;
