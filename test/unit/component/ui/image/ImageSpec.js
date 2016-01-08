describe("Image", function () {
    var sandbox = null;
    var image;
    var renderer;
    var uiObject;
    var director;
    var context;


    function createImage() {
        image = wd.Image.create();


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

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));



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

            director.initUIObjectScene();

            context = renderer.context;
        });

        it("if source === null, return", function(){
            image.source = null;

            uiObject.update(1);

            expect(context.save).not.toCalled();
        });

        describe("else", function(){
            var source;

            beforeEach(function(){
                source = wd.ImageTextureAsset.create({});

                image.source = source;
            });

            it("draw image", function(){
                var width = 100;
                var height = 50;
                uiObject.transform.width = width;
                uiObject.transform.height = height;

                director.runUIObjectScene(1);

                var position = uiObject.transform.position;

                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage).toCalledWith(source.source, 0, 0, width, height,
                    position.x - width / 2, position.y - height / 2, width, height
                );
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

                //expect(context.save).toCalledOnce();
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

