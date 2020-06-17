raiseAlert("This is an alert!");
/**
 * JSDoc as comments
 * @param {message} message to be displayed in console
 */
function raiseAlert(message) {
  // Single line comment
  console.log(message);
  /* Regular comment
    on multiple lines
    */
  console.log("An alert has been raised.");
}

let x = 1;
console.log("x = ", x);

// two different variables
let monBrowser;
let monbrowser;

i = 10;

1 == 1; // true
"1" == 1; // true
0 == false; // true
0 == null; // false
var object1 = { key: "value" },
  object2 = { key: "value" };
object1 == object2; //false

1 === 1; // true
"1" === 1; // false

function welcomeMessage(message) {
  return "Message : " + message;
}
let message = welcomeMessage("Welcome to everyone!");
console.log(message); // Message : Welcome to everyone!

// welcomeMessage() is defined previously
x = welcomeMessage;
message = x("Hi");
console.log(message); // Message : Hi

let welcome = function (message) {
  return "Message : " + message;
};
message = welcome("Hello world ; )");
console.log(message); // Message : Hello world ; )

let welcome2 = (message) => {
  return "Message : " + message;
};
message = welcome2("Hello world...");
console.log(message); // Message : Hello world...
// OTHER EXAMPLE
const higher = (n) => n + 1;
console.log(higher(1)); // 2

let welcome3 = function (message = "HI DEAR HUMAN!") {
  return "Message : " + message;
};
message = welcome3();
console.log(message); // HI DEAR HUMAN
