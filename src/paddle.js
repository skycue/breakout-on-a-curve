class Paddle {
  constructor(canvas, ctx, xPos, paddleRadius, color) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = xPos;
    this.y = canvas.height;
    this.radius = paddleRadius;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.canvas.height, this.radius, Math.PI, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  move(leftKeyDown, rightKeyDown) {
    if (rightKeyDown && this.x + 50 + 0.5 <= this.canvas.width) {
      this.x += 4;
    } else if (leftKeyDown && this.x - 50 - 0.5 >= 0) {
      this.x -= 4;
    }
  }
}

module.exports = Paddle;
