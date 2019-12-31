const Util = {
  atFloor(object) {
    return object.pos[1] + object.radius  >= 480 ? true : false;
  },

  outOfBounds(pos, radius) {
    if (pos <= -radius*2 - 2) {
      return "left";
    } else if (pos >= 700 + radius*2 + 2) {
      return "right";
    } else {
      return false;
    }
  },

  wrap(object, wrapDir) {
    if (wrapDir === "right") {
      return  -object.radius*2;
    } else if (wrapDir === "left") {
      return 700 + object.radius*2;
    } 
  }, 

  onPlatform(pos, radius, vel) {
    const x = pos[0]
    if (vel[1] < 0) {
      return false
    } else if ((25 <= x && x <= 225 ) && (350 - radius <= pos[1]  && pos[1] <= 350)) {
      return 1;
    } else if ( (250 <= x && x <= 450) && (200 - radius <= pos[1] && pos[1] <= 200)) {
      return 2;
    } else if ((475 <= x && x <= 675) && (350 - radius <= pos[1] && pos[1] <= 350)) {
      return 3;
    } else {
      return false;
    }
  },

  dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1]), 2)
  },
};

module.exports = Util