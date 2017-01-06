var fs = require("fs-extra");

var tsconfigFilePathData = require("../compile/pathData");

function combineExtensionTscConfig(targetTsconfigFilePath) {
    var tsconfigFilePath_extension = tsconfigFilePathData.extension,
        targetTscConfigJson = JSON.parse(fs.readFileSync(targetTsconfigFilePath).toString()),
        extensionTscConfigJson = JSON.parse(fs.readFileSync(tsconfigFilePath_extension).toString());

    if(!targetTscConfigJson.filesGlob){
        targetTscConfigJson.filesGlob = [];
    }

    targetTscConfigJson.filesGlob = targetTscConfigJson.filesGlob.concat(extensionTscConfigJson.filesGlob);

    fs.writeFileSync(targetTsconfigFilePath, JSON.stringify(targetTscConfigJson));

}

function removeExtensionTscConfig(targetTsconfigFilePath) {
    var targetTscConfigJson = JSON.parse(fs.readFileSync(targetTsconfigFilePath).toString());

    targetTscConfigJson.filesGlob = targetTscConfigJson.filesGlob.filter(function(filePath){
        return filePath.indexOf("../extension") === -1;
    });

    fs.writeJSONSync(targetTsconfigFilePath, targetTscConfigJson);
}



module.exports = {
    combineExtensionTscConfig: combineExtensionTscConfig,
    removeExtensionTscConfig: removeExtensionTscConfig
};

