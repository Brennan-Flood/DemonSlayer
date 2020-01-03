const Util = require("./util");

function Player() {
  this.pos = [300, 300];
  this.vel = [0, 1]
  this.radius = 30;
  this.grav = 1;
  this.jumpFramesLeft = 0;
  this.walkingLeft = false;
  this.walkingRight = false;
  this.runSpeed = 3;
  this.dashSpeed = 6;
  this.jumping = null;
  this.lastDirection = "right";
  this.dead = false;
  this.currentAnimation = null;
  this.currentAnimationFrame = null;
  this.currentWalkingDirection = null;
  this.atFloor = false;
}

Player.prototype.draw = function draw(ctx) {
  ctx.fillStyle = "#ffffff"
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
  this.getCurrentAnimation();
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Player.prototype.move = function move(dt) {
  if (this.vel[1] < 0 ) {
    this.jumping = true;
    this.atFloor = false;
  } else if (this.pos[1] + this.vel[1] + 1 >= 465) {
    this.vel[1] = 450 - this.pos[1];
    this.jumping = false;
    this.atFloor = false;
  } else if (Util.atFloor(this)){
    this.vel[1] = 0; 
    this.jumping = false;
    this.atFloor = true;
  } else {
    this.atFloor = false;
    this.jumping = true;
  }

  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);
  if (outOfBounds) {
    this.pos[0] = Util.wrap(this, outOfBounds)
  }
  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);
  if (onPlatform === 1 || onPlatform === 3) {
    this.pos[1] = 350 - this.radius;
    this.vel[1] = 0;
    this.onPlatform = true;
  } else if (onPlatform === 2) {
    this.pos[1] = 200 - this.radius;
    this.vel[1] = 0;
    this.onPlatform = true;
  } else {
    this.onPlatform = false;
  }

  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,
    dx = this.vel[0] * velocityScale,
    dy = this.vel[1] * velocityScale;
  
  let newPosX = this.pos[0] + dx;
  let newPosY = this.pos[1] + dy;
  newPosY = (newPosY > 450 ? 450 : newPosY )
  this.pos[0] = newPosX;
  this.pos[1] = newPosY;
  if (onPlatform !== false ) {
    return;
  } 
  this.vel[1] = ( this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)
};

Player.prototype.jump = function jump() {
  if (this.vel[1] === 0 && ( Util.onPlatform(this.pos, this.radius, this.vel) !== false || Util.atFloor(this) !== false) ) {
  this.vel[1] = -16;
  this.jumpFramesLeft = 6;
  this.jumpsLeft = 1;
  } else if (this.jumpsLeft === 1) {
    this.vel[1] = -12;
    this.jumpsLeft = 0;
  }
};

Player.prototype.walk = function walk(dir) {
  let speed;
  speed = (this.dashing ? this.dashSpeed : this.runSpeed)
  if (dir === "left" ) {
    this.vel[0] = -speed;
    this.walkingLeft = true;
    this.lastDirection = "left";
  } else if (dir === "right") {
    this.vel[0] = speed;
    this.walkingRight = true;
    this.lastDirection = "right";
  } else {
    this.walkingLeft = false;
    this.walkingRight = false;
    this.vel[0] = 0
  }
};

Player.prototype.dash = function dash() {
  this.dashing = true;
  if (this.walkingLeft) {
    this.vel[0] = -this.dashSpeed;
  } else if (this.walkingRight) {
    this.vel[0] = this.dashSpeed;
  }
};

Player.prototype.stopWalking = function stopWalking(dir) {
  let speed;
  speed = (this.dashing ? this.dashSpeed : this.runSpeed)
  if (dir === "left" && this.walkingRight === true) {
    this.vel[0] = speed;
    this.walkingLeft = false;
    this.lastDirection = "right";
  } else if (dir === "right" && this.walkingLeft === true) {
    this.vel[0] = -speed;
    this.walkingRight = false;
    this.lastDirection = "left";
  } else if ((dir === "right" && !this.walkingLeft)) {
    this.vel[0] = 0;
    this.walkingRight = false;
  } else if (dir === "left" && !this.walkingRight) {
    this.vel[0] = 0;
    this.walkingLeft = false;
  }
}


Player.prototype.stopDash = function stopDash() {
  this.dashing = false;
  if (this.walkingLeft && !this.walkingRight) {
    this.vel[0] = -this.runSpeed;
  } else if (this.walkingRight && !this.walkingLeft) {
    this.vel[0] = this.runSpeed;
  }
};

Player.prototype.getCurrentAnimation = function getCurrentAnimation() {
  if (this.atFloor || this.onPlatform) {
    if (this.currentAnimation === "ground" && this.currentAnimationFrame > 0) {
      this.currentAnimationFrame -= (this.dashing ? 1.5 : 1)
      
    } else {
      this.currentAnimationFrame = 80;
    }
    this.currentAnimation = "ground";
    if (this.walkingLeft) {
      this.currentWalkingDirection = "left";
    } else if (this.walkingRight) {
      this.currentWalkingDirection = "right";
    } else {
      this.currentWalkingDirection = null;
    }
  } else {
    if (this.currentAnimation === "air" && this.currentAnimationFrame > 0) {
      this.currentAnimationFrame -= 1
    } else {
      this.currentAnimationFrame = 80;
    }
    this.currentAnimation = "air";
  }
};

module.exports = Player;