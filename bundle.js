/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./src/game */ \"./src/game.js\");\nconst Render = __webpack_require__(/*! ./src/render */ \"./src/render.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const cvs = document.getElementsByTagName(\"canvas\")[0];\n  cvs.width = Game.WIDTH;\n  cvs.height = Game.HEIGHT;\n\n  const ctx = cvs.getContext(\"2d\");\n  const game = new Game(ctx);\n  document.addEventListener('keydown', function (evt) {\n    if (evt.keyCode === 87) {\n      game.upKey();\n    } else if (evt.keyCode === 65) {\n      game.leftKey();\n    } else if (evt.keyCode === 83) {\n      console.log(\"s\")\n    } else if (evt.keyCode === 68) {\n      game.rightKey();\n    } else if (evt.keyCode === 32) {\n      game.startAttack();\n    } else if (evt.keyCode === 16) {\n      game.shiftKey();\n    } else if (evt.keyCode === 13){\n      game.restart();\n    } else if (evt.keyCode === 27) {\n      game.returnToStartMenu();\n    }\n  }, false)\n\n  document.addEventListener('keyup', function(evt) {\n    if (evt.keyCode === 65) {\n      game.stopWalking(\"left\");\n    } else if (evt.keyCode === 68) {\n      game.stopWalking(\"right\");\n    } else if (evt.keyCode === 16) {\n      game.stopDash();\n    }\n  }, false)\n  new Render(game, ctx).start();\n});\n\n\n\n// w: 87,\n// a: 65,\n// s: 83,\n// d: 68,\n// space: 32\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const AttackSprite = __webpack_require__(/*! ./attack_sprite */ \"./src/attack_sprite.js\");\n\nfunction Attack(pos) {\n  this.attacking = false;\n  this.attackTimeLeft = 0;\n  this.playerPos = pos;\n  this.vel = [0, 0];\n  this.pos = pos;\n  this.width = 10;\n  this.height = 10;\n  this.playerDirectionMultiplier = null;\n  this.attackSprite = new AttackSprite(this.pos);\n  this.direction = null;\n};\n\nAttack.prototype.draw = function draw(ctx) {\n  if (this.attackTimeLeft > 33) {\n    this.width = 30*this.playerDirectionMultiplier;\n    this.height = -35;\n    this.attackSprite.srcPos = [0,0];\n    this.attackSprite.srcDim = [0, 0];\n    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [0, 0] : [0, 0]);\n    if (this.playerDirectionMultiplier < 0) {\n      this.attackSprite.direction = \"left\"\n    } else {\n      this.attackSprite.direction = \"right\"\n    }\n  } else if (this.attackTimeLeft > 25) {\n    this.width = 140*this.playerDirectionMultiplier;\n    this.height = -100;\n    \n    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [170, 120] : [318, 120]) ;\n    this.attackSprite.srcDim = [90, 80];\n    this.attackSprite.destDim = ( this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);\n    \n  } else if ( this.attackTimeLeft > 18) {\n    this.width = 140 * this.playerDirectionMultiplier;\n    this.height = -100;\n    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [260, 120] : [230, 120]);\n    this.attackSprite.srcDim = [90, 80];\n    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);\n\n  } else if (this.attackTimeLeft > 10) {\n    this.width = 140*this.playerDirectionMultiplier;\n    this.height = -100;\n    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [365, 120] : [125, 120]);\n    this.attackSprite.srcDim = [90, 80];\n    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);\n  } else {\n    this.width = 0*this.playerDirectionMultiplier;\n    this.height = 0;\n  }\n  ctx.fillStyle = \"rgba(255, 255, 255, 0)\";\n  ctx.beginPath();\n  ctx.rect(this.pos[0], 40 + this.pos[1], this.width, this.height);\n  ctx.fill();\n  if (this.attacking) {\n    this.attackSprite.draw(ctx, this.a);\n  }\n  if (this.attackTimeLeft > 0) {\n    this.attackTimeLeft -= 1;\n  } else {\n    this.attacking = false;\n  }\n};\n\nAttack.prototype.move = function move(playerPos) {\n  if (this.attacking && this.attackTimeLeft < 34) {\n    this.pos = this.pos.map((posVal) => {\n      return posVal;\n    });\n    this.pos[0] += this.vel[0];\n  } else {\n    this.pos = playerPos;\n  }\n  this.attackSprite.move(this.pos);\n};\n\nAttack.prototype.startAttack = function startAttack(playerDirection) {\n  if (!this.attacking) {\n    this.direction = playerDirection;\n    this.playerDirectionMultiplier = (playerDirection === \"left\" ? -1 : 1)\n    this.vel = (playerDirection === \"right\" ? [3, 0] : [-3, 0])\n    this.attackTimeLeft = 60;\n    this.attacking = true;\n  }\n}\n\nmodule.exports = Attack;\n\n//# sourceURL=webpack:///./src/attack.js?");

/***/ }),

