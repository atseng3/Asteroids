var sum = function() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

Function.prototype.myBind = function(obj) {
  var that = this;
  var that_arguments = Array.prototype.slice.call(arguments, 0);
  return function() {
    var this_arguments = Array.prototype.slice.call(arguments, 0);
    that.apply(obj, that_arguments.concat(this_arguments));
  }
}

// console.log(sum(1,2,3,4));

// function Cat(name) {
//   this.name = name;
// }
//
// function Dog(name) {
//   this.name = name;
//   this.bark = function() {
//     console.log(this.name + "bark" + arguments);
//   }
// }
//
// Cat.prototype.meow = function() {
//   console.log(this.name + "meow");
//   for (var i = 0; i < arguments.length; i++){
//     console.log(arguments[i]);
//   }
// }
//
// c1 = new Cat("gizmo");
// // console.log(c1.meow.myBind(c1)
//
// d1 = new Dog("snoopy");
// var meowOnDog = c1.meow.myBind(d1, 1, 2);
// meowOnDog(3);
//

function curriedSum(numArgs) {
  var numbers = [];
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length == numArgs) {
      var sum = 0;
      numbers.forEach(function(element) {
        sum += element;
      });
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}
//
// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56


Function.prototype.curry = function(numArgs) {
  var that = this;
  var args = [];
  return function yellow_curry(arg) {
    args.push(arg);
    if (args.length == numArgs) {
      return that.apply(null, args);
    } else {
     return  yellow_curry;
    }
  }
}

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 3); // == 27

// you'll write `Function#curry`!
// var f1 = sumThree.curry(3);
// var f2 = f1(4);
// var f3 = f2(20);
// var result = f3(3); // = 27

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(3)); // == 27