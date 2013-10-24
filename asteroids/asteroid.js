(function (window) {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  // load in moving_object.js

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    var COLS = ["grey", "blue", "chocolate", "orange", "coral", "crimson", "aqua", "blueviolet"];
    var COL = COLS[Math.floor(Math.random() * COLS.length)]
    var RAD = Math.floor(Math.random() * 40 + 1);
    window.Asteroids.MovingObject.call(this, pos, vel, RAD, COL);
  }

  Asteroid.inherits(window.Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var posX = randomVec(dimX);
    var posY = randomVec(dimY);
    var velX = randomVec(4) * randomSign();
    var velY = randomVec(4) * randomSign();
    return new Asteroid([posX, posY], [velX, velY]);
  }

  function randomVec(upper) {
    return Math.floor(Math.random() * upper + 1);
  }

  function randomSign() {
    return [-1,1][Math.floor(Math.random() * 2)];
  }

})(this);