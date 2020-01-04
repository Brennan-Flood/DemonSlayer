function AttackSprite(pos) {
  this.pos = pos;
  this.spriteSheet = new Image();
  this.spriteSheet.src = "assets/tanjiro_base_spritesheet.png";
  this.srcPos = [0, 0];
  this.srcDim = [0, 0];
  this.destPos = [0, 0];
  this.destDim = [0, 0];
}

AttackSprite.prototype.draw = function draw(ctx) {
  ctx.drawImage(
    this.spriteSheet,
    this.srcPos[0],
    this.srcPos[1],
    this.srcDim[0],
    this.srcDim[1],
    this.destPos[0],
    this.destPos[1],
    this.destDim[0],
    this.destDim[1]
    );
    console.log("drawing attack sprite")

};

AttackSprite.prototype.move = function move(attackPos) {
  this.pos = attackPos;
};

module.exports = AttackSprite;