var image = document.getElementById('img');
var canvas = document.getElementById('image-canvas');
var context;

var value = 1
var already_rotated = false;

let load = function () {
    context = canvas.getContext('2d');
    drawImage(canvas, context, image);
    canvas.classList.remove('loopingImage');
}


let drawImage = function (cv, ctx, img, buildSquare = false) {
    let _width = img.width;
    let _height = img.height;
    if (buildSquare) {
        const heigherDimension = Math.max(_width, _height);
        _width = heigherDimension;
        _height = heigherDimension;
    }
    cv.width = _width;
    cv.height = _height;
    ctx.drawImage(img, 0, 0);
}


class RGBColor {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}


class RGBAColor extends RGBColor {
    constructor(r, g, b, a) {
        super(r, g, b);
        this.alpha = a;
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
        return new RGBAColor(
            this.imageData.data[position],  // red
            this.imageData.data[position + 1],  // green
            this.imageData.data[position + 2],  // blue
            this.imageData.data[position + 3],  // alpha
        );
    }
    setPixel(x, y, color) {
        let position = ((y * (this.width * 4)) + (x * 4));
        this.imageData.data[position] = color.red;
        this.imageData.data[position + 1] = color.green;
        this.imageData.data[position + 2] = color.blue;
        if (color.alpha !== undefined) {
            this.imageData.data[position + 3] = color.alpha;
        }
    }
}


