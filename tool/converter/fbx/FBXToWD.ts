import wdFrp = require("wdfrp");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import fs = require("fs-extra");
import path = require("path");


import {it, ensure} from "../../ts/definition/typescript/decorator/contract"
import {expect} from "chai"


var exec = require('child_process').exec;
var Promise = require("promise");
var json = require("relaxed-json");


export class FBXTowd{
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

                exec(`python fbx/python/converter.py ${filePath} ${destFilePath}`, function (err, stdout, stderr) {
                    fs.readFile(destFilePath, function(err, buffer){
                        resolve([json.parse(buffer.toString())]);
                    });
                });
            });

        return wdFrp.fromPromise(promise);
    }
}
