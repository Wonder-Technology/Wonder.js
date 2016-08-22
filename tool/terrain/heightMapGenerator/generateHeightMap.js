var fs = require('fs-extra')
var path = require('path')
var Canvas = require("canvas")

var Image = Canvas.Image;

//var distPath = "../dist/";
var destPath = path.join(__dirname, "dest");


var iterationCount = 100,
    method = "fault",
    width = 256,
    height = 512,
    smoothLevel = 0;



function computeCanvasSize(width, height){
    if(width % 4 !== 0){
        console.log("width:" + width + " should % 4 === 0");
        //phantom.exit();

        return;
    }

    return {
        width:width / 4,
        height:height
    }
}


var canvasSize = computeCanvasSize(width, height);


var canvas = new Canvas(canvasSize.width, canvasSize.height);
var ctx = canvas.getContext('2d')




function convertHeightToRGBAValue(heightData) {
    var maxHeight = -Infinity,
        minHeight = Infinity;

    //console.log(heightData)

    for (var i = 0, len = heightData.length; i < len; i++) {
        var height = heightData[i];

        if (maxHeight < height) {
            maxHeight = height;
        }
        if (minHeight > height) {
            minHeight = height;
        }
    }

    //console.log(minHeight, maxHeight)

    var val = maxHeight - minHeight;

    for (var i = 0, len = heightData.length; i < len; i++) {
        //convert to [0,255]

        if (val === 0) {
            heightData[i] = 0;
            continue;
        }

        var height = heightData[i];

        heightData[i] = Math.floor((height - minHeight) / val * 255);
    }

    return heightData;
}

function getComputerFilePath(computerFileName){
    return path.join(__dirname, "dist/src/", computerFileName);
}

var HeightComputer = null;

        HeightComputer = require(getComputerFilePath("Fault")).Fault;



var imageData = ctx.createImageData(canvasSize.width, canvasSize.height);

var pixels = imageData.data;






var heightComputer = HeightComputer.create();

var heightData = heightComputer.generateHeightData(width, height, iterationCount, smoothLevel);

heightData = convertHeightToRGBAValue(heightData);


if (heightData.length !== pixels.length) {
    console.log("error:  pixels.length:" + pixels.length + " !== " + "heightData.length:" + heightData.length);

    //phantom.exit();

    return;
}

for (var i = 0, len = pixels.length; i < len; i++) {
    pixels[i] = heightData[i];
    //pixels[i] = 122;
    //console.log(pixels[i])
    //pixels[i] = 128;
}


ctx.putImageData(imageData, 0, 0);


fs.removeSync(destPath);

fs.mkdirsSync(destPath);


canvas.createPNGStream().pipe(fs.createWriteStream(path.join(destPath, "heightMap_" + method + "_" + iterationCount + "_" + canvasSize.width + "_" + canvasSize.height + "_" + smoothLevel + ".png")));





