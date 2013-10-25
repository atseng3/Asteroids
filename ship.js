(function(window) {

  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos) {
    this.RAD = 10;
    this.COL = "red";
    this.pos = pos;
    this.vel = [1, 1];
    window.Asteroids.MovingObject.call(this, this.pos, this.vel, this.RAD, this.COL);
  }

  Ship.inherits(window.Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.slowDown = function() {
    this.vel[0] *= 0.99;
    this.vel[1] *= 0.99;
  }

  Ship.prototype.fireBullet = function(game) {
    if (this.vel != [0, 0]) {
      var spd = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
      var dir = [this.vel[0]/spd, this.vel[1]/spd];
       return new window.Asteroids.Bullet(this.pos, [dir[0] * 10 * spd, dir[1] * 10 * spd], game);
    }
  }


})(this);