var through = require("through-gulp"),
    gutil = require("gulp-util"),
    path = require("path"),
    fs = require("fs"),
    mapOperator = require("../lib/resourceMapOperator"),
    buildConfigOperator = require("../lib/buildConfigOperator");

var PLUGIN_NAME = "rewriteStaticResourceUrl";

function rewrite() {
    return through(function (file, encoding, callback) {
        var map = null;

        if (file.isNull()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
        if (file.isBuffer()) {
            map = mapOperator.read();

            file.contents = new Buffer(_handleContent(
                file.contents.toString(), map[file.path], file.path, this
            ));

            this.push(file);
            callback();
        }
        //todo support stream
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
    });
}

function _handleContent(content, mapDataArr, filePath, stream) {
    var result = "",
        startIndex = 0,
        buildConfig = buildConfigOperator.read();

    if(!mapDataArr){
        stream.emit("error", new gutil.PluginError(PLUGIN_NAME, "resourceMap[" + filePath + "] not exist"));
        return;
    }

    mapDataArr.forEach(function (mapData) {
        switch (mapData.command) {
            case "replace":
            case "seajsMain":
                result = result + content.slice(startIndex, mapData.startLine)
                        + _buildDistHtml(mapData.type,buildConfigOperator.convertToAbsolutePath(mapData.dist, buildConfig), stream);
                break;
            default:
                break;
        }

        startIndex = mapData.endLine;
    });

    if(_isNoStaticResource(result)){
        result = content;
    }

    return result;

}


function _isNoStaticResource(htmlStr){
    return htmlStr === "";
}

function _buildDistHtml(type, url, stream){
    var result = null;

    switch(type) {
        case "css":
            result = '<link href="' + url + '" type="text/css" rel="stylesheet"/>';
            break;
        case "js":
            result = '<script src="' + url + '"></script>';
            break;
        default:
            stream.emit("error", new gutil.PluginError(PLUGIN_NAME, "unexpected type"));
            break;
    }

    return result;
}

module.exports = rewrite;
