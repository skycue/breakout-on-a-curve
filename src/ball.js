class Ball {
  constructor(ctx, xPos, yPos, radius) {
    this.ctx = ctx;
    this.x = xPos;
    this.y = yPos;
    this.radius = radius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Ball;
