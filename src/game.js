const Player = require("./player");
const Background = require("./background")
const Platform = require("./platform");
const Attack = require("./attack");
const Enemy = require("./enemy");
const Util = require("./util");
const PlayerSprite = require("./player_sprite");
const GameOver = require("./game_over");
const StartMenu = require("./start_menu");
const Score = require("./score");
const PlatformSprite = require("./platform_sprite");

function Game(ctx) {
  this.background = new Background();
  this.players = [];
  this.platforms = [];
  this.platformSprites = [];
  this.playerPos = null;
  this.playerAttack = null;
  this.enemies = [];
  this.playerDirection = null;
  this.enemyTimeout = 50;
  this.player;
  this.playerSprite = null;
  this.maxEnemies = 3;
  this.enemySpawnCooldown = 200;
  this.currentEnemyIndex = 3;
  this.score = null;
  this.startMenu = null;
  this.starting = true;
  this.gameOver = false;
  this.gameOverObject = new GameOver();
}

Game.WIDTH = 700;
Game.HEIGHT = 480;
Game.FPS = 32;

Game.prototype.addStartMenu = function addStartMenu() {
  this.startMenu = new StartMenu();
};

Game.prototype.restart = function restart() {
  this.starting = false;
  this.players = [];
  this.platforms = [];
  this.enemies = [];
  this.player = null;
  this.playerAttack = null;
  this.gameOver = false;
  this.score = null;
  this.addPlayer();
  this.addPlatforms();
  this.addPlayerAttack();
  this.addEnemies();
  this.addScore();
};

Game.prototype.returnToStartMenu = function returnToStartMenu() {
  this.starting = true;
  this.players = [];
  this.platforms = [];
  this.enemies = [];
  this.player = null;
  this.playerAttack = null;
  this.gameOver = false;
  this.score = null;
  this.startMenu = new StartMenu();
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
  ctx.drawImage(this.background.image, 0, 0);
  if (this.starting) {
    this.startMenu.draw(ctx);
  } else {
  this.objects().forEach(object => {
    object.draw(ctx);
  });
  
  this.enemies.forEach((enemy) => {
      this.enemyHitPlayer(enemy);
  });
  if (this.playerAttack.attacking && !this.player.dead) {
    this.enemies.forEach((enemy) => {
      if (this.playerAttackCollision(enemy) === true) {
        this.killEnemy(enemy.id);
      }
    });
  }
  this.enemies.forEach(enemy => {
    enemy.draw(ctx);
  });
  this.playerSprite.getCurrentAnimationInfo(
    this.player.currentWalkingDirection, 
    this.player.currentAnimation, 
    this.player.lastDirection, 
    this.player.currentAnimationFrame, 
    this.playerAttack.attacking, 
    this.playerAttack.attackTimeLeft, 
    this.player.dead
  );
  this.playerSprite.draw(ctx);
  this.score.draw(ctx);
  if (this.player.dead) {
    this.gameOver = true;
    this.gameOverObject.draw(ctx);
    return;
  };
  this.playerAttack.draw(ctx);
  }
};

Game.prototype.upKey = function upKey() {
  if (!this.starting) {
  let player = this.players[0];
  player.jump();
  }
};

Game.prototype.leftKey = function leftKey() {
  if (!this.starting) {
  let player = this.players[0];
  player.walk("left");
  }
};

Game.prototype.rightKey = function rightkey() {
  if (!this.starting) {
  let player = this.players[0];
  player.walk("right");
  }
};

Game.prototype.shiftKey = function shiftKey() {
  if (!this.starting) {
  let player = this.players[0];
  player.dash();
  }
};

Game.prototype.stopDash = function stopDash() {
  if (!this.starting) {
  let player = this.players[0];
  player.stopDash();
  }
};

Game.prototype.stopWalking = function stopWalking(dir) {
  if (!this.starting) {
  let player = this.players[0];
  player.stopWalking(dir);
  }
};

Game.prototype.addPlayer = function addPlayer() {
  const player = new Player();
  this.players.push(player);
  this.playerPos = player.pos;
  this.player = player;
  this.addPlayerSprite(this.playerPos);
};

Game.prototype.addPlatforms = function addPlatforms(){
  let platform1 = new Platform([25, 350]);
  let platform2 = new Platform([250, 200]);
  let platform3 = new Platform([475, 350]);

  let platformSprite1 = new PlatformSprite([25, 350]);
  let platformSprite2 = new PlatformSprite([250, 200]);
  let platformSprite3 = new PlatformSprite([475, 350]);

  this.platforms.push(platform1);
  this.platformSprites.push(platformSprite1);
  this.platforms.push(platform2);
  this.platformSprites.push(platformSprite2);
  this.platforms.push(platform3);
  this.platformSprites.push(platformSprite3);

};

Game.prototype.addPlayerAttack = function addPlayerAttack() {
  let playerAttack = new Attack(this.playerPos);
  this.playerAttack = playerAttack;
};

