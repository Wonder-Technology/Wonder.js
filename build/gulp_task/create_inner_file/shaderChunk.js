var gulp = require("gulp");
var path = require("path");
var compiler = require("wonder-glsl-compiler");

gulp.task("createShaderChunkSystemFile", function (done) {
    var shaderChunkFilePath = path.join(process.cwd(), "src/renderer/shader/glsl/ShaderChunkSystem.re");
    var glslPathArray = [path.join(process.cwd(), "src/renderer/shader/glsl/**/*.glsl")];

    compiler.createShunkSystemFile(glslPathArray, shaderChunkFilePath, done);
});