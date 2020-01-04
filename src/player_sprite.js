function PlayerSprite(pos) {
  this.pos = pos;
  this.currentAnimation = null;
  this.currentSpriteSheet = null;
  this.currentSrcPos = null;
  this.currentSrcDim = null;
  this.currentDestPos = null;
  this.currentDestDim = null;
  this.spriteSheet1 = new Image();
  this.spriteSheet1.src = "assets/tanjiro_base_spritesheet.png";
  this.spriteSheet1Reversed = new Image();
  this.spriteSheet1Reversed.src = "assets/tanjiro_base_spritesheet_reversed.png";
  this.running = new Image();
  this.running.src = "assets/tanjro_run.png";
  this.runningReversed = new Image();
  this.runningReversed.src = "assets/tanjiro_run_reversed.png";
};

PlayerSprite.prototype.draw = function draw(ctx) {

  ctx.drawImage(
    this.currentSpriteSheet, 
    this.currentSrcPos[0], 
    this.currentSrcPos[1],
    this.currentSrcDim[0],
    this.currentSrcDim[1],
    this.currentDestPos[0] -30,
    this.currentDestPos[1] -64,
    this.currentDestDim[0],
    this.currentDestDim[1]);

};  

PlayerSprite.prototype.move = function move(playerPos) {
  const posX = playerPos[0];
  const posY = playerPos[1];
  this.pos[0] = posX;
  this.pos[1] = posY;
};

PlayerSprite.prototype.getCurrentAnimationInfo = function getCurrentAnimationInfo(currentWalkingDirection, currentAnimation, direction, currentAnimationFrame, isAttacking, attackAnimationFrame) {
  if (!isAttacking) {
    if ( currentAnimation === "ground") {
      this.currentSpriteSheet = (direction === "right" ? this.spriteSheet1 : this.spriteSheet1Reversed);
      this.currentSrcPos = (direction === "right" ? [0, 5] : [543, 5]);
      this.currentSrcDim = [45, 57];
      this.currentDestPos = this.pos;
      this.currentDestDim = [70, 100];
    } else if (currentAnimation === "air") {
        this.currentSpriteSheet = (direction === "right" ? this.spriteSheet1 : this.spriteSheet1Reversed );
        this.currentSrcPos = (direction === "right" ? [270,235] : [273, 235]);
        this.currentSrcDim = [45, 50];
        this.currentDestPos = this.pos;
        this.currentDestDim = [70, 100];
    }
  } else {

  }
};

module.exports = PlayerSprite;
