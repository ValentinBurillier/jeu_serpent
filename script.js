// Au chargement de la page
window.onload = function() {
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 1000;
  let snakee;
  
  init();

  function init() {
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth; // largeur du canvas
    canvas.height = canvasHeight; // hauteur du canvas
    canvas.style.border = '1px solid'; // bordure du canvas
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d'); //contexte du canvas en 2D
    snakee = new Snake([[6,4], [5,4], [4,4]]); // Taille /représentation du serpent au début
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    snakee.draw();
    snakee.advance();
    setTimeout(refreshCanvas, delay);
  }

  function drawblock(ctx, position) {
    let x = position[0] * blockSize;
    let y = position[1] * blockSize;
    ctx.fillRect(x,y, blockSize, blockSize);
  }

  function Snake(body) {
    this.body = body;
    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#ff0000";
      for(let i = 0; i < this.body.length; i++) {
        drawblock(ctx, this.body[i]);
      };
      ctx.restore();
    };
    this.advance = function() { // fonction pour avancer le serpent toutes les n millisecondes
      let nextPosition = this.body[0].slice();
      nextPosition[0] += 1; // [7,4]
      this.body.unshift(nextPosition); // now [[7,4], [6,4], [5,4], [4,4]]
      this.body.pop(); // now [[7,4], [6,4], [5,4]]
    }
  }

}