function GameOver() {
  
}

GameOver.prototype.draw = function draw(ctx) {
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("You Have Been Defeated", 700 / 2, 480 / 2);
};

module.exports = GameOver;