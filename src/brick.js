class Brick {
  constructor(ctx, pos, width, height) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = width;
    this.heigh = height;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
