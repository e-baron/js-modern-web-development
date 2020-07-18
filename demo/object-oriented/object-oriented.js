"use strict";
const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE =
  "Demo : Oriented Object Programming";
const FOOTER_TEXT = "Happy learning : )";

let btn = document.querySelector("#btn");
let page = document.querySelector("#page");

let raphael = {
  firstname: "Raphael",
  lastname: "Baroni",
  sayHello: () => "Hi everyone !",
};

let sandra = {}; 
sandra.firstname = "Sandra";
sandra.lastname = "Parisi";

class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this._id = Math.random();
  }
  get id() {
    return this._id;
  }
  getDescription() {
    return (
      "Car's description : " +
      this.brand +
      ", " +
      this.model +
      " , ID:" +
      this.id
    );
  }
}

let dacia = new Car("Dacia", "Sandero");

btn.addEventListener("click", function () {
  console.log("click::sayHello(): ", raphael.firstname, " :" , raphael.sayHello());

  console.log("click: get object properties: ",
    sandra.firstname,
    sandra.lastname,
    sandra["firstname"],
    sandra["lastname"]
  );

  page.innerText = dacia.getDescription();
});


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