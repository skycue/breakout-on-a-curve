class Paddle {
  constructor(canvas, ctx, xPos, paddleRadius) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = xPos;
    this.radius = paddleRadius;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.canvas.height, this.radius, Math.PI, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = "pink";
    this.ctx.fill();
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  move(leftKeyDown, rightKeyDown) {
    if (rightKeyDown && this.x + 50 + 0.5 <= this.canvas.width) {
      this.x += 1;
    } else if (leftKeyDown && this.x - 50 - 0.5 >= 0) {
      this.x -= 1;
    }
  }
}

module.exports = Paddle;
