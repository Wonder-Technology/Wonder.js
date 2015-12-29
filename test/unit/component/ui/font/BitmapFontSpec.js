describe("BitmapFont", function () {
    var sandbox = null;
    var Font = null;
    var font;
    var gameObject;
    var director;
    var renderer;

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

        testTool.openContractCheck(sandbox);

        Font = wd.BitmapFont;

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 800
        });


        gameObject = createFont();


        director.scene.addChild(gameObject);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
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
                x + 500, -y + 400, width, height);
        }

        function judgeCharFont(tag, char, width, xAlignment){
            var charFont = gameObject.findChildByTag(String(tag)).getComponent(wd.CharFont);

            if(char){
                expect(charFont.char).toEqual(char);
            }
            if(width){
                expect(charFont.width).toEqual(width);
            }
            if(xAlignment){
                expect(charFont.xAlignment).toEqual(xAlignment);
            }
        }

        function prepareAfterInit(){
            context = renderer.context;

            sandbox.stub(context, "drawImage");
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

            sandbox.stub(font, "_getFontDef", function (dict) {
                return dict[1];
            });



            image = {};
            wd.LoaderManager.getInstance().get.withArgs(font.bitmapId).returns({
                source:image
            });
        });

        it("if set width to be auto, it can equal view.width", function(){
            function setDimensions(width) {
                font.width = width;
            }

            font.text = "阿斯";
            setDimensions(wd.FontDimension.AUTO);

            font.init();

            expect(font.width).toEqual(1000);
        });


        it("test single line text", function () {
            font.text = "正ab";
            font.width = 1000;

            director._init();

            prepareAfterInit();

            director._loopBody(1);

            judgeDrawImage(0, 1, -2, 100, 200);
            judgeDrawImage(1, 4, -2, 100, 200);
            judgeDrawImage(2, 7, -2, 100, 200);
        });

        describe("test multi lines", function(){
            it("test exceed max width", function(){
                font.text = "1ab";
                font.width = 7;

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, -2, 100, 200);
                judgeDrawImage(1, 4, -2, 100, 200);
                judgeDrawImage(2, 1, -52, 100, 200);
            });
            it("test exceed max width and gameObject transform", function(){
                font.text = "1ab";
                font.width = 7;

                gameObject.transform.translate(-200, 100, 0);


                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1 - 200, -2 + 100, 100, 200);
                judgeDrawImage(1, 4 - 200, -2 + 100, 100, 200);
                judgeDrawImage(2, 1 - 200, -52 + 100, 100, 200);
            });

            describe("test text has newline char", function(){
                it("test1", function(){
                    font.text = "正\nab\nc\n";
                    font.width = 50;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0,1, -2, 100, 200);
                    //judgeDrawImage(1,3, 0, 0, 0);
                    judgeDrawImage(1, 1, -52, 100, 200);
                    judgeDrawImage(2, 4, -52, 100, 200);
                    //judgeDrawImage(4, 6, 50, 0, 0);
                    judgeDrawImage(3, 1, -102, 100, 200);
                    //judgeDrawImage(4, 3, 100, 0, 0);
                });
                it("test2", function(){
                    font.text = "正\nabc";
                    font.width = 7;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0, 1, -2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, -52, 100, 200);
                    judgeDrawImage(2, 4, -52, 100, 200);
                    judgeDrawImage(3, 1, -102, 100, 200);
                });
            });

            describe("test text has space char", function(){
                it("test1", function(){
                    font.text = "正  1";
                    font.width = 50;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, -2, 100, 200);
                    judgeDrawImage(1, 4, -2, 100, 200);
                    judgeDrawImage(2, 7, -2, 100, 200);
                    judgeDrawImage(3, 10, -2, 100, 200);

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


                    judgeDrawImage(0, 1, -2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, -52, 100, 200);
                    judgeDrawImage(2, 4, -52, 100, 200);
                    judgeDrawImage(3, 7, -52, 100, 200);
                    judgeDrawImage(4, 1, -102, 100, 200);
                    judgeDrawImage(5, 4, -102, 100, 200);
                    judgeDrawImage(6, 7, -102, 100, 200);


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


                    judgeDrawImage(0, 1, -2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, -52, 100, 200);
                    judgeDrawImage(2, 4, -52, 100, 200);
                    judgeDrawImage(3, 1, -102, 100, 200);
                    judgeDrawImage(4, 4, -102, 100, 200);

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


                judgeDrawImage(0, 2.5, -2, 100, 200);
                judgeDrawImage(1, 5.5, -2, 100, 200);
            });
            it("right", function(){
                font.xAlignment = wd.FontXAlignment.RIGHT;
                font.text = "正1";
                font.width = 10;

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 4, -2, 100, 200);
                judgeDrawImage(1, 7, -2, 100, 200);
            });

            describe("ignore space char in the end of line", function(){
                it("test center x alignment", function(){
                    font.xAlignment = wd.FontXAlignment.CENTER;
                    font.text = "正1     ";
                    font.width = 100;


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 47.5, -2, 100, 200);
                    judgeDrawImage(1, 50.5, -2, 100, 200);
                });
                it("test right x alignment", function(){
                    font.xAlignment = wd.FontXAlignment.RIGHT;
                    font.text = "正1   ";
                    font.width = 100;


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 94, -2, 100, 200);
                    judgeDrawImage(1, 97, -2, 100, 200);
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

                judgeDrawImage(0, 1, -2, 100, 200);
                judgeDrawImage(1, 1, -52, 100, 200);
                judgeDrawImage(2, 1, -102, 100, 200);
            });
        });


        describe("if ui not change, not clear ui canvas and not update ui", function() {
            it("test text has newline char", function () {
                font.text = "正\na";
                font.width = 10;

                director._init();

                prepareAfterInit();
                sandbox.stub(context, "clearRect");

                director._loopBody(1);
                director._loopBody(1);


                expect(context.clearRect).toCalledOnce();
            });
        });

        describe("test char font", function(){
            function getCharFontGameObject(index){
                var index = index === undefined ? 1 : index;

                return gameObject.findChildByTag(String(index));
            }

            beforeEach(function(){
            });

            describe("can add action component", function(){
                function addRotateAction(index, eulerAngles){
                    var charFontGameObject = getCharFontGameObject(index);

                    var action = wd.CallFunc.create(function(){
                        this.transform.eulerAngles = eulerAngles;
                    }, charFontGameObject);

                    charFontGameObject.addComponent(action);

                    action.init();
                }

                describe("test rotate", function(){
                    beforeEach(function(){
                        font.text = "正ab";
                        font.width = 1000;

                        director._init();

                        prepareAfterInit();

                        context = renderer.context;

                        sandbox.stub(context, "transform");
                        sandbox.stub(context, "translate");
                    });

                    it("can rotate around image center by x axis", function(){
                        addRotateAction(
                            1,
                            wd.Vector3.create(45, 0, 0)
                        );


                        director._loopBody(2);

                        expect(context.translate.firstCall).toCalledWith(554, 502);
                        expect(testTool.getValues(
                            context.transform.firstCall.args, 1
                        )).toEqual([1, 0, 0, 0.7, 0, 0]);
                        expect(context.translate.secondCall).toCalledWith(-554, -502);
                    });
                    it("can rotate around image center by y axis", function(){
                        addRotateAction(
                            1,
                            wd.Vector3.create(0, 45, 0)
                        );


                        director._loopBody(2);

                        expect(context.translate.firstCall).toCalledWith(554, 502);
                        expect(testTool.getValues(
                            context.transform.firstCall.args, 1
                        )).toEqual([0.7, 0, 0, 1, 0, 0]);
                        expect(context.translate.secondCall).toCalledWith(-554, -502);
                    });
                    it("can rotate around image center by x axis", function(){
                        addRotateAction(
                            1,
                            wd.Vector3.create(0, 0, 45)
                        );


                        director._loopBody(2);

                        expect(context.translate.firstCall).toCalledWith(554, 502);
                        expect(testTool.getValues(
                            context.transform.firstCall.args, 1
                        )).toEqual([0.7, -0.7, 0.7, 0.7, 0, 0]);
                        expect(context.translate.secondCall).toCalledWith(-554, -502);
                    });
                });

                describe("test translate and scale", function(){
                    function addAction(index){
                        var charFontGameObject = getCharFontGameObject(index);

                        var action = wd.CallFunc.create(function(){
                            this.transform.translate(100, 200, 0);
                            this.transform.scale = wd.Vector3.create(2, 3, 1);
                        }, charFontGameObject);

                        charFontGameObject.addComponent(action);

                        action.init();
                    }

                    beforeEach(function(){

                    });

                    it("test1", function(){
                        font.text = "正ab";
                        font.width = 1000;

                        director._init();

                        prepareAfterInit();


                        addAction();



                        director._loopBody(2);

                        judgeDrawImage(0, 1, -2, 100, 200);
                        judgeDrawImage(1, 4 + 100, -2 + 200, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 7, -2, 100, 200);
                    });
                    it("test2", function(){
                        font.text = "正ab";
                        font.width = 1000;

                        gameObject.transform.translate(100, 50, 0);

                        director._init();

                        prepareAfterInit();


                        addAction();



                        director._loopBody(2);

                        judgeDrawImage(0, 1 + 100, -2 + 50, 100, 200);
                        judgeDrawImage(1, 4 + 100 + 100, -2 + 200 + 50, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 7 + 100, -2 + 50, 100, 200);

                    });
                    it("test3", function(){
                        font.text = "正\na  dbc";
                        font.width = 10;

                        director._init();

                        prepareAfterInit();

                        addAction(2);

                        director._loopBody(1);


                        judgeDrawImage(0, 1, -2, 100, 200);
                        //judgeDrawImage(1, 3, 0, 0, 0);
                        judgeDrawImage(1, 1 + 100, -52 + 200, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 4, -52, 100, 200);
                        judgeDrawImage(3, 7, -52, 100, 200);
                        judgeDrawImage(4, 1, -102, 100, 200);
                        judgeDrawImage(5, 4, -102, 100, 200);
                        judgeDrawImage(6, 7, -102, 100, 200);
                    })
                });
            });

            describe("test CharFont dirty", function(){
                var charFontGameObject,
                    charFont;

                beforeEach(function(){
                    font.text = "正ab";
                    font.width = 1000;

                    director._init();

                    charFontGameObject = getCharFontGameObject(0);
                    charFont = charFontGameObject.getComponent(wd.CharFont);
                    sandbox.spy(charFont, "update");

                    prepareAfterInit();


                    director._loopBody(2);

                    expect(charFont.update).toCalledOnce();
                    expect(charFont.dirty).toBeFalsy();
                });

                it("if gameObject transform change, char font dirty", function(){
                    charFontGameObject.transform.translate(1,0,0);

                    expect(charFont.dirty).toBeTruthy();

                    director._loopBody(3);

                    expect(charFont.update).toCalledTwice();
                    expect(charFont.dirty).toBeFalsy();


                    charFontGameObject.transform.scale = wd.Vector3.create(1,1,2);

                    director._loopBody(4);

                    expect(charFont.update.callCount).toEqual(3);




                    charFontGameObject.transform.rotate(10,0,0);

                    director._loopBody(5);

                    expect(charFont.update.callCount).toEqual(4);




                    director._loopBody(6);

                    expect(charFont.update.callCount).toEqual(4);
                });
                it("if char change, char font dirty", function(){
                    charFont.char = "9";

                    director._loopBody(3);

                    expect(charFont.update).toCalledTwice();



                    director._loopBody(4);

                    expect(charFont.update).toCalledTwice();

                });
            });

            describe("change data will cause dirty and update font", function(){
                it("test change gameObject transform", function(){
                    font.text = "a";
                    font.width = 10;

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0, 1, -2, 100, 200);




                    var charFontGameObject = getCharFontGameObject(0);

                    charFontGameObject.transform.translate(100, 200, 0);

                    director._loopBody(2);

                    judgeDrawImage(1, 1 + 100, -2 + 200, 100, 200);
                });
            });
        });

        describe("change data will cause dirty and update font", function(){
            beforeEach(function(){

            });

            it("if the new data equal old data, not dirty and not update text", function(){
                font.text = "正ab";
                font.width = 1000;
                sandbox.stub(font, "updateWhenDirty");

                director._init();

                prepareAfterInit();




                director._loopBody(2);

                expect(font.updateWhenDirty).not.toCalled();


                font.text = "正ab";

                director._loopBody(2);

                expect(font.updateWhenDirty).not.toCalled();
            });

            describe("else", function(){
                beforeEach(function(){
                    font.text = "正ab";
                    font.width = 1000;
                    font.xAlignment = wd.FontXAlignment.LEFT;

                    director._init();

                    prepareAfterInit();




                    director._loopBody(2);
                });

                it("test change text", function(){
                    font.text = "z";

                    director._loopBody(2);


                    expect(gameObject.getChildren().getCount()).toEqual(1);
                    judgeCharFont("0", "z");

                    expect(context.drawImage.callCount).toEqual(4);
                    judgeDrawImage(3, 1, -2, 100, 200);
                });
                it("test change width", function(){
                    font.width = 1;

                    director._loopBody(2);

                    judgeDrawImage(3, 1, -2, 100, 200);
                    judgeDrawImage(4, 1, -52, 100, 200);
                    judgeDrawImage(5, 1, -102, 100, 200);
                });
                it("test change xAlignment", function(){
                    font.xAlignment = wd.FontXAlignment.RIGHT;

                    director._loopBody(2);

                    judgeDrawImage(3, 991, -2, 100, 200);
                    judgeDrawImage(4, 994, -2, 100, 200);
                    judgeDrawImage(5, 997, -2, 100, 200);
                });
            });
        });

        describe("dispose", function(){
            beforeEach(function(){

            });

            it("remove all char font", function(){
                font.text = "正ab";
                font.width = 1000;

                director._init();

                prepareAfterInit();

                director._loopBody(2);

                expect(gameObject.getChildren().getCount()).toEqual(3);

                font.dispose();

                expect(gameObject.getChildren().getCount()).toEqual(0);
            });
        });
    });
});
