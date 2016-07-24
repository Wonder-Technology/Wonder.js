var SceneTester = YYC.Class({
    Static:{
        create:function(){
            return new this();
        }
    },
    Public:{
        isDebug:true,

        init:function(){
            this._getDirector()._init();

            if(this.isDebug){
                this._debuger = SceneTestDebuger.create();

                this._debuger.init();
            }
        },
        execBody: function(bodyFunc, done){
            bodyFunc(pathTool.join(pathTool.getPathData().rootPath, "base/examples/"), done);
        },
        /**
         * compare the snapshot image at the end of the frameIndex frame to the correct image
         * @param frameIndex
         * @param partialCorrectImagePath
         */
        compareAt:function(args){
            var self = this,
                director = this._getDirector();


            var frameIndex = null,
                partialCorrectImagePath = null,
                handle = null,
                done = null;

            if(arguments.length === 3){
                frameIndex = arguments[0];
                    partialCorrectImagePath = arguments[1];
                    done = arguments[2];
            }
            else{
                frameIndex = arguments[0];
                partialCorrectImagePath = arguments[1];
                handle = arguments[2];
                done = arguments[3];
            }



            for(var i = 1; i <= frameIndex; i++){
                if(i === frameIndex
                    && handle){
                    handle();
                }

                director._loopBody(i);
            }


            var data = this._readScenePixelArr();
            var pixelArr = data.data;



            var image = new Image();

            image.src = this._buildImagePath(partialCorrectImagePath);

            image.onload = function(){
                this.onload = null;

                var matcher = ImageMatcher.create(pixelArr);


                matcher.compareImage(this, pixelArr);

                if(self.isDebug){
                    self._debuger.insertTestResult(partialCorrectImagePath, this, data.canvas);
                }

                done();
            }

            image.onerror = function () {
                throw new Error("load image error");
            };
        },
        /**
         * generate image at the end of the frameIndex frame
         * @param frameIndex
         * @param imageName
         */
        generateAt:function(frameIndex, imageName, handle){
            var director = this._getDirector();

            for(var i = 1; i <= frameIndex; i++){
                if(i === frameIndex
                    && handle){
                    handle();
                }

                director._loopBody(i);
            }

            this._download(this._createImageDataURL(imageName), imageName);
        },
        generateBatchAt:function(dataArr){
            var director = this._getDirector(),
                self = this;

            dataArr.forEach(function(data, index){
                for(var i = index + 1; i <= data.frameIndex; i++){
                    if(i === data.frameIndex
                        && data.handle){
                        data.handle();
                    }

                    director._loopBody(i);
                }

                self._download(self._createImageDataURL(data.imageName), data.imageName);
            });
        }
    },
    Private:{
        _debuger:null,
        _getDirector: function(){
            return wd.Director.getInstance();
        },
        _createImageDataURL: function(imageName){
            var canvas = wd.DeviceManager.getInstance().gl.canvas;

            var extname = wdCb.PathUtils.extname(imageName);

            return canvas.toDataURL("image/" + extname);
        },
        _download: function(imageDataURL, imageName){
            var blob = fileOperator.dataURLToBlob(imageDataURL);

            fileOperator.createFileAndDownload(blob, imageName);
        },
        _buildImagePath: function(partialImagePath){
         return pathTool.join(pathTool.getPathData().rootPath, pathTool.join("base/test/render/res/correct_image", partialImagePath));
        },
        _readScenePixelArr: function(){
            //var gl = wd.DeviceManager.getInstance().gl;
            //
            //var pixelArr = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            //
            //gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixelArr);
            //
            //return pixelArr;

            var gl = wd.DeviceManager.getInstance().gl;
            var c = gl.canvas;

            //var canvas = document.createElement("canvas");
            //canvas.width = c.width;
            //canvas.height = c.height;
            //
            //var context = canvas.getContext("2d");
            //
            //context.drawImage(c, 0, 0);

            var data = fileTool.convertImageToCanvas(c);

            return {
                canvas:data.canvas,
                data:data.context.getImageData(0, 0, data.canvas.width, data.canvas.height).data
            }
        }
    }
});
