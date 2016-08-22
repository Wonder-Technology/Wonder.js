import fs = require("fs");
import path = require("path");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import Log = require("../common/Log");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import ObjectsConverter = require("./MD2ObjectsConverter");


export = class MD2ToWD {
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    constructor(version:string) {
        this.version = version;
    }

    public name:string = "MD2ToWD";
    public version:string = null;

    private _objectsConverter:any = ObjectsConverter.create();

    public convert(fileBuffer:Buffer, filePath:string):wdFrp.Stream {
        var self = this,
            resultJson:any = {};

        resultJson.metadata = self._convertMetadata(filePath);
        resultJson.scene = {};
        resultJson.objects = self._convertObjects(fileBuffer, filePath);
        resultJson.materials = {};

        return wdFrp.just([resultJson]);
    }

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

