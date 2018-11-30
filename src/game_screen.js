const Ball = require("./ball");
const Paddle = require("./paddle");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    // Information for ball
    this.dx = 0.2;
    this.dy = -0.2;
    this.ballRadius = 10;
    this.ball = new Ball(this.ctx, 200, 300, this.ballRadius);

    //Information for paddle
    this.paddle = new Paddle(canvas, ctx);

    this.draw = this.draw.bind(this);
    setInterval(this.draw, 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ball
    this.ball.draw();

    // Draw paddle
    // this.paddle.draw();

    if (this.ball.y + this.dy < this.ballRadius ||
      this.ball.y + this.dy > this.canvas.height - this.ballRadius) {
      this.dy = -this.dy;
    }

    if (this.ball.x + this.dx < this.ballRadius ||
      this.ball.x + this.dx > this.canvas.width - this.ballRadius) {
      this.dx = -this.dx;
    }


    this.ball.x += this.dx;
    this.ball.y += this.dy;

    // Draw paddle
    this.paddle.draw();
    debugger
  }
}

module.exports = GameScreen;
