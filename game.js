(function(window) {

  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, DIM_X, DIM_Y) {
    this.ctx = ctx;
    this.asteroids = [];
    for (var i = 0; i < 10; i++) {
      this.asteroids.push(window.Asteroids.Asteroid.randomAsteroid(500, 500));
    }
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.ship = new window.Asteroids.Ship([DIM_X / 2, DIM_Y / 2]);
    this.bullets = [];
  }

  Game.prototype.removeBullet = function(poo) {
    var that = this;
    this.bullets.forEach(function(bullet, index) {
      if ( poo == bullet ){
        that.bullets.splice(index, 1);
      }
    });
  }

  Game.prototype.removeAsteroid = function(index) {
    this.asteroids.splice(index, 1);
  }

  Game.prototype.fireBullet = function() {
    var bulletCheck = this.ship.fireBullet(this);
    console.log(bulletCheck);
    if (bulletCheck) {
      this.bullets.push(bulletCheck);
    }
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ship.draw(this.ctx);
    this.bullets.forEach(function(bullet) {
      bullet.draw(this.ctx);
    });
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(this.ctx);
    });
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids();
    });
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        window.alert("BOOM BABY");
        that.stop();
      }
    });
  }

  Game.prototype.stop = function() {
    window.clearInterval(intervalId);
  }

  Game.prototype.move = function() {
    var that = this;
    this.ship.move();
    this.ship.slowDown();
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.asteroids.forEach(function(asteroid, index) {
      if ( that.outBoundsX(asteroid.pos[0]) || that.outBoundsY(asteroid.pos[1]) ){
        that.asteroids.splice(index, 1);
      }
    });
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    this.bullets.forEach(function(bullet, index) {
      if ( that.outBoundsX(bullet.pos[0]) || that.outBoundsY(bullet.pos[1]) ){
        that.bullets.splice(index, 1);
      }
    });
		for (var i = 0; i < this.ship.pos.length; i++) {
			if (this.ship.pos[i] > 720) {
				this.ship.pos[i] -= 720;
			} else if (this.ship.pos[i] < 0) {
				this.ship.pos[i] += 720;
			}
		}
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('up', function(){ that.ship.power([0, -1]) });
    key('down', function(){ that.ship.power([0, 1]) });
    key('left', function(){ that.ship.power([-1, 0]) });
    key('right', function(){ that.ship.power([1, 0]) });
    key('space', function(){ that.fireBullet() });
  }

  Game.prototype.outBoundsX = function(number) {
    return (number < 0 || number > this.DIM_X);
  }
  Game.prototype.outBoundsY = function(number) {
    return (number < 0 || number > this.DIM_Y);
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
    if (this.asteroids.length < 7) {
      this.asteroids.push(window.Asteroids.Asteroid.randomAsteroid(500, 500));
    }
  }

  var intervalId;

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    intervalId = window.setInterval(this.step.bind(this), 30);
  }

})(this);