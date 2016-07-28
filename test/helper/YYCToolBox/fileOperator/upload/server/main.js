var fileOperator = require("../../lib/fileOperator");
var path = require("path");

module.exports = {
    saveUploadImage:function(uploadPath, clientDirname, imageBase64Data, fileName, callback){
        var ext  =path.extname(fileName),
            fileName = path.basename(fileName, ext) + (+new Date()) + ext,
            writePath = path.join(uploadPath, fileName),
            //todo md5?
            clientPath = path.join(clientDirname, fileName),
            base64Data = null;

        base64Data = this._filterBase64Data(imageBase64Data);

        fileOperator.writeFile(writePath, new Buffer(base64Data, "base64"), function (err) {
            callback(err, clientPath);
        });
    },
    _filterBase64Data: function(base64Data){
        return base64Data.replace(/^data:image\/\w+;base64,/, "");
    }
};
