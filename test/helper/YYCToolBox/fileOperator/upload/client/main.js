(function () {
    var fileOperator = window.fileOperator;

    var fileUploader = {
        send: function (file, url, limit, callback) {
            var size = null;

            if(!file){
                return;
            }

            size = file.size / (1024);

            if (size > limit) {
                alert("图片不能超过" + limit + "kb");
                return false;
            }

            fileOperator.readFile(file, function (e) {
                var base64Data = e.target.result;

                $.post(url, {
                    base64Data: base64Data,
                    fileName: file.name
                }, function (data) {
                    //todo JSON.parse(data)?

                    callback(data, base64Data);
                });
            });
        }
    };


    window.fileUploader = fileUploader;
}());
