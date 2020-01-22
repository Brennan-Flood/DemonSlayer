const Util = require("./util");
const EnemySprite = require("./enemy_sprite");
const HarderEnemySprite = require("./harder_enemy_sprite");
function Enemy(pos, id) {
  const hardVal = Math.random();
  this.pos = pos;
  this.vel = [0, 1];
  this.grav = 1;
  this.jumping = false;
  this.playerPos = null
  if (hardVal > 0.8) {
    this.harderType = true;
    this.sprite = new HarderEnemySprite(this.pos);
    this.baseRunspeed = 3;
    this.radius = 50;
    this.jumpSpeed = -22;


  } else {
    this.harderType = false;
    this.sprite = new EnemySprite(this.pos);
    this.baseRunspeed = 1;
    this.radius = 30;
    this.jumpSpeed = -16;

  }
  this.runSpeed = this.baseRunspeed;
  this.jumpCooldown = 80;
  this.id = id;
  this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  this.onPlatformCooldown = 0;
}

Enemy.prototype.draw = function draw(ctx) {
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
  this.sprite.draw(ctx, this.vel)
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Enemy.prototype.move = function move(dt, playerPos, playerIsDead) {
  if (this.vel[1] < 0) {
    this.jumping = true;
  } else if (this.pos[1] + this.vel[1] + 1 >= 480 - this.radius) {
    this.vel[1] = 480 - this.radius - this.pos[1];
    this.jumping = false;
  } else if (Util.atFloor(this)) {
    this.vel[1] = 0;
    this.jumping = false;
  }
  if (playerIsDead) {
    this.playerIsDead = true;
  };

  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);
  if (outOfBounds) {
    this.pos[0] = Util.wrap(this, outOfBounds)
  }
  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);
  if (onPlatform === 1 || onPlatform === 3) {
    this.pos[1] = 350 - this.radius;
    this.vel[1] = 0;
    this.onPlatform = true;
    this.currentPlatform = onPlatform;
  } else if (onPlatform === 2) {
    this.pos[1] = 200 - this.radius;
    this.vel[1] = 0;
    this.onPlatform = true;
    this.currentPlatform = onPlatform;
  } else {
    this.onPlatform = false;
  }
  this.moveTowardsPlayer(playerPos);
  this.shouldJump(playerPos);

  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,
    dx = this.vel[0] * velocityScale,
    dy = this.vel[1] * velocityScale;

  let newPosX = this.pos[0] + dx;
  let newPosY = this.pos[1] + dy;
  newPosY = (newPosY > 450 ? 450 : newPosY)
  this.pos[0] = newPosX;
  this.pos[1] = newPosY;
  this.sprite.move(this.pos);
  if (onPlatform !== false) {
    return;
  }
  this.vel[1] = (this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)
};

Enemy.prototype.moveTowardsPlayer = function moveTowardsPlayer(playerPos) {
  this.playerPos = playerPos;
  if ((this.onPlatform && (playerPos[1] > this.pos[1] && this.playerUnderneathPlatform()))) {
    this.vel[0] = this.plusOrMinus * this.runSpeed;
    this.onPlatformCooldown = 5;
  } else if ( this.playerIsDead ) {
    this.vel[0] = this.plusOrMinus * this.runSpeed;
  } else { 
    if (this.pos[0] < playerPos[0] && this.onPlatformCooldown === 0) {
      this.vel[0] = this.runSpeed;
    } else if (this.pos[0] > playerPos[0] && this.onPlatformCooldown === 0) {
      this.vel[0] = -this.runSpeed;
    } else {
      this.onPlatformCooldown -= 1;
    }
  }
};

Enemy.prototype.shouldJump = function shouldJump(playerPos) {
  if (this.jumpCooldown > 0) {
    this.jumpCooldown -= 1;
    return;
  }
  if (playerPos[1] < this.pos[1] && this.vel[1] === 0) {
    this.vel[1] = this.jumpSpeed;
    this.jumpCooldown = 100 + Math.floor(Math.random() * 120);
  } else {
    return;
  }
}

Enemy.prototype.playerUnderneathPlatform = function playerUnderneathPlatform() {
  if (this.currentPlatform === 1 && (this.playerPos[0] <= 225 && this.playerPos[0] >= 25)) {
    return true;
  } else if (this.currentPlatform === 2 && (this.playerPos[0] <= 450 && this.playerPos[0] >= 250)) {
    return true;
  } else if (this.currentPlatform === 3 && (this.playerPos[0] <= 675 && this.playerPos[0] >= 475)) {
    return true
  } else {
    return false;
  }
};

Enemy.prototype.getFaster = function getFaster(demonsSlain) {
  this.runSpeed = this.baseRunspeed + demonsSlain / 20;
};

module.exports = Enemy;