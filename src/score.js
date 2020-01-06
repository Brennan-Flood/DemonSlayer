function Score() {
  this.score = 0;
};

Score.prototype.draw = function draw(ctx) {
  ctx.font = "15px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(`Demons Slain: ${this.score}`, 60, 15);
};

Score.prototype.move = function move() {

};

Score.prototype.addToScore = function addToScore() {
  this.score += 1;
};

module.exports = Score;