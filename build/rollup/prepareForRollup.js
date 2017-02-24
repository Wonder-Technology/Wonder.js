var fs = require("fs-extra");
var path = require("path");

function _removeSharedDependences() {
    var sharedDependencesNameArr = [
        "wonder-commonlib"
    ];
    var dependencesNodeModuleDirPathArrWhoHasTheShareOnes = [
        "./node_modules/wonder-frp/node_modules"
    ];

    dependencesNodeModuleDirPathArrWhoHasTheShareOnes.forEach(function (dirPath) {
        sharedDependencesNameArr.forEach(function (sharedDependencesName) {
            fs.removeSync(path.join(process.cwd(), dirPath, sharedDependencesName));
        });
    });
}

_removeSharedDependences();

