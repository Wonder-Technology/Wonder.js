import wdFrp = require("wdfrp");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import fs = require("fs-extra");

import contract = require("../../ts/definition/typescript/decorator/contract");
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


var run = require("gulp-run");
var Promise = require("promise");

import path = require("path");

export class FBXToWD{
    public static create() {
        var obj = null;

        obj = new this();

        return obj;
    }

    @ensure(function(stream:wdFrp.Stream){
        it("should return stream", () => {
            expect(stream).instanceOf(wdFrp.Stream);
        });
    })
    public convert(filePath:string, destDir:string):wdFrp.Stream {
        var fileName = ModelLoaderUtils.getNameByPath(filePath),
            promise = new Promise(function (resolve, reject) {
                var destFilePath = path.join(destDir, fileName + ".wd");

                run(`python fbx/python/converter.py ${filePath} ${destFilePath}`).exec( function(){
                    fs.readFile(destFilePath, function(err, buffer){
                        resolve([JSON.parse(buffer.toString())]);
                    });
                });
            });

        return wdFrp.fromPromise(promise);
    }
}
