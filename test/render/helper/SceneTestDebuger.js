var SceneTestDebuger = YYC.Class({
    Static:{
        testItems:[],

        create:function(){
            return new this();
        }
    },
    Public:{
        init:function(){
        },
        insertTestResult: function(partialCorrectImagePath, correctImage, testSceneCanvas){
            var testDescription = this._getTestDescription(partialCorrectImagePath);

            var imageEleData = this._getCorrectImageAndTestSceneImage(correctImage, testSceneCanvas);
            $("body").append($("<h1>").text(testDescription));
            $("body").append($(imageEleData.correctImageDom));
            $("body").append($(imageEleData.testSceneImageDom));



            SceneTestDebuger.testItems.push({
                testDescription:testDescription,
             correctImageDom:imageEleData.correctImageDom,
                testSceneImageDom:imageEleData.testSceneImageDom
            });
        }
    },
    Private:{
        _getTestDescription: function(partialCorrectImagePath){
            return partialCorrectImagePath.match(/\/([^\.]+)/)[1];
        },
        _getCorrectImageAndTestSceneImage: function(correctImage, testSceneCanvas){
            var ITEM_HEIGHT = 300;

            var width = $("body").width() - parseInt($("body").css("marginLeft")) - parseInt($("body").css("marginRight"));
correctImageWidth = width / 2,
                correctImageHeight = ITEM_HEIGHT,
                testSceneImageWidth = width / 2,
                testSceneImageHeight = ITEM_HEIGHT;

            var correctImageDom = this._createImageDom(fileTool.convertImageToBlob(correctImage));
            var testSceneImageDom = this._createImageDom(fileTool.convertImageToBlob(testSceneCanvas));

            correctImageDom.width = correctImageWidth;
            correctImageDom.height = correctImageHeight;

            testSceneImageDom.width = testSceneImageWidth;
            testSceneImageDom.height = testSceneImageHeight;

            return {
                correctImageDom:correctImageDom,
                testSceneImageDom:testSceneImageDom
            }
        },
        _createImageDom: function(blob){
            var newImg = document.createElement("img"),
                url = URL.createObjectURL(blob);

            newImg.onload = function() {
                URL.revokeObjectURL(url);
            };
            newImg.src = url;

            return newImg;
        }
    }
});

