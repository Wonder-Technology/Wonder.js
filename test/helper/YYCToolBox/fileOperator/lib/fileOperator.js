var fs = require("fs");
var path = require("path");

module.exports = {
    writeFile: function (filePath, contents, cb) {
        this.mkdirs(path.dirname(filePath), null, function (err) {
            if (err) {
                return cb(err)
            }

            fs.writeFile(filePath, contents, cb)
        })
    },
    mkdirs: function (dirpath, mode, callback) {
        var self = this;

        fs.exists(dirpath, function (exists) {
            if (exists) {
                callback(null, dirpath);
            }
            else {
                //尝试创建父目录，然后再创建当前目录
                self.mkdirs(path.dirname(dirpath), mode, function () {
                    fs.mkdir(dirpath, mode, callback);
                });
            }
        });
    }
}
