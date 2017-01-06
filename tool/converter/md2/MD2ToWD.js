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
var wdFrp = require("wdfrp");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var ObjectsConverter = require("./MD2ObjectsConverter");
var contract = require("../../ts/definition/typescript/decorator/contract");
var chai = require("chai");
var SingleModelConverter_1 = require("../common/SingleModelConverter");
var describe = contract.describe, it = contract.it, requireInNodejs = contract.requireInNodejs, requireGetter = contract.requireGetter, requireSetter = contract.requireSetter, requireGetterAndSetter = contract.requireGetterAndSetter, ensure = contract.ensure, ensureGetter = contract.ensureGetter, ensureSetter = contract.ensureSetter, ensureGetterAndSetter = contract.ensureGetterAndSetter, invariant = contract.invariant;
var expect = chai.expect;
var MD2Towd = (function (_super) {
    __extends(MD2Towd, _super);
    function MD2Towd() {
        var _this = _super.apply(this, arguments) || this;
        _this.name = "wdJsMD2ToWDConverter";
        _this._objectsConverter = ObjectsConverter.create();
        return _this;
    }
    MD2Towd.create = function (version) {
        var obj = null;
        obj = new this(version);
        return obj;
    };
    MD2Towd.prototype.convert = function (fileBuffer, filePath) {
        var resultJson = {}, nodeName = ModelLoaderUtils.getNameByPath(filePath);
        this.convertSceneData(resultJson, nodeName);
        resultJson.asset = this.convertAssetData();
        this._convertObjects(resultJson, fileBuffer, nodeName);
        return wdFrp.just([resultJson]);
    };
    MD2Towd.prototype._convertObjects = function (resultJson, fileBuffer, filePath) {
        return this._objectsConverter.convert(resultJson, fileBuffer, filePath);
    };
    return MD2Towd;
}(SingleModelConverter_1.SingleModelConverter));
exports.MD2Towd = MD2Towd;
__decorate([
    ensure(function (stream) {
        it("should return stream", function () {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
], MD2Towd.prototype, "convert", null);
