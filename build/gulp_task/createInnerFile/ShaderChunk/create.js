var gulp = require("gulp");
var gutil = require("gulp-util");
var through = require("through-gulp");
var path = require("path");
var fs = require("fs");

var Parser = require("./parser").GLSLParser;

var PLUGIN_NAME = "ShaderChunk";

var glslPath = "src/renderer/shader/chunk/glsl/**/*.glsl";
var destFilePath = "src/renderer/shader/chunk/ShaderChunk.ts";

gulp.task("createShaderChunk", function(){
    var result = "";

    function buildEmpty(){
        return 'public static empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""}\n';
    }

    function buildDefine(){
        return 'public static NULL:number = -1.0;\n';
    }

    //todo typescript refactor
    result = [
        '/// <reference path="../../../filePath.d.ts"/>',
        'module wd{',
    'export class ShaderChunk{'
    ].join("\n");



    result += buildEmpty();
    result += buildDefine();


    return gulp.src(glslPath)
        .pipe(through(function (file, encoding, callback) {
        var fileContent = null,
            filePath = null,
            parser = new Parser();

        if (file.isNull()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
        if (file.isBuffer()) {
            fileContent = file.contents.toString();

            ////todo how to remove the last "\n\n;"?
            fileContent = fileContent.split("\n").join("\\n").replace("\\n\\n", "\\n");



            filePath = file.path;

            result += 'public static '
            + path.basename(filePath, path.extname(filePath))
            + ':GLSLChunk = '
            + parser.parse(fileContent);

            return callback();
        }
        //todo support stream
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
    }, function (callback) {
            result += '}\n';

            result += 'export type GLSLChunk = {top?:string;define?:string;varDeclare?:string;funcDeclare?:string;funcDefine?:string;body?:string;}\n';
            result += '}';

            fs.writeFileSync(destFilePath, result);

        callback();
    }));
});

