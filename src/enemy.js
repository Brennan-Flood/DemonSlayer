const Util = require("./util");

function Enemy(pos) {
  this.pos = pos;
  this.vel = [0, 1];
  this.grav = 1;
  this.radius = 30;
  this.jumping = false;
}

Enemy.prototype.draw = function draw(ctx) {
  ctx.fillStyle = "#ff0000"
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Enemy.prototype.move = function move(dt) {
  if (this.vel[1] < 0) {
    this.jumping = true;
  } else if (this.pos[1] + this.vel[1] + 1 >= 465) {
    this.vel[1] = 450 - this.pos[1];
    this.jumping = false;
  } else if (Util.atFloor(this)) {
    this.vel[1] = 0;
    this.jumping = false;
  }

  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);
  if (outOfBounds) {
    this.pos[0] = Util.wrap(this, outOfBounds)
  }
  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);
  if (onPlatform === 1 || onPlatform === 3) {
    this.pos[1] = 350 - this.radius;
    this.vel[1] = 0;
  } else if (onPlatform === 2) {
    this.pos[1] = 200 - this.radius;
    this.vel[1] = 0;
  }

  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,
    dx = this.vel[0] * velocityScale,
    dy = this.vel[1] * velocityScale;

  let newPosX = this.pos[0] + dx;
  let newPosY = this.pos[1] + dy;
  newPosY = (newPosY > 450 ? 450 : newPosY)
  this.pos[0] = newPosX;
  this.pos[1] = newPosY;
  if (onPlatform !== false) {
    return;
  }
  this.vel[1] = (this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)
};

module.exports = Enemy;