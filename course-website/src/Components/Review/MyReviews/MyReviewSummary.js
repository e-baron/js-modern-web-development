import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import PrintError from "../../PrintError.js";
/**
 *
 * @param {Object} props
 * @return {Object} returns the review summary under this shape (this is an example) : {availableLike: -1, alreadyLiked: 2, alreadyReviewed: 3, expectedReviews: 2}
 */
const MyReviewSummary = async (props) => {
  try {    

    if (props.state.projectGroup.status !== "review") return;
    const myReviewSummary = await callAPI(
      `/api/reviews/users/${props.state.user.userName}/projectgroups/${props.state.projectGroup._id}/count`, //+ CURRENT_PROJECT_GROUP,
      "get",
      props.state.user.token,
      undefined
    );
    if (!myReviewSummary) return;
    props.state.myReviewSummary = myReviewSummary;

    const summaryTable = document.createElement("table");

    const line1 = document.createElement("tr");
    const heart = document.createElement("td");
    const embeddedHeart = document.createElement("i");
    embeddedHeart.className = "fas fa-heart fa-lg liked-review";
    heart.appendChild(embeddedHeart);
    const likeNumber = document.createElement("td");
    likeNumber.id = "likeNumber";
    likeNumber.className = "liked-review";
    likeNumber.innerText = myReviewSummary.availableLike;
    const desc1 = document.createElement("td");
    //desc1.className = "liked-review";
    desc1.innerText =
      myReviewSummary.availableLike > 1
        ? "coups de coeur disponibles"
        : "coup de coeur disponible";
    line1.appendChild(heart);
    line1.appendChild(likeNumber);
    line1.appendChild(desc1);
    summaryTable.appendChild(line1);

    const line2 = document.createElement("tr");
    const comment1 = document.createElement("td");
    const embeddedComment1 = document.createElement("i");
    embeddedComment1.className = "fas fa-comment fa-lg expected-review";
    comment1.appendChild(embeddedComment1);
    const expectedReviews = document.createElement("td");
    expectedReviews.id = "expectedReviews";
    expectedReviews.className = "expected-review";
    expectedReviews.innerText = myReviewSummary.expectedReviews;
    const desc2 = document.createElement("td");
    //desc2.className = "expected-review";
    desc2.innerText =
      myReviewSummary.expectedReviews > 1
        ? "revues attendues"
        : "revue attendue";
    line2.appendChild(comment1);
    line2.appendChild(expectedReviews);
    line2.appendChild(desc2);
    summaryTable.appendChild(line2);

    const line3 = document.createElement("tr");
    const comment2 = document.createElement("td");
    const embeddedComment2 = document.createElement("i");
    embeddedComment2.className = "fas fa-comment fa-lg performed-review";
    comment2.appendChild(embeddedComment2);
    const performedReviews = document.createElement("td");
    performedReviews.id = "performedReviews";
    performedReviews.className = "performed-review";
    performedReviews.innerText = myReviewSummary.alreadyReviewed;
    const desc3 = document.createElement("td");
    //desc3.className = "performed-review";
    desc3.innerText =
      myReviewSummary.alreadyReviewed > 1
        ? "revues déjà faites"
        : "revue déjà faites";
    line3.appendChild(comment2);
    line3.appendChild(performedReviews);
    line3.appendChild(desc3);
    summaryTable.appendChild(line3);

    props.currentHtmlElement.appendChild(summaryTable);

    // props.renderDelayed => auto render was disabled
    props.parentHtmlElement.appendChild(props.currentHtmlElement);

    //return props.state;
  } catch (err) {
    console.error("MyReviewSummaryPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

export default GenericFunctionalComponent(MyReviewSummary);
