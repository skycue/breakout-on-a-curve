const Ball = require("./ball");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.dx = 0.2;
    this.dy = -0.2;
    this.ballRadius = 10;
    this.ball = new Ball(this.ctx, 200, 300, this.ballRadius);

    this.draw = this.draw.bind(this);
    setInterval(this.draw, 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();

    if (this.ball.y + this.dy < 0 || this.ball.y + this.dy > this.canvas.height) {
      this.dy = -this.dy;
    }

    if (this.ball.x + this.dx < 0 || this.ball.x + this.dx > this.canvas.width) {
      this.dx = -this.dx;
    }


    this.ball.x += this.dx;
    this.ball.y += this.dy;
  }
}

module.exports = GameScreen;
