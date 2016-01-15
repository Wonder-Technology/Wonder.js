describe("BitmapFont", function () {
    var sandbox = null;
    var Font = null;
    var font;
    var uiObject;
    var director;
    var renderer;

    function setWidth(width){
        uiObject.transform.width = width;
    }

    function setHeight(height){
        uiObject.transform.height = height;
    }

    function createFont() {
        font = wd.BitmapFont.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(font);


        renderer = wd.UIRenderer.create();


        uiObject.addComponent(renderer);


        return uiObject;
    }

    function setPosition(x, y){
        uiObject.transform.position = wd.Vector2.create(x, y);
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


        uiObject = createFont();

        setHeight(400);
        setPosition(0, 0);


        director.scene.addChild(uiObject);

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

                font._isInit = false;
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
            var fontWidth = uiObject.transform.width,
                fontHeight = uiObject.transform.height;

            expect(context.drawImage.getCall(callCount)).toCalledWith(image,
                0, 0, 100, 200,
                x - fontWidth / 2, y - fontHeight / 2, width, height);
        }

        function judgeCharFont(tag, char, width, xAlignment){
            var charFont = uiObject.findChildByTag(String(tag)).getComponent(wd.CharFont);

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

        //it("if set width to be auto, it can equal view.width", function(){
        //    function setDimensions(width) {
        //        font.width = width;
        //    }
        //
        //    font.text = "阿斯";
        //    setDimensions(wd.FontDimension.AUTO);
        //
        //    font.init();
        //
        //    expect(font.width).toEqual(1000);
        //});


        it("test single line text", function () {
            font.text = "正ab";
            setWidth(1000);

            director._init();

            prepareAfterInit();

            director._loopBody(1);

            judgeDrawImage(0, 1, 2, 100, 200);
            judgeDrawImage(1, 4, 2, 100, 200);
            judgeDrawImage(2, 7, 2, 100, 200);
        });

        describe("test multi lines", function(){
            it("test exceed max width", function(){
                font.text = "1ab";
                setWidth(7);

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, 2, 100, 200);
                judgeDrawImage(1, 4, 2, 100, 200);
                judgeDrawImage(2, 1, 52, 100, 200);
            });
            it("test exceed max width and uiObject transform", function(){
                font.text = "1ab";
                setWidth(7);

                uiObject.transform.translate(-200, 100);


                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1 - 200, 2 + 100, 100, 200);
                judgeDrawImage(1, 4 - 200, 2 + 100, 100, 200);
                judgeDrawImage(2, 1 - 200, 52 + 100, 100, 200);
            });

            describe("test text has newline char", function(){
                it("test1", function(){
                    font.text = "正\nab\nc\n";
                    setWidth(50);

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
                    setWidth(7);

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
                    setWidth(50);

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
                    setWidth(10);

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
                    setWidth(7);

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
                setWidth(10);


                director._init();

                prepareAfterInit();

                director._loopBody(1);


                judgeDrawImage(0, 2.5, 2, 100, 200);
                judgeDrawImage(1, 5.5, 2, 100, 200);
            });
            it("right", function(){
                font.xAlignment = wd.FontXAlignment.RIGHT;
                font.text = "正1";
                setWidth(10);

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
                    setWidth(100);


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 47.5, 2, 100, 200);
                    judgeDrawImage(1, 50.5, 2, 100, 200);
                });
                it("test right x alignment", function(){
                    font.xAlignment = wd.FontXAlignment.RIGHT;
                    font.text = "正1   ";
                    setWidth(100);


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
                setWidth(1);

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, 2, 100, 200);
                judgeDrawImage(1, 1, 52, 100, 200);
                judgeDrawImage(2, 1, 102, 100, 200);
            });
        });


        describe("if ui not change, not clear ui canvas and not update ui", function() {
            it("test text has newline char", function () {
                font.text = "正\na";
                setWidth(10);

                director._init();

                prepareAfterInit();
                sandbox.stub(context, "clearRect");

                director._loopBody(1);
                director._loopBody(1);


                expect(context.clearRect).toCalledOnce();
            });
        });

        describe("test char font", function(){
            function getCharFontUIObject(index){
                var index = index === undefined ? 1 : index;

                return uiObject.findChildByTag(String(index));
            }

            beforeEach(function(){
            });

            describe("can add action component", function(){
                describe("test rotate", function(){
                    var rotationMatrix;

                    function addRotateAction(index, angle){
                        var charFontUIObject = getCharFontUIObject(index);

                        var action = wd.CallFunc.create(function(){
                            this.transform.rotation = angle;
                            rotationMatrix = charFontUIObject.transform.rotationMatrix;
                        }, charFontUIObject);

                        charFontUIObject.addComponent(action);

                        action.init();
                    }

                    beforeEach(function(){
                        font.text = "正ab";
                        setWidth(1000);

                        director._init();

                        prepareAfterInit();

                        context = renderer.context;

                        sandbox.stub(context, "setTransform");
                    });

                    it("rotate image by set canvas transform to be RectTransform->rotationMatrix", function(){
                        addRotateAction(
                            1,
                            45
                        );


                        director._loopBody(2);

                        expect(renderer.context.setTransform).toCalledWith(rotationMatrix.a, rotationMatrix.b, rotationMatrix.c, rotationMatrix.d, rotationMatrix.tx, rotationMatrix.ty);
                    });
                });

                describe("test translate and scale", function(){
                    function judgeDrawImageUnderAction(callCount, x, y, width, height) {
                        var fontWidth = uiObject.transform.width,
                            fontHeight = uiObject.transform.height;

                        expect(context.drawImage.getCall(callCount)).toCalledWith(image,
                            0, 0, 100, 200,
                            x - fontWidth / 2 - 50, y - fontHeight / 2 - 200, width, height);
                    }

                    function addAction(index){
                        var charFontUIObject = getCharFontUIObject(index);

                        var action = wd.CallFunc.create(function(){
                            this.transform.translate(100, 200);
                            this.transform.scale = wd.Vector2.create(2, 3);
                        }, charFontUIObject);

                        charFontUIObject.addComponent(action);

                        action.init();
                    }

                    beforeEach(function(){
                    });

                    it("test1", function(){
                        font.text = "正ab";
                        setWidth(1000);

                        director._init();

                        prepareAfterInit();


                        addAction();



                        director._loopBody(2);

                        judgeDrawImage(0, 1, 2, 100, 200);
                        judgeDrawImageUnderAction(1, 4 + 100, 2 + 200, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 7, 2, 100, 200);
                    });
                    it("test2", function(){
                        font.text = "正ab";
                        setWidth(1000);

                        uiObject.transform.translate(100, 50);

                        director._init();

                        prepareAfterInit();


                        addAction();



                        director._loopBody(2);

                        judgeDrawImage(0, 1 + 100, 2 + 50, 100, 200);
                        judgeDrawImageUnderAction(1, 4 + 100 + 100, 2 + 200 + 50, 100 * 2, 200 * 3);

                        judgeDrawImage(2, 7 + 100, 2 + 50, 100, 200);

                    });
                    it("test3", function(){
                        font.text = "正\na  dbc";
                        setWidth(10);

                        director._init();

                        prepareAfterInit();

                        addAction(2);

                        director._loopBody(1);


                        judgeDrawImage(0, 1, 2, 100, 200);
                        //judgeDrawImage(1, 3, 0, 0, 0);
                        judgeDrawImageUnderAction(1, 1 + 100, 52 + 200, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 4, 52, 100, 200);
                        judgeDrawImage(3, 7, 52, 100, 200);
                        judgeDrawImage(4, 1, 102, 100, 200);
                        judgeDrawImage(5, 4, 102, 100, 200);
                        judgeDrawImage(6, 7, 102, 100, 200);
                    })
                });
            });

            describe("test CharFont dirty", function(){
                var charFontUIObject,
                    charFont;

                beforeEach(function(){
                    font.text = "正ab";
                    setWidth(1000);

                    director._init();

                    charFontUIObject = getCharFontUIObject(0);
                    charFont = charFontUIObject.getComponent(wd.CharFont);
                    sandbox.spy(charFont, "update");

                    prepareAfterInit();


                    director._loopBody(2);

                    expect(charFont.update).toCalledOnce();
                    expect(charFont.dirty).toBeFalsy();
                });

                it("if uiObject transform change, char font dirty", function(){
                    director._loopBody(2);

                    expect(charFont.update).toCalledOnce();


                    charFontUIObject.transform.translate(2,3);

                    director._loopBody(3);

                    expect(charFont.update).toCalledTwice();
                    expect(charFont.dirty).toBeFalsy();


                    charFontUIObject.transform.scale = wd.Vector2.create(1,1);

                    director._loopBody(4);

                    expect(charFont.update.callCount).toEqual(3);




                    charFontUIObject.transform.rotate(10);

                    director._loopBody(5);

                    expect(charFont.update.callCount).toEqual(4);




                    director._loopBody(6);

                    expect(charFont.update.callCount).toEqual(4);
                });
                it("if width change, char font dirty", function(){
                    charFontUIObject.transform.width = 2000;

                    director._loopBody(3);

                    expect(charFont.update).toCalledTwice();



                    director._loopBody(4);

                    expect(charFont.update).toCalledTwice();
                });
                it("if height change, char font dirty", function(){
                    charFontUIObject.transform.height = 2000;

                    director._loopBody(3);

                    expect(charFont.update).toCalledTwice();



                    director._loopBody(4);

                    expect(charFont.update).toCalledTwice();
                });
            });

            describe("change data will cause dirty and update font", function(){
                it("test change uiObject transform", function(){
                    font.text = "a";
                    setWidth(10);

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0, 1, 2, 100, 200);




                    var charFontUIObject = getCharFontUIObject(0);

                    charFontUIObject.transform.translate(100, 200);

                    director._loopBody(2);

                    judgeDrawImage(1, 1 + 100, 2 + 200, 100, 200);
                });
            });

            describe("dispose", function(){
                beforeEach(function(){
                    font.text = "a";
                    setWidth(10);

                    uiObject.init();
                });

                it("unbind transform event", function(){
                    var charFontUIObject = getCharFontUIObject(0);
                    var charFont = charFontUIObject.getComponent(wd.CharFont);

                    charFont.dispose();


                    var a = 0;
                    testTool.stubGetterSetter(sinon, charFont, "dirty", function(){
                    }, function(){
                        a++;
                    });

                    charFontUIObject.transform.rotate(45);

                    expect(a).toEqual(0);
                });
            });
        });

        describe("change data will cause dirty and reformat font", function(){
            beforeEach(function(){

            });

            it("if the new data equal old data, not dirty and not update text", function(){
                font.text = "正ab";
                setWidth(1000);
                sandbox.stub(font, "reFormat");

                director._init();

                prepareAfterInit();




                director._loopBody(2);

                expect(font.reFormat).not.toCalled();


                font.text = "正ab";

                director._loopBody(2);

                expect(font.reFormat).not.toCalled();
            });

            describe("else", function(){
                beforeEach(function(){
                    font.text = "正ab";
                    setWidth(1000);
                    font.xAlignment = wd.FontXAlignment.LEFT;

                    director._init();

                    prepareAfterInit();




                    director._loopBody(2);
                });

                it("test change text", function(){
                    font.text = "z";

                    director._loopBody(2);


                    expect(uiObject.getChildren().getCount()).toEqual(1);
                    judgeCharFont("0", "z");

                    expect(context.drawImage.callCount).toEqual(4);
                    judgeDrawImage(3, 1, 2, 100, 200);
                });
                it("test change width", function(){
                    setWidth(1);

                    director._loopBody(2);

                    judgeDrawImage(3, 1, 2, 100, 200);
                    judgeDrawImage(4, 1, 52, 100, 200);
                    judgeDrawImage(5, 1, 102, 100, 200);
                });
                it("test change xAlignment", function(){
                    font.xAlignment = wd.FontXAlignment.RIGHT;

                    director._loopBody(2);

                    judgeDrawImage(3, 991, 2, 100, 200);
                    judgeDrawImage(4, 994, 2, 100, 200);
                    judgeDrawImage(5, 997, 2, 100, 200);
                });
            });
        });

        describe("dispose", function(){
            beforeEach(function(){

            });

            it("remove all char font", function(){
                font.text = "正ab";
                setWidth(1000);

                director._init();

                prepareAfterInit();

                director._loopBody(2);

                expect(uiObject.getChildren().getCount()).toEqual(3);

                font.dispose();

                expect(uiObject.getChildren().getCount()).toEqual(0);
            });
        });
    });
});
