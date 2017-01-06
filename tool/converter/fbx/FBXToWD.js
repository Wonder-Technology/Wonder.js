"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var wdFrp = require("wdfrp");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var fs = require("fs-extra");
var contract_1 = require("../../ts/definition/typescript/decorator/contract");
var chai_1 = require("chai");
var exec = require('child_process').exec;
var Promise = require("promise");
var path = require("path");
var FBXTowd = (function () {
    function FBXTowd() {
    }
    FBXTowd.create = function () {
        var obj = null;
        obj = new this();
        return obj;
    };
    FBXTowd.prototype.convert = function (filePath, destDir) {
        var fileName = ModelLoaderUtils.getNameByPath(filePath), promise = new Promise(function (resolve, reject) {
            var destFilePath = path.join(destDir, fileName + ".wd");
            exec("python fbx/python/converter.py " + filePath + " " + destFilePath, function (err, stdout, stderr) {
                fs.readFile(destFilePath, function (err, buffer) {
                    resolve([JSON.parse(buffer.toString())]);
                });
            });
        });
        return wdFrp.fromPromise(promise);
    };
    return FBXTowd;
}());
exports.FBXTowd = FBXTowd;
__decorate([
    contract_1.ensure(function (stream) {
        contract_1.it("should return stream", function () {
            chai_1.expect(stream).instanceOf(wdFrp.Stream);
        });
    })
], FBXTowd.prototype, "convert", null);
