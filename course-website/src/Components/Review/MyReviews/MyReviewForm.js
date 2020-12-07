import callAPI from "../../../utils/api/fetch.js";
import ReadMyReviewsPage from "./ReadMyReviewsPage.js";
import PrintError from "../../PrintError.js";

import {
  GenericFunctionalComponent,
  getFormOuterHtmlFromObject,
  genericModalOuterHtml,
  genericModalOnClose,
  closeGenericModal,
  updateGenericModal2,
  showGenericModal,
  createOrUpdateBasicElement,
  getFormDataOnSubmit,
} from "../../../utils/render.js";

const MAX_CHAR = 125;

const MyReviewForm = async (props) => {
  try {
    if (!props.state) return;

    // set a #genericModal within a div
    const parentModal = document.querySelector("html");
    const modal = createOrUpdateBasicElement({
      componentName: "SuperGenericModal",
      parentHtmlElement: parentModal,
      innerHTML: genericModalOuterHtml,
    });

    // deal with the modal events when clicks on close buttons (hide the modal)
    genericModalOnClose();

    // deal with configuration of form
    /* textearea is considered if rows exists and is bigger than 1 */
    const configuration = [
      {
        title: "Identifiant de la revue",
        dataKey: "_id",
        type: "text",
        hidden: true,
      },
      {
        title: "Nom du projet",
        dataKey: "name",
        type: "text",
        hidden: false,
        disabled: true,
      },
      {
        title: "Description du projet",
        dataKey: "description",
        rows: 4,
        disabled: true,
      },
      {
        title: "Url de la vidéo de présentation du projet",
        dataKey: "presentationUrl",
        type: "url",
        disabled: true,
      },
      {
        title: "Point fort",
        dataKey: "praise",
        rows: 4,
        required: true,
      },
      {
        title: "Point d'amélioration",
        dataKey: "notImpressed",
        rows: 4,
        required: true,
      },

      {
        title: "Coup de coeur",
        dataKey: "like",
        type: "checkbox",
      },
      {
        title: "Sauver",
        type: "submit",
        id: "sauverBtn",
      },
    ];

    if (props.state._id) {
      // deal with a modification of a review
      const review = props.state.myReviews.find(
        (item) => item._id === props.state._id
      );

      const form = getFormOuterHtmlFromObject(review, configuration);
      form.addEventListener("submit", onSaveClick(props, configuration));
      updateGenericModal2("Votre revue du projet", form);
      showGenericModal();
    }
    // we are to deal with creation of a review

    // props.renderDelayed => auto render was disabled
    //props.parentHtmlElement.appendChild(props.currentHtmlElement);

    //return myReviewSummary;
  } catch (err) {
    console.error("MyReviewForm::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

const onSaveClick = (props, configuration) => async (e) => {
  // send the new data to the api
  e.preventDefault();

  const data = getFormDataOnSubmit(configuration);

  try {
    const element = await callAPI(
      "/api/reviews/" + props.state._id,
      "PATCH",
      props.state.user.token,
      data
    );

    closeGenericModal();

    // if there was already to many like, the last one was not added => throw an error
    if (element.error) throw new Error(element.error);
    // ensure that no error is printed, reset it...
    else PrintError({ innerText: "" });

    // update the complete ReadMyReviewsPage : both the summary and the table shall be updated
    ReadMyReviewsPage({ state: props.state });
  } catch (err) {
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
    // update the complete ReadMyReviewsPage : both the summary and the table shall be updated
    ReadMyReviewsPage({ state: props.state });
  }
};

export default GenericFunctionalComponent(MyReviewForm);
