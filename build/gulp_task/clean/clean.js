var gulp = require("gulp");
var del = require("del");
var fs = require("fs");

var distPath = "dist";

gulp.task("clean", function() {
    fs.unlinkSync("src/renderer/shader/chunk/ShaderChunk.ts");

    return del.sync([distPath], {
        force: true
    });
});

