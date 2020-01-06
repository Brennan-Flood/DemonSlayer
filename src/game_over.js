function GameOver() {
  
}

GameOver.prototype.draw = function draw(ctx) {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("You Have Been Defeated", 700 / 2, 480 / 2);
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("(press 'return' to restart)", 700 / 2, 530 / 2);
};

module.exports = GameOver;