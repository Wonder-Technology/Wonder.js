"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var fs = require("fs-extra");
var wdFrp = require("wdfrp");
var ObjectsConverter = require("./ObjectsConverter");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var MaterialsConverter_1 = require("./MaterialsConverter");
var SingleModelConverter_1 = require("../common/SingleModelConverter");
var contract = require("../../ts/definition/typescript/decorator/contract");
var chai = require("chai");
var describe = contract.describe, it = contract.it, requireInNodejs = contract.requireInNodejs, requireGetter = contract.requireGetter, requireSetter = contract.requireSetter, requireGetterAndSetter = contract.requireGetterAndSetter, ensure = contract.ensure, ensureGetter = contract.ensureGetter, ensureSetter = contract.ensureSetter, ensureGetterAndSetter = contract.ensureGetterAndSetter, invariant = contract.invariant;
var expect = chai.expect;
var OBJTowd = (function (_super) {
    __extends(OBJTowd, _super);
    function OBJTowd() {
        var _this = _super.apply(this, arguments) || this;
        _this.name = "wdJsOBJToWDConverter";
        _this._objectsConverter = ObjectsConverter.create();
        _this._materialsConverter = MaterialsConverter_1.MaterialsConverter.create();
        return _this;
    }
    OBJTowd.create = function (version) {
        var obj = null;
        obj = new this(version);
        return obj;
    };
    OBJTowd.prototype.convert = function (fileBuffer, filePath) {
        var _this = this;
        var resultJson = {}, fileContent = fileBuffer.toString(), nodeName = ModelLoaderUtils.getNameByPath(filePath);
        this.convertSceneData(resultJson, nodeName);
        resultJson.asset = this.convertAssetData();
        this._convertObjects(resultJson, fileContent, nodeName);
        if (this._objectsConverter.mtlFilePath) {
            return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, this._objectsConverter.mtlFilePath))
                .map(function (data) {
                resultJson.materials = _this._convertMaterials(resultJson, data.toString());
                return [resultJson];
            });
        }
        return wdFrp.just([resultJson]);
    };
    OBJTowd.prototype._convertObjects = function (resultJson, fileContent, nodeName) {
        return this._objectsConverter.convert(resultJson, fileContent, nodeName);
    };
    OBJTowd.prototype._convertMaterials = function (resultJson, mtlFileContent) {
        return this._materialsConverter.convert(resultJson, mtlFileContent);
    };
    return OBJTowd;
}(SingleModelConverter_1.SingleModelConverter));
exports.OBJTowd = OBJTowd;
__decorate([
    ensure(function (stream) {
        it("should return stream", function () {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
], OBJTowd.prototype, "convert", null);
