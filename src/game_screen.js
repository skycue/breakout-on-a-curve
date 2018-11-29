const Ball = require("./ball");

class GameScreen {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.draw(ctx);
  }

  draw(ctx) {
    new Ball().draw(this.ctx)
  }
}

module.exports = GameScreen;
