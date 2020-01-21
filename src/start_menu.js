function StartMenu() {

};

StartMenu.prototype.draw = function draw(ctx) {
  ctx.font = "40px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("Demon Slayer", 700 / 2, 480 / 3);
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("-Use 'W,A,S,D' to move, 'space' to attack, and 'shift' to dash", 700 / 2, 480 / 2);
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("-Press 'return' to start playing, or reset at any time", 700 / 2, 540 / 2);
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("-Press 'esc' to return to the start menu", 700 / 2, 600 / 2);
};

StartMenu.prototype.move = function move() {

};

module.exports = StartMenu;
