const Ball = require("./ball");
const Paddle = require("./paddle");
const Util = require("./util");
const Brick = require("./brick");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    //Score Information
    this.score = 0;

    // Information for ball
    this.ballRadius = 20;
    this.ball = new Ball(canvas, ctx, 200, 300, this.ballRadius, this.getRandomColor());

    // Information for bricks
    this.bricks = this.populateBricks(1, 1);

    //Information for paddle
    this.paddleRadius = 90;
    this.paddle = new Paddle(canvas, ctx, this.canvas.width / 2, this.paddleRadius, this.getRandomColor());

    this.rightKeyDown = false;
    this.leftKeyDown = false;

    this.draw = this.draw.bind(this);
    // this.keyDownEventHandler = this.keyDownEventHandler.bind(this);
    // this.keyUpEventHandler = this.keyUpEventHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    // this.draw();
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

  mouseMoveHandler(e) {
    const relativeX = e.clientX;
    if (relativeX - this.paddle.radius > 0 && relativeX + this.paddle.radius < this.canvas.width) {
        this.paddle.x = relativeX;
    }
  }

  drawScore(ctx, score) {
    // ctx.font = "16px Arial";
    // ctx.fillStyle = "#0095DD";
    // ctx.fillText("Score: " + score, 8, 400);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// debugger
    // Draw paddle
    this.paddle.draw();

    // Draw ball
    this.ball.draw();

    //Draw score
    this.drawScore(this.ctx, this.score);

    // Draw bricks
    this.bricks.forEach(row => {
      row.forEach(brick => brick.draw());
    })

    const ballBrickCollision = this.ballCollidedBrick(this.ball, this.bricks);

    if (ballBrickCollision.collided) {
      let newBallColor = this.getRandomColor();
      while (newBallColor === this.ball.color) {
        newBallColor = this.getRandomColor();
      }
      this.ball.color = newBallColor;

      if (ballBrickCollision.collidedBottom) {
        this.ball.dy = -1 * this.ball.dy;
      } else if (ballBrickCollision.collidedSide) {
        this.ball.dx = -1 * this.ball.dx;
      }
      this.bricks[ballBrickCollision.pos[0]][ballBrickCollision.pos[1]].visible = false;

      this.score++;
    }

    this.paddleCollision(this.ball, this.paddle, this.ctx);

    this.wallCollision(this.ball, this.canvas);

    // document.addEventListener("keydown", this.keyDownEventHandler, false);
    // document.addEventListener("keyup", this.keyUpEventHandler, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);

    this.ball.move();
    //this.paddle.move(this.leftKeyDown, this.rightKeyDown);
    requestAnimationFrame(this.draw);
  }

  wallCollision(ball, canvas) {
    if (ball.y + ball.dy <= ball.radius ||
      ball.y + ball.dy > canvas.height - ball.radius) {
      // debugger
      ball.dy = -ball.dy;
      ball.y += ball.dy;
      // ball.draw();
    }

    if (ball.x + ball.dx <= ball.radius ||
      ball.x + ball.dx > canvas.width - ball.radius) {
      ball.dx = -ball.dx;
      ball.x += ball.dx;
      // ball.draw();
    }


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

        if (!brick.visible) {
          continue;
        }

        const brickPos = brick.pos;

        const ballInXRange = ballPos[0] > brickPos[0] && ballPos[0] < brickPos[0] + brick.width;
        const ballInYRange = ballPos[1] > brickPos[1] && ballPos[1] < brickPos[1] + brick.height;
        const ballTouchBrickBottom = ballPos[1] - ball.radius <= brickPos[1] + brick.height;

        const ballTouchBrickLeft = ballPos[0] < brickPos[0] && ballPos[0] + ball.radius >= brickPos[0];
        const ballTouchBrickRight = ballPos[0] > brickPos[0] && ballPos[0] - ball.radius <= brickPos[0] + brick.width;

        const a = ballInYRange && ballTouchBrickLeft;
        const b = ballInYRange && ballTouchBrickRight;
        // Case 1: Ball touches bottom of brick
        if (ballInXRange && ballTouchBrickBottom) {
          return {collided: true, pos: [row, col], collidedBottom: true};
        } else if ((a) || (b)) {
          return {collided: true, pos: [row, col], collidedSide: true};
        }
      }
    }

    return {collided: false};
  }

  paddleCollision(ball, paddle, ctx) {
    const nextX = ball.x + ball.dx;
    const nextY = ball.y + ball.dy;
    const dist = Util.distance([nextX, nextY], [paddle.x, paddle.y]);

    if (dist <= ball.radius + paddle.radius) {

      const distX = ball.x - paddle.x;
      const distY = ball.y - paddle.y;
      const dx = ball.dx;
      const dy = -1 * ball.dy;

      let dxNew = ((-1 / Math.pow(dist, 2)) * ((Math.pow(distX, 2) - Math.pow(distY, 2)) * dx - (2 * distX * distY * dy)));
      let dyNew = ((1 / Math.pow(dist, 2)) * ((Math.pow(distY, 2) - Math.pow(distX, 2)) * dy - (2 * distX * distY * dx)));

      const hypo = Util.hypotenuse(dxNew, dyNew);
      const wantedSpeed = Util.hypotenuse(6, 6);
      const ratio = hypo / wantedSpeed;

      dxNew = dxNew / ratio;
      dyNew = dyNew / ratio;

      // console.log(`previous y: ${ball.dy}`);
      // console.log(`previous x: ${ball.dx}`);
      // console.log(`new y: ${dyNew}`);
      // console.log(`new x: ${dxNew}`);
      // console.log(`HYPO: ${Util.hypotenuse(dxNew, dyNew)}`);

      ball.dx = dxNew;
      ball.dy = dyNew;
      // console.log("old");
      // console.log(ball.x);
      // console.log(ball.y);

      ball.x += ball.dx;
      ball.y += ball.dy;
      // console.log("new");
      // console.log(ball.x);
      // console.log(ball.y);
      console.log("hit");
      console.log(ball.dx);
      console.log(ball.dy);
      // debugger
      // ctx.beginPath();
      // ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      // ctx.closePath();
      // ctx.fillStyle = ball.color;
      // ctx.fill();

      paddle.color = this.getRandomColor();

      return true;
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

  getRandomColor() {
    const letters = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}

module.exports = GameScreen;
