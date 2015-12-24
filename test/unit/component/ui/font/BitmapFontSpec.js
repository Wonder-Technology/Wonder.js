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
        var image;
        var context;

        function judgeDrawImage(callCount, x, y, width, height) {
            expect(context.drawImage.getCall(callCount)).toCalledWith(image,
                0, 0, 100, 200,
                x + 500, y + 400, width, height);
        }

        function judgeCharFont(tag, char){
            var charFont = gameObject.findChildByTag(String(tag)).getComponent(wd.CharFont);

            expect(charFont.char).toEqual(char);
        }

        function prepareAfterInit(){
            var uiCanvasData = wd.DeviceManager.getInstance().canvasMap.getChild(wd.CanvasType.UI);
            context = uiCanvasData.context;

            sandbox.stub(context, "drawImage");
        }

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

            sandbox.stub(font, "_getFontDef", function (dict) {
                return dict[1];
            });



            image = {};
            wd.LoaderManager.getInstance().get.withArgs(font.bitmapId).returns({
                source:image
            });
        });

        it("test single line text", function () {
            font.text = "正ab";
            font.width = 1000;

            director._init();

            prepareAfterInit();

            director._loopBody(1);

            judgeDrawImage(0, 1, 2, 100, 200);
            judgeDrawImage(1, 4, 2, 100, 200);
            judgeDrawImage(2, 7, 2, 100, 200);
        });

        describe("test multi lines", function(){
            it("test exceed max width", function(){
                font.text = "正ab";
                font.width = 7;

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, 2, 100, 200);
                judgeDrawImage(1, 4, 2, 100, 200);
                judgeDrawImage(2, 1, 52, 100, 200);
            });

            describe("test text has newline char", function(){
                it("test1", function(){
                    font.text = "正\nab\nc\n";
                    font.width = 50;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0,1, 2, 100, 200);
                    //judgeDrawImage(1,3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    judgeDrawImage(2, 4, 52, 100, 200);
                    //judgeDrawImage(4, 6, 50, 0, 0);
                    judgeDrawImage(3, 1, 102, 100, 200);
                    //judgeDrawImage(4, 3, 100, 0, 0);
                });
                it("test2", function(){
                    font.text = "正\nabc";
                    font.width = 7;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0, 1, 2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    judgeDrawImage(2, 4, 52, 100, 200);
                    judgeDrawImage(3, 1, 102, 100, 200);
                });
            });

            describe("test text has space char", function(){
                it("test1", function(){
                    font.text = "正  1";
                    font.width = 50;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, 2, 100, 200);
                    judgeDrawImage(1, 4, 2, 100, 200);
                    judgeDrawImage(2, 7, 2, 100, 200);
                    judgeDrawImage(3, 10, 2, 100, 200);

                    judgeCharFont(1, " ");
                    judgeCharFont(2, " ");
                    judgeCharFont(3, "1");
                });
                it("test2", function(){
                    font.text = "正\na  dbc";
                    font.width = 10;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, 2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    judgeDrawImage(2, 4, 52, 100, 200);
                    judgeDrawImage(3, 7, 52, 100, 200);
                    judgeDrawImage(4, 1, 102, 100, 200);
                    judgeDrawImage(5, 4, 102, 100, 200);
                    judgeDrawImage(6, 7, 102, 100, 200);


                    judgeCharFont(3, " ");
                    judgeCharFont(4, " ");
                    judgeCharFont(5, "d");
                    judgeCharFont(6, "b");
                    judgeCharFont(7, "c");
                });
                it("remain space char in the end of line(can be multi lines)", function(){
                    font.text = "正\na   ";
                    font.width = 7;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, 2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    judgeDrawImage(2, 4, 52, 100, 200);
                    judgeDrawImage(3, 1, 102, 100, 200);
                    judgeDrawImage(4, 4, 102, 100, 200);

                    judgeCharFont(2, "a");
                    judgeCharFont(3, " ");
                    judgeCharFont(4, " ");
                    judgeCharFont(5, " ");
                });
            });
        });

        describe("test x alignment", function(){
            it("center", function(){
                font.xAlignment = wd.FontXAlignment.CENTER;
                font.text = "正1";
                font.width = 10;


                director._init();

                prepareAfterInit();

                director._loopBody(1);


                judgeDrawImage(0, 2.5, 2, 100, 200);
                judgeDrawImage(1, 5.5, 2, 100, 200);
            });
            it("right", function(){
                font.xAlignment = wd.FontXAlignment.RIGHT;
                font.text = "正1";
                font.width = 10;

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 4, 2, 100, 200);
                judgeDrawImage(1, 7, 2, 100, 200);
            });

            describe("ignore space char in the end of line", function(){
                it("test center x alignment", function(){
                    font.xAlignment = wd.FontXAlignment.CENTER;
                    font.text = "正1     ";
                    font.width = 100;


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 47.5, 2, 100, 200);
                    judgeDrawImage(1, 50.5, 2, 100, 200);
                });
                it("test right x alignment", function(){
                    font.xAlignment = wd.FontXAlignment.RIGHT;
                    font.text = "正1   ";
                    font.width = 100;


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 94, 2, 100, 200);
                    judgeDrawImage(1, 97, 2, 100, 200);
                });
            });
        });

        describe("test special cases", function(){
            it("if maxWidth < width of the char in the begin of line(xAdvance), this line show one char", function(){
                font.text = "正12";
                font.width = 1;

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, 2, 100, 200);
                judgeDrawImage(1, 1, 52, 100, 200);
                judgeDrawImage(2, 1, 102, 100, 200);
            });
        });

        describe("test char font", function(){
            beforeEach(function(){
            });

            describe("can add action component", function(){
                function addAction(){
                    var charFontGameObject = gameObject.findChildByTag("1");

                    var action = wd.CallFunc.create(function(){
                        this.transform.translate(100, 200, 0);
                        this.transform.scale = wd.Vector3.create(2, 3, 1);
                    }, charFontGameObject);

                    charFontGameObject.addComponent(action);

                    action.init();
                }

                it("test1", function(){
                    font.text = "正ab";
                    font.width = 1000;

                    director._init();

                    prepareAfterInit();


                    addAction();



                    director._loopBody(2);

                    judgeDrawImage(0, 1, 2, 100, 200);
                    judgeDrawImage(1, 104, 202, 100 * 2, 200 * 3);
                    judgeDrawImage(2, 7, 2, 100, 200);
                });
                it("test2", function(){
                    font.text = "正ab";
                    font.width = 1000;

                    gameObject.transform.translate(100, 50, 0);

                    director._init();

                    prepareAfterInit();


                    addAction();



                    director._loopBody(2);

                    judgeDrawImage(0, 1 + 100, 2 - 50, 100, 200);
                    judgeDrawImage(1, 104 + 100, 202 - 50, 100 * 2, 200 * 3);
                    judgeDrawImage(2, 7 + 100, 2 - 50, 100, 200);

                });
            });
        });
    });
});
