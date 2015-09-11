var gulp = require("gulp");
var gutil = require("gulp-util");
var through = require("through-gulp");
var path = require("path");
var fs = require("fs");

var PLUGIN_NAME = "ShaderChunk";

var glslPath = "src/renderer/shader/chunk/glsl/**/*.glsl";
var destFilePath = "src/renderer/shader/chunk/ShaderChunk.ts";

gulp.task("createShaderChunk", function(){
    var result = "";

    //todo typescript refactor
    result = [
        '/// <reference path="../../../definitions.d.ts"/>',
        'module dy{',
    'export class ShaderChunk{'
    ].join("\n");

    return gulp.src(glslPath)
        .pipe(through(function (file, encoding, callback) {
        var fileContent = null,
            filePath = null;

        if (file.isNull()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
        if (file.isBuffer()) {
            fileContent = file.contents.toString();


            filePath = file.path;

            //todo typescript
            result += 'public static '
            + path.basename(filePath, path.extname(filePath))
            + ':string = "'
                    //todo how to remove the last "\n\n;"?
            + fileContent.split("\n").join("\\n").replace("\\n\\n", "\\n")
            + '";\n';

            return callback();
        }
        //todo support stream
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
    }, function (callback) {
            result += "}\n}";

            fs.writeFileSync(destFilePath, result);

        callback();
    }));
});

