class Paddle {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height, 50, Math.PI, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }
}

module.exports = Paddle;
