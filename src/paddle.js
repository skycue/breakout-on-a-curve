class Paddle {
  constructor(canvas, ctx, xPos) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = xPos;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.canvas.height, 50, Math.PI, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }
}

module.exports = Paddle;
