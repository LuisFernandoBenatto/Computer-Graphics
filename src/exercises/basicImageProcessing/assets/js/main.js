var image = document.getElementById('img');
var canvas = document.getElementById('image-canvas');
var context;

let load = function(){
    context = canvas.getContext('2d');
    drawImage(canvas, context, image);
}


let drawImage = function(cv, ctx, img) {
    cv.width = img.width;
    cv.height = img.height;
    ctx.drawImage(img, 0, 0);
}


let grayScale = function() {
    load()
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
    load()
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.2126 + green*0.7152 + blue*0.0722); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let grayScaleNTSC = function() {
    load()
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.299 + green*0.587 + blue*0.144); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let monoScale = function() {
    load()
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


document.getElementById('btnLoadImage').addEventListener('click', load);
document.getElementById('btnGrayscale').addEventListener('click', grayScale);
document.getElementById('btnGrayscaleCie').addEventListener('click', grayScaleCIE);
document.getElementById('btnGrayscaleNtsc').addEventListener('click', grayScaleNTSC);
document.getElementById('btnMonochromatic').addEventListener('click', monoScale);