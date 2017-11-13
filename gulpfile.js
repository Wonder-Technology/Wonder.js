var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./build/gulp_task/create_inner_file/shaderChunk.js");
require("./build/gulp_task/compile/compileReason.js");

gulp.task("build", gulpSync.sync(["createShaderChunkSystemFile", "compileReason"]));