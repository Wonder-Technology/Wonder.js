var gulp = require("gulp");
var del = require("del");
var fs = require("fs");
var path = require("path");

var distPath = "dist";

gulp.task("clean", function() {
    var shaderChunkFilePath = path.join(process.cwd(),"src/renderer/shader/chunk/ShaderChunk.ts");

    if(fs.existsSync(shaderChunkFilePath)){
        fs.unlinkSync(shaderChunkFilePath);
    }

    return del.sync([distPath], {
        force: true
    });
});

