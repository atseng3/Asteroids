Function.prototype.inherits = function(obj) {
  function Surrogate() {};
  Surrogate.prototype = obj.prototype;
  this.prototype = new Surrogate();
}

// function Animal(name) {
//   this.name = name;
// };
//
// Animal.prototype.sayHello = function() {
//   console.log("Hello, " + this.name);
// };
//
// function Dog(name) {
//   this.name = name;
// };
//
// Dog.inherits(Animal);
//
// var d = new Dog("gizmo");
// d.sayHello();