let grayScale = function () {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var gray = (red + green + blue) / 3;
        data[i] = data[i + 1] = data[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let grayScaleCIE = function () {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var gray = (red * 0.2126 + green * 0.7152 + blue * 0.0722);
        data[i] = data[i + 1] = data[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let grayScaleNTSC = function () {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var gray = (red * 0.299 + green * 0.587 + blue * 0.144);
        data[i] = data[i + 1] = data[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let monoScale = function () {
    var threshold = 95;
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        var mono = 255;
        if (gray <= threshold) {
            mono = 0;
        }
        data[i] = data[i + 1] = data[i + 2] = mono;
    }
    context.putImageData(imageData, 0, 0);
}


let redScale = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red, 0, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let greenScale = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(0, pixel.green, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let blueScale = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(0, 0, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let magenta = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red, 0, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let cyan = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(0, pixel.green, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let yellow = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red, pixel.green, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let redScale_ = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red, pixel.red, pixel.red));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let greenScale_ = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.green, pixel.green, pixel.green));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let blueScale_ = function () {
    load()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.blue, pixel.blue, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let thresholding = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j).green;
            if (pixel > 127) {
                img.setPixel(i, j, new RGBColor(255, 255, 255));
            } else {
                img.setPixel(i, j, new RGBColor(0, 0, 0));
            }
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let mean = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 2; i < img.width - 2; i++) {
        for (var j = 2; j < img.height - 2; j++) {
            var pixel = Array();
            pixel.push(img.getPixel(i - 1, j - 1).red);
            pixel.push(img.getPixel(i - 1, j).red);
            pixel.push(img.getPixel(i, j - 1).red);
            pixel.push(img.getPixel(i + 1, j - 1).red);
            pixel.push(img.getPixel(i, j).red);
            pixel.push(img.getPixel(i - 1, j + 1).red);
            pixel.push(img.getPixel(i, j + 1).red);
            pixel.push(img.getPixel(i + 1, j).red);
            pixel.push(img.getPixel(i + 1, j + 1).red);
            var gray = pixel.reduce((a, b) => a + b, 0) / 9;
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let median = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = Array();
            pixel.push(img.getPixel(i - 1, j - 1).red);
            pixel.push(img.getPixel(i, j - 1).red);
            pixel.push(img.getPixel(i + 1, j - 1).red);
            pixel.push(img.getPixel(i - 1, j).red);
            pixel.push(img.getPixel(i, j).red);
            pixel.push(img.getPixel(i + 1, j).red);
            pixel.push(img.getPixel(i - 1, j + 1).red);
            pixel.push(img.getPixel(i, j + 1).red);
            pixel.push(img.getPixel(i + 1, j + 1).red);
            var gray = pixel.sort()[4];
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let gaussian = function () {
    const radius = 8;
    const blur = radius;
    const blurRange = blur * 3;
    const gaussParam = new Array;
    for (let i = 0; i <= blurRange; i++){
      gaussParam[i] = Math.exp(-i * i / (2 * blur * blur));
    }
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const img = new MatrixImage(imageData);
    const width = img.width;
    const height = img.height;
    const data = imageData.data;
    let ox, oy, gauss, count, R, G, B, A;
    for(let i = 0, len = width * height; i<len; i++){
        gauss = count = R = G = B = A = 0;
        ox = i % width;
        oy = (i / width)|0; // = Math.floor(i / width);
        for (let x = -1 * blurRange; x <= blurRange; x++){
            const tx = ox + x;
            if ((0 <= tx) && (tx < width)){
                gauss = gaussParam[x<0?-x:x]; // = [Math.abs(x)]
                const k = i + x;
                R += data[k*4 + 0] * gauss;
                G += data[k*4 + 1] * gauss;
                B += data[k*4 + 2] * gauss;
                A += data[k*4 + 3] * gauss;
                count += gauss;
            }
        }
        data[i*4 + 0] = (R / count)|0;
        data[i*4 + 1] = (G / count)|0;
        data[i*4 + 2] = (B / count)|0;
        data[i*4 + 3] = (A / count)|0;
    }
    context.putImageData(imageData, 0, 0);
}


let brightnessPlus = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red * 1.1, pixel.green * 1.1, pixel.blue * 1.1));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let brightnessMinus = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(pixel.red / 1.1, pixel.green / 1.1, pixel.blue / 1.1));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let contrast = function() {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let redFactor = 0;
    let greenFactor = 0;
    let blueFactor = 0;
    // let alphaFactor = 0;
    for (let i = 0; i < data.length; i+=4) {
        redFactor += data[i];
        greenFactor += data[i+1];
        blueFactor += data[i+2];
        // alphaFactor += data[i+3];
    }
    redFactor = redFactor % 255 * 0.05;
    greenFactor = greenFactor % 255 * 0.05;
    blueFactor = blueFactor % 255 * 0.05;
    // alphaFactor = alphaFactor % 255 * 0.05;
    for (let i = 0; i < data.length; i+=4) {
        data[i] *= redFactor;
        data[i+1] *= greenFactor;
        data[i+2] *= blueFactor;
        // data[i+3] *= alphaFactor;
    }
    context.putImageData(imageData, 0, 0);
}


let horizontalFlip = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width / 2; i++) {
        for (var j = 0; j < img.height; j++) {
            var len = img.width - 1
            var aux = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(img.getPixel(len - i, j).red, img.getPixel(len - i, j).green, img.getPixel(len - i, j).blue));
            img.setPixel(len - i, j, new RGBColor(aux.red, aux.green, aux.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let verticalFlip = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height / 2; j++) {
            var len = img.height - 1
            var aux = img.getPixel(i, j);
            img.setPixel(i, j, new RGBColor(img.getPixel(i, len - j).red, img.getPixel(i, len - j).green, img.getPixel(i, len - j).blue));
            img.setPixel(i, len - j, new RGBColor(aux.red, aux.green, aux.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let rotate90Degrees = function () {
    let drawHorizontally = already_rotated;
    if (!already_rotated) {
        drawImage(canvas, context, image, true);
        already_rotated = true;
    }
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    let imageDataRotate = context.getImageData(0, 0, canvas.width, canvas.height);
    let imgRotate = new MatrixImage(imageDataRotate);
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            const pixel = img.getPixel(i, j);
            imgRotate.setPixel(j, i, pixel);
        }
    }
    if (drawHorizontally) {
        drawImage(canvas, context, image);
        already_rotated = false;
    }
    context.putImageData(imgRotate.imageData, 0, 0);
}


let loopingImage = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    if(value == 1) {
        canvas.classList.add('loopingImage');
        value = 0
    } else {
        canvas.classList.remove('loopingImage');
        value = 1
    }
    context.putImageData(img.imageData, 0, 0);
}