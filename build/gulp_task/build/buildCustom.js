var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);

require("../clean/clean");

require("../package/packageCustom");



gulp.task("buildCustom", gulpSync.sync(["clean", "packageCustom"]));


//
// var commandUtils = require("../common/commandUtils");
//
// gulp.task("buildCustom", function(){
//     var excludeModulesStr = commandUtils.parseOption("--excludeModules") || "",
//         excludeModulesArr = excludeModulesStr.split(',');
//
//
//     // packageCustom(excludeModulesArr);
//
//     return packageCustom(excludeModulesArr);
// });

