var image = document.getElementById('img');
var canvas = document.getElementById('image-canvas');
var context;
var canvasCIE = document.getElementById('image-canvas-cie');
var contextCIE;
var canvasNTSC = document.getElementById('image-canvas-ntsc');
var contextNTSC;

let load = function (){
    context = canvas.getContext('2d');
    contextCIE = canvasCIE.getContext('2d');
    contextNTSC = canvasNTSC.getContext('2d');
    drawImage(canvas, context, image);
    drawImage(canvasCIE, contextCIE, image);
    drawImage(canvasNTSC, contextNTSC, image);
}


let drawImage = function(cv, ctx, img) {
    cv.width = img.width;
    cv.height = img.height;
    ctx.drawImage(img, 0, 0);
}


class RGBColor {
    constructor(r, g, b) {
      this.red = r;
      this.green = g;
      this.blue = b;
    }
}

 
class MatrixImage {
    constructor(imageData) {
      this.imageData = imageData;
      this.height = imageData.height;
      this.width = imageData.width;
    }
    getPixel(x, y) {
        let position = ((y * (this.width * 4)) + (x * 4));
        return new RGBColor(
             this.imageData.data[position],   //red
             this.imageData.data[position+1], //green
             this.imageData.data[position+2], //blue
        );
    }
    setPixel(x, y, color) {
        let position = ((y * (this.width * 4)) + (x * 4));
        this.imageData.data[position] = color.red;
        this.imageData.data[position+1] = color.green;
        this.imageData.data[position+2] = color.blue;
    }
}


let grayScale = function() {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red + green + blue) / 3; 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let grayScaleCIE = function() {
    var imageData = contextCIE.getImageData(0, 0, canvasCIE.width, canvasCIE.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.2126 + green*0.7152 + blue*0.0722); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    contextCIE.putImageData(imageData, 0, 0);
}


let grayScaleNTSC = function() {
    var imageData = contextNTSC.getImageData(0, 0, canvasNTSC.width, canvasNTSC.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.299 + green*0.587 + blue*0.144); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    contextNTSC.putImageData(imageData, 0, 0);
}


let monoScale = function() {
    var threshold = 95;
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var gray = (data[i] + data[i+1] + data[i+2]) / 3;
        var mono = 255;
        if (gray <= threshold){
            mono = 0;
        }
        data[i] = data[i+1] = data[i+2] = mono;
    }
    context.putImageData(imageData, 0, 0);
}

let redScale = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j); 
            img.setPixel(i, j, new RGBColor(pixel.red, 0, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let greenScale = function() {
    let imageData = contextCIE.getImageData(0, 0, canvasCIE.width, canvasCIE.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(0, pixel.green, 0));
        }
    }
    contextCIE.putImageData(img.imageData, 0, 0);
}


let blueScale = function() {
    let imageData = contextNTSC.getImageData(0, 0, canvasNTSC.width, canvasNTSC.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(0, 0, pixel.blue));
        }
    }
    contextNTSC.putImageData(img.imageData, 0, 0);
}


document.getElementById('btn-load').addEventListener('click', load);
document.getElementById('btn-grayscale').addEventListener('click', grayScale);
document.getElementById('btn-grayscale-cie').addEventListener('click', grayScaleCIE);
document.getElementById('btn-grayscale-ntsc').addEventListener('click', grayScaleNTSC);
document.getElementById('btn-monochromatic').addEventListener('click', monoScale);
// ---------------------------------------------------------------------------------------------
document.getElementById('btn-red').addEventListener('click', redScale);
document.getElementById('btn-green').addEventListener('click', greenScale);
document.getElementById('btn-blue').addEventListener('click', blueScale);