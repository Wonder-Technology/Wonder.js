var fs = require("fs-extra");
var path = require("path");
var CompressorManager = require("../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager;


function compressToBinary(isEmbedded, absoluteSourceDir, sourceJson, destWDFilePath) {
    var compressorManager = CompressorManager.create(),
        fileName = path.basename(destWDFilePath, ".wd"),
        binFileRelatedDir = "./",
        data = compressorManager.compress(fileName, binFileRelatedDir, sourceJson, _getAbsoluteSourceFileDir(absoluteSourceDir, destWDFilePath), isEmbedded);

    if(!isEmbedded){
        fs.writeFileSync(
            path.join(path.dirname(destWDFilePath), data.uri),
            data.buffer
        );
    }

    return data.json;
}

function _getAbsoluteSourceFileDir(absoluteSourceDir, destWDFilePath) {
    if(destWDFilePath.slice(0, 5) !== "dest/"){
        throw new Error("destWDFilePath:" + destWDFilePath + " should start from 'dest/'");
    }

    return path.dirname(path.join(absoluteSourceDir, destWDFilePath.slice(5)));
}

module.exports = compressToBinary;