Game.prototype.addEnemies = function addEnemies() {
  let pos1 = [75, 300];
  let pos3 = [625, 300];
  let rng = Math.random();
  if (rng > 0.5) {
  let enemy1 = new Enemy(pos1, 1);
  this.enemies.push(enemy1);
  } else {
  let enemy3 = new Enemy(pos3, 3);
  this.enemies.push(enemy3);
  }
};

Game.prototype.addScore = function addScore() {
  this.score = new Score();
};  

Game.prototype.objects = function objects() {
  return [].concat(this.platforms).concat(this.platformSprites).concat(this.players);
};

Game.prototype.move = function move(dt) {
  if (this.starting) {
    this.startMenu.move();
  } else {
  this.objects().forEach(object => {
    object.move(dt);
  });
  this.playerPos = this.players[0].pos;
  this.enemies.forEach(enemy => {
    enemy.move(dt, this.playerPos, this.player.dead);
    enemy.getFaster(this.score.score);
  })
  this.playerAttack.move(this.playerPos);
  this.playerSprite.move(this.player.pos);
  }
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

Game.prototype.playerAttackCollision = function playerAttackCollision(enemy) {
  let cx = enemy.pos[0];
  let cy = enemy.pos[1];
  let testX;
  let testY;
  if (enemy.pos[0] <= this.playerAttack.pos[0]) {
    testX = this.playerAttack.width + this.playerAttack.pos[0];
  } else if (enemy.pos[0] >= this.playerAttack.width + this.playerAttack.pos[0]) {
    testX = this.playerAttack.width + this.playerAttack.pos[0];
    
  }
  if (enemy.pos[1] <= this.playerAttack.pos[1]) {
    testY = this.playerAttack.pos[1];
  } else if (enemy.pos[1] >= this.playerAttack.height + this.playerAttack.pos[1]) {
    testY = this.playerAttack.height + this.playerAttack.pos[1];
  }
  let dx = cx - testX;
  let dy = cy - testY;
  let distance = Math.sqrt((dx * dx) + (dy * dy));
  if (distance < enemy.radius) {
    return true;
  } else if ( 
    this.playerAttack.pos[0] <= enemy.pos[0] && this.playerAttack.width + this.playerAttack.pos[0] >= enemy.pos[0]
    && this.playerAttack.pos[1] >= enemy.pos[1] && this.playerAttack.height + this.playerAttack.pos[1] <= enemy.pos[1]
    ) {
    return true;
  } else if (
    this.playerAttack.pos[0] >= enemy.pos[0] && this.playerAttack.width + this.playerAttack.pos[0] <= enemy.pos[0]
    && this.playerAttack.pos[1] >= enemy.pos[1] && this.playerAttack.height + this.playerAttack.pos[1] <= enemy.pos[1]
  ) {
    return true
  }
  return false;
};

Game.prototype.killEnemy = function killEnemy(enemyId) {
  
  const newEnemiesArr = [];
  this.enemies.forEach((enemy, i) => {
  if (enemy.id === enemyId) {
      this.score.addToScore();
    } else {
      newEnemiesArr.push(enemy);
    }
  })
  this.enemies = newEnemiesArr;
};

Game.prototype.enemyHitPlayer = function enemyHitPlayer(enemy) {
  let dx = enemy.pos[0] - this.playerPos[0];
  let dy = enemy.pos[1] - this.playerPos[1];
  let dist = Math.sqrt((dx * dx) + (dy * dy))
  if (dist < enemy.radius + this.player.radius) {
    this.killPlayer();
  } 
};

Game.prototype.killPlayer = function killPlayer() {
  this.players[0].dead = true;
  this.gameOver = true;
};

Game.prototype.addPlayerSprite = function addPlayerSprite(playerPos) {
  const playerSprite = new PlayerSprite(this.players[0].pos);
  this.playerSprite = playerSprite;
};

Game.prototype.spawnEnemy = function spawnEnemy() {
  if (!this.starting && !this.gameOver) {
    if (this.enemies.length < this.maxEnemies && this.enemySpawnCooldown === 0) {
      if (this.score.score >= 200) {
        this.enemySpawnCooldown = 10;
      } else {
        this.enemySpawnCooldown = 200 - 2 * this.score.score;
      }
      this.maxEnemies = 3 + Math.floor(this.score.score / 10);
      this.currentEnemyIndex += 1;
      const newEnemyPos = this.getNewEnemyPos();
      const enemy = new Enemy(newEnemyPos, this.currentEnemyIndex);
      this.enemies.push(enemy);
    } else if (this.enemySpawnCooldown === 0) {
      return;
    } else {
      this.enemySpawnCooldown -= 1;
    }
  } else {
    return;
  }
};

Game.prototype.getNewEnemyPos = function getNewEnemyPos() {
  const randVal = Math.ceil(Math.random() * 10);
  if (randVal <= 5) {
    return [-30, 420]
  } else if (randVal <= 8) {
    return [730, 420]
  } else {
    return [0, 0]
  }
};

module.exports = Game;