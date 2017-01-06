describe("TwoDBitmapFont", function () {
    var sandbox = null;
    var TwoDBitmapFont = null;
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

    function createBitmapFont() {
        font = wd.TwoDBitmapFont.create();


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

        TwoDBitmapFont = wd.TwoDBitmapFont;

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 800
        });


        uiObject = createBitmapFont();

        uiObject.name = "uiObject";

        setHeight(400);
        setPosition(0, 0);


        director.scene.addChild(uiObject);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
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
        var charData;

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

        function isCharFontNotExist(tag){
            expect(uiObject.findChildByTag(String(tag)) == null).toBeTruthy();
        }

        function prepareAfterInit(){
            context = renderer.context;

            sandbox.stub(context, "drawImage");
        }

        beforeEach(function () {
            font.fntId = "myFont_fnt";
            font.bitmapId = "myFont_image";



            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            charData = {
                id:"1",
                rect: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 200
                },
                xOffset: 1,
                yOffset: 2,
                xAdvance: 3
            };

            wd.LoaderManager.getInstance().get.withArgs(font.fntId).returns({
                fontDefDictionary: {
                    1: charData
                },
                commonHeight:50,
                //todo test
                commonBase:0
            });

            //sandbox.stub(font, "_getFontDef", function (dict) {
            //    return dict[1];
            //});
            sandbox.stub(font._layout._searchGlyph, "getGlyphById").returns(charData);



            image = {};
            wd.LoaderManager.getInstance().get.withArgs(font.bitmapId).returns({
                source:image
            });
        });

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
                judgeDrawImage(1, 1, 52, 100, 200);
                judgeDrawImage(2, 1, 102, 100, 200);
            });
            it("test exceed max width and transform uiObject", function(){
                font.text = "1ab";
                setWidth(100 + 3);

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
                    setWidth(100 + 3 * 2);

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
                    setWidth(100 + 3 * 10);

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0, 1, 2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    judgeDrawImage(2, 4, 52, 100, 200);
                    judgeDrawImage(3, 7, 52, 100, 200);
                });
            });

            describe("test text has space char", function(){
                it("if space is in the inner of the line, add corresponding space char", function(){
                    font.text = "正  1";
                    setWidth(100 + 3 * 4);

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
                it("eat whitespace at end of line", function(){
                    font.text = "正\na  dbc";
                    setWidth(100 + 3 * 3);

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, 2, 100, 200);
                    //judgeDrawImage(1, 3, 0, 0, 0);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    //judgeDrawImage(2, 4, 52, 100, 200);
                    //judgeDrawImage(3, 7, 52, 100, 200);
                    judgeDrawImage(2, 1, 102, 100, 200);
                    judgeDrawImage(3, 4, 102, 100, 200);
                    judgeDrawImage(4, 7, 102, 100, 200);



                     expect(uiObject.findChildByTag(String(3))).toBeNull();
                    expect(uiObject.findChildByTag(String(4))).toBeNull();
                    judgeCharFont(5, "d");
                    judgeCharFont(6, "b");
                    judgeCharFont(7, "c");
                });
                it("eat whitespace at start of line", function(){
                    font.text = "正\n  a";
                    setWidth(100 + 3 * 3);

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1, 2, 100, 200);
                    judgeDrawImage(1, 1, 52, 100, 200);
                    expect(context.drawImage.callCount).toEqual(2);



                    isCharFontNotExist(2);
                    isCharFontNotExist(3);
                    judgeCharFont(4, "a");
                });
            });

            describe("test text has tab char", function(){
                var tabOffset;

                beforeEach(function(){
                    font._layout._searchGlyph.getGlyphById.withArgs(sinon.match.any, "\t".charCodeAt(0)).returns(null);

                    tabOffset = 4 * 3;
                });

                it("if fntObj not has tab char data, then use the default tab data(tab->xAdvance = 4 * space char->xAdvance)", function(){
                    font.text = "正\tab\tc\n";
                    setWidth(100 + 3 * 20);

                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);

                    judgeDrawImage(0,1, 2, 100, 200);
                    judgeDrawImage(1, 4 + tabOffset, 2, 100, 200);
                    judgeDrawImage(2, 7 + tabOffset, 2, 100, 200);
                    judgeDrawImage(3, 10 + tabOffset * 2, 2, 100, 200);
                    expect(context.drawImage.callCount).toEqual(4);



                    judgeCharFont(0, "正");
                    judgeCharFont(1, "\t");
                    judgeCharFont(2, "a");
                    judgeCharFont(3, "b");
                    judgeCharFont(4, "\t");
                    judgeCharFont(5, "c");
                    isCharFontNotExist(6);
                });
            });
        });

        describe("test x alignment", function(){
            it("center", function(){
                font.xAlignment = wd.EFontXAlignment.CENTER;
                font.text = "正1";
                setWidth(100 + 3 * 3);


                director._init();

                prepareAfterInit();

                director._loopBody(1);


                judgeDrawImage(0, 3.5, 2, 100, 200);
                judgeDrawImage(1, 6.5, 2, 100, 200);
            });
            it("right", function(){
                font.xAlignment = wd.EFontXAlignment.RIGHT;
                font.text = "正1";
                setWidth(100 + 3 * 3);

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1 + 5, 2, 100, 200);
                judgeDrawImage(1, 4 + 5, 2, 100, 200);
            });

            describe("ignore space char in the end of line", function(){
                it("test center x alignment", function(){
                    font.xAlignment = wd.EFontXAlignment.CENTER;
                    font.text = "正1     ";
                    setWidth(100 + 3 * 3);


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 3.5, 2, 100, 200);
                    judgeDrawImage(1, 6.5, 2, 100, 200);
                });
                it("test right x alignment", function(){
                    font.xAlignment = wd.EFontXAlignment.RIGHT;
                    font.text = "正1   ";
                    setWidth(100 + 3 * 3);


                    director._init();

                    prepareAfterInit();

                    director._loopBody(1);


                    judgeDrawImage(0, 1 + 5, 2, 100, 200);
                    judgeDrawImage(1, 4 + 5, 2, 100, 200);
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

        describe("test kerning", function(){
            var amount;

            beforeEach(function(){
                amount = 1;
                wd.LoaderManager.getInstance().get.withArgs(font.fntId).returns({
                    fontDefDictionary: {
                        1: charData
                    },
                    commonHeight:50,
                    commonBase:0,
                    kerningArray:[{
                        first:"1",
                        second:"1",
                        amount:amount
                    }]
                });
            });

            it("test", function () {
                font.text = "正ab";
                setWidth(1000);

                director._init();

                prepareAfterInit();

                director._loopBody(1);

                judgeDrawImage(0, 1, 2, 100, 200);
                judgeDrawImage(1, 4 + amount, 2, 100, 200);
                judgeDrawImage(2, 7 + amount * 2, 2, 100, 200);
            });
        });

        describe("if ui not change, not clear ui canvas and not render ui", function() {
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
                        charFontUIObject.name = "charFontUIObject";

                        var t = uiObject;

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
                        font.text = "正\na  d";
                        setWidth(100 + 3 * 10);

                        director._init();

                        prepareAfterInit();

                        addAction(2);

                        director._loopBody(1);


                        judgeDrawImage(0, 1, 2, 100, 200);
                        //judgeDrawImage(1, 3, 0, 0, 0);
                        judgeDrawImageUnderAction(1, 1 + 100, 52 + 200, 100 * 2, 200 * 3);
                        judgeDrawImage(2, 4, 52, 100, 200);
                        judgeDrawImage(3, 7, 52, 100, 200);
                        judgeDrawImage(4, 10, 52, 100, 200);
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
                    sandbox.spy(charFont, "render");

                    prepareAfterInit();


                    director._loopBody(2);

                    expect(charFont.render).toCalledOnce();
                    expect(charFont.dirty).toBeFalsy();
                });

                it("if uiObject transform change, char font dirty", function(){
                    director._loopBody(2);

                    expect(charFont.render).toCalledOnce();


                    charFontUIObject.transform.translate(2,3);

                    director._loopBody(3);

                    expect(charFont.render).toCalledTwice();
                    expect(charFont.dirty).toBeFalsy();


                    charFontUIObject.transform.scale = wd.Vector2.create(1,1);

                    director._loopBody(4);

                    expect(charFont.render.callCount).toEqual(3);




                    charFontUIObject.transform.rotate(10);

                    director._loopBody(5);

                    expect(charFont.render.callCount).toEqual(4);




                    director._loopBody(6);

                    expect(charFont.render.callCount).toEqual(4);
                });
                it("if width change, char font dirty", function(){
                    charFontUIObject.transform.width = 2000;

                    director._loopBody(3);

                    expect(charFont.render).toCalledTwice();



                    director._loopBody(4);

                    expect(charFont.render).toCalledTwice();
                });
                it("if height change, char font dirty", function(){
                    charFontUIObject.transform.height = 2000;

                    director._loopBody(3);

                    expect(charFont.render).toCalledTwice();



                    director._loopBody(4);

                    expect(charFont.render).toCalledTwice();
                });
            });

            describe("change data will cause dirty and render font", function(){
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

            it("if the new data equal old data, not dirty and not reformat text", function(){
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
                    font.xAlignment = wd.EFontXAlignment.LEFT;

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
                    font.xAlignment = wd.EFontXAlignment.RIGHT;

                    director._loopBody(2);

                    //judgeDrawImage(3, 991, 2, 100, 200);
                    //judgeDrawImage(4, 994, 2, 100, 200);
                    //judgeDrawImage(5, 997, 2, 100, 200);
                    judgeDrawImage(3, 991 - 97, 2, 100, 200);
                    judgeDrawImage(4, 994 - 97, 2, 100, 200);
                    judgeDrawImage(5, 997 - 97, 2, 100, 200);
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

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone data", function(){
                var text = "A",
                    xAlignment = wd.EFontXAlignment.CENTER,
                    fntId = "b",
                    bitmapId = "c";

                cloneTool.extend(font, {

                        text: text,
                        xAlignment: xAlignment,
                    fntId: fntId,
                    bitmapId: bitmapId
                });

                var result = font.clone();

                expect(result.text).toEqual(text);
               expect(result.xAlignment).toEqual(xAlignment);
                expect(result.fntId).toEqual(fntId);
                expect(result.bitmapId).toEqual(bitmapId);
        });
    });
});
