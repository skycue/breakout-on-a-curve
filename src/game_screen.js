const Ball = require("./ball");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.dx = 0.1;
    this.dy = -0.1;
    this.ball = new Ball(this.ctx, 200, 300);

    this.draw = this.draw.bind(this);
    setInterval(this.draw, 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();
    this.ball.x += this.dx;
    this.ball.y += this.dy;
  }
}

module.exports = GameScreen;
