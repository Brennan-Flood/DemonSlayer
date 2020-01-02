const Player = require("./player");
const Background = require("./background")
const Platform = require("./platform");
const Attack = require("./attack");
const Enemy = require("./enemy");
const Util = require("./util");

function Game(ctx) {
  this.background = new Background();
  this.players = [];
  this.platforms= [];
  this.playerPos = null;
  this.playerAttack = null;
  this.enemies = [];
  this.playerDirection = null;
  this.enemyTimeout = 50;
}

Game.WIDTH = 700;
Game.HEIGHT = 480;
Game.FPS = 32;

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
  ctx.drawImage(this.background.image, 0, 0)
  this.objects().forEach(object => {
    object.draw(ctx);
  });
  this.enemies.forEach(enemy => {
    enemy.draw(ctx);
  })
  this.playerAttack.draw(ctx);
};

Game.prototype.upKey = function upKey() {
  let player = this.players[0];
  player.jump();
};

Game.prototype.leftKey = function leftKey() {
  let player = this.players[0];
  player.walk("left");
};

Game.prototype.rightKey = function rightkey() {
  let player = this.players[0];
  player.walk("right");
};

Game.prototype.shiftKey = function shiftKey() {
  let player = this.players[0];
  player.dash();
};

Game.prototype.stopDash = function stopDash() {
  let player = this.players[0];
  player.stopDash();
};

Game.prototype.stopWalking = function stopWalking(dir) {
  let player = this.players[0];
  player.stopWalking(dir);
};

Game.prototype.addPlayer = function addPlayer() {
  const player = new Player();
  this.players.push(player);
  this.playerPos = player.pos;
};

Game.prototype.addPlatforms = function addPlatforms(){
  let platform1 = new Platform([25, 350]);
  let platform2 = new Platform([250, 200]);
  let platform3 = new Platform([475, 350]);
  this.platforms.push(platform1);
  this.platforms.push(platform2);
  this.platforms.push(platform3);
};

Game.prototype.addPlayerAttack = function addPlayerAttack() {
  let playerAttack = new Attack(this.playerPos);
  this.playerAttack = playerAttack;
};

Game.prototype.addEnemies = function addEnemies() {
  let pos1 = [75, 300];
  let pos2 = [350, 100];
  let pos3 = [625, 300];

  let enemy1 = new Enemy(pos1, 1);
  let enemy2 = new Enemy(pos2, 2);
  let enemy3 = new Enemy(pos3, 3);
  this.enemies.push(enemy1);
  this.enemies.push(enemy2);
  this.enemies.push(enemy3);
};

Game.prototype.objects = function objects() {
  return [].concat(this.platforms).concat(this.players);
};

Game.prototype.move = function move(dt) {
  this.objects().forEach(object => {
    object.move(dt);
  });
  this.playerPos = this.players[0].pos;
  this.enemies.forEach(enemy => {
    enemy.move(dt, this.playerPos);
  })
  this.playerAttack.move(this.playerPos);
};

Game.prototype.startAttack = function startAttack() {
  this.getPlayerDirection();
  this.playerAttack.startAttack(this.playerDirection);
};

Game.prototype.getPlayerDirection = function getPlayerDirection() {
  let playerDirection = this.players[0].lastDirection;
  if (playerDirection === "right") {
    this.playerDirection = "right";
  } else if (playerDirection === "left") {
    this.playerDirection = "left";
  } else {
    return;
  }
};

Game.prototype.playerAttackCollision = function playerAttackCollision(enemyPos) {
  
};

Game.prototype.killEnemy = function killEnemy(enemyId) {
  this.enemies.forEach((enemy, i) => {
    if (enemy.id === enemyId) {
      this.enemies = this.enemies.splice(i, 1);
    }
  })
};

module.exports = Game;