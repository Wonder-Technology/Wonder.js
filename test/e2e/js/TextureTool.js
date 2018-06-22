var TextureTool = (function () {

    var _createBasicSourceTexture = function (source1, state) {
        var record = wd.createBasicSourceTexture(state)
        var state = record[0];
        var map1 = record[1];

        var state = wd.setBasicSourceTextureSource(map1, source1, state);


        return [map1, state];
    };

    var _createArrayBufferViewSourceTexture = function (source1, size1, state) {
        var record = wd.createArrayBufferViewSourceTexture(state)
        var state = record[0];
        var map1 = record[1];

        var state = wd.setArrayBufferViewSourceTextureSource(map1, source1, state);



        var state = wd.setArrayBufferViewSourceTextureWidth(map1, size1[0], state);
        var state = wd.setArrayBufferViewSourceTextureHeight(map1, size1[1], state);

        return [map1, state];
    };


    return {
        buildArrayBufferViewSourceTextureFromImageDataArr: function (arg) {
            if (!!arg.width && !!arg.height) {
                /*! for e2e->run test in browser */
                return TextureTool.buildBasicSourceTextureFromImageDataArr(arg);
            }
            else {
                var imageDataArr = arg;

                var [imagePixelDataArr, shapeArr] = imageDataArr;
                var width = shapeArr[0];
                var height = shapeArr[1];

                var [map, state] = _createArrayBufferViewSourceTexture(new Uint8Array(imagePixelDataArr), [width, height], wd.unsafeGetState());

                wd.setState(state);

                return map;
            }
        },
        buildBasicSourceTextureFromImageDataArr: function (arg) {
            var image = arg;

            var [map, state] = _createBasicSourceTexture(image, wd.unsafeGetState());


            wd.setState(state);

            return map;
        },
        createTwoArrayBufferViewSourceTextures: function (source1, source2, size1, size2, state) {
            var [map1, state] = _createArrayBufferViewSourceTexture(source1, size1, state);
            var [map2, state] = _createArrayBufferViewSourceTexture(source2, size2, state);

            return [map1, map2, state];
        },
        createTwoBasicSourceTextures: function (source1, source2, state) {
            var [map1, state] = _createBasicSourceTexture(source1, state);
            var [map2, state] = _createBasicSourceTexture(source2, state);

            return [map1, map2, state];
        },
        loadTwoUint8ArrayImages: function (image1Src, image2Src, completeFunc) {
            var image1 = new Image();

            image1.src = image1Src;

            image1.onload = () => {
                var canvas = document.getElementById("2d");
                canvas.width = image1.width;
                canvas.height = image1.height;
                var context = canvas.getContext("2d");

                context.drawImage(image1, 0, 0);

                var data = context.getImageData(0, 0, image1.width, image1.height);



                var image1Data = new Uint8Array(Array.from(data.data));



                var image2 = new Image();

                image2.src = image2Src;

                image2.onload = () => {
                    var canvas = document.getElementById("2d");
                    canvas.width = image2.width;
                    canvas.height = image2.height;
                    var context = canvas.getContext("2d");

                    context.drawImage(image2, 0, 0);

                    var data = context.getImageData(0, 0, image2.width, image2.height);


                    var image2Data = new Uint8Array(Array.from(data.data));

                    return completeFunc(image1Data, image2Data)
                }
            }
        },
        loadTwoImages: function (image1Src, image2Src, completeFunc) {
            var image1 = new Image();

            image1.src = image1Src;

            image1.onload = () => {
                var image2 = new Image();

                image2.src = image2Src;

                image2.onload = () => {
                    return completeFunc(image1, image2)
                }
            }
        }
    }
})()