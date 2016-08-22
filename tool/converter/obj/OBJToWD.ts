import fs = require("fs");
import path = require("path");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import MaterialsConverter = require("./MaterialsConverter");
import ObjectsConverter = require("./ObjectsConverter");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import Log = require("../common/Log");

export = class OBJToWD {
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    constructor(version:string) {
        this.version = version;
    }

    public name:string = "OBJToWD";
    public version:string = null;

    //todo why "_objectsConverter:ObjectsConverter" can't find ObjectsConverter?
    //private _objectsConverter:ObjectsConverter = ObjectsConverter.create();

    private _objectsConverter:any = ObjectsConverter.create();
    private _materialsConverter:any = MaterialsConverter.create();


    public convert(fileContent:string, filePath:string):wdFrp.Stream {
        var self = this,
            resultJson:any = {};

        resultJson.metadata = self._convertMetadata(filePath);
        resultJson.scene = self._convertScene(fileContent, filePath);
        resultJson.objects = self._convertObjects(fileContent, filePath);

        return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, self._objectsConverter.mtlFilePath))
            .map((data:string) => {
                resultJson.materials = self._convertMaterials(data.toString());

                return [resultJson, self._getResourceUrlArr(resultJson.materials, filePath)];
            });
    }

    private _getResourceUrlArr(materials, filePath) {
        var urlArr = [];

        for (let name in materials) {
            if (materials.hasOwnProperty(name)) {
                let material = materials[name];

                if (material.diffuseMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.diffuseMapUrl));
                }
                if (material.specularMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.specularMapUrl));
                }
                if (material.normalMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.normalMapUrl));
                }
            }
        }

        return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    }

    private _getAbsoluteResourceUrl(filePath, resourceRelativeUrl) {
        return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    }

    private _convertMetadata(filePath:string) {
        var result:any = {};

        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;

        return result;
    }

    private _convertScene(fileContent:string, filePath:string) {
        var result:any = {};

        /*!every material has one ambientColor, i don't know use which one, so just set it to be black*/
        result.ambientColor = [0.0, 0.0, 0.0];

        return result;
    }

    private _convertObjects(fileContent:string, filePath:string) {
        return this._objectsConverter.convert(fileContent, filePath);
    }

    private _convertMaterials(mtlFileContent:string) {
        return this._materialsConverter.convert(mtlFileContent);
    }
}

