import {
  GenericFunctionalComponent,
  createOrUpdateBasicElement,
  setLayout,
} from "../../../utils/render.js";
import MyReviewSummary from "../MyReviews/MyReviewSummary.js";
import PrintError from "../../PrintError.js";
import { getIdToken, getUserName } from "../../../utils/auths/authPopup.js";
import callAPI from "../../../utils/api/fetch.js";
import AllReviewsTable from "./AllReviewsTable.js";

const ReadAllReviewsPage = async (props) => {
  // template initialisation : MyReviewSummary is rendered at the top of the page div
  setLayout("Résultats des revues");

  try {
    // if it is an update, re-render the whole component component
    if (props.isUpdated) {
      props.currentHtmlElement.innerHTML = "";
    }

    // deal with state data, to make it available to other components
    if (!props.isUpdated) {
      //props.state = {};
      props.state.user = {};
      props.state.user.token = getIdToken();
      props.state.user.userName = getUserName();
      const projectGroup = await callAPI(
        "/api/projectgroups/default", //+ CURRENT_PROJECT_GROUP,
        "get",
        props.state.user.token,
        undefined
      );

      if (!projectGroup) return;

      props.state.projectGroup = projectGroup;

      // don't allow reviews if the project group status is not or was not yet in "review"
      if (projectGroup.status === "init" || projectGroup.status === "dev") {
        // set the page template, the review summary
        PrintError({
          innerText: `La saison de revues des projets n'a pas encore été ouverte.
      Nous nous réjouissons de vous revoir tout bientôt pour évaluer les projets de vos collègues.
      Une annonce sera faite une fois la saison ouverte ; )`,
        });
        return;
      }

     // set the page template, the review summary
    const reviewHeader = createOrUpdateBasicElement({
      parentHtmlElement: props.currentHtmlElement,
      componentName: "ReviewHeader",
    });

    await MyReviewSummary({
      parentHtmlElement: reviewHeader,
      renderDelayed: true,
      state: props.state,
    });

        /* ReadAllReviewsTable is set into a div that has to be responsive*/
    await AllReviewsTable({
      state: props.state,
      parentHtmlElement: props.currentHtmlElement,
      renderDelayed: true,
      className: "table-responsive",
    }); 

    // initialisation of the Error component    
    PrintError();   


    }
  } catch (err) {
    console.error("ReadAllReviewsPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

export default GenericFunctionalComponent(ReadAllReviewsPage);
