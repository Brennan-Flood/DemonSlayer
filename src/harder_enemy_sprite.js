function EnemySprite(pos) {
  this.pos = pos;
  this.spriteSheet = new Image();
  this.spriteSheet.src = "assets/enemySprites.png";
  this.reversedSpriteSheet = new Image();
  this.reversedSpriteSheet.src = "assets/enemySpritesReversed.png"
  this.srcPos = [0, 0];
  this.srcDim = [0, 0];
  this.destPos = this.pos;
  this.destDim = [0, 0];
  this.animationFrame = 40;
  this.lastDirection = null;
  this.currentSpriteSheet = this.reversedSpriteSheet;
}

EnemySprite.prototype.draw = function draw(ctx, enemyVel) {
  if (enemyVel[0] > 0) {
    this.lastDirection = "right";
  } else {
    this.lastDirection = "left";
  }
  this.getSpriteInfo(enemyVel);
  ctx.drawImage(
    this.currentSpriteSheet,
    this.srcPos[0],
    this.srcPos[1],
    this.srcDim[0],
    this.srcDim[1],
    this.destPos[0] - 32,
    this.destPos[1] - 63,
    this.destDim[0],
    this.destDim[1]
  );
};

EnemySprite.prototype.move = function move(pos) {
  this.pos = pos;
};

EnemySprite.prototype.getSpriteInfo = function getSpriteInfo(enemyVel) {
  if (enemyVel[1] <= 2 && enemyVel[1] >= 0) {
    if (this.lastDirection === "right") {
      this.currentSpriteSheet = this.reversedSpriteSheet;
      this.srcPos = [1011, 781];
      this.srcDim = [33, 53];
      this.destPos = this.pos;
      this.destDim = [70, 120];
    } else {
      this.currentSpriteSheet = this.spriteSheet;
      this.srcPos = [0, 781];
      this.srcDim = [33, 53];
      this.destPos = this.pos;
      this.destDim = [70, 120];
    }
  } else {
    if (this.lastDirection === "right") {
      this.currentSpriteSheet = this.reversedSpriteSheet;
      this.srcPos = [980, 767];
      this.srcDim = [28, 64];
      this.destPos = this.pos;
      this.destDim = [70, 120];
    } else {
      this.currentSpriteSheet = this.spriteSheet;
      this.srcPos = [34, 767];
      this.srcDim = [28, 64];
      this.destPos = this.pos;
      this.destDim = [70, 120];
    }
  }
};

module.exports = EnemySprite;