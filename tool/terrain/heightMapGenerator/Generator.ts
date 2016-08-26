import {IHeightComputer} from "./src/IHeightComputer";

import Canvas = require("canvas");
import Fault = require("./src/Fault");
import MDP = require("./src/MDP");
import fs = require("fs");
import path = require("path");
import wdFrp = require("wdfrp");

declare var __dirname:any;

export = class Generator{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    private _imageData:any = null;
    get imageData(){
        return this._imageData;
    }

    public generateHeightMap(method:string, iterationCount:number, width:number, height:number, smoothLevel:number, destDir:string){
        var generator:IHeightComputer = null,
            canvasSize = this._computeCanvasSize(width, height),
            canvas:any = new Canvas(canvasSize.width, canvasSize.height),
            ctx = canvas.getContext('2d'),
            imageData = ctx.createImageData(canvasSize.width, canvasSize.height),
            pixels = imageData.data,
            heightData:Array<number> = null,
            outStream:any = null;

        switch (method){
            case "fault":
                generator = Fault.Fault.create();
                break;
            case "mdp":
                generator = MDP.MDP.create();
                break;
            default:
                throw new Error(`unknow method:${method}`);
        }

        heightData = this._convertHeightToRGBAValue(
            generator.generateHeightData(width, height, iterationCount, smoothLevel)
        );

        if (heightData.length !== pixels.length) {
            throw new Error("error:  pixels.length:" + pixels.length + " !== " + "heightData.length:" + heightData.length);
        }

        for (let i = 0, len = pixels.length; i < len; i++) {
            pixels[i] = heightData[i];
        }

        ctx.putImageData(imageData, 0, 0);

        this._imageData = imageData;

        outStream = fs.createWriteStream(path.join(destDir, "heightMap_" + method + "_" + iterationCount + "_" + canvasSize.width + "_" + canvasSize.height + "_" + smoothLevel + ".png"));

        return wdFrp.fromStream(canvas.pngStream())
        .do((chunk) => {
            outStream.write(chunk);
            //console.log("write");
        });
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

        for (var i = 0, len = heightData.length; i < len; i++) {
            var height = heightData[i];

            if (maxHeight < height) {
                maxHeight = height;
            }
            if (minHeight > height) {
                minHeight = height;
            }
        }

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
