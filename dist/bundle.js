/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Brick {
  constructor(ctx, pos, width, height) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    this.ctx.closePath();
    this.ctx.fillStyle = "orange";
    this.ctx.fill();
    this.ctx.strokeStyle = "purple";
    this.ctx.stroke();
  }
}

module.exports = Brick;


/***/ }),

/***/ "./src/game_screen.js":
/*!****************************!*\
  !*** ./src/game_screen.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(/*! ./ball */ "./src/ball.js");
const Paddle = __webpack_require__(/*! ./paddle */ "./src/paddle.js");
const Util = __webpack_require__(/*! ./util */ "./src/util.js");
const Brick = __webpack_require__(/*! ./brick */ "./src/brick.js");

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

    this.ballCollidedBrick(this.ball, this.bricks);

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

    bricks.forEach(row => {
      row.forEach(brick => {
        const brickPos = brick.pos;
        const ballInXRange = ballPos[0] > brickPos[0] && ballPos[0] < brickPos[0] + brick.width;
        const ballTouchBrickBottom = ballPos[1] - ball.radius <= brickPos[1] + brick.height;

        if (ballInXRange && ballTouchBrickBottom) {
          console.log(bricks.indexOf(row));
          console.log(row.indexOf(brick));
          debugger
          return true;
        }

      })
    })

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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameScreen = __webpack_require__(/*! ./game_screen */ "./src/game_screen.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  console.log("Webpack is working!");
  new GameScreen(canvas, ctx);
});


/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  distance: function(pos1, pos2) {
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}

module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map