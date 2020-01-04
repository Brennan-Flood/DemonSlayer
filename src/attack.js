function Attack(pos) {
  this.attacking = false;
  this.attackTimeLeft = 0;
  this.pos = pos;
  this.width = 10;
  this.height = 10;
  this.playerDirectionMultiplier = null;
  this.attackSprite = new AttackSprite(this.pos);
};

Attack.prototype.draw = function draw(ctx) {
  if (this.attackTimeLeft > 30) {
    this.width = 30*this.playerDirectionMultiplier;
    this.height = -35;
    this.attackSprite.srcPos = [0,0];
    this.attackSprite.srcDim = [0, 0];
    this.attackSprite.destPos = [0, 0];
  } else if (this.attackTimeLeft > 20) {
    this.width = 50*this.playerDirectionMultiplier;
    this.height = -70;
    this.attackSprite.srcPos = [0 ,0];

  } else if (this.attackTimeLeft > 10) {
    this.width = 140*this.playerDirectionMultiplier;
    this.height = -70;
  } else {
    this.width = 0*this.playerDirectionMultiplier;
    this.height = 0;

  }
  ctx.fillStyle = "#ffffff"
  ctx.beginPath();
  ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
  ctx.fill();
  if (this.attackTimeLeft > 0) {
    this.attackTimeLeft -= 1;
  } else {
    this.attacking = false;
  }
};

Attack.prototype.move = function move(playerPos) {
  const posX = playerPos[0];
  const posY = playerPos[1];
  this.pos[0] = posX;
  this.pos[1] = posY;
  this.attackSprite.move(this.pos);
};

Attack.prototype.startAttack = function startAttack(playerDirection) {
  if (!this.attacking) {
    this.playerDirectionMultiplier = (playerDirection === "left" ? -1 : 1)
    this.attacking = true;
    this.attackTimeLeft = 60;
  }
}

module.exports = Attack;