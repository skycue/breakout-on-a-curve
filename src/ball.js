class Ball {
  constructor(ctx, xPos, yPos) {
    this.ctx = ctx;
    this.x = xPos;
    this.y = yPos;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Ball;
