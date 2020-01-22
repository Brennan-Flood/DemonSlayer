function Score() {
  this.score = 0;
};

Score.prototype.draw = function draw(ctx) {
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText(`Demons Slain:  ${this.score}`, 65, 16);
};

Score.prototype.move = function move() {

};

Score.prototype.addToScore = function addToScore(val) {
  this.score += val;
};

module.exports = Score;