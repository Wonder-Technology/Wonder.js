var gulp = require("gulp");
var path = require("path");

gulp.task("createShaderChunkSystemFile", function (done) {
    var compiler = require("wonder-glsl-compiler");

    var shaderChunkFilePath = path.join(process.cwd(), "src/glsl/ShaderChunkSystem.re");
    var glslPathArray = [path.join(process.cwd(), "src/glsl/**/*.glsl")];

    compiler.createShunkSystemFile(glslPathArray, shaderChunkFilePath, done);
});