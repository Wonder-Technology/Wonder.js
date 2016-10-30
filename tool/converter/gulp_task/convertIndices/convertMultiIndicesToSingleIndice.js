var gulp = require("gulp");
// var gs = require("glob-stream");
var fs = require("fs-extra");
// var gulpTs = require("gulp-typescript");
// var merge = require("merge2");
// var del = require("del");
// var gulpSync = require("gulp-sync")(gulp);
var wdFrp = require("wdfrp");
// var path = require("path");

gulp.task("convertMultiIndicesToSingleIndice", function (done) {
    var sourceFile = "../../mine/output.json";

    var destFile = "../../mine/result.json";

    var Converter = require("../../dist/converter/gulp_task/convertIndices/Converter");

    var converter = Converter.create();

    wdFrp.fromNodeCallback(fs.readFile)(sourceFile)
        .subscribe(function(file){
            fs.writeFileSync(
                destFile,
                JSON.stringify(converter.convert(JSON.parse(file.toString())))
            );

            done();
        })
});
