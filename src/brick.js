class Brick {
  constructor(ctx, pos, width, height) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.visible = true;
  }

  draw() {
    if (this.visible) {
      this.ctx.beginPath();
      this.ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
      this.ctx.closePath();
      this.ctx.fillStyle = "orange";
      this.ctx.fill();
      this.ctx.strokeStyle = "purple";
      this.ctx.stroke();
    }
  }
}

module.exports = Brick;
