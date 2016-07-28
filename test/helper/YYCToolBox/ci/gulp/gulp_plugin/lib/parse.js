var gutil = require("gulp-util"),
    extendUtils = require("../extendUtils"),
    buildConfigOperator = require("./buildConfigOperator");

function Parse(stream, pluginName, filePath) {
    this._stream = stream;
    this._pluginName = pluginName;
    this._filePath = filePath;

    //abstract attr
    this.REGEX_BEGINE = null;
    this.REGEX_END = null;
    this.REGEX_URL = null;
    this.type = null;
}
Parse.prototype.parse = function (content, buildConfig) {
    var endDataArr = null,
        buildDataArr = null,
        buildIndex = null,
        endIndex = null,
        command = null,
        distUrl = null,
        fileUrlArr = null,
        segmentData = null,
        result = [];

    buildDataArr = this.REGEX_BEGINE.exec(content);

    while (buildDataArr !== null) {
        segmentData = {};
        buildIndex = buildDataArr.index;

        command = buildDataArr[1];
        distUrl = buildConfigOperator.convertToPathRelativeToCwd(buildDataArr[2], buildConfig);

        endDataArr = this.REGEX_END.exec(content.slice(buildDataArr.index));

        if (endDataArr === null) {
            this._stream.emit("error", new gutil.PluginError(this._pluginName, this._filePath + ":should define #endbuild#"));

            return;
        }

        endIndex = buildIndex + endDataArr.index;

        fileUrlArr = this._getFileUrlArr(
            content.slice(buildIndex + buildDataArr[0].length, endIndex),
            buildConfig
        );

        segmentData["command"] = command;
        segmentData["dist"] = distUrl;
        segmentData["fileUrlArr"] = fileUrlArr;
        segmentData["startLine"] = buildIndex;
        segmentData["endLine"] = endIndex + endDataArr[0].length;
        segmentData["type"] = this.type;

        result.push(segmentData);

        buildDataArr = this.REGEX_BEGINE.exec(content);

        //restore regex
        this.REGEX_END.lastIndex = 0;
    }

    //restore regex
    this.REGEX_BEGINE.lastIndex = 0;
    this.REGEX_END.lastIndex = 0;

    return result;
};
Parse.prototype._getFileUrlArr = function (content, buildConfig) {
    var dataArr = null,
        result = [];

    while ((dataArr = this.REGEX_URL.exec(content)) !== null) {
        result.push(buildConfigOperator.convertToPathRelativeToCwd(dataArr[2], buildConfig));
    }

    return result;
};

function ParseCss() {
    Parse.apply(this, arguments);

    this.REGEX_BEGINE = /[^\r\n]+#build:css:([^\s]+)\s([^\s#]+)[^\r\n]+/gm,
        this.REGEX_END = /[^\r\n]+#endbuild#[^\r\n]+/gm,
        //[^\1] 匹配失败!!!why?
        //REGEX_URL = /src=(['"])([^\1]+)\1/mg,
        this.REGEX_URL = /href=(['"])(.+?)\1/mg;
    this.type = "css";
}

extendUtils.inherit(ParseCss, Parse);


function ParseJs() {
    Parse.apply(this, arguments);

    this.REGEX_BEGINE = /[^\r\n]+#build:js:([^\s]+)\s([^\s#]+)[^\r\n]+/gm,
        this.REGEX_END = /[^\r\n]+#endbuild#[^\r\n]+/gm,
        //[^\1] 匹配失败!!!why?
        //REGEX_URL = /src=(['"])([^\1]+)\1/mg,
        this.REGEX_URL = /src=(['"])(.+?)\1/mg;
    this.type = "js";
}

extendUtils.inherit(ParseJs, Parse);


module.exports = {
    ParseCss: ParseCss,
    ParseJs: ParseJs
};
