function Platform(pos) {
  this.pos = pos;
  this.color = "#cc7a00"
};

Platform.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color
  ctx.beginPath();
  ctx.rect(this.pos[0], this.pos[1], 200, 20);
  ctx.fill();
};

Platform.prototype.move = function move() {
  
};

module.exports = Platform;