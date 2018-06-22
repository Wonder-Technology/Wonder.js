var PrepareTool = (function () {
    var _prepareForMap = function () {
        if (typeof window.loadImageSrc === "undefined") {
            /*! for e2e->run test in browser */
            window.loadImageSrc = function (imageSrc) {
                return new Promise(function (resolve, reject) {
                    var image = new Image();
                    image.src = imageSrc;

                    image.onload = function () {
                        resolve(image)
                    };
                    image.onerror = function (e) {
                        reject(e)
                    }
                })
            }
        }

        if (typeof window.loadImageBase64_wonder === "undefined") {
            /*! do nothing */
        }
        else {
            /*! do nothing */
        }
    };


    return {
        prepareForTest: function () {
            ReplaceFetchTool.replaceFetchForTest();
            _prepareForMap();
        }
    }
})()