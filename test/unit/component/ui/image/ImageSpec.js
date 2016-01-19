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
        testTool.clearInstance();
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

            image.update(1);

            expect(context.save).not.toCalled();

            image.source = null;
            image.color = {};

            image.update(1);

            expect(context.save).toCalledOnce();


            image.targetSource = {};
            image.source = null;
            image.color = null;

            image.update(1);

            expect(context.save).toCalledTwice();


            image.targetSource = null;
            image.source = null;
            image.color = null;
            image.targetColor = {};

            image.update(1);

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
                    image.update(1);

                    expect(context.globalAlpha).toBeUndefined();


                    image.color.a = 0.2;

                    image.update(1);

                    expect(context.globalAlpha).toEqual(0.2);
                });
                it("fillRect image range", function(){
                    image.update(1);

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

                            image.update(1);

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

                            image.update(1);

                            expect(context.globalCompositeOperation).toEqual("copy");
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
                    image.update(1);

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
});

