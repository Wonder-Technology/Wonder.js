import fs = require("fs");
import path = require("path");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import ObjectsConverter = require("./ObjectsConverter");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");

import Log = require("../../ts/Log");

import {MaterialsConverter} from "./MaterialsConverter";

export class OBJToWD {
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    constructor(version:string) {
        this.version = version;
    }

    public name:string = "WonderJsOBJToWDConverter";
    public version:string = null;

    private _objectsConverter:any = ObjectsConverter.create();
    private _materialsConverter:any = MaterialsConverter.create();


    public convert(fileContent:string, filePath:string):wdFrp.Stream {
        var resultJson:any = {},
            nodeName = ModelLoaderUtils.getNameByPath(filePath);

        resultJson.scene = "Scene";

        resultJson.scenes = {
            Scene:{
                nodes:[nodeName]
            }
        };

        resultJson.asset = this._convertAssetData();

        this._convertObjects(resultJson, fileContent, nodeName);

        if(this._objectsConverter.mtlFilePath){
            return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, this._objectsConverter.mtlFilePath))
                .map((data:string) => {
                    resultJson.materials = this._convertMaterials(resultJson, data.toString());

                    return [resultJson, this._getResourceUrlArr(resultJson.images, filePath)];
                });
        }

        return wdFrp.just([resultJson, null]);
    }

    private _getResourceUrlArr(images:any, filePath:string) {
        var urlArr = [];

        for (let name in images) {
            if (images.hasOwnProperty(name)) {
                let image = images[name],
                    uri = image.uri;

                urlArr.push(this._getAbsoluteResourceUrl(filePath, uri));
            }
        }

        return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    }

    private _getAbsoluteResourceUrl(filePath, resourceRelativeUrl) {
        return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    }

    private _convertAssetData() {
        var result:any = {};

        result.version = this.version;
        result.generator = this.name;

        return result;
    }

    // private _convertScene(fileContent:string, filePath:string) {
    //     var result:any = {};
    //
    //     /*!every material has one ambientColor, i don't know use which one, so just set it to be black*/
    //     result.ambientColor = [0.0, 0.0, 0.0];
    //
    //     return result;
    // }

    // private _convertObjects(fileContent:string, filePath:string) {
    //     return this._objectsConverter.convert(fileContent, filePath);
    // }
    private _convertObjects(resultJson:any, fileContent:string, nodeName:string) {
        return this._objectsConverter.convert(resultJson, fileContent, nodeName);
    }

    private _convertMaterials(resultJson:any,  mtlFileContent:string) {
        return this._materialsConverter.convert(resultJson, mtlFileContent);
    }
}

