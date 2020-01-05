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
    this.destPos[0] - 25,
    this.destPos[1] - 50,
    this.destDim[0],
    this.destDim[1]
  );
};

EnemySprite.prototype.move = function move(pos) {
  this.pos = pos;
};

EnemySprite.prototype.getSpriteInfo = function getSpriteInfo(enemyVel) {
  if (enemyVel[1] !== 0) {
    if (this.lastDirection === "right") {
      this.currentSpriteSheet = this.reversedSpriteSheet;
      this.srcPos = [732 , 53];
      this.srcDim = [25, 50];
      this.destPos = this.pos;
      this.destDim = [50, 80];
    } else {
      this.currentSpriteSheet = this.spriteSheet;
      this.srcPos = [280, 53];
      this.srcDim = [25, 50];
      this.destPos = this.pos;
      this.destDim = [50, 80];
    }
  } else {
    if (this.lastDirection === "right") {
      this.currentSpriteSheet = this.reversedSpriteSheet;
      this.srcPos = [785, 54];
      this.srcDim = [25, 46];
      this.destPos = this.pos;
      this.destDim = [50, 80];
    } else {
      this.currentSpriteSheet = this.spriteSheet;
      this.srcPos = [230, 54];
      this.srcDim = [25, 46];
      this.destPos = this.pos;
      this.destDim = [50, 80];
    }
  }
};

module.exports = EnemySprite;