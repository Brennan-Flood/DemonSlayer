function PlatformSprite(platformPos) {
  this.pos = platformPos;
  this.spriteSheet = new Image();
  this.spriteSheet.src = "assets/tilesets.png"
  this.srcPos = [273, 4];
  this.srcDim = [27, 24];
  this.destDim = [200, 20];
};

PlatformSprite.prototype.draw = function draw(ctx) {
  ctx.drawImage(
    this.spriteSheet,
    this.srcPos[0],
    this.srcPos[1],
    this.srcDim[0],
    this.srcDim[1],
    this.pos[0],
    this.pos[1],
    this.destDim[0],
    this.destDim[1]
  );
};

PlatformSprite.prototype.move = function move() {

};

module.exports = PlatformSprite;