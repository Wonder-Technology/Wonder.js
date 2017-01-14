import fs = require("fs-extra");
import path = require("path");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import ObjectsConverter = require("./ObjectsConverter");
import ModelLoaderUtils = require("../../common/ModelLoaderUtils");

import Log = require("../../../ts/Log");

import {MaterialsConverter} from "./MaterialsConverter";
import {SingleModelConverter} from "../../common/SingleModelConverter";

import contract = require("../../../ts/definition/typescript/decorator/contract");
import chai = require("chai");

var describe = contract.describe,
    it = contract.it,
    requireInNodejs = contract.requireInNodejs,
    requireGetter = contract.requireGetter,
    requireSetter = contract.requireSetter,
    requireGetterAndSetter = contract.requireGetterAndSetter,
    ensure = contract.ensure,
    ensureGetter = contract.ensureGetter,
    ensureSetter = contract.ensureSetter,
    ensureGetterAndSetter = contract.ensureGetterAndSetter,
    invariant = contract.invariant;

var expect = chai.expect;

export class OBJToWD extends SingleModelConverter{
    public static create(version:string) {
        var obj = null;

        obj = new this(version);

        return obj;
    }

    public name:string = "WonderJsOBJToWDConverter";

    private _objectsConverter:any = ObjectsConverter.create();
    private _materialsConverter:any = MaterialsConverter.create();


    @ensure(function(stream:wdFrp.Stream){
        it("should return stream", () => {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
    public convert(fileBuffer:Buffer, filePath:string):wdFrp.Stream {
        var resultJson:any = {},
            fileContent = fileBuffer.toString(),
            nodeName = ModelLoaderUtils.getNameByPath(filePath);

        this.convertSceneData(resultJson, nodeName);

        resultJson.asset = this.convertAssetData();

        this._convertObjects(resultJson, fileContent, nodeName);

        if(this._objectsConverter.mtlFilePath){
            return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, this._objectsConverter.mtlFilePath))
                .map((data:string) => {
                    resultJson.materials = this._convertMaterials(resultJson, data.toString());

                    return [resultJson];
                });
        }

        return wdFrp.just([resultJson]);
    }

    private _convertObjects(resultJson:any, fileContent:string, nodeName:string) {
        return this._objectsConverter.convert(resultJson, fileContent, nodeName);
    }

    private _convertMaterials(resultJson:any,  mtlFileContent:string) {
        return this._materialsConverter.convert(resultJson, mtlFileContent);
    }
}

