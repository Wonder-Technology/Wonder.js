import {IHeightComputer} from "./src/IHeightComputer";

import Canvas = require("canvas");
import Fault = require("./src/Fault");
import fs = require("fs");
import path = require("path");
import wdFrp = require("wdfrp");

declare var __dirname:any;

export = class Generator{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    public generateHeightMap(method:string, iterationCount:number, width:number, height:number, smoothLevel:number, destDir:string){
        var generator:IHeightComputer = null;

        switch (method){
            case "fault":
                generator = Fault.Fault.create();
                break;
            default:
                throw new Error(`unknow method:${method}`);
        }

        //var Image = Canvas.Image,
        //    canvas = new Canvas(width, height);

        //var buffer = canvas.toBuffer();
        //
        //console.log(buffer);
        //
        //var heightData = generator.generateHeightData(width, height, iterationCount, smoothLevel)

        //todo finish!




        var canvasSize = this._computeCanvasSize(width, height);


        var canvas:any = new Canvas(canvasSize.width, canvasSize.height);
        var ctx = canvas.getContext('2d');


        var imageData = ctx.createImageData(canvasSize.width, canvasSize.height);

        var pixels = imageData.data;






        //var heightComputer = HeightComputer.create();

        var heightData = generator.generateHeightData(width, height, iterationCount, smoothLevel);

        heightData = this._convertHeightToRGBAValue(heightData);


        if (heightData.length !== pixels.length) {
            throw new Error("error:  pixels.length:" + pixels.length + " !== " + "heightData.length:" + heightData.length);
        }

        for (var i = 0, len = pixels.length; i < len; i++) {
            pixels[i] = heightData[i];
        }

        ctx.putImageData(imageData, 0, 0);

        //return canvas.createPNGStream().pipe(fs.createWriteStream(path.join(destDir, "heightMap_" + method + "_" + iterationCount + "_" + canvasSize.width + "_" + canvasSize.height + "_" + smoothLevel + ".png")));



        var out = fs.createWriteStream(path.join(destDir, "heightMap_" + method + "_" + iterationCount + "_" + canvasSize.width + "_" + canvasSize.height + "_" + smoothLevel + ".png"));
            //stream = canvas.pngStream();


        return wdFrp.fromStream(canvas.pngStream())
        .do((chunk) => {
            console.log("write");
            out.write(chunk);
        })



        //stream.on('data', function(chunk){
        //    console.log("write");
        //    out.write(chunk);
        //});


        //stream.on('end', function(){
        //    console.log('saved png');
        //});

        //return stream;
    }

    private _computeCanvasSize(width:number, height:number){
        if(width % 4 !== 0){
            throw new Error("width:" + width + " should % 4 === 0");
        }

        return {
            width:width / 4,
            height:height
        }
    }

    private _convertHeightToRGBAValue(heightData) {
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
}
