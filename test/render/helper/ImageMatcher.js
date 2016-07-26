var CORRECT_RATE = 0.98;

var ImageMatcher = YYC.Class({
    Public:{
        compareImage:function(correctImage, testScenePixelArr){
            var correctImagePixelArr = this._getCorrectImagePixelArr(correctImage);

            expect(testScenePixelArr.length).toEqual(correctImagePixelArr.length);



            var pixelCount = correctImagePixelArr.length;


            expect(pixelCount % 4).toEqual(0);



            var hitCount = 0;

            for(var i = 0, len = pixelCount; i < len; i+=4){
                if(
    this._isPixelEqual(correctImagePixelArr[i], testScenePixelArr[i])
                && this._isPixelEqual(correctImagePixelArr[i + 1], testScenePixelArr[i + 1])
    && this._isPixelEqual(correctImagePixelArr[i + 2], testScenePixelArr[i + 2])
    && this._isPixelEqual(correctImagePixelArr[i + 3], testScenePixelArr[i + 3])
                ){
                    hitCount++;
                }
            }

            var isTestSuccessed = hitCount >= pixelCount / 4 * CORRECT_RATE;

            expect(isTestSuccessed).toBeTruthy();

            return isTestSuccessed;
        }
    },
    Private:{
        _testScenePixelArr: null,

        _isPixelEqual: function(pixel1, pixel2){
            return pixel1 === pixel2;
        },
        _getCorrectImagePixelArr: function(correctImage){
            var gl = wd.DeviceManager.getInstance().gl;
            var c = gl.canvas;

            var canvas = document.createElement("canvas");
            canvas.width = c.width;
            canvas.height = c.height;

            var context = canvas.getContext("2d");

            context.drawImage(correctImage, 0, 0);

            return context.getImageData(0, 0, canvas.width, canvas.height).data;
        }
    },
    Static:{
        create:function(){
            return new this();
        }
    }
});
