function AttackSprite(pos) {
  this.pos = pos;
  this.spriteSheet = new Image();
  this.spriteSheet.src = "assets/tanjiro_base_spritesheet.png";
  this.srcPos = [0, 0];
  this.srcDim = [0, 0];
  this.destPos = [0, 0];
}

AttackSprite.prototype.draw = function draw(ctx) {
  ctx.drawImage(
    this.currentSpriteSheet,
    this.SrcPos[0],
    this.SrcPos[1],
    this.SrcDim[0],
    this.SrcDim[1],
    this.DestPos[0],
    this.DestPos[1],
    this.DestDim[0],
    this.DestDim[1]
    );

};

AttackSprite.prototype.move = function move(attackPos) {
  this.pos = attackPos;
};

module.exports = AttackSprite;