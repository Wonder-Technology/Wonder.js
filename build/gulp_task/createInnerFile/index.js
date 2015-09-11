var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("./ShaderChunk/create");

gulp.task("createInnerFile", gulpSync.sync(["createShaderChunk"]));

