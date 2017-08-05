var gulp = require("gulp");
var gutil = require("gulp-util");
var through = require("through-gulp");
var path = require("path");
var fs = require("fs");

var Parser = require("./parser").GLSLParser;

var PLUGIN_NAME = "ShaderChunk";

var destFilePath = path.join(process.cwd(), "src/renderer/shader/chunk/ShaderChunk.ts");


function createShaderChunk(glslPathArr) {
    var result = "";

    function buildEmpty(){
        return 'export const empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""};\n';
    }

    function buildDefine(){
        return 'export const NULL:number = -1.0;\n';
    }

    result += buildEmpty();
    result += buildDefine();

    return gulp.src(glslPathArr)
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

                result += 'export const '
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
            result += 'export type GLSLChunk = {top:string;define:string;varDeclare:string;funcDeclare:string;funcDefine:string;body:string;}\n';

            fs.writeFileSync(destFilePath, result);

            callback();
        }));
}




module.exports = {
    createShaderChunk: createShaderChunk
};
