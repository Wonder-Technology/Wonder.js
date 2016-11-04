var gulp = require("gulp");
// var gs = require("glob-stream");
var fs = require("fs-extra");
// var gulpTs = require("gulp-typescript");
// var merge = require("merge2");
// var del = require("del");
// var gulpSync = require("gulp-sync")(gulp);
var wdFrp = require("wdfrp");
var path = require("path");

gulp.task("compressToBinary", function (done) {
    var sourceFilePath = "../../mine/result.json";

    // var binFilePath = "../../mine/data.bin";
    var binFileDir = "../../mine/";

    var Compressor = require("../../dist/converter/gulp_task/compressToBinary/Compressor").Compressor;

    var compressor = Compressor.create();

    wdFrp.fromNodeCallback(fs.readFile)(sourceFilePath)
        .subscribe(function(file){
            var sourceJson = JSON.parse(file.toString());

            // var fileName = path.basename(sourceFilePath, ".wd"),
            //todo change to .wd
            var fileName = path.basename(sourceFilePath, ".json"),
                binFileRelatedDir = path.dirname(path.relative(sourceFilePath, binFileDir));

            var data = compressor.compress(fileName, binFileRelatedDir, sourceJson);

            fs.writeFileSync(
                path.join(path.dirname(sourceFilePath), data.uri),
                data.buffer
            );


            var resultFilePath = "../../mine/result2.json";

            fs.writeFileSync(
                //todo build by name
                resultFilePath,
                JSON.stringify(data.json)
            );

            done();
        });
});
