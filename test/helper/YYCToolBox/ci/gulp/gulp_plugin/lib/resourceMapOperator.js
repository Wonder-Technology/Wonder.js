var path = require("path"),
    fs = require("fs"),
    extendUtils = require("../extendUtils"),
    buildConfigOperator = require("./buildConfigOperator");

var PATH = "gulp/gulp_plugin/resourceMap.json";

/*!
 note:
 fileUrl is relative to cwd path
 ////dist is relative to dist dir(specified by gulp.dest in gulpfile)
 seajs.use -> path should like "/pc/js/xxx"

 */


function Operator() {
}


Operator.prototype.isData = function (data) {
    throw new Error("abstract method need override");
};


Operator.prototype.parse = function (data) {
    var pathArr = [];

    data.fileUrlArr.forEach(function (url) {
        pathArr.push(path.join(process.cwd(), url));
    });

    return {
        dist: this.convertDistPathRelativeToCwd(data.dist),
        filePathArr: pathArr
    }
};


Operator.prototype.getData = function (mapData) {
    var i = null,
        self = this,
        result = [];

    for (i in mapData) {
        if (mapData.hasOwnProperty(i)) {
            mapData[i].forEach(function (data) {
                if (self.isData(data)) {
                    result.push(data)
                }
            });
        }
    }

    return result;
};
Operator.prototype.convertDistPathRelativeToCwd = function (dist) {
    var buildConfig = buildConfigOperator.read();

    return buildConfigOperator.convertToPathRelativeToCwd(dist, buildConfig);
};


function SeajsOperator() {
    Operator.apply(this, arguments);
}

extendUtils.inherit(SeajsOperator, Operator);

SeajsOperator.prototype.isData = function (data) {
    return data.command === "seajsMain";
};
SeajsOperator.prototype.parse = function (data) {
    return {
        dist: this.convertDistPathRelativeToCwd(data.dist),
        mainFilePath: path.join(process.cwd(), data.fileUrlArr[0])
    }
};


function NoCmdJsOperator() {
    Operator.apply(this, arguments);
}

extendUtils.inherit(NoCmdJsOperator, Operator);

NoCmdJsOperator.prototype.isData = function (data) {
    return data.type === "js" && data.command === "replace";
};



function CssOperator() {
    Operator.apply(this, arguments);
}

extendUtils.inherit(CssOperator, Operator);

CssOperator.prototype.isData = function (data) {
    return data.type === "css";
};


module.exports = {
    read: function () {
        return JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), PATH), "utf8")
        );
    },
    write: function (contents) {
        fs.writeFileSync(
            path.join(process.cwd(), PATH),
            contents);
    },
    SeajsOperator: SeajsOperator,
    NoCmdJsOperator: NoCmdJsOperator,
    CssOperator: CssOperator
};
