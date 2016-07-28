var Vinyl = require("vinyl"),
    path = require("path"),
    gutil = require("gulp-util"),
    through = require("through-gulp"),
    fs = require("fs");

var operator = {
    createFile: function (args) {
        var pathData = null,
            contents = null;

        if (arguments.length === 2) {
            contents = arguments[0];
            pathData = this._makeRelativeToCwd(arguments[1]);
        }
        else if (arguments.length === 3) {
            contents = arguments[0];
            pathData = {
                base: arguments[1],
                path: arguments[2]
            };
        }

        return new Vinyl({
            base: pathData.base,
            path: pathData.path,
            contents: contents
        });
    },
    _makeRelativeToCwd: function (url) {
        //path is dist path
        //writePath should be seajsMainData.dist

        //reference:
        // gulp.dest code:vinyl-fs/lib/dest/index.js:

        //function dest(outFolder, opt) {
        //    opt = opt || {};
        //    if (typeof outFolder !== 'string' && typeof outFolder !== 'function') {
        //        throw new Error('Invalid output folder');
        //    }
        //
        //    var options = defaults(opt, {
        //        cwd: process.cwd()
        //    });
        //
        //    if (typeof options.mode === 'string') {
        //        options.mode = parseInt(options.mode, 8);
        //    }
        //
        //    var cwd = path.resolve(options.cwd);
        //
        //    function saveFile (file, enc, cb) {
        //        var basePath;
        //        if (typeof outFolder === 'string') {
        //            basePath = path.resolve(cwd, outFolder);
        //        }
        //        if (typeof outFolder === 'function') {
        //            basePath = path.resolve(cwd, outFolder(file));
        //        }
        //        var writePath = path.resolve(basePath, file.relative);
        return {
            base: process.cwd(),
            path: path.resolve(process.cwd(), url)
        }
    },
    append: function (file1, file2, delimiter) {
        var delimiter = delimiter || "\n\r";

        file1.contents = new Buffer(
            file1.contents.toString()
            + delimiter + file2.contents.toString()
        );
    },
    getFile: function (operator, pulginName) {
        var fileOperator = this;

        return through(function (file, encoding, callback) {
            var self = this,
                dataArr = null;

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(pulginName, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                dataArr = operator.getData(JSON.parse(file.contents.toString()));

                if (!dataArr) {
                    this.emit("error", new gutil.PluginError(pulginName, 'no js data'));
                    return callback();
                }

                dataArr.forEach(function (data) {
                    var data = operator.parse(data);

                    data.filePathArr.forEach(function (filePath) {
                        var newFile = null,
                            fileContent = null;

                        fileContent = fs.readFileSync(filePath, "utf8");
                        newFile = fileOperator.createFile(new Buffer(fileContent), filePath);
                        //custom attr for gulp-js-combo to set dist path
                        newFile.dist = data.dist;

                        self.push(newFile);
                    });
                });

                callback();
            }
            //todo support stream
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(pulginName, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            callback();
        });

    }
};

module.exports = operator;
