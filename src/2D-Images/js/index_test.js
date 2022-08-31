var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

let valorX = 10
let valorY = 10
let objectWidth = 50
let objectHeight = 50
let borderWidth = 2
let colorFill = '#0f0'
let colorStroke = '#000'
let canvasWidth = 500
let canvasHeight = 500

let directionX = 0
let directionY = 0

const animate = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = colorFill;
    context.fillRect(valorX, valorY, objectWidth, objectHeight);
    context.lineWidth = borderWidth;
    context.strokeStyle = colorStroke;
    context.strokeRect(valorX, valorY, objectWidth, objectHeight);
    
    valorX += directionX;
    valorY += directionY;

    if((valorX <= 10) && (valorY <= 10) && ((valorX + objectWidth + 10) <= canvasWidth)){
        directionX = 1
        directionY = 0
    }
    if(((valorX + objectWidth + 10) >= canvasWidth) && (valorY <= 10)) {
        directionX = 0
        directionY = 1
    }
    if(((valorX + objectWidth + 10) >= canvasWidth) && ((valorY + objectHeight + 10) >= canvasHeight)) {
        directionX = -1
        directionY = 0
    }
    if((valorX <= 10) && ((valorY + objectHeight + 10) >= canvasHeight)) {
        directionX = 0
        directionY = -1
    }


    requestAnimationFrame(animate)
}

animate()