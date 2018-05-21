
var PrepareTool = (function () {
    var _prepareForMap = function () {
        window.loadImage = function (imageSrc) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.src = imageSrc;
                image.onload = function () {
                    resolve(image)
                };
                image.onerror=function(e){
                    reject(e)
                }
            })
        }
    }


    return {
        prepareForTest: function () {
            ReplaceFetchTool.replaceFetchForTest();
            _prepareForMap();
        }
    }
})()