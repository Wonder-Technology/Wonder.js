describe("BitmapFont", function () {
    var sandbox = null;
    var Font = null;
    var font;
    var gameObject;
    var director;

    function createFont() {
        font = wd.BitmapFont.create();


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(font);


        renderer = wd.UIRenderer.create();


        gameObject.addComponent(renderer);


        return gameObject;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        Font = wd.BitmapFont;

        director = wd.Director.getInstance();

        gameObject = createFont();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 800
        });

    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("", function () {
        beforeEach(function () {

        });

        describe("if not get fnt or bitmap resource, log", function () {
            beforeEach(function () {
                sandbox.stub(wd.Log, "log");
            });

            it("test1", function () {
                var result = font.init();

                expect(wd.Log.log).toCalled();
                expect(result).toBeFalsy();
            });
            it("test2", function (done) {
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/font/myFont.fnt", id: "myFont_fnt"},
                    {url: testTool.resPath + "test/res/font/myFont.png", id: "myFont_image"}
                ]).subscribe(function (data) {
                }, null, function () {
                    font.fntId = "myFont_fnt";

                    var result = font.init();

                    expect(wd.Log.log).toCalledOnce();
                    expect(result).toBeFalsy();


                    font.bitmapId = "bbb";

                    var result = font.init();
                    expect(wd.Log.log).toCalledTwice();
                    expect(result).toBeFalsy();


                    font.bitmapId = "myFont_image";

                    font.init();
                    expect(wd.Log.log).toCalledTwice();


                    done();
                });
            });
        });

        describe("else", function () {
            function judgeCharGameObject(charGameObject, x, y, width, height, char) {
                var position = charGameObject.transform.position,
                    charFont = charGameObject.getComponent(wd.CharFont);

                expect(position.x).toEqual(x);
                expect(position.y).toEqual(y);
                expect(charFont.width).toEqual(width);
                expect(charFont.height).toEqual(height);

                if (char) {
                    expect(charFont.char).toEqual(char);
                }
            }

            beforeEach(function () {
                font.fntId = "myFont_fnt";
                font.bitmapId = "myFont_image";

                sandbox.stub(wd.LoaderManager.getInstance(), "get");

                wd.LoaderManager.getInstance().get.withArgs(font.fntId).returns({
                    fontDefDictionary: {
                        1: {
                            rect: {
                                x: 0,
                                y: 0,
                                width: 100,
                                height: 200
                            },
                            xOffset: 1,
                            yOffset: 2,
                            xAdvance: 3
                        }
                    },
                    commonHeight: 50
                });

                wd.LoaderManager.getInstance().get.withArgs(font.bitmapId).returns({
                    source:{}
                });

                sandbox.stub(font, "_getFontDef", function (dict) {
                    return dict[1];
                });
            });

            it("test single line text", function () {
                font.text = "正ab";
                font.width = 1000;

                gameObject.init();

                expect(gameObject.getChildren().getCount()).toEqual(3);
                judgeCharGameObject(gameObject.findChildByTag("0"), 501, 402, 100, 200);
                judgeCharGameObject(gameObject.findChildByTag("1"), 504, 402, 100, 200);
                judgeCharGameObject(gameObject.findChildByTag("2"), 507, 402, 100, 200);
            });
        });
    });

    describe("update", function () {
        var image;

        beforeEach(function () {
            director.scene.addChild(gameObject);

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));




            font.fntId = "myFont_fnt";
            font.bitmapId = "myFont_image";

            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            wd.LoaderManager.getInstance().get.withArgs(font.fntId).returns({
                fontDefDictionary: {
                    1: {
                        rect: {
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 200
                        },
                        xOffset: 1,
                        yOffset: 2,
                        xAdvance: 3
                    }
                },
                commonHeight: 50
            });

            image = {};
            wd.LoaderManager.getInstance().get.withArgs(font.bitmapId).returns({
                source:image
            });

            sandbox.stub(font, "_getFontDef", function (dict) {
                return dict[1];
            });
        });

        it("draw char gameObjects", function () {
            font.text = "正ab";
            font.width = 1000;

            director._init();

            var uiCanvasData = wd.DeviceManager.getInstance().canvasMap.getChild(wd.CanvasType.UI);
            var context = uiCanvasData.context;

            sandbox.stub(context, "drawImage");

            director._loopBody(1);


            //judgeCharGameObject(gameObject.findChildByTag("0"), 1, 2, 100, 200);
            //judgeCharGameObject(gameObject.findChildByTag("1"), 4, 2, 100, 200);
            //judgeCharGameObject(gameObject.findChildByTag("2"), 7, 2, 100, 200);

            expect(context.drawImage.callCount).toEqual(3);
            expect(context.drawImage.firstCall).toCalledWith(image,
                0, 0, 100, 200,
                501, 402, 100, 200);
            expect(context.drawImage.secondCall).toCalledWith(image,
                0, 0, 100, 200,
                504, 402, 100, 200);
            expect(context.drawImage.getCall(2)).toCalledWith(image,
                0, 0, 100, 200,
                507, 402, 100, 200);
        });
    });
});
