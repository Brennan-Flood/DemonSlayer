function PlayerSprite(pos) {
  this.pos = pos;
  this.currentAnimation = null;
  this.spriteSheet1 = new Image();
  this.spriteSheet1.src = "assets/tanjiro_base_spritesheet.png";
  this.spriteSheet1Reversed = new Image();
  this.spriteSheet1Reversed.src = "assets/tanjiro_base_spritesheet_reversed.png";
};

PlayerSprite.prototype.draw = function draw(ctx) {

};

PlayerSprite.prototype.move = function move(ctx) {

};

PlayerSprite.prototype.getCurrentAnimationInfo = function getCurrentAnimationInfo() {

};

module.exports = PlayerSprite;