/***/ "./src/attack_sprite.js":
/*!******************************!*\
  !*** ./src/attack_sprite.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function AttackSprite(pos) {\n  this.pos = pos;\n  this.spriteSheet = new Image();\n  this.spriteSheet.src = \"assets/tanjiro_base_spritesheet.png\";\n  this.spriteSheetReversed = new Image();\n  this.spriteSheetReversed.src = \"assets/tanjiro_base_spritesheet_reversed.png\";\n  this.srcPos = [0, 0];\n  this.srcDim = [0, 0];\n  this.destPos = pos;\n  this.destDim = [0, 0];\n  this.direction = \"right\";\n  this.attackDirectionOffset = null;\n  this.currentSpriteSheet = null;\n}\n\nAttackSprite.prototype.draw = function draw(ctx) {\n  if (this.direction === \"right\") {\n    this.attackDirectionOffset = [30, -80];\n    this.currentSpriteSheet = this.spriteSheet;\n  } else {\n    this.attackDirectionOffset = [-30, -80];\n    this.currentSpriteSheet = this.spriteSheetReversed;\n  }\n  this.destPos = this.pos.map((val) => {\n    return val;\n  });\n \n  ctx.drawImage(\n    this.currentSpriteSheet,\n    this.srcPos[0],\n    this.srcPos[1],\n    this.srcDim[0],\n    this.srcDim[1],\n    this.destPos[0],\n    this.destPos[1] + this.attackDirectionOffset[1],\n    this.destDim[0],\n    this.destDim[1]\n    );\n\n};\n\nAttackSprite.prototype.move = function move(attackPos) {\n  this.pos = attackPos;\n};\n\nmodule.exports = AttackSprite;\n\n//# sourceURL=webpack:///./src/attack_sprite.js?");

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Background() {\n  this.image = new Image();\n  this.image.src = \"assets/Dimensional_Infinity_Fortress_Anime.jpg\"\n}\n\nmodule.exports = Background;\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst EnemySprite = __webpack_require__(/*! ./enemy_sprite */ \"./src/enemy_sprite.js\");\nconst HarderEnemySprite = __webpack_require__(/*! ./harder_enemy_sprite */ \"./src/harder_enemy_sprite.js\");\nfunction Enemy(pos, id) {\n  const hardVal = Math.random();\n  this.pos = pos;\n  this.vel = [0, 1];\n  this.grav = 1;\n  this.jumping = false;\n  this.playerPos = null\n  if (hardVal > 0.8) {\n    this.harderType = true;\n    this.sprite = new HarderEnemySprite(this.pos);\n    this.baseRunspeed = 3;\n    this.radius = 50;\n    this.jumpSpeed = -22;\n\n\n  } else {\n    this.harderType = false;\n    this.sprite = new EnemySprite(this.pos);\n    this.baseRunspeed = 1;\n    this.radius = 30;\n    this.jumpSpeed = -16;\n\n  }\n  this.runSpeed = this.baseRunspeed;\n  this.jumpCooldown = 80;\n  this.id = id;\n  this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;\n  this.onPlatformCooldown = 0;\n}\n\nEnemy.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = \"rgba(255, 255, 255, 0)\";\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n  this.sprite.draw(ctx, this.vel)\n};\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nEnemy.prototype.move = function move(dt, playerPos, playerIsDead) {\n  if (this.vel[1] < 0) {\n    this.jumping = true;\n  } else if (this.pos[1] + this.vel[1] + 1 >= 480 - this.radius) {\n    this.vel[1] = 480 - this.radius - this.pos[1];\n    this.jumping = false;\n  } else if (Util.atFloor(this)) {\n    this.vel[1] = 0;\n    this.jumping = false;\n  }\n  if (playerIsDead) {\n    this.playerIsDead = true;\n  };\n\n  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);\n  if (outOfBounds) {\n    this.pos[0] = Util.wrap(this, outOfBounds)\n  }\n  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);\n  if (onPlatform === 1 || onPlatform === 3) {\n    this.pos[1] = 350 - this.radius;\n    this.vel[1] = 0;\n    this.onPlatform = true;\n    this.currentPlatform = onPlatform;\n  } else if (onPlatform === 2) {\n    this.pos[1] = 200 - this.radius;\n    this.vel[1] = 0;\n    this.onPlatform = true;\n    this.currentPlatform = onPlatform;\n  } else {\n    this.onPlatform = false;\n  }\n  this.moveTowardsPlayer(playerPos);\n  this.shouldJump(playerPos);\n\n  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,\n    dx = this.vel[0] * velocityScale,\n    dy = this.vel[1] * velocityScale;\n\n  let newPosX = this.pos[0] + dx;\n  let newPosY = this.pos[1] + dy;\n  newPosY = (newPosY > 450 ? 450 : newPosY)\n  this.pos[0] = newPosX;\n  this.pos[1] = newPosY;\n  this.sprite.move(this.pos);\n  if (onPlatform !== false) {\n    return;\n  }\n  this.vel[1] = (this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)\n};\n\nEnemy.prototype.moveTowardsPlayer = function moveTowardsPlayer(playerPos) {\n  this.playerPos = playerPos;\n  if ((this.onPlatform && (playerPos[1] > this.pos[1] && this.playerUnderneathPlatform()))) {\n    this.vel[0] = this.plusOrMinus * this.runSpeed;\n    this.onPlatformCooldown = 5;\n  } else if ( this.playerIsDead ) {\n    this.vel[0] = this.plusOrMinus * this.runSpeed;\n  } else { \n    if (this.pos[0] < playerPos[0] && this.onPlatformCooldown === 0) {\n      this.vel[0] = this.runSpeed;\n    } else if (this.pos[0] > playerPos[0] && this.onPlatformCooldown === 0) {\n      this.vel[0] = -this.runSpeed;\n    } else {\n      this.onPlatformCooldown -= 1;\n    }\n  }\n};\n\nEnemy.prototype.shouldJump = function shouldJump(playerPos) {\n  if (this.jumpCooldown > 0) {\n    this.jumpCooldown -= 1;\n    return;\n  }\n  if (playerPos[1] < this.pos[1] && this.vel[1] === 0) {\n    this.vel[1] = this.jumpSpeed;\n    this.jumpCooldown = 100 + Math.floor(Math.random() * 120);\n  } else {\n    return;\n  }\n}\n\nEnemy.prototype.playerUnderneathPlatform = function playerUnderneathPlatform() {\n  if (this.currentPlatform === 1 && (this.playerPos[0] <= 225 && this.playerPos[0] >= 25)) {\n    return true;\n  } else if (this.currentPlatform === 2 && (this.playerPos[0] <= 450 && this.playerPos[0] >= 250)) {\n    return true;\n  } else if (this.currentPlatform === 3 && (this.playerPos[0] <= 675 && this.playerPos[0] >= 475)) {\n    return true\n  } else {\n    return false;\n  }\n};\n\nEnemy.prototype.getFaster = function getFaster(demonsSlain) {\n  this.runSpeed = this.baseRunspeed + demonsSlain / 20;\n};\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/enemy_sprite.js":
/*!*****************************!*\
  !*** ./src/enemy_sprite.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function EnemySprite(pos) {\n  this.pos = pos;\n  this.spriteSheet = new Image();\n  this.spriteSheet.src = \"assets/enemySprites.png\";\n  this.reversedSpriteSheet = new Image();\n  this.reversedSpriteSheet.src = \"assets/enemySpritesReversed.png\"\n  this.srcPos = [0, 0];\n  this.srcDim = [0, 0];\n  this.destPos = this.pos;\n  this.destDim = [0, 0];\n  this.animationFrame = 40;\n  this.lastDirection = null;\n  this.currentSpriteSheet = this.reversedSpriteSheet;\n}\n\nEnemySprite.prototype.draw = function draw(ctx, enemyVel) {\n  if (enemyVel[0] > 0) {\n    this.lastDirection = \"right\";\n  } else {\n    this.lastDirection = \"left\";\n  }\n  this.getSpriteInfo(enemyVel);\n  ctx.drawImage(\n    this.currentSpriteSheet,\n    this.srcPos[0],\n    this.srcPos[1],\n    this.srcDim[0],\n    this.srcDim[1],\n    this.destPos[0] - 25,\n    this.destPos[1] - 50,\n    this.destDim[0],\n    this.destDim[1]\n  );\n};\n\nEnemySprite.prototype.move = function move(pos) {\n  this.pos = pos;\n};\n\nEnemySprite.prototype.getSpriteInfo = function getSpriteInfo(enemyVel) {\n  if (enemyVel[1] !== 0) {\n    if (this.lastDirection === \"right\") {\n      this.currentSpriteSheet = this.reversedSpriteSheet;\n      this.srcPos = [732 , 53];\n      this.srcDim = [25, 50];\n      this.destPos = this.pos;\n      this.destDim = [50, 80];\n    } else {\n      this.currentSpriteSheet = this.spriteSheet;\n      this.srcPos = [280, 53];\n      this.srcDim = [25, 50];\n      this.destPos = this.pos;\n      this.destDim = [50, 80];\n    }\n  } else {\n    if (this.lastDirection === \"right\") {\n      this.currentSpriteSheet = this.reversedSpriteSheet;\n      this.srcPos = [785, 54];\n      this.srcDim = [25, 46];\n      this.destPos = this.pos;\n      this.destDim = [50, 80];\n    } else {\n      this.currentSpriteSheet = this.spriteSheet;\n      this.srcPos = [230, 54];\n      this.srcDim = [25, 46];\n      this.destPos = this.pos;\n      this.destDim = [50, 80];\n    }\n  }\n};\n\nmodule.exports = EnemySprite;\n\n//# sourceURL=webpack:///./src/enemy_sprite.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Background = __webpack_require__(/*! ./background */ \"./src/background.js\")\nconst Platform = __webpack_require__(/*! ./platform */ \"./src/platform.js\");\nconst Attack = __webpack_require__(/*! ./attack */ \"./src/attack.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst PlayerSprite = __webpack_require__(/*! ./player_sprite */ \"./src/player_sprite.js\");\nconst GameOver = __webpack_require__(/*! ./game_over */ \"./src/game_over.js\");\nconst StartMenu = __webpack_require__(/*! ./start_menu */ \"./src/start_menu.js\");\nconst Score = __webpack_require__(/*! ./score */ \"./src/score.js\");\nconst PlatformSprite = __webpack_require__(/*! ./platform_sprite */ \"./src/platform_sprite.js\");\nconst ScorePopup = __webpack_require__(/*! ./score_popup */ \"./src/score_popup.js\");\n\nfunction Game(ctx) {\n  this.background = new Background();\n  this.players = [];\n  this.platforms = [];\n  this.platformSprites = [];\n  this.playerPos = null;\n  this.playerAttack = null;\n  this.enemies = [];\n  this.scorePopups = [];\n  this.playerDirection = null;\n  this.enemyTimeout = 50;\n  this.player;\n  this.playerSprite = null;\n  this.maxEnemies = 3;\n  this.enemySpawnCooldown = 200;\n  this.currentEnemyIndex = 3;\n  this.score = null;\n  this.startMenu = null;\n  this.starting = true;\n  this.gameOver = false;\n  this.gameOverObject = new GameOver();\n}\n\nGame.WIDTH = 700;\nGame.HEIGHT = 480;\nGame.FPS = 32;\n\nGame.prototype.addStartMenu = function addStartMenu() {\n  this.startMenu = new StartMenu();\n};\n\nGame.prototype.restart = function restart() {\n  this.starting = false;\n  this.players = [];\n  this.platforms = [];\n  this.enemies = [];\n  this.player = null;\n  this.playerAttack = null;\n  this.gameOver = false;\n  this.score = null;\n  this.enemySpawnCooldown = 200;\n  this.addPlayer();\n  this.addPlatforms();\n  this.addPlayerAttack();\n  this.addEnemies();\n  this.addScore();\n};\n\nGame.prototype.returnToStartMenu = function returnToStartMenu() {\n  this.starting = true;\n  this.players = [];\n  this.platforms = [];\n  this.enemies = [];\n  this.player = null;\n  this.playerAttack = null;\n  this.gameOver = false;\n  this.score = null;\n  this.enemySpawnCooldown = 200;\n  this.startMenu = new StartMenu();\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);\n  ctx.drawImage(this.background.image, 0, 0);\n  if (this.starting) {\n    this.startMenu.draw(ctx);\n  } else {\n  this.objects().forEach(object => {\n    object.draw(ctx);\n  });\n  \n  this.enemies.forEach((enemy) => {\n      this.enemyHitPlayer(enemy);\n  });\n  if (this.playerAttack.attacking && !this.player.dead) {\n    this.enemies.forEach((enemy) => {\n      if (this.playerAttackCollision(enemy) === true) {\n        this.killEnemy(enemy.id);\n      }\n    });\n  }\n  this.enemies.forEach(enemy => {\n    enemy.draw(ctx);\n  });\n  this.playerSprite.getCurrentAnimationInfo(\n    this.player.currentWalkingDirection, \n    this.player.currentAnimation, \n    this.player.lastDirection, \n    this.player.currentAnimationFrame, \n    this.playerAttack.attacking, \n    this.playerAttack.attackTimeLeft, \n    this.player.dead\n  );\n  this.playerSprite.draw(ctx);\n  this.score.draw(ctx);\n  this.scorePopups.forEach((scorePopup) => {\n    scorePopup.draw(ctx);\n  });\n  if (this.player.dead) {\n    this.gameOver = true;\n    this.gameOverObject.draw(ctx);\n    return;\n  };\n  this.playerAttack.draw(ctx);\n  }\n};\n\nGame.prototype.upKey = function upKey() {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.jump();\n  }\n};\n\nGame.prototype.leftKey = function leftKey() {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.walk(\"left\");\n  }\n};\n\nGame.prototype.rightKey = function rightkey() {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.walk(\"right\");\n  }\n};\n\nGame.prototype.shiftKey = function shiftKey() {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.dash();\n  }\n};\n\nGame.prototype.stopDash = function stopDash() {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.stopDash();\n  }\n};\n\nGame.prototype.stopWalking = function stopWalking(dir) {\n  if (!this.starting) {\n  let player = this.players[0];\n  player.stopWalking(dir);\n  }\n};\n\nGame.prototype.addPlayer = function addPlayer() {\n  const player = new Player();\n  this.players.push(player);\n  this.playerPos = player.pos;\n  this.player = player;\n  this.addPlayerSprite(this.playerPos);\n};\n\nGame.prototype.addPlatforms = function addPlatforms(){\n  let platform1 = new Platform([25, 350]);\n  let platform2 = new Platform([250, 200]);\n  let platform3 = new Platform([475, 350]);\n\n  let platformSprite1 = new PlatformSprite([25, 350]);\n  let platformSprite2 = new PlatformSprite([250, 200]);\n  let platformSprite3 = new PlatformSprite([475, 350]);\n\n  this.platforms.push(platform1);\n  this.platformSprites.push(platformSprite1);\n  this.platforms.push(platform2);\n  this.platformSprites.push(platformSprite2);\n  this.platforms.push(platform3);\n  this.platformSprites.push(platformSprite3);\n\n};\n\nGame.prototype.addPlayerAttack = function addPlayerAttack() {\n  let playerAttack = new Attack(this.playerPos);\n  this.playerAttack = playerAttack;\n};\n\nGame.prototype.addEnemies = function addEnemies() {\n  let pos1 = [75, 300];\n  let pos3 = [625, 300];\n  let rng = Math.random();\n  if (rng > 0.5) {\n  let enemy1 = new Enemy(pos1, 1);\n  this.enemies.push(enemy1);\n  } else {\n  let enemy3 = new Enemy(pos3, 3);\n  this.enemies.push(enemy3);\n  }\n};\n\nGame.prototype.addScore = function addScore() {\n  this.score = new Score();\n};  \n\nGame.prototype.objects = function objects() {\n  return [].concat(this.platforms).concat(this.platformSprites).concat(this.players);\n};\n\nGame.prototype.move = function move(dt) {\n  if (this.starting) {\n    this.startMenu.move();\n  } else {\n  this.objects().forEach(object => {\n    object.move(dt);\n  });\n  this.playerPos = this.players[0].pos;\n  this.enemies.forEach(enemy => {\n    enemy.move(dt, this.playerPos, this.player.dead);\n    enemy.getFaster(this.score.score);\n  })\n  this.playerAttack.move(this.playerPos);\n  this.playerSprite.move(this.player.pos);\n  this.scorePopups.forEach((scorePopup) => {\n    if (scorePopup.timeLeft <= 0) {\n      this.scorePopups.shift();\n    } else {\n      scorePopup.move(dt);\n    }\n  })\n  }\n};\n\nGame.prototype.startAttack = function startAttack() {\n  this.getPlayerDirection();\n  this.playerAttack.startAttack(this.playerDirection);\n};\n\nGame.prototype.getPlayerDirection = function getPlayerDirection() {\n  let playerDirection = this.players[0].lastDirection;\n  if (playerDirection === \"right\") {\n    this.playerDirection = \"right\";\n  } else if (playerDirection === \"left\") {\n    this.playerDirection = \"left\";\n  } else {\n    return;\n  }\n};\n\nGame.prototype.playerAttackCollision = function playerAttackCollision(enemy) {\n  let cx = enemy.pos[0];\n  let cy = enemy.pos[1];\n  let testX;\n  let testY;\n  if (enemy.pos[0] <= this.playerAttack.pos[0]) {\n    testX = this.playerAttack.width + this.playerAttack.pos[0];\n  } else if (enemy.pos[0] >= this.playerAttack.width + this.playerAttack.pos[0]) {\n    testX = this.playerAttack.width + this.playerAttack.pos[0];\n    \n  }\n  if (enemy.pos[1] <= this.playerAttack.pos[1]) {\n    testY = this.playerAttack.pos[1];\n  } else if (enemy.pos[1] >= this.playerAttack.height + this.playerAttack.pos[1]) {\n    testY = this.playerAttack.height + this.playerAttack.pos[1];\n  }\n  let dx = cx - testX;\n  let dy = cy - testY;\n  let distance = Math.sqrt((dx * dx) + (dy * dy));\n  if (distance < enemy.radius) {\n    return true;\n  } else if ( \n    this.playerAttack.pos[0] <= enemy.pos[0] && this.playerAttack.width + this.playerAttack.pos[0] >= enemy.pos[0]\n    && this.playerAttack.pos[1] >= enemy.pos[1] && this.playerAttack.height + this.playerAttack.pos[1] <= enemy.pos[1]\n    ) {\n    return true;\n  } else if (\n    this.playerAttack.pos[0] >= enemy.pos[0] && this.playerAttack.width + this.playerAttack.pos[0] <= enemy.pos[0]\n    && this.playerAttack.pos[1] >= enemy.pos[1] && this.playerAttack.height + this.playerAttack.pos[1] <= enemy.pos[1]\n  ) {\n    return true\n  }\n  return false;\n};\n\nGame.prototype.killEnemy = function killEnemy(enemyId) {\n  \n  const newEnemiesArr = [];\n  let val;\n  this.enemies.forEach((enemy, i) => {\n  if (enemy.id === enemyId) {\n    \n      if (enemy.harderType) {\n        val = 2;\n      } else {\n        val = 1;\n      }\n      this.score.addToScore(val);\n      this.scorePopups.push(new ScorePopup(val))\n    } else {\n      newEnemiesArr.push(enemy);\n    }\n  })\n  this.enemies = newEnemiesArr;\n};\n\nGame.prototype.enemyHitPlayer = function enemyHitPlayer(enemy) {\n  let dx = enemy.pos[0] - this.playerPos[0];\n  let dy = enemy.pos[1] - this.playerPos[1];\n  let dist = Math.sqrt((dx * dx) + (dy * dy))\n  if (dist < enemy.radius + this.player.radius) {\n    this.killPlayer();\n  } \n};\n\nGame.prototype.killPlayer = function killPlayer() {\n  this.players[0].dead = true;\n  this.gameOver = true;\n};\n\nGame.prototype.addPlayerSprite = function addPlayerSprite(playerPos) {\n  const playerSprite = new PlayerSprite(this.players[0].pos);\n  this.playerSprite = playerSprite;\n};\n\nGame.prototype.spawnEnemy = function spawnEnemy() {\n  if (!this.starting && !this.gameOver) {\n    if (this.enemies.length < this.maxEnemies && this.enemySpawnCooldown === 0) {\n      if (this.score.score >= 200) {\n        this.enemySpawnCooldown = 10;\n      } else {\n        this.enemySpawnCooldown = 200 - 2 * this.score.score;\n      }\n      this.maxEnemies = 3 + Math.floor(this.score.score / 10);\n      this.currentEnemyIndex += 1;\n      const newEnemyPos = this.getNewEnemyPos();\n      const enemy = new Enemy(newEnemyPos, this.currentEnemyIndex);\n      this.enemies.push(enemy);\n    } else if (this.enemySpawnCooldown === 0) {\n      return;\n    } else {\n      this.enemySpawnCooldown -= 1;\n    }\n  } else {\n    return;\n  }\n};\n\nGame.prototype.getNewEnemyPos = function getNewEnemyPos() {\n  const randVal = Math.ceil(Math.random() * 10);\n  if (randVal <= 5) {\n    return [-30, 420]\n  } else if (randVal <= 8) {\n    return [730, 420]\n  } else {\n    return [0, 0]\n  }\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_over.js":
