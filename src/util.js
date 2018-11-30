const Util = {
  distance: function(pos1, pos2) {
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}

module.exports = Util;
