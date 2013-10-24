(function (window) {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, rad, col) {
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.col = col;
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.col;
    ctx.lineWidth = 4;
    ctx.beginPath();

    ctx.arc(
        this.pos[0],
        this.pos[1],
        this.rad,
        0,
        2 * Math.PI,
        false
    );

    ctx.stroke();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dx = otherObject.pos[0] - this.pos[0];
    var dy = otherObject.pos[1] - this.pos[1];
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    var radsum = otherObject.rad + this.rad
    if (dist < radsum) {
      return true;
    } else {
      return false;
    }
  }
})(this);