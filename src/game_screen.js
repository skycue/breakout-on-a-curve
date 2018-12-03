const Ball = require("./ball");
const Paddle = require("./paddle");
const Util = require("./util");
const Brick = require("./brick");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    // Information for ball
    this.ballRadius = 10;
    this.ball = new Ball(canvas, ctx, 200, 300, this.ballRadius);

    // Information for bricks
    this.bricks = this.populateBricks(4, 5);

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

    // Draw bricks
    this.bricks.forEach(row => {
      row.forEach(brick => brick.draw());
    })

    if (this.ballCollidedBrick(this.ball, this.bricks)) {
      this.ball.dy = -1 * this.ball.dy;
    }

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

  ballCollidedBrick(ball, bricks) {
    const ballPos = [ball.x, ball.y];

    for (let row = 0; row < bricks.length; row++) {
      for (let col = 0; col < bricks[row].length; col++) {
        const brick = bricks[row][col];
        const brickPos = brick.pos;
        const ballInXRange = ballPos[0] > brickPos[0] && ballPos[0] < brickPos[0] + brick.width;
        const ballTouchBrickBottom = ballPos[1] - ball.radius <= brickPos[1] + brick.height;

        if (ballInXRange && ballTouchBrickBottom) {
          return true;
        }
      }
    }

    return false;
  }

  populateBricks(numRows, numCols) {
    const bricks = [];

    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(new Brick(this.ctx, [j * (this.canvas.width / numCols), i * (this.canvas.height / 3.5 / numRows)], this.canvas.width / numCols, this.canvas.height / 3.5 / numRows));
      }
      bricks.push(row);
    }
    return bricks;
  }
}

module.exports = GameScreen;
