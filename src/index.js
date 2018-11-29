const MovingObject = require("./moving_object");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("myCanvas");
  const ctx = canvasEl.getContext("2d");
  console.log("Webpack is working!");
  new MovingObject({ctx});
});
