function Render(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.playing = false;
}

Render.prototype.start = function start() {
  this.lastTime = 0;
  this.addStartMenu();
  requestAnimationFrame(this.animate.bind(this));
}

Render.prototype.animate = function animate(time) {
  const dt = time - this.lastTime;

  this.game.move(dt);
  this.game.draw(this.ctx);
  this.game.spawnEnemy();
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

Render.prototype.addStartMenu = function addStartMenu() {
  this.game.addStartMenu();
};

module.exports = Render;