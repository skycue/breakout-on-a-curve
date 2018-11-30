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
    this.paddle = new Paddle(canvas, ctx, this.canvas.width / 2);

    this.draw = this.draw.bind(this);

    this.rightKeyDown = false; // Will this variable be available outside of the constructor?
    this.leftKeyDown = false; // Nope

    // document.addEventListener("keydown", this.keyDownEventHandler, false); // Should this be before setInterval?
    // document.addEventListener("keyup", this.keyUpEventHandler, false);

    setInterval(this.draw, 1);
  }

  keyDownEventHandler(e) {
    debugger
    if (e.keyCode === 39) {
      debugger
      this.rightKeyDown = true;
    } else if (e.keyCode === 37) {
      this.leftKeyDown = true;
    }
  }

  keyUpEventHandler(e) {
    debugger
    if (e.keyCode === 39) {
      this.rightKeyDown = false;
    } else if (e.keyCode === 37) {
      this.leftKeyDown = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ball
    this.ball.draw();

    // Draw paddle
    this.paddle.draw();

    document.addEventListener("keydown", this.keyDownEventHandler, false);
    document.addEventListener("keyup", this.keyUpEventHandler, false);

    if (this.ball.y + this.dy < this.ballRadius ||
      this.ball.y + this.dy > this.canvas.height - this.ballRadius) {
      this.dy = -this.dy;
    }

    if (this.ball.x + this.dx < this.ballRadius ||
      this.ball.x + this.dx > this.canvas.width - this.ballRadius) {
      this.dx = -this.dx;
    }

    if (this.rightKeyDown) {
      debugger
      this.paddle.x += 8;
    } else if (this.leftKeyDown) {
      debugger
      this.paddle.x -= 8;
    }


    this.ball.x += this.dx;
    this.ball.y += this.dy;

    // Draw paddle
    this.paddle.draw();
  }
}

module.exports = GameScreen;