/*!**************************!*\
  !*** ./src/game_over.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameOver() {\n  \n}\n\nGameOver.prototype.draw = function draw(ctx) {\n  ctx.font = \"30px Open Sans\";\n  ctx.fillStyle = \"red\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"You Have Been Defeated\", 700 / 2, 480 / 2);\n  ctx.font = \"20px Open Sans\";\n  ctx.fillStyle = \"red\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"(press 'return' to restart)\", 700 / 2, 530 / 2);\n};\n\nmodule.exports = GameOver;\n\n//# sourceURL=webpack:///./src/game_over.js?");

/***/ }),

/***/ "./src/harder_enemy_sprite.js":
/*!************************************!*\
  !*** ./src/harder_enemy_sprite.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function EnemySprite(pos) {\n  this.pos = pos;\n  this.spriteSheet = new Image();\n  this.spriteSheet.src = \"assets/enemySprites.png\";\n  this.reversedSpriteSheet = new Image();\n  this.reversedSpriteSheet.src = \"assets/enemySpritesReversed.png\"\n  this.srcPos = [0, 0];\n  this.srcDim = [0, 0];\n  this.destPos = this.pos;\n  this.destDim = [0, 0];\n  this.animationFrame = 40;\n  this.lastDirection = null;\n  this.currentSpriteSheet = this.reversedSpriteSheet;\n  this.frameCycle = 30;\n}\n\nEnemySprite.prototype.draw = function draw(ctx, enemyVel) {\n  if (enemyVel[0] > 0) {\n    this.lastDirection = \"right\";\n  } else {\n    this.lastDirection = \"left\";\n  }\n  this.getSpriteInfo(enemyVel);\n  ctx.drawImage(\n    this.currentSpriteSheet,\n    this.srcPos[0],\n    this.srcPos[1],\n    this.srcDim[0],\n    this.srcDim[1],\n    this.destPos[0] - 32,\n    this.destPos[1] - 63,\n    this.destDim[0],\n    this.destDim[1]\n  );\n};\n\nEnemySprite.prototype.move = function move(pos) {\n  this.pos = pos;\n  if (this.frameCycle <= 0) {\n    this.frameCycle = 30;\n  } else {\n    this.frameCycle -= 1;\n  }\n};\n\nEnemySprite.prototype.getSpriteInfo = function getSpriteInfo(enemyVel) {\n  if (enemyVel[1] <= 2 && enemyVel[1] >= 0) {\n    if (this.lastDirection === \"right\") {\n      this.currentSpriteSheet = this.reversedSpriteSheet;\n      this.srcPos = (this.frameCycle > 15 ? [1011, 781] : [729, 781]);\n      this.srcDim = (this.frameCycle > 15 ? [33, 53] : [42, 53]);\n      this.destPos = this.pos;\n      this.destDim = (this.frameCycle > 15 ? [70, 120] : [75, 120]);\n    } else {\n      this.currentSpriteSheet = this.spriteSheet;\n      this.srcPos = ( this.frameCycle > 15 ? [0, 781] : [270, 781] );\n      this.srcDim = ( this.frameCycle > 15 ? [33, 53] : [42, 53] );\n      this.destPos = this.pos;\n      this.destDim = (this.frameCycle > 15 ? [70, 120] : [75, 120]);\n    }\n  } else {\n    if (this.lastDirection === \"right\") {\n      this.currentSpriteSheet = this.reversedSpriteSheet;\n      this.srcPos = [980, 767];\n      this.srcDim = [28, 64];\n      this.destPos = this.pos;\n      this.destDim = [70, 120];\n    } else {\n      this.currentSpriteSheet = this.spriteSheet;\n      this.srcPos = [34, 767];\n      this.srcDim = [28, 64];\n      this.destPos = this.pos;\n      this.destDim = [70, 120];\n    }\n  }\n};\n\nmodule.exports = EnemySprite;\n\n//# sourceURL=webpack:///./src/harder_enemy_sprite.js?");

/***/ }),

/***/ "./src/platform.js":
/*!*************************!*\
  !*** ./src/platform.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Platform(pos) {\n  this.pos = pos;\n  this.color = \"#cc7a00\"\n};\n\nPlatform.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color\n  ctx.beginPath();\n  ctx.rect(this.pos[0], this.pos[1], 200, 20);\n  ctx.fill();\n};\n\nPlatform.prototype.move = function move() {\n  \n};\n\nmodule.exports = Platform;\n\n//# sourceURL=webpack:///./src/platform.js?");

/***/ }),

/***/ "./src/platform_sprite.js":
/*!********************************!*\
  !*** ./src/platform_sprite.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function PlatformSprite(platformPos) {\n  this.pos = platformPos;\n  this.spriteSheet = new Image();\n  this.spriteSheet.src = \"assets/tilesets.png\"\n  this.srcPos = [273, 4];\n  this.srcDim = [27, 24];\n  this.destDim = [200, 20];\n};\n\nPlatformSprite.prototype.draw = function draw(ctx) {\n  ctx.drawImage(\n    this.spriteSheet,\n    this.srcPos[0],\n    this.srcPos[1],\n    this.srcDim[0],\n    this.srcDim[1],\n    this.pos[0],\n    this.pos[1],\n    this.destDim[0],\n    this.destDim[1]\n  );\n};\n\nPlatformSprite.prototype.move = function move() {\n\n};\n\nmodule.exports = PlatformSprite;\n\n//# sourceURL=webpack:///./src/platform_sprite.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Player() {\n  this.pos = [350, 200];\n  this.vel = [0, 1]\n  this.radius = 30;\n  this.grav = 1;\n  this.jumpFramesLeft = 0;\n  this.walkingLeft = false;\n  this.walkingRight = false;\n  this.runSpeed = 3;\n  this.dashSpeed = 6;\n  this.jumping = null;\n  this.lastDirection = \"right\";\n  this.dead = false;\n  this.currentAnimation = null;\n  this.currentAnimationFrame = null;\n  this.currentWalkingDirection = null;\n  this.atFloor = false;\n}\n\nPlayer.prototype.draw = function draw(ctx) {\n  // ctx.fillStyle = \"rgba(255, 255, 255, 0)\";\n  // ctx.beginPath();\n  // ctx.arc(\n  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  // );\n  // ctx.fill();\n  var radgrad = ctx.createRadialGradient(this.pos[0], this.pos[1], 0, this.pos[0], this.pos[1], 60);\n  radgrad.addColorStop(0, 'rgba(255,0,0,1)');\n  radgrad.addColorStop(0.8, 'rgba(228,225,225,.9)');\n  radgrad.addColorStop(1, 'rgba(228,0,0,0)');\n\n  // draw shape\n  ctx.fillStyle = radgrad;\n  ctx.fillRect(0, 0, this.pos[0] + 150, this.pos[1] + 150);\n  this.getCurrentAnimation();\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nPlayer.prototype.move = function move(dt) {\n  \n  if (this.vel[1] < 0 ) {\n    this.jumping = true;\n    this.atFloor = false;\n  } else if (this.pos[1] + this.vel[1] + 1 >= 465) {\n    this.vel[1] = 450 - this.pos[1];\n    this.jumping = false;\n    this.atFloor = false;\n  } else if (Util.atFloor(this)){\n    this.vel[1] = 0; \n    this.jumping = false;\n    this.atFloor = true;\n  } else {\n    this.atFloor = false;\n    this.jumping = true;\n  }\n\n  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);\n  if (outOfBounds) {\n    this.pos[0] = Util.wrap(this, outOfBounds)\n  }\n  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);\n  if (onPlatform === 1 || onPlatform === 3) {\n    this.pos[1] = 350 - this.radius;\n    this.vel[1] = 0;\n    this.onPlatform = true;\n  } else if (onPlatform === 2) {\n    this.pos[1] = 200 - this.radius;\n    this.vel[1] = 0;\n    this.onPlatform = true;\n  } else {\n    this.onPlatform = false;\n  }\n  if (this.dead) {\n  this.vel[0] = 0;\n  }\n  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,\n    dx = this.vel[0] * velocityScale,\n    dy = this.vel[1] * velocityScale;\n  \n  let newPosX = this.pos[0] + dx;\n  let newPosY = this.pos[1] + dy;\n  newPosY = (newPosY > 450 ? 450 : newPosY )\n  this.pos[0] = newPosX;\n  this.pos[1] = newPosY;\n  if (onPlatform !== false ) {\n    return;\n  } \n  this.vel[1] = ( this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)\n};\n\nPlayer.prototype.jump = function jump() {\n  if ( !this.dead ) {\n    if (this.vel[1] === 0 && ( Util.onPlatform(this.pos, this.radius, this.vel) !== false || Util.atFloor(this) !== false) ) {\n    this.vel[1] = -16;\n    this.jumpFramesLeft = 6;\n    this.jumpsLeft = 1;\n    } else if (this.jumpsLeft === 1) {\n      this.vel[1] = -12;\n      this.jumpsLeft = 0;\n    }\n  }\n};\n\nPlayer.prototype.walk = function walk(dir) {\n  let speed;\n  speed = (this.dashing ? this.dashSpeed : this.runSpeed)\n  if (dir === \"left\" ) {\n    this.vel[0] = -speed;\n    this.walkingLeft = true;\n    this.lastDirection = \"left\";\n  } else if (dir === \"right\") {\n    this.vel[0] = speed;\n    this.walkingRight = true;\n    this.lastDirection = \"right\";\n  } else {\n    this.walkingLeft = false;\n    this.walkingRight = false;\n    this.vel[0] = 0\n  }\n};\n\nPlayer.prototype.dash = function dash() {\n  this.dashing = true;\n  if (this.walkingLeft) {\n    this.vel[0] = -this.dashSpeed;\n  } else if (this.walkingRight) {\n    this.vel[0] = this.dashSpeed;\n  }\n};\n\nPlayer.prototype.stopWalking = function stopWalking(dir) {\n  let speed;\n  speed = (this.dashing ? this.dashSpeed : this.runSpeed)\n  if (dir === \"left\" && this.walkingRight === true) {\n    this.vel[0] = speed;\n    this.walkingLeft = false;\n    this.lastDirection = \"right\";\n  } else if (dir === \"right\" && this.walkingLeft === true) {\n    this.vel[0] = -speed;\n    this.walkingRight = false;\n    this.lastDirection = \"left\";\n  } else if ((dir === \"right\" && !this.walkingLeft)) {\n    this.vel[0] = 0;\n    this.walkingRight = false;\n  } else if (dir === \"left\" && !this.walkingRight) {\n    this.vel[0] = 0;\n    this.walkingLeft = false;\n  }\n}\n\n\nPlayer.prototype.stopDash = function stopDash() {\n  this.dashing = false;\n  if (this.walkingLeft && !this.walkingRight) {\n    this.vel[0] = -this.runSpeed;\n  } else if (this.walkingRight && !this.walkingLeft) {\n    this.vel[0] = this.runSpeed;\n  }\n};\n\nPlayer.prototype.getCurrentAnimation = function getCurrentAnimation() {\n  if (this.atFloor || this.onPlatform) {\n    if (this.currentAnimation === \"ground\" && this.currentAnimationFrame > 1) {\n      this.currentAnimationFrame -= (this.dashing ? 1.5 : 1)\n      \n    } else {\n      this.currentAnimationFrame = 80;\n    }\n    this.currentAnimation = \"ground\";\n    if (this.walkingLeft) {\n      this.currentWalkingDirection = \"left\";\n    } else if (this.walkingRight) {\n      this.currentWalkingDirection = \"right\";\n    } else {\n      this.currentWalkingDirection = null;\n    }\n  } else {\n    if (this.currentAnimation === \"air\" && this.currentAnimationFrame > 1) {\n      this.currentAnimationFrame -= 1\n    } else {\n      this.currentAnimationFrame = 80;\n    }\n    this.currentAnimation = \"air\";\n  }\n};\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/player_sprite.js":
/*!******************************!*\
  !*** ./src/player_sprite.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function PlayerSprite(pos) {\n  this.pos = pos;\n  this.currentAnimation = null;\n  this.currentSpriteSheet = null;\n  this.currentSrcPos = null;\n  this.currentSrcDim = null;\n  this.currentDestPos = null;\n  this.currentDestDim = null;\n  this.spriteSheet1 = new Image();\n  this.spriteSheet1.src = \"assets/tanjiro_base_spritesheet.png\";\n  this.spriteSheet1Reversed = new Image();\n  this.spriteSheet1Reversed.src = \"assets/tanjiro_base_spritesheet_reversed.png\";\n  this.running = new Image();\n  this.running.src = \"assets/tanjro_run.png\";\n  this.runningReversed = new Image();\n  this.runningReversed.src = \"assets/tanjiro_run_reversed.png\";\n  this.attackAndNeutral = new Image();\n  this.attackAndNeutral.src = \"assets/tanjiro_attack_and_nuetral.png\";\n  this.attackAndNeutralReversed = new Image();\n  this.attackAndNeutralReversed.src = \"assets/tanjiro_attack_and_nuetral_reversed.png\";\n  this.runningDictionary = {\n    left: {\n      8: [455, 15],\n      7: [405, 15],\n      6: [345, 15],\n      5: [280, 15],\n      4: [210 , 15],\n      3: [150 , 15],\n      2: [90 , 15],\n      1: [25 , 15],\n      0: [25, 15],\n\n    }, \n    right: {\n      8: [0, 15],\n      7: [48, 15],\n      6: [105, 15],\n      5: [175, 15],\n      4: [240, 15],\n      3: [305, 15],\n      2: [370, 15],\n      1: [430, 15],\n      0: [430, 15],\n    },\n  };\n  this.dead = false;\n};\n\nPlayerSprite.prototype.draw = function draw(ctx) {\n  let offset;\n  if (!this.dead) {\n    offset = [-30, -64];\n  } else {\n    offset = [-50,0];\n  }\n  ctx.drawImage(\n    this.currentSpriteSheet, \n    this.currentSrcPos[0], \n    this.currentSrcPos[1],\n    this.currentSrcDim[0],\n    this.currentSrcDim[1],\n    this.currentDestPos[0] + offset[0],\n    this.currentDestPos[1] + offset[1],\n    this.currentDestDim[0],\n    this.currentDestDim[1]\n    );\n\n};  \n\nPlayerSprite.prototype.move = function move(playerPos) {\n  const posX = playerPos[0];\n  const posY = playerPos[1];\n  this.pos[0] = posX;\n  this.pos[1] = posY;\n};\n\nPlayerSprite.prototype.getCurrentAnimationInfo = function getCurrentAnimationInfo(currentWalkingDirection, currentAnimation, direction, currentAnimationFrame, isAttacking, attackAnimationFrame, dead) {\n  if (!dead) {\n    this.dead = false;\n    if (!isAttacking) {\n      if ( currentAnimation === \"ground\" && !currentWalkingDirection) {\n        this.currentSpriteSheet = (direction === \"right\" ? this.attackAndNeutral : this.attackAndNeutralReversed);\n        this.currentSrcPos = (direction === \"right\" ? [260, 0] : [40, 0]);\n        this.currentSrcDim = [130, 270];\n        this.currentDestPos = this.pos;\n        this.currentDestDim = [50, 95];\n      } else if (currentAnimation === \"air\") {\n          this.currentSpriteSheet = (direction === \"right\" ? this.spriteSheet1 : this.spriteSheet1Reversed );\n          this.currentSrcPos = (direction === \"right\" ? [270, 235] : [273, 235]);\n          this.currentSrcDim = [45, 50];\n          this.currentDestPos = this.pos;\n          this.currentDestDim = [70, 100];\n      } else {\n        this.currentSpriteSheet = (direction === \"right\" ? this.running : this.runningReversed);\n        this.currentSrcPos = this.runningDictionary[direction][Math.ceil(currentAnimationFrame / 10)]\n        this.currentSrcDim = [45, 57];\n        this.currentDestPos = this.pos;\n        this.currentDestDim = [70, 100];\n      }\n    } else {\n\n        this.currentSpriteSheet = (direction === \"right\" ? this.spriteSheet1 : this.spriteSheet1Reversed);\n        if (attackAnimationFrame > 33 ) {\n          this.currentSrcPos = (direction === \"right\" ? [66, 130] : [472, 130])\n        } else {\n          this.currentSrcPos = (direction === \"right\" ? [112, 130] : [428, 130])\n        }\n        this.currentSrcDim = [50, 55];\n        this.currentDestPos = this.pos;\n        this.currentDestDim = [80, 100]\n    }\n  } else {\n    this.currentSpriteSheet = this.spriteSheet1;\n    this.currentSrcPos = [125, 87];\n    this.currentSrcDim = [60, 25];\n    this.currentDestPos = this.pos;\n    this.currentDestDim = [85, 40];\n    this.dead = true;\n  }\n};\n\nmodule.exports = PlayerSprite;\n\n\n//# sourceURL=webpack:///./src/player_sprite.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Render(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n  this.playing = false;\n}\n\nRender.prototype.start = function start() {\n  this.lastTime = 0;\n  this.addStartMenu();\n  requestAnimationFrame(this.animate.bind(this));\n}\n\nRender.prototype.animate = function animate(time) {\n  const dt = time - this.lastTime;\n\n  this.game.move(dt);\n  this.game.draw(this.ctx);\n  this.game.spawnEnemy();\n  this.lastTime = time;\n\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nRender.prototype.addStartMenu = function addStartMenu() {\n  this.game.addStartMenu();\n};\n\nmodule.exports = Render;\n\n//# sourceURL=webpack:///./src/render.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Score() {\n  this.score = 0;\n};\n\nScore.prototype.draw = function draw(ctx) {\n  ctx.font = \"16px Open Sans\";\n  ctx.fillStyle = \"gold\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(`Demons Slain:  ${this.score}`, 65, 16);\n};\n\nScore.prototype.move = function move() {\n\n};\n\nScore.prototype.addToScore = function addToScore(val) {\n  this.score += val;\n};\n\nmodule.exports = Score;\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/score_popup.js":
/*!****************************!*\
  !*** ./src/score_popup.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function ScorePopup(val) {\n  this.pos = [650, 50]\n  this.value = val;\n  this.timeLeft = 60;\n  this.vel = [0, -1];\n};\n\nScorePopup.prototype.draw = function draw(ctx) {\n  ctx.font = \"18px Open Sans\";\n  ctx.fillStyle = \"white\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(`+ ${this.value}`, this.pos[0], this.pos[1]);\n};\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nScorePopup.prototype.move = function move(dt) {\n\n  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,\n    dy = this.vel[1] * velocityScale;\n\n  this.pos[1] += dy;\n  this.timeLeft -= 1;\n};\n\nmodule.exports = ScorePopup;\n\n//# sourceURL=webpack:///./src/score_popup.js?");

/***/ }),

/***/ "./src/start_menu.js":
/*!***************************!*\
  !*** ./src/start_menu.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function StartMenu() {\n\n};\n\nStartMenu.prototype.draw = function draw(ctx) {\n  ctx.font = \"50px Open Sans\";\n  ctx.fillStyle = \"gold\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"Demon Slayer\", 700 / 2, 480 / 3);\n  ctx.font = \"18px Open Sans\";\n  ctx.fillStyle = \"white\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"Survive for as long as you can!\", 700 / 2, 400 / 2);\n  ctx.font = \"16px Open Sans\";\n  ctx.fillStyle = \"white\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"-Use 'W,A,S,D' to move, 'space' to attack, and 'shift' to dash\", 700 / 2, 480 / 2);\n  ctx.font = \"20px Open Sans\";\n  ctx.fillStyle = \"gold\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"Press 'return' to start\", 700 / 2, 330);\n  ctx.font = \"16px Open Sans\";\n  ctx.fillStyle = \"white\";\n  ctx.textAlign = \"center\";\n  ctx.fillText(\"-Press 'esc' to return to the main menu\", 700 / 2, 540 / 2);\n};\n\nStartMenu.prototype.move = function move() {\n\n};\n\nmodule.exports = StartMenu;\n\n\n//# sourceURL=webpack:///./src/start_menu.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  atFloor(object) {\n    return object.pos[1] + object.radius  >= 480 ? true : false;\n  },\n\n  outOfBounds(pos, radius) {\n    if (pos <= -radius*2 - 2) {\n      return \"left\";\n    } else if (pos >= 700 + radius*2 + 2) {\n      return \"right\";\n    } else {\n      return false;\n    }\n  },\n\n  wrap(object, wrapDir) {\n    if (wrapDir === \"right\") {\n      return  -object.radius*2;\n    } else if (wrapDir === \"left\") {\n      return 700 + object.radius*2;\n    } \n  }, \n\n  onPlatform(pos, radius, vel) {\n    const x = pos[0]\n    if (vel[1] < 0) {\n      return false\n    } else if ((25 <= x && x <= 225 ) && (350 - radius <= pos[1]  && pos[1] <= 350)) {\n      return 1;\n    } else if ( (250 <= x && x <= 450) && (200 - radius <= pos[1] && pos[1] <= 200)) {\n      return 2;\n    } else if ((475 <= x && x <= 675) && (350 - radius <= pos[1] && pos[1] <= 350)) {\n      return 3;\n    } else {\n      return false;\n    }\n  },\n\n  dist(pos1, pos2) {\n    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1]), 2)\n  },\n};\n\nmodule.exports = Util\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });