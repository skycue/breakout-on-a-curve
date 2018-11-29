class MovingObject {
  constructor(options) {
    // this.position = options.position;
    // this.velocity = options.velocity;
    // this.color = options.color;
    this.draw(options.ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    // ctx.fillStyle = this.color;
    ctx.rect(40, 30, 50, 50);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = MovingObject;
