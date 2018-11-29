class Ball {
  constructor(options) {
    this.draw(options.ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(200, 300, 10, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Ball;
