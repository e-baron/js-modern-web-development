import callAPI from "../../utils/api/fetch.js";
import { getIdToken, getUserName } from "../../utils/auths/authPopup.js";
import ProjectTable from "./ProjectTable.js";

const ProjectPage = async () => {
  try {
    const TABLE_ID = "projectTable";
    let page = document.querySelector("#page");
    let admin = false;
    const userName = getUserName();

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
    if (
      userRole &&
      userRole.role &&
      (userRole.role === "admin" || userRole.role === "manager")
    )
      admin = true;
    else admin = false;

    // show the Add Project button if admin
    if (admin)
      projectPage += `
        <button id="add" type="button mb-3" class="btn btn-primary">
          Add Project
        </button>
        <div id="projectModal"></div>`;

    // always add a container to later contain a modal
    projectPage += `      
        <div id="projectModal"></div>`;

    page.innerHTML = projectPage;

    if (admin) {
      const addBtn = document.getElementById("add");
      addBtn.addEventListener("click", onAddClick(admin, userName));
    }

    // render the project table for the first time
    ProjectTable(admin, userName);
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const onAddClick = (admin, userName) => async () => {
  try {
    const newProject = await callAPI(
      "/api/projects",
      "post",
      getIdToken(),
      undefined
    );

    //ProjectTable(admin, userName);
  } catch (err) {
    console.error("onAddClick::error", err);
  }
};

export default ProjectPage;
