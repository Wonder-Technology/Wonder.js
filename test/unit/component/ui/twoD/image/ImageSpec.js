describe("Image", function () {
    var sandbox = null;
    var Image = wd.Image;
    var image;
    var renderer;
    var uiObject;
    var director;
    var context;


    function createImage() {
        image = Image.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(image);


        renderer = wd.UIRenderer.create();


        uiObject.addComponent(renderer);


        return uiObject;
    }

    function prepareForUpdateBeforeInit(){
        renderer.context = canvasTool.buildFakeContext(sandbox);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });






        uiObject = createImage();



        director.scene.addChild(uiObject);

        var position = wd.Vector2.create(10, 20);

        uiObject.transform.position = position;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        uiObject.dispose();
        sandbox.restore();
    });

    describe("update", function(){
        beforeEach(function(){
            prepareForUpdateBeforeInit();

            image.init();

            context = renderer.context;
        });

        it("if source === null && targetSource === null && color === null && targetColor === null, return", function(){
            image.source = null;

            image.render();

            expect(context.save).not.toCalled();

            image.source = null;
            image.color = {};

            image.render();

            expect(context.save).toCalledOnce();


            image.targetSource = {};
            image.source = null;
            image.color = null;

            image.render();

            expect(context.save).toCalledTwice();


            image.targetSource = null;
            image.source = null;
            image.color = null;
            image.targetColor = {};

            image.render();

            expect(context.save.callCount).toEqual(3);
        });

        describe("else", function(){
            var source;
            var color;
            var width,height;
            var position;

            function judgeDrawSource(){
                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage).toCalledWith(source.source, position.x - width / 2, position.y - height / 2, width, height)
            }

            beforeEach(function(){
                color = wd.Color.create("rgb(0.1, 0.2, 0.3)");

                width = 100;
                height = 50;
                uiObject.transform.width = width;
                uiObject.transform.height = height;

                position = uiObject.transform.position;
            });
            
            describe("if setted draw color", function(){
                beforeEach(function(){
                    image.color = color;
                });

                it("if draw color->a < 1, set global alpha", function(){
                    image.render();

                    expect(context.globalAlpha).toBeUndefined();


                    image.color.a = 0.2;

                    image.render();

                    expect(context.globalAlpha).toEqual(0.2);
                });
                it("fillRect image range", function(){
                    image.render();

                    expect(context.fillRect).toCalledWith(position.x - width / 2, position.y - height / 2, width, height);
                });

                describe("if setted draw source", function(){
                    beforeEach(function(){
                        source = wd.ImageTextureAsset.create({});

                        image.source = source;
                    });

                    describe("blend color with source", function(){
                        it("if browser support canvas.globalCompositeOperation->multiply, use multiply to blend", function(){
                            image._blendColorWithSource = image._blendByMultiply;

                            image.render();

                            expect(context.globalCompositeOperation).toEqual("multiply");
                            judgeDrawSource();
                        });
                        it("else, blend by multiply each pix", function(){
                            image._blendColorWithSource = image._blendByPerPixel;
                            sandbox.stub(image, "getCanvas").returns({
                                width: 100,
                                height: 50
                            });
                            context.getImageData.returns({
                                data:[0.1, 0.2, 0.3, 0.5]
                            });

                            image.render();

                            expect(context.globalCompositeOperation).toEqual("clone");
                            expect(context.getImageData).toCalledWith(0, 0, 100, 50);
                            expect(context.putImageData).toCalledWith({data:[0.1 * color.r, 0.2 * color.g, 0.3 * color.b, 0.5]}, 0, 0);
                        });
                    });
                });
            });

            describe("else", function(){
                beforeEach(function(){
                    image.color = null;
                    source = wd.ImageTextureAsset.create({});

                    image.source = source;
                });

                it("draw whole image", function(){
                    image.render();

                    judgeDrawSource();
                });
            });
        });
    });

    describe("change data will cause dirty and update image", function(){
        var source;

        beforeEach(function(){
            source = wd.ImageTextureAsset.create({});

            //image.source = source;
        });

        it("if the new data equal old data, not dirty and not update", function(){
            image.source = source;

            prepareForUpdateBeforeInit();

            director.initUIObjectScene();

            context = renderer.context;



            director._loopBody(2);

            expect(context.save).toCalledOnce();


            image.source = source;

            director._loopBody(3);


            expect(context.save).toCalledOnce();
        });

        describe("else", function(){
            beforeEach(function(){
                image.source = source;

                prepareForUpdateBeforeInit();

                director.initUIObjectScene();

                context = renderer.context;



                director._loopBody(2);
            });

            it("test change source", function(){
                var source2 = wd.ImageTextureAsset.create({});
                image.source = source2;

                director._loopBody(2);


                expect(context.save).toCalledTwice();
            });
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone source, targetSource", function(){
            var imageSource = wd.Image.create();
            var targetImageSource = wd.Image.create();

            var imageTextureAsset = wd.ImageTextureAsset.create(imageSource);
            var targetImageTextureAsset = wd.ImageTextureAsset.create(targetImageSource);

            cloneTool.extend(image, {
                source: imageTextureAsset,
                targetSource:targetImageTextureAsset
            });

            var result = image.clone();

            expect(result.source).toBeInstanceOf(wd.ImageTextureAsset);
            expect(result.source === imageTextureAsset).toBeFalsy();

            expect(result.source.source === imageSource).toBeTruthy();


            expect(result.targetSource).toBeInstanceOf(wd.ImageTextureAsset);
            expect(result.targetSource === targetImageTextureAsset).toBeFalsy();

            expect(result.targetSource.source === targetImageSource).toBeTruthy();
        });

        it("clone color,targetColor", function(){
            var color = wd.Color.create("#123334"),
            targetColor = wd.Color.create("#123456");

            cloneTool.extend(image, {
                color: color,
                targetColor: targetColor
            });

            var result = image.clone();

            expect(result.color).toEqual(color);
            expect(result.targetColor).toEqual(targetColor);
        });
    });
});

