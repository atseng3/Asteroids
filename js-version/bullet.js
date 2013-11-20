(function (window) {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  // load in moving_object.js

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    var COL = "brown";
    var RAD = 2;
    this.game = game;
		this.life = 10;
    // var shiprad = window.Asteroids.Ship.RAD;
    window.Asteroids.MovingObject.call(this, [pos[0],pos[1]], vel, RAD, COL);
  }

  Bullet.inherits(window.Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var that = this;
    console.log(this);
    this.game.asteroids.forEach(function(asteroid, index) {
      if(asteroid.isCollidedWith(that)) {
        that.game.removeAsteroid(index);
        that.game.removeBullet(that);
      }
    });
  }

})(this);