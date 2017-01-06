var fs = require("fs-extra");

var tsconfigFilePathData = require("../compile/pathData");

function getAllFilesGlobs() {
    var extensionTscConfigJson = fs.readJSONSync(tsconfigFilePathData.extension),
        coreTscConfigJson = fs.readJSONSync(tsconfigFilePathData.core);

    return coreTscConfigJson.filesGlob.concat(extensionTscConfigJson.filesGlob);
}



module.exports = {
    getAllFilesGlobs: getAllFilesGlobs
};
