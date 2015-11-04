/// <reference path="../../node_modules/dyrt/dist/dyRt.node.d.ts"/>
import through = require("through2");
import gutil = require("gulp-util");
import dyRt = require("dyrt");

export class OBJToDY{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    public name:string = "OBJToDY";


    public convert(){
        var self = this;

        return through.obj(function (file, encoding, callback) {
            var fileContent = null,
                filePath = null;

            var stream1 = dyRt.fromArray(["aaa"]).concat(dyRt.fromArray(["bbb"]));

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                var that = this;
                var a = [];

                var stream = dyRt.fromArray(["aaa"]).subscribe((data) => {
                    a.push(data);
                },null,()=>{
                    that.push(
                        new Buffer(a[0])
                    );

                    return callback();
                });
            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            callback();
        });
    }
}

