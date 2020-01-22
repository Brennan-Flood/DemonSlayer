function StartMenu() {

};

StartMenu.prototype.draw = function draw(ctx) {
  ctx.font = "50px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("Demon Slayer", 700 / 2, 480 / 3);
  ctx.font = "18px Open Sans";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Survive for as long as you can!", 700 / 2, 400 / 2);
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("-Use 'W,A,S,D' to move, 'space' to attack, and 'shift' to dash", 700 / 2, 480 / 2);
  ctx.font = "20px Open Sans";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.fillText("Press 'return' to start", 700 / 2, 330);
  ctx.font = "16px Open Sans";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("-Press 'esc' to return to the main menu", 700 / 2, 540 / 2);
};

StartMenu.prototype.move = function move() {

};

module.exports = StartMenu;
