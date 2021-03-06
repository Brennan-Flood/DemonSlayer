const Game = require("./src/game");
const Render = require("./src/render");

document.addEventListener("DOMContentLoaded", function () {
  const cvs = document.getElementsByTagName("canvas")[0];
  cvs.width = Game.WIDTH;
  cvs.height = Game.HEIGHT;

  const ctx = cvs.getContext("2d");
  const game = new Game(ctx);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 87 || evt.keyCode === 38  ) {
      game.upKey();
    } else if (evt.keyCode === 65 || evt.keyCode === 37 ) {
      game.leftKey();
    } else if (evt.keyCode === 83) {
      
    } else if (evt.keyCode ===  68 || evt.keyCode === 39 ) {
      game.rightKey();
    } else if (evt.keyCode === 32) {
      game.startAttack();
    } else if (evt.keyCode === 16) {
      game.shiftKey();
    } else if (evt.keyCode === 13){
      game.restart();
    } else if (evt.keyCode === 27) {
      game.returnToStartMenu();
    } else {

    }
  }, false)

  document.addEventListener('keyup', function(evt) {
    if (evt.keyCode === 65 || evt.keyCode === 37 ) {
      game.stopWalking("left");
  } else if (evt.keyCode === 68 || evt.keyCode === 39 ) {
      game.stopWalking("right");
    } else if (evt.keyCode === 16) {
      game.stopDash();
    }
  }, false)
  new Render(game, ctx).start();
});



// w: 87,
// a: 65,
// s: 83,
// d: 68,
// space: 32