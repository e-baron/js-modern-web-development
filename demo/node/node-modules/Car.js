// installed package
const shortid = require('shortid');
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this._id = shortid.generate(); ////Math.random();
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
// default export
//module.exports = Car;
// export as named object
exports.Car = Car;
