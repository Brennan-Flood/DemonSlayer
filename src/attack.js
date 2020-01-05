const AttackSprite = require("./attack_sprite");

function Attack(pos) {
  this.attacking = false;
  this.attackTimeLeft = 0;
  this.playerPos = pos;
  this.vel = [0, 0];
  this.pos = pos;
  this.width = 10;
  this.height = 10;
  this.playerDirectionMultiplier = null;
  this.attackSprite = new AttackSprite(this.pos);
  this.direction = null;
};

Attack.prototype.draw = function draw(ctx) {
  if (this.attackTimeLeft > 33) {
    this.width = 30*this.playerDirectionMultiplier;
    this.height = -35;
    this.attackSprite.srcPos = [0,0];
    this.attackSprite.srcDim = [0, 0];
    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [0, 0] : [0, 0]);
    if (this.playerDirectionMultiplier < 0) {
      this.attackSprite.direction = "left"
    } else {
      this.attackSprite.direction = "right"
    }
  } else if (this.attackTimeLeft > 25) {
    this.width = 140*this.playerDirectionMultiplier;
    this.height = -70;
    
    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [170, 120] : [318, 120]) ;
    this.attackSprite.srcDim = [90, 80];
    this.attackSprite.destDim = ( this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);
    
  } else if ( this.attackTimeLeft > 18) {
    this.width = 140 * this.playerDirectionMultiplier;
    this.height = -70;
    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [260, 120] : [230, 120]);
    this.attackSprite.srcDim = [90, 80];
    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);

  } else if (this.attackTimeLeft > 10) {
    this.width = 140*this.playerDirectionMultiplier;
    this.height = -70;
    this.attackSprite.srcPos = (this.playerDirectionMultiplier > 0 ? [365, 120] : [125, 120]);
    this.attackSprite.srcDim = [90, 80];
    this.attackSprite.destDim = (this.playerDirectionMultiplier > 0 ? [140, 100] : [-120, 100]);
  } else {
    this.width = 0*this.playerDirectionMultiplier;
    this.height = 0;
  }
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.beginPath();
  ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
  ctx.fill();
  if (this.attacking) {
    this.attackSprite.draw(ctx, this.a);
  }
  if (this.attackTimeLeft > 0) {
    this.attackTimeLeft -= 1;
  } else {
    this.attacking = false;
  }
};

Attack.prototype.move = function move(playerPos) {
  if (this.attacking && this.attackTimeLeft < 34) {
    this.pos = this.pos.map((posVal) => {
      return posVal;
    });
    this.pos[0] += this.vel[0];
  } else {
    this.pos = playerPos;
  }
  this.attackSprite.move(this.pos);
};

Attack.prototype.startAttack = function startAttack(playerDirection) {
  if (!this.attacking) {
    this.direction = playerDirection;
    this.playerDirectionMultiplier = (playerDirection === "left" ? -1 : 1)
    this.vel = (playerDirection === "right" ? [3, 0] : [-3, 0])
    this.attackTimeLeft = 60;
    this.attacking = true;
  }
}

module.exports = Attack;