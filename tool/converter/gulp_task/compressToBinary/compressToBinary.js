var fs = require("fs-extra");
var path = require("path");
var CompressorManager = require("../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager;


function compressToBinary(sourceJson, destWDFilePath) {
    var compressorManager = CompressorManager.create(),
        fileName = path.basename(destWDFilePath, ".wd"),
        binFileRelatedDir = "./",
        data = compressorManager.compress(fileName, binFileRelatedDir, sourceJson);

    fs.writeFileSync(
        path.join(path.dirname(destWDFilePath), data.uri),
        data.buffer
    );

    return data.json;
}

module.exports = compressToBinary;
