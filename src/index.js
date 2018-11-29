const GameScreen = require("./game_screen");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  console.log("Webpack is working!");
  new GameScreen(canvas, ctx);
});
