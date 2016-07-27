var SceneTester = YYC.Class({
    Static:{
        create:function(sandbox){
            return new this(sandbox);
        }
    },
    Init:function(sandbox){
        this.sandbox = sandbox;
    },
    Public:{
        isDebug:true,
        sandbox:null,

        init:function(){
            renderTestTool.setStartTime(0);

            this._getDirector()._init();

            if(this.isDebug){
                this._debuger = SceneTestDebuger.create();

                this._debuger.init();
            }
        },
        execBody: function (args){
            var wrapper = SceneBodyWrapper.create(this);

            wrapper.execBody.apply(wrapper, arguments);
        },
        /**
         * compare the snapshot image at the end of the frameIndex frame to the correct image
         * @param frameIndex
         * @param partialCorrectImagePath
         */
        compareAt:function(args){
            var self = this,
                frameIndex = null,
                partialCorrectImagePath = null,
                handle = null,
                step = null,
                description = null,
                done = null;

            if(arguments.length === 1){
                var data = arguments[0];

                frameIndex = data.frameIndex;
                partialCorrectImagePath = data.partialCorrectImagePath;
                handle = data.handle;
                done = data.done;
                step = data.step;
                description = data.description;
            }
            else if(arguments.length === 3){
                frameIndex = arguments[0];
                partialCorrectImagePath = arguments[1];
                done = arguments[2];
                step = 1;
                description = null;
            }
            else{
                frameIndex = arguments[0];
                partialCorrectImagePath = arguments[1];
                handle = arguments[2];
                done = arguments[3];
                step = 1;
                description = null;
            }

            step = step || 1;
            handle = handle || null;
            description = description || null;

            this._loopBody({
                startIndex:1,
                frameIndex:frameIndex,
                step:step,
                handle:handle
            });


            var data = this._readScenePixelArr();
            var pixelArr = data.data;



            var image = new Image();

            image.src = this._buildImagePath(partialCorrectImagePath);

            image.onload = function(){
                this.onload = null;

                var matcher = ImageMatcher.create(pixelArr);


                var isTestSuccessed = matcher.compareImage(this, pixelArr);

                if(self.isDebug){
                    self._debuger.insertTestResult(isTestSuccessed, partialCorrectImagePath, description, this, data.canvas);
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
        generateAt:function(frameIndex, imageName, handle, step){
            this._generateAt({
                startIndex:1,
                frameIndex:frameIndex,
                step:step || 1,
                handle:handle,
                imageName:imageName
            });
        },
        generateBatchAt:function(dataArr){
            var self = this;

            dataArr.forEach(function(data, index){
                self._generateAt({
                    startIndex:index + 1,
                    frameIndex:data.frameIndex,
                    step:data.step || 1,
                    handle:data.handle,
                    imageName:data.imageName
                });
            });
        }
    },
    Private:{
        _debuger:null,

        _generateAt:function(data){
            this._loopBody(data);

            this._download(this._createImageDataURL(data.imageName), data.imageName);
        },
        _loopBody:function(data){
            var director = this._getDirector(),
                i = data.startIndex;

            while(true){
                if(i >= data.frameIndex){
                    if(data.handle) {
                        data.handle();
                    }

                    director._loopBody(data.frameIndex);

                    break;
                }

                director._loopBody(i);

                i+=data.step;
            }
        },
        _getDirector: function(){
            return wd.Director.getInstance();
        },
        _createImageDataURL: function(imageName){
            var canvas = this._getCanvas();

            var extname = wdCb.PathUtils.extname(imageName);

            return canvas.toDataURL("image/" + extname);
        },
        _getCanvas:function(){
            return wd.DeviceManager.getInstance().gl.canvas;
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

            var c = this._getCanvas();

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

