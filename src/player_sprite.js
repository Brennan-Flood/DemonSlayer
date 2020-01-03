function PlayerSprite(pos) {
  this.pos = pos;
  this.currentAnimation = null;
  this.currentSpriteSheet = null;
  this.currentSrcPos = null;
  this.currentSrcDim = null;
  this.currentDestPos = null;
  this.currentDestDim = null;
  this.spriteSheet1 = new Image();
  this.spriteSheet1.src = "assets/tanjiro_base_spritesheet.png";
  this.spriteSheet1Reversed = new Image();
  this.spriteSheet1Reversed.src = "assets/tanjiro_base_spritesheet_reversed.png";
};

PlayerSprite.prototype.draw = function draw(ctx, currentWalkingDirection, currentAnimation, direction, currentAnimationFrame, isAttacking, attackAnimationFrame ) {

};  

PlayerSprite.prototype.move = function move(dt) {

};

PlayerSprite.prototype.getCurrentAnimationInfo = function getCurrentAnimationInfo(currentSprite) {

};

module.exports = PlayerSprite;
