class Ball {
  constructor(canvas, ctx, xPos, yPos, radius) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = xPos;
    this.y = yPos;
    this.radius = radius;
    this.dx = 0.2;
    this.dy = -0.2;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    if (this.y + this.dy < this.radius ||
      this.y + this.dy > this.canvas.height - this.radius) {
      this.dy = -this.dy;
    }

    if (this.x + this.dx < this.radius ||
      this.x + this.dx > this.canvas.width - this.radius) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

module.exports = Ball;
