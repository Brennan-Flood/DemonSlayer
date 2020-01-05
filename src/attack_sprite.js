function AttackSprite(pos) {
  this.pos = pos;
  this.spriteSheet = new Image();
  this.spriteSheet.src = "assets/tanjiro_base_spritesheet.png";
  this.spriteSheetReversed = new Image();
  this.spriteSheetReversed.src = "assets/tanjiro_base_spritesheet_reversed.png";
  this.srcPos = [0, 0];
  this.srcDim = [0, 0];
  this.destPos = pos;
  this.destDim = [0, 0];
  this.direction = "right";
  this.attackDirectionOffset = null;
  this.currentSpriteSheet = null;
}

AttackSprite.prototype.draw = function draw(ctx) {
  if (this.direction === "right") {
    this.attackDirectionOffset = [30, -80];
    this.currentSpriteSheet = this.spriteSheet;
  } else {
    this.attackDirectionOffset = [-30, -80];
    this.currentSpriteSheet = this.spriteSheetReversed;
  }
  this.destPos = this.pos.map((val) => {
    return val;
  });
 
  ctx.drawImage(
    this.currentSpriteSheet,
    this.srcPos[0],
    this.srcPos[1],
    this.srcDim[0],
    this.srcDim[1],
    this.destPos[0],
    this.destPos[1] + this.attackDirectionOffset[1],
    this.destDim[0],
    this.destDim[1]
    );

};

AttackSprite.prototype.move = function move(attackPos) {
  this.pos = attackPos;
};

module.exports = AttackSprite;