function Render(game, ctx) {
  this.ctx = ctx;
  this.game = game;
}

Render.prototype.start = function start() {
  this.lastTime = 0;
  this.game.addPlayer();
  this.game.addPlatforms();
  this.game.addPlayerAttack();
  this.game.addEnemies();
  this.game.addPlayerSprite();
  requestAnimationFrame(this.animate.bind(this));
}

Render.prototype.animate = function animate(time) {
  const dt = time - this.lastTime;

  this.game.move(dt);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = Render;