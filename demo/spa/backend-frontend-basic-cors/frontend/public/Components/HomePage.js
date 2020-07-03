let homePage = `<p>Welcome to MyCMS...</p>
`;
let page = document.querySelector("#page");
let timer;

const HomePage = async () => {
  console.log("HomePage: start");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
  let messageBoard = document.querySelector("p");
  /* simulate the call to the API */
  try {
    const messageFromAPI = await mockupCallToUserMessageAPI(5);
    messageBoard.innerText = messageFromAPI;
  } catch (err) {
    console.error("HomePage::err:", err);
    messageBoard.innerText = err + " Maybe you are impatient ? ; )";
  }
  console.log("HomePage: end");
};

/* mockupCallToAPI */
const mockupCallToUserMessageAPI = (timeInSec) => {
  return new Promise((resolve, reject) => {
    const onClick = () => {
      clearTimeout(timer);
      reject("Error : Click on Home Page prior to content was loaded.");
    };
    window.addEventListener("click", onClick);

    timer = setTimeout(() => {
      /* simulation of the return of a fetch operation from a RESTful API.
      Here, we want to return data that is specific to the user. Currently, the session data
      is managed at server side... Therefore we will not provide yet any specific client info*/
      window.removeEventListener("click", onClick);
      return resolve("Welcome dear user of MyCMS. Please enjoy your stay.");
    }, timeInSec * 1000);
  });
};

const onWindowClick = () => {
  clearTimeout(timer);
  promise.reject("Error : Click on Home Page prior to content was loaded.");
};

export default HomePage;
