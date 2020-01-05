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
  this.runningDictionary = {
    left: {
      8: [455, 15],
      7: [405, 15],
      6: [345, 15],
      5: [280, 15],
      4: [210 , 15],
      3: [150 , 15],
      2: [90 , 15],
      1: [25 , 15],
      0: [25, 15],

    }, 
    right: {
      8: [0, 15],
      7: [48, 15],
      6: [105, 15],
      5: [175, 15],
      4: [240, 15],
      3: [305, 15],
      2: [370, 15],
      1: [430, 15],
      0: [430, 15],
    },
  };
  this.dead = false;
};

PlayerSprite.prototype.draw = function draw(ctx) {
  let offset;
  if (!this.dead) {
    offset = [-30, -64];
  } else {
    offset = [-50,0];
  }
  ctx.drawImage(
    this.currentSpriteSheet, 
    this.currentSrcPos[0], 
    this.currentSrcPos[1],
    this.currentSrcDim[0],
    this.currentSrcDim[1],
    this.currentDestPos[0] + offset[0],
    this.currentDestPos[1] + offset[1],
    this.currentDestDim[0],
    this.currentDestDim[1]
    );

};  

PlayerSprite.prototype.move = function move(playerPos) {
  const posX = playerPos[0];
  const posY = playerPos[1];
  this.pos[0] = posX;
  this.pos[1] = posY;
};

PlayerSprite.prototype.getCurrentAnimationInfo = function getCurrentAnimationInfo(currentWalkingDirection, currentAnimation, direction, currentAnimationFrame, isAttacking, attackAnimationFrame, dead) {
  if (!dead) {
    this.dead = false;
    if (!isAttacking) {
      if ( currentAnimation === "ground" && !currentWalkingDirection) {
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
      } else {
        this.currentSpriteSheet = (direction === "right" ? this.running : this.runningReversed);
        this.currentSrcPos = this.runningDictionary[direction][Math.ceil(currentAnimationFrame / 10)]
        this.currentSrcDim = [45, 57];
        this.currentDestPos = this.pos;
        this.currentDestDim = [70, 100];
      }
    } else {

        this.currentSpriteSheet = (direction === "right" ? this.spriteSheet1 : this.spriteSheet1Reversed);
        if (attackAnimationFrame > 33 ) {
          this.currentSrcPos = (direction === "right" ? [63, 130] : [469, 130])
        } else {
          this.currentSrcPos = (direction === "right" ? [112, 130] : [428, 130])
        }
        this.currentSrcDim = [50, 55];
        this.currentDestPos = this.pos;
        this.currentDestDim = [80, 100]
    }
  } else {
    this.currentSpriteSheet = this.spriteSheet1;
    this.currentSrcPos = [125, 87];
    this.currentSrcDim = [60, 25];
    this.currentDestPos = this.pos;
    this.currentDestDim = [85, 40];
    this.dead = true;
  }
};

module.exports = PlayerSprite;
