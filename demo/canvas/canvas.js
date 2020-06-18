"use strict";
const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : form validation with HTML5 validation constraints";
const FOOTER_TEXT = "Happy learning : )";

const RECT_NUMBER = 101;

let myCanva = document.querySelector("canvas");
let myContext = myCanva.getContext("2d");
let page = document.querySelector("#page");
//get dimensions of page div to get a full page animation
let pageWidth = page.clientWidth;
let pageHeight = page.clientHeight;
myCanva.width = pageWidth - 20;
myCanva.height = pageHeight - 0;

// call the callback to draw our animation when the browser is ready
requestAnimationFrame(draw_2D);

function draw_2D() {  
  // Reset everything done in the previous frame
  // We could force the width or height of canvas to force a redraw myCanva.width = pageWidth;myCanva.height = pageHeight;
  // however that would not be optimized.
  myContext.clearRect(0, 0, pageWidth, pageHeight);

  myContext.fillStyle = "blue"; //'rgba(255,0,0,0.5)';//'blue';

  //draw dynamically the rectangles at random locations
  for (let i = 0; i < RECT_NUMBER; i++) {
    myContext.fillRect(
      Math.floor(Math.random() * pageWidth),
      Math.floor(Math.random() * pageHeight),
      20,
      20
    );
  }
  // Refresh automatically the animation via this recursive call :
  requestAnimationFrame(draw_2D);

  // Slow the animation down via setTimeout
  //requestAnimationFrame(setTimeout(draw_2D,1000));
}

const onClickBody = (e) => {
  // get the width of the window
  pageWidth = window.innerWidth;
  pageHeight = window.innerHeight;
  myCanva.width = pageWidth - 40;
  myCanva.height = pageHeight - 0;
};

document.querySelector("body").addEventListener("click", onClickBody);

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);

/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerTitle} headerTitle
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 */
function setLayout(headerTitle, pageTitle, footerText) {
  document.querySelector("#headerTitle").innerText = headerTitle;
  document.querySelector("title").innerText = pageTitle;
  document.querySelector("#pageTitle").innerText = pageTitle;
  document.querySelector("#footerText").innerText = footerText;
}
