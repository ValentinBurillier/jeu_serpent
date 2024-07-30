// Au chargement de la page
window.onload = function() {
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 1000;
  let x = 0;
  let y = 0;
  
  init();

  function init() {
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth; // largeur du canvas
    canvas.height = canvasHeight; // hauteur du canvas
    canvas.style.border = '1px solid'; // bordure du canvas
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d'); //contexte du canvas en 2D
    refreshCanvas();
  }

  function refreshCanvas() {
    x += 20;
    y += 20;
    ctx.fillStyle = "#ff0000";
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    ctx.fillRect(x, y, 100, 50);
    setTimeout(refreshCanvas, delay);
  }

  function Snake(body) {
    this.body = body;
    this.draw = 
  }

}