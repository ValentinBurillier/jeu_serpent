// Au chargement de la page
window.onload = function() {
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 200;
  let snakee;
  let applee;
  let widthInBlocks = canvasWidth/blockSize;
  let heightInBlocks = canvasHeight/blockSize;
  
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
    snakee = new Snake([[6,4], [5,4], [4,4]], "right"); // Taille /représentation du serpent au début en longueur de blocks aux coordonnes x et y
    // le serpent allant de gauche à droite, [6,4] correspond à la tête du serpent
    applee = new Apple([10,10]);
    refreshCanvas();
  }

  function refreshCanvas() {
    if(snakee.checkCollision()) {

    } else {
      if(snakee.isEatingApple(applee)) {
        snakee.ateApple = true;
        do {
          applee.setNewPosition();
        }
        while(applee.isOnSnake(snakee));
      }
      ctx.clearRect(0,0,canvasWidth, canvasHeight); // On efface entièrement le canvas pour faire propre et éviter des traces lors de chaque dessin du serpent lorqu'ila avance.
      snakee.draw(); // Je dessine mon serpent
      snakee.advance(); // Je fais avancer mon serpent
      applee.draw();
      setTimeout(refreshCanvas, delay); // je relancer la fonction : effacage + creation du serpent + avancer
    }

  }

  // Dessine un bloc / une partie du serpent
  function drawblock(ctx, position) {
    let x = position[0] * blockSize; //i = 0 :  x = 6 * 30px = 180 
    let y = position[1] * blockSize; //i = 0 :  y = 4 * 30px = 120
    // pour i = 0, le rectangle est dessiné aux coordonnées (180,120) avec une taille de 30 x 30px
    ctx.fillRect(x,y, blockSize, blockSize); // dessin du rectangle (180,120,30,30). les coordonnées sont le coin haut à gauche du rectangle
  }

  // CREATE SNAKE
  function Snake(body, direction) {
    this.body = body; // body block width
    this.direction = direction;
    this.ateApple = false;
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
      switch(this.direction) {
        case "left":
          nextPosition[0] -= 1;
          break;
        case "right":
          nextPosition[0] += 1;
          break;
        case "down":
          nextPosition[1] += 1;
          break;
        case "up":
          nextPosition[1] -= 1;
          break;
        default:
          throw("Invalid Direction");
      }
      // nextPosition[0] += 1; // [7,4]
      this.body.unshift(nextPosition); // now [[7,4], [6,4], [5,4], [4,4]]
      if(!this.ateApple) {
        this.body.pop(); // now [[7,4], [6,4], [5,4]]
      } else {
        this.ateApple = false;
      }
      
    };
    this.setDirection = function(newDirection) {
      let allowedDirections;
      switch(this.direction) {
        case "left":
        case "right":
          allowedDirections = ["up", "down"];
          break;
        case "down":
        case "up":
          allowedDirections = ["left", "right"];
          break;
        default:
          throw("Invalid Direction");
      }
      if(allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    }
    this.checkCollision = function() {
      let wallCollision = false;
      let snakeCollision = false;
      let head = this.body[0];
      let rest = this.body.slice(1);
      let snakeX = head[0];
      let snakeY = head[1];
      let minX = 0;
      let minY = 0;
      let maxX = widthInBlocks - 1;
      let maxY = heightInBlocks - 1;
      let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
      let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

      if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
        wallCollision = true;
      }
      for(let i = 0; i < rest.length; i++) {
        if(snakeX === rest[i][0] && snakeY === rest[i][1]) {
          snakeCollision = true;
        }
      }

      return wallCollision || snakeCollision;
    };
    this.isEatingApple = function(appleToEat) {
      let head = this.body[0];
      if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
        return true;
      } else {
        return false;
      }
    };
  }

  // Ajouter la pomme
  function Apple(position) {
    this.position = position;
    this.draw = function() {
      ctx.save();
      ctx.fillStyle = "#33cc33";
      ctx.beginPath();
      let radius = blockSize/2;
      let x = this.position[0]*blockSize + radius;
      let y = this.position[1]*blockSize + radius;
      ctx.arc(x,y,radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.restore();
    };
    this.setNewPosition = function() {
      let newX = Math.round(Math.random() * (widthInBlocks -1));
      let newY = Math.round(Math.random() * (heightInBlocks -1));
      this.position = [newX, newY];
    };
    this.isOnSnake = function(snakeToCheck) {
      let isOnSnake = false;
      for(let i = 0; i < snakeToCheck.body.length; i++) {
        if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
          isOnSnake = true;
        }
      }
      return isOnSnake;
    }
  }

  document.onkeydown = function handleKeyDown(e) { // Détecter l'appuie sur une touche par l'utilisateur
    let key = e.keyCode; // stock code touche dans la variable
    let newDirection;
    switch(key) {
      case 37:
        newDirection = "left";
        console.log("left");
        break;
      case 38:
        newDirection = "up";
        console.log("up")
        break;
      case 39:
        newDirection = "right";
        console.log("right");
        break;
      case 40:
        newDirection = "down";
        console.log("down");
        break;
      default:
        return;
    }
    snakee.setDirection(newDirection);
  }

}

