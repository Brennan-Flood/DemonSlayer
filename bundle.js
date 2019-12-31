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

eval("const Game = __webpack_require__(/*! ./src/game */ \"./src/game.js\");\nconst Render = __webpack_require__(/*! ./src/render */ \"./src/render.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const cvs = document.getElementsByTagName(\"canvas\")[0];\n  cvs.width = Game.WIDTH;\n  cvs.height = Game.HEIGHT;\n\n  const ctx = cvs.getContext(\"2d\");\n  const game = new Game(ctx);\n  document.addEventListener('keydown', function (evt) {\n    if (evt.keyCode === 87) {\n      game.upKey();\n    } else if (evt.keyCode === 65) {\n      game.leftKey();\n    } else if (evt.keyCode === 83) {\n      console.log(\"s\")\n    } else if (evt.keyCode === 68) {\n      game.rightKey();\n    } else if (evt.keyCode === 32) {\n      game.startAttack();\n    } else if (evt.keyCode === 16) {\n      game.shiftKey();\n    }\n  }, false)\n\n  document.addEventListener('keyup', function(evt) {\n    if (evt.keyCode === 65) {\n      game.stopWalking(\"left\");\n    } else if (evt.keyCode === 68) {\n      game.stopWalking(\"right\");\n    } else if (evt.keyCode === 16) {\n      game.stopDash();\n    }\n  }, false)\n  new Render(game, ctx).start();\n});\n\n\n\n// w: 87,\n// a: 65,\n// s: 83,\n// d: 68,\n// space: 32\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function Attack(pos) {\n  this.attacking = false;\n  this.attackTimeLeft = 0;\n  this.pos = pos;\n  this.width = 10;\n  this.height = 10;\n  this.playerDirectionMultiplier = null;\n};\n\nAttack.prototype.draw = function draw(ctx) {\n  if (this.attackTimeLeft === ( 9 || false || false )) {\n    this.width = 30*this.playerDirectionMultiplier;\n    this.height = -35;\n  } else if (this.attackTimeLeft === ( 6 || false || false )) {\n    this.width = 50*this.playerDirectionMultiplier;\n    this.height = -40;\n  } else if (this.attackTimeLeft === ( 3 || false || false )) {\n    this.width = 60*this.playerDirectionMultiplier;\n    this.height = -40;\n  } else if (this.attackTimeLeft === 0) {\n    this.width = 10*this.playerDirectionMultiplier;\n    this.height = -10;\n  }\n  ctx.fillStyle = \"#ffffff\"\n  ctx.beginPath();\n  ctx.rect(this.pos[0], this.pos[1], this.width, this.height);\n  ctx.fill();\n  if (this.attackTimeLeft > 0) {\n    this.attackTimeLeft -= 1;\n  } else {\n    this.attacking = false;\n  }\n};\n\nAttack.prototype.move = function move(playerPos) {\n  const posX = playerPos[0];\n  const posY = playerPos[1];\n  this.pos[0] = posX;\n  this.pos[1] = posY;\n};\n\nAttack.prototype.startAttack = function startAttack(playerDirection) {\n  if (!this.attacking) {\n    this.playerDirectionMultiplier = (playerDirection === \"left\" ? -1 : 1)\n    this.attacking = true;\n    this.attackTimeLeft = 9;\n  }\n}\n\nmodule.exports = Attack;\n\n//# sourceURL=webpack:///./src/attack.js?");

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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Enemy(pos) {\n  this.pos = pos;\n  this.vel = [0, 1];\n  this.grav = 1;\n  this.radius = 30;\n  this.jumping = false;\n}\n\nEnemy.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = \"#ff0000\"\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n};\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nEnemy.prototype.move = function move(dt) {\n  if (this.vel[1] < 0) {\n    this.jumping = true;\n  } else if (this.pos[1] + this.vel[1] + 1 >= 465) {\n    this.vel[1] = 450 - this.pos[1];\n    this.jumping = false;\n  } else if (Util.atFloor(this)) {\n    this.vel[1] = 0;\n    this.jumping = false;\n  }\n\n  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);\n  if (outOfBounds) {\n    this.pos[0] = Util.wrap(this, outOfBounds)\n  }\n  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);\n  if (onPlatform === 1 || onPlatform === 3) {\n    this.pos[1] = 350 - this.radius;\n    this.vel[1] = 0;\n  } else if (onPlatform === 2) {\n    this.pos[1] = 200 - this.radius;\n    this.vel[1] = 0;\n  }\n\n  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,\n    dx = this.vel[0] * velocityScale,\n    dy = this.vel[1] * velocityScale;\n\n  let newPosX = this.pos[0] + dx;\n  let newPosY = this.pos[1] + dy;\n  newPosY = (newPosY > 450 ? 450 : newPosY)\n  this.pos[0] = newPosX;\n  this.pos[1] = newPosY;\n  if (onPlatform !== false) {\n    return;\n  }\n  this.vel[1] = (this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)\n};\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Background = __webpack_require__(/*! ./background */ \"./src/background.js\")\nconst Platform = __webpack_require__(/*! ./platform */ \"./src/platform.js\");\nconst Attack = __webpack_require__(/*! ./attack */ \"./src/attack.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Game(ctx) {\n  this.background = new Background();\n  this.players = [];\n  this.platforms= [];\n  this.playerPos = null;\n  this.playerAttack = null;\n  this.enemies = [];\n  this.playerDirection = null;\n  this.enemyTimeout = 50;\n}\n\nGame.WIDTH = 700;\nGame.HEIGHT = 480;\nGame.FPS = 32;\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);\n  ctx.drawImage(this.background.image, 0, 0)\n  this.objects().forEach(object => {\n    object.draw(ctx);\n  });\n  this.playerAttack.draw(ctx);\n};\n\nGame.prototype.upKey = function upKey() {\n  let player = this.players[0];\n  player.jump();\n};\n\nGame.prototype.leftKey = function leftKey() {\n  let player = this.players[0];\n  player.walk(\"left\");\n};\n\nGame.prototype.rightKey = function rightkey() {\n  let player = this.players[0];\n  player.walk(\"right\");\n};\n\nGame.prototype.shiftKey = function shiftKey() {\n  let player = this.players[0];\n  player.dash();\n};\n\nGame.prototype.stopDash = function stopDash() {\n  let player = this.players[0];\n  player.stopDash();\n};\n\nGame.prototype.stopWalking = function stopWalking(dir) {\n  let player = this.players[0];\n  player.stopWalking(dir);\n};\n\nGame.prototype.addPlayer = function addPlayer() {\n  const player = new Player();\n  this.players.push(player);\n  this.playerPos = player.pos;\n};\n\nGame.prototype.addPlatforms = function addPlatforms(){\n  let platform1 = new Platform([25, 350]);\n  let platform2 = new Platform([250, 200]);\n  let platform3 = new Platform([475, 350]);\n  this.platforms.push(platform1);\n  this.platforms.push(platform2);\n  this.platforms.push(platform3);\n};\n\nGame.prototype.addPlayerAttack = function addPlayerAttack() {\n  let playerAttack = new Attack(this.playerPos);\n  this.playerAttack = playerAttack;\n};\n\nGame.prototype.addEnemies = function addEnemies() {\n  let pos1 = [100, 100];\n  let pos2 = [200, 100];\n  let pos3 = [300, 100];\n\n  let enemy1 = new Enemy(pos1);\n  let enemy2 = new Enemy(pos2);\n  let enemy3 = new Enemy(pos3);\n  this.enemies.push(enemy1);\n  this.enemies.push(enemy2);\n  this.enemies.push(enemy3);\n  console.log(this.enemies);\n};\n\nGame.prototype.objects = function objects() {\n  return [].concat(this.platforms).concat(this.players).concat(this.enemies);\n};\n\nGame.prototype.move = function move(dt) {\n  this.objects().forEach(object => {\n    object.move(dt);\n  });\n  this.playerPos = this.players[0].pos;\n  this.playerAttack.move(this.playerPos);\n};\n\nGame.prototype.startAttack = function startAttack() {\n  this.getPlayerDirection();\n  this.playerAttack.startAttack(this.playerDirection);\n};\n\nGame.prototype.getPlayerDirection = function getPlayerDirection() {\n  let playerDirection = this.players[0].lastDirection;\n  if (playerDirection === \"right\") {\n    this.playerDirection = \"right\";\n  } else if (playerDirection === \"left\") {\n    this.playerDirection = \"left\";\n  } else {\n    return;\n  }\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/platform.js":
/*!*************************!*\
  !*** ./src/platform.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Platform(pos) {\n  this.pos = pos;\n  this.color = \"#cc7a00\"\n};\n\nPlatform.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color\n  ctx.beginPath();\n  ctx.rect(this.pos[0], this.pos[1], 200, 20);\n  ctx.fill();\n};\n\nPlatform.prototype.move = function move() {\n  \n};\n\nmodule.exports = Platform;\n\n//# sourceURL=webpack:///./src/platform.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Player() {\n  this.pos = [300, 300];\n  this.vel = [0, 1]\n  this.radius = 30;\n  this.grav = 1;\n  this.jumpFramesLeft = 0;\n  this.walkingLeft = false;\n  this.walkingRight = false;\n  this.runSpeed = 3;\n  this.dashSpeed = 6;\n  this.lastDirection = null;\n}\n\nPlayer.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = \"#00ff00\"\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nPlayer.prototype.move = function move(dt) {\n  if (this.vel[1] < 0 ) {\n    this.jumping = true;\n  } else if (this.pos[1] + this.vel[1] + 1 >= 465) {\n    this.vel[1] = 450 - this.pos[1];\n    this.jumping = false;\n  } else if (Util.atFloor(this)){\n    this.vel[1] = 0; \n    this.jumping = false;\n  } \n\n  let outOfBounds = Util.outOfBounds(this.pos[0], this.radius);\n  if (outOfBounds) {\n    this.pos[0] = Util.wrap(this, outOfBounds)\n  }\n  let onPlatform = Util.onPlatform(this.pos, this.radius, this.vel);\n  if (onPlatform === 1 || onPlatform === 3) {\n    this.pos[1] = 350 - this.radius;\n    this.vel[1] = 0;\n  } else if (onPlatform === 2) {\n    this.pos[1] = 200 - this.radius;\n    this.vel[1] = 0;\n  } \n\n  const velocityScale = dt / NORMAL_FRAME_TIME_DELTA,\n    dx = this.vel[0] * velocityScale,\n    dy = this.vel[1] * velocityScale;\n  \n  let newPosX = this.pos[0] + dx;\n  let newPosY = this.pos[1] + dy;\n  newPosY = (newPosY > 450 ? 450 : newPosY )\n  this.pos[0] = newPosX;\n  this.pos[1] = newPosY;\n  if (onPlatform !== false ) {\n    return;\n  } \n  this.vel[1] = ( this.pos[1] === 450 ? 0 : this.vel[1] + this.grav)\n};\n\nPlayer.prototype.jump = function jump() {\n  if (this.vel[1] === 0 && ( Util.onPlatform(this.pos, this.radius, this.vel) !== false || Util.atFloor(this) !== false) ) {\n  this.vel[1] = -15;\n  this.jumpFramesLeft = 6;\n  this.jumpsLeft = 1;\n  } else if (this.jumpsLeft === 1) {\n    this.vel[1] = -12;\n    this.jumpsLeft = 0;\n  }\n};\n\nPlayer.prototype.walk = function walk(dir) {\n  let speed;\n  speed = (this.dashing ? this.dashSpeed : this.runSpeed)\n  if (dir === \"left\" ) {\n    this.vel[0] = -speed;\n    this.walkingLeft = true;\n    this.lastDirection = \"left\";\n  } else if (dir === \"right\") {\n    this.vel[0] = speed;\n    this.walkingRight = true;\n    this.lastDirection = \"right\";\n  } else {\n    this.walkingLeft = false;\n    this.walkingRight = false;\n    this.vel[0] = 0\n  }\n};\n\nPlayer.prototype.dash = function dash() {\n  this.dashing = true;\n  if (this.walkingLeft) {\n    this.vel[0] = -this.dashSpeed;\n  } else if (this.walkingRight) {\n    this.vel[0] = this.dashSpeed;\n  }\n};\n\nPlayer.prototype.stopWalking = function stopWalking(dir) {\n  let speed;\n  speed = (this.dashing ? this.dashSpeed : this.runSpeed)\n  if (dir === \"left\" && this.walkingRight === true) {\n    this.vel[0] = speed;\n    this.walkingLeft = false;\n    this.lastDirection = \"right\";\n  } else if (dir === \"right\" && this.walkingLeft === true) {\n    this.vel[0] = -speed;\n    this.walkingRight = false;\n    this.lastDirection = \"left\";\n  } else if ((dir === \"right\" && !this.walkingLeft)) {\n    this.vel[0] = 0;\n    this.walkingRight = false;\n  } else if (dir === \"left\" && !this.walkingRight) {\n    this.vel[0] = 0;\n    this.walkingLeft = false;\n  }\n}\n\n\nPlayer.prototype.stopDash = function stopDash() {\n  this.dashing = false;\n  if (this.walkingLeft && !this.walkingRight) {\n    this.vel[0] = -this.runSpeed;\n  } else if (this.walkingRight && !this.walkingLeft) {\n    this.vel[0] = this.runSpeed;\n  }\n};\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Render(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n}\n\nRender.prototype.start = function start() {\n  this.lastTime = 0;\n  this.game.addPlayer();\n  this.game.addPlatforms();\n  this.game.addPlayerAttack();\n  this.game.addEnemies();\n  requestAnimationFrame(this.animate.bind(this));\n}\n\nRender.prototype.animate = function animate(time) {\n  const dt = time - this.lastTime;\n\n  this.game.move(dt);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = Render;\n\n//# sourceURL=webpack:///./src/render.js?");

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