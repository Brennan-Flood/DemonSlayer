function ScorePopup(val, pos) {
  this.pos = pos;
  this.value = val;
  this.timeLeft = 60;
  this.vel = [0, -1];
};

ScorePopup.prototype.draw = function draw(ctx) {
  ctx.font = "18px Open Sans";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`+ ${this.value}`, this.pos[0], this.pos[1]);
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

ScorePopup.prototype.move = function move(dt) {

  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,
    dy = this.vel[1] * velocityScale;

  this.pos[1] += dy;
  this.timeLeft -= 1;
};

module.exports = ScorePopup;