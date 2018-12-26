const GameScreen = require("./game_screen");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  new GameScreen(canvas, ctx).draw();
});
