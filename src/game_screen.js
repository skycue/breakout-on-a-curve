const Ball = require("./ball");
const Paddle = require("./paddle");
const Util = require("./util");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    // Information for ball
    this.ballRadius = 10;
    this.ball = new Ball(canvas, ctx, 200, 300, this.ballRadius);

    //Information for paddle
    this.paddleRadius = 50;
    this.paddle = new Paddle(canvas, ctx, this.canvas.width / 2, this.paddleRadius);

    this.rightKeyDown = false; // Will this variable be available outside of the constructor?
    this.leftKeyDown = false; // Nope

    // document.addEventListener("keydown", this.keyDownEventHandler, false); // Should this be before setInterval?
    // document.addEventListener("keyup", this.keyUpEventHandler, false);

    this.draw = this.draw.bind(this);
    this.keyDownEventHandler = this.keyDownEventHandler.bind(this);
    this.keyUpEventHandler = this.keyUpEventHandler.bind(this);

    setInterval(this.draw, 1);
  }

  keyDownEventHandler(e) {
    if (e.keyCode === 39) {
      this.rightKeyDown = true;
    } else if (e.keyCode === 37) {
      this.leftKeyDown = true;
    }
  }

  keyUpEventHandler(e) {
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

    this.ball.move();
    this.paddle.move(this.leftKeyDown, this.rightKeyDown);
  }

  ballCollidedPaddle(ball, paddle) {
    if (Util.distance([ball.x, ball.y], [paddle.x, this.canvas.height]) <= ball.radius + paddle.radius) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = GameScreen;
