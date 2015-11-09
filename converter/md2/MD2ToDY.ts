/// <reference path="../../node_modules/dyrt/dist/dyRt.node.d.ts"/>
/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
import fs = require("fs");
import path = require("path");
import dyRt = require("dyrt");
import dyCb = require("dycb");
import Log = require("../common/Log");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import ObjectsConverter = require("./MD2ObjectsConverter");


export = class MD2ToDY {
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    constructor(version:string) {
        this.version = version;
    }

    public name:string = "MD2ToDY";
    public version:string = null;

    private _objectsConverter:any = ObjectsConverter.create();

    public convert(fileBuffer:Buffer, filePath:string):dyRt.Stream {
        var self = this,
            resultJson:any = {};

        resultJson.metadata = self._convertMetadata(filePath);
        resultJson.scene = {};
        resultJson.objects = self._convertObjects(fileBuffer, filePath);
        resultJson.materials = {};

        //return dyRt.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, self._objectsConverter.mtlFilePath))
        //    .map((data:string) => {
        //        resultJson.materials = self._convertMaterials(data.toString());
        //
        //        return [resultJson, self._getResourceUrlArr(resultJson.materials, filePath)];
        //    });

        return dyRt.just([resultJson]);
    }

    //private _getResourceUrlArr(materials, filePath) {
    //    var urlArr = [];
    //
    //    for (let name in materials) {
    //        if (materials.hasOwnProperty(name)) {
    //            let material = materials[name];
    //
    //            if (material.diffuseMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.diffuseMapUrl));
    //            }
    //            if (material.specularMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.specularMapUrl));
    //            }
    //            if (material.normalMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.normalMapUrl));
    //            }
    //        }
    //    }
    //
    //    return dyCb.ArrayUtils.removeRepeatItems(urlArr);
    //}
    //
    //private _getAbsoluteResourceUrl(filePath, resourceRelativeUrl) {
    //    return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    //}
    //
    private _convertMetadata(filePath:string) {
        var result:any = {};

        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;

        return result;
    }

    private _convertObjects(fileBuffer:Buffer, filePath:string) {
        return this._objectsConverter.convert(fileBuffer, filePath);
    }
}

