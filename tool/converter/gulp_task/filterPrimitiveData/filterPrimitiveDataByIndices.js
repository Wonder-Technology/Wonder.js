var gulp = require("gulp");
var fs = require("fs-extra");
var wdFrp = require("wdfrp");
// var path = require("path");
// var commandUtils = require("../common/commandUtils.js");

gulp.task("filterPrimitiveDataByIndices", function (done) {
    var sourceFile = "../../mine/result.json";

    var destFile = "../../mine/result.json";

    var Filter = require("../../dist/converter/gulp_task/filterPrimitiveData/Filter").Filter;

    var filter = Filter.create();

    wdFrp.fromNodeCallback(fs.readFile)(sourceFile)
        .subscribe(function(file){
            fs.writeFileSync(
                destFile,
                JSON.stringify(filter.filter(JSON.parse(file.toString())))
            );

            done();
        })
});
