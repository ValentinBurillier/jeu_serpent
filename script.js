// Au chargement de la page
window.onload = function() {
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 1000;
  let snakee;
  
  init();

  // THE INIT FUNCTION CREATE A CANVAS AND A SNAKE
  function init() {

    // CREATE CANVAS
    let canvas = document.createElement('canvas'); // <canvas></canvas>
    canvas.width = canvasWidth; // largeur du canvas
    canvas.height = canvasHeight; // hauteur du canvas
    canvas.style.border = '1px solid'; // bordure du canvas
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d'); //contexte du canvas en 2D

    // CREATE SNAKE WITH A BODY
    snakee = new Snake([[6,4], [5,4], [4,4]]); // Taille /représentation du serpent au début en longueur de blocks aux coordonnes x et y
    // le serpent allant de gauche à droite, [6,4] correspond à la tête du serpent
    refreshCanvas();
  }

  function refreshCanvas() {
    ctx.clearRect(0,0,canvasWidth, canvasHeight); // On efface entièrement le canvas pour faire propre et éviter des traces lors de chaque dessin du serpent lorqu'ila avance.
    snakee.draw(); // Je dessine mon serpent
    snakee.advance(); // Je fais avancer mon serpent
    setTimeout(refreshCanvas, delay); // je relancer la fonction : effacage + creation du serpent + avancer
  }

  // Dessine un bloc / une partie du serpent
  function drawblock(ctx, position) {
    let x = position[0] * blockSize; //i = 0 :  x = 6 * 30px = 180 
    let y = position[1] * blockSize; //i = 0 :  y = 4 * 30px = 120
    // pour i = 0, le rectangle est dessiné aux coordonnées (180,120) avec une taille de 30 x 30px
    ctx.fillRect(x,y, blockSize, blockSize); // dessin du rectangle (180,120,30,30). les coordonnées sont le coin haut à gauche du rectangle
  }

  // CREATE SNAKE
  function Snake(body) {
    this.body = body; // body block width
    // DRAW DESSINE LE SERPENT SUR LE CANVAS
    this.draw = function() { 
      ctx.save(); // sauvegarde l'état actuel du contexte de dessin (couleurs, transformations, etc) ici il s'agit des valeurs initiales
      ctx.fillStyle = "#ff0000"; // Couleur rouge du serpent (VALEURS TEMPORAIRES)

      // pour chaque élément du corps du serpent, on appelle drawblock incluant le contexte et chaque partie du corps du serpent
      for(let i = 0; i < this.body.length; i++) { // TEMPORAIRE
        drawblock(ctx, this.body[i]);
      };

      // permet de revenir à l'état précédent après avoir fini de dessiner le serpent.
      ctx.restore(); // LA COULEUR ROUGE TEMPORAIRE REVIENT A LA COULEUR INITIALE
    };
    this.advance = function() { // fonction pour avancer le serpent toutes les n millisecondes
      let nextPosition = this.body[0].slice();
      nextPosition[0] += 1; // [7,4]
      this.body.unshift(nextPosition); // now [[7,4], [6,4], [5,4], [4,4]]
      this.body.pop(); // now [[7,4], [6,4], [5,4]]
    }
  }

}