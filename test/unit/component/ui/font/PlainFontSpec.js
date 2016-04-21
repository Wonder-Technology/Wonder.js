describe("PlainFont", function () {
    var sandbox = null;
    var Font = null;
    var font;

    function setDimensions(width, height) {
        setWidth(width);
        setHeight(height);
    }

    function setWidth(width){
        font.entityObject.transform.width = width;
        font.dirty = true;
    }

    function setHeight(height){
        font.entityObject.transform.height = height || 0;
        font.dirty = true;
    }

    function createFont() {
        font = Font.create();

        font.entityObject = wd.UIObject.create();
        //font.entityObject.transform = {};
        //font.entityObject.transform = {};

        sandbox.stub(font, "getContext");


        return font;
    }

    function setPosition(x, y){
        font.entityObject.transform.position = wd.Vector2.create(x, y);
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Font = wd.PlainFont;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function () {
        function setFakeContext(fakeContext) {
            font.getContext.returns(fakeContext);
        }

        beforeEach(function () {
            font = createFont();


            setFakeContext({
                measureText: function (str) {
                    return {
                        width: str.length * font.fontSize
                    }
                }
            });
        });

        describe("format text, ensure it don't exceed the dimension", function () {
            beforeEach(function () {
                font.fontSize = 50;
                font.fontFamily = "sans-serif";
            });

            it("test text not exceed the dimension", function () {
                font.text = "阿斯";
                setDimensions(200, 0);

                font.init();

                expect(font._strArr).toEqual(["阿斯"]);
            });

            describe("test font.exceed the dimension", function () {
                it("test dimension->width < width of single char", function () {
                    font.text = "阿斯";
                    setDimensions(20, 0);

                    font.init(parent);

                    expect(font._strArr).toEqual(["阿", "斯"]);
                });

                it("test text is all chinese", function () {
                    font.text = "啊是的规范";
                    setDimensions(100, 0);

                    font.init(parent);

                    expect(font._strArr).toEqual(["啊是", "的规", "范"]);
                });

                describe("test text has newline char", function () {
                    beforeEach(function () {
                        setDimensions(150, 0);
                    });

                    it("test1", function () {
                        font.text = "啊是的\n范\n在想个好";

                        font.init(parent);

                        expect(font._strArr).toEqual(["啊是的", "范", "在想个", "好"]);
                    });

                    it("test2", function () {
                        font.text = "啊1\n范\n在wod";

                        font.init(parent);

                        expect(font._strArr).toEqual(["啊1", "范", "在", "wod"]);
                    });

                    it("test3", function () {
                        font.text = "啊1\n范\n在word";

                        font.init(parent);

                        expect(font._strArr).toEqual(["啊1", "范", "在", "w", "ord"]);
                    });

                    it("test4", function () {
                        font.text = "1234asdf\ng\nww";

                        font.init(parent);

                        expect(font._strArr).toEqual(["1", "2", "3", "4", "a", "sdf", "g", "ww"]);
                    });
                });

                describe("test text has space char", function () {
                    beforeEach(function () {
                        setDimensions(150, 0);
                    });

                    it("test1", function () {
                        font.text = "啊 ok is your 在想个     好";

                        font.init(parent);

                        expect(font._strArr).toEqual(['啊 ', 'ok ', 'is ', 'y', 'our', ' 在想', '个  ', '   ', '好']);
                    });
                });

                describe("test text has newline and space char", function () {
                    beforeEach(function () {
                        setDimensions(150, 0);
                    });

                    it("test1", function () {
                        font.text = "啊 ok is\n\n\n your 想要10个吗\n\n     好";

                        font.init(parent);

                        expect(font._strArr).toEqual(['啊 ', 'ok ', 'is', '', '', ' ', 'y', 'our', ' 想要', '10个', '吗', '', '   ', '  好']);
                    });
                });

                describe("test text has punctuation", function () {
                    beforeEach(function () {
                        setDimensions(150, 0);
                    });

                    it("test1", function () {
                        font.text = ";啊 ok you, hello\n\n your 想要10个吗？， 。  ；啊啊！!\n\n  好";

                        font.init(parent);

                        expect(font._strArr).toEqual([';啊 ', 'ok ', 'you', ', ', 'h', 'e', 'llo', '', ' ', 'y', 'our', ' 想要', '10个', '吗？，', ' 。 ', ' ；啊', '啊！!', '', '  好']);
                    });
                });

                describe("remove newline,space char in the end", function () {
                    beforeEach(function () {
                        setDimensions(150, 0);
                    });

                    it("remove newline char in the end", function () {
                        font.text = "1234asdf\ng\nww\n";

                        font.init(parent);

                        expect(font._strArr).toEqual(["1", "2", "3", "4", "a", "sdf", "g", "ww"]);
                    });

                    it("remove space char in the end", function () {
                        font.text = "1234asdf\ng\nww   ";

                        font.init(parent);

                        expect(font._strArr).toEqual(["1", "2", "3", "4", "a", "sdf", "g", "ww"]);
                    });

                    it("remove newline,space char in the end", function () {
                        font.text = "1234asdf\ng\nww \n\n  ";

                        font.init(parent);

                        expect(font._strArr).toEqual(["1", "2", "3", "4", "a", "sdf", "g", "ww"]);
                    });
                });
            });

            //it("if set width/height to be auto, it can equal view.width/height", function(){
            //    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            //        width: 1000,
            //        height: 800
            //    })
            //    font.text = "阿斯";
            //    setDimensions(wd.EFontDimension.AUTO, wd.EFontDimension.AUTO);
            //
            //    font.init();
            //
            //    expect(font.width).toEqual(1000);
            //    expect(font.height).toEqual(800);
            //});
        });


        describe("set default lineHeight", function () {
            function setDefaultLineHeight57() {
                font.fontSize = 57;
                font.fontFamily = "sans-serif";
            }

            it("default lineHeight is equal to fontSize", function () {
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                setDefaultLineHeight57();

                font.init();

                /*!
                in different browsers, the default lineHeight may be different.
                 */

                expect(font._lineHeight > 55).toBeTruthy();
                expect(font._lineHeight < 60).toBeTruthy();
            });
        });
    });

    describe("update", function () {
        var context;

        function setFakeContext(fakeContext) {
            font.context = fakeContext;
        }

        beforeEach(function () {
            font = createFont();

            setFakeContext({
                save: sandbox.stub(),
                setTransform: sandbox.stub(),
                restore: sandbox.stub(),
                measureText: function (str) {
                    return {
                        width: str.length * font.fontSize
                    }
                },
                fillText: sandbox.stub(),
                strokeText: sandbox.stub()
            });

            context = font.context;



            sandbox.stub(font._fontClientHeightCache, "getChild");
            sandbox.stub(font._fontClientHeightCache, "addChild");

            setPosition(0, 0);

            font.setLineHeight(60);
            font.fontSize = 50;
            font.fontFamily = "sans-serif";

            setDimensions(500, 400);


            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                width: 1000,
                height: 800
            })
        });

        it("save context", function () {
            font.update(1);

            expect(context.save).toCalledOnce();
        });
        it("if isRotate, set context transform to be rotationMatrix", function(){
            font.entityObject.transform.rotate(45);
            var rotationMatrix = font.entityObject.transform.rotationMatrix;

            font.update(-1);

            expect(context.setTransform).toCalledWith(rotationMatrix.a, rotationMatrix.b, rotationMatrix.c, rotationMatrix.d, rotationMatrix.tx, rotationMatrix.ty);
        });
        it("set context.font", function(){
            font.fontSize = 10;
            font.fontFamily = "微软雅黑";

            font.update(1);

            expect(context.font).toEqual("10px '微软雅黑'");
        });

        describe("set context alignment", function(){
            it("set y alignment to be top", function(){
                font.update(1);

                expect(context.textBaseline).toEqual("top");
            });

            it("set x alignment to be start", function(){
                font.update(1);

                expect(context.textAlign).toEqual("start");
            });
        });

        describe("if text is multi lines", function(){
            beforeEach(function(){
                font._strArr = ["测试", "12 34", "hello"];
            });

            describe("if alignment is LEFT-TOP", function(){
                it("if use fill to draw, use fillText", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledThrice();
                    expect(context.fillText.firstCall).toCalledWith("测试", -250, -200);
                    expect(context.fillText.secondCall).toCalledWith("12 34", -250, -200 + font._lineHeight);
                    expect(context.fillText.thirdCall).toCalledWith("hello", -250, -200 + font._lineHeight + 60);
                });
                it("if use stroke to draw, use strokeText", function(){
                    var strokeStyle = "rgba(10,10,10,1)";
                    font.enableStroke(strokeStyle);

                    font.update(1);

                    expect(context.strokeStyle).toEqual(strokeStyle);
                    expect(context.strokeText).toCalledThrice();
                    expect(context.strokeText.firstCall).toCalledWith("测试", -250, -200);
                    expect(context.strokeText.secondCall).toCalledWith("12 34", -250, -200 + font._lineHeight);
                    expect(context.strokeText.thirdCall).toCalledWith("hello", -250, -200 + font._lineHeight + 60);
                });
            });

            describe("if alignment is CENTER-BOTTOM", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.EFontXAlignment.CENTER;
                    font.yAlignment = wd.EFontYAlignment.BOTTOM;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledThrice();
                    expect(context.fillText.firstCall).toCalledWith("测试", -50, 30);
                    expect(context.fillText.secondCall).toCalledWith("12 34", -125, 90);
                    expect(context.fillText.thirdCall).toCalledWith("hello", -125, 150);
                });
            });

            describe("if alignment is RIGHT-MIDDLE", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.EFontXAlignment.RIGHT;
                    font.yAlignment = wd.EFontYAlignment.MIDDLE;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledThrice();
                    expect(context.fillText.firstCall).toCalledWith("测试", 150, -85);
                    expect(context.fillText.secondCall).toCalledWith("12 34", 0, -25);
                    expect(context.fillText.thirdCall).toCalledWith("hello", 0, 35);
                });
            });
        });

        describe("else", function(){
            beforeEach(function(){
                font._strArr = ["hi 1;"];
            });

            describe("if alignment is LEFT-TOP", function(){
                it("if use fill to draw, use fillText", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledWith("hi 1;", -250, -200);
                });
                it("if use stroke to draw, use strokeText", function(){
                    var strokeStyle = "rgba(10,10,10,1)";
                    font.enableStroke(strokeStyle);

                    font.update(1);

                    expect(context.strokeStyle).toEqual(strokeStyle);
                    expect(context.strokeText).toCalledWith("hi 1;", -250, -200);
                });
            });

            describe("if alignment is CENTER-BOTTOM", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.EFontXAlignment.CENTER;
                    font.yAlignment = wd.EFontYAlignment.BOTTOM;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledWith("hi 1;", -125, 150);
                });
            });

            describe("if alignment is RIGHT-MIDDLE", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.EFontXAlignment.RIGHT;
                    font.yAlignment = wd.EFontYAlignment.MIDDLE;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledWith("hi 1;", 0, -25);
                });
            });
        });

        it("test set position", function(){
            setPosition(100, 100);
            font._strArr = ["测试", "12 34", "hello"];

            var fillStyle = "rgba(10,10,10,1)";
            font.enableFill(fillStyle);

            font.update(1);

            expect(context.fillStyle).toEqual(fillStyle);
            expect(context.fillText).toCalledThrice();
            expect(context.fillText.firstCall).toCalledWith("测试", -150, -100);
            expect(context.fillText.secondCall).toCalledWith("12 34", -150, -40);
            expect(context.fillText.thirdCall).toCalledWith("hello", -150, 20);
        });

        it("restore context", function(){
            font.update(1);

            expect(context.restore).toCalledOnce();
            expect(context.restore).toCalledAfter(context.save);
        });
    });


    describe("change data will cause dirty and reformat font", function(){
        function setFakeContext(fakeContext) {
            font.getContext.returns(fakeContext);
        }

        beforeEach(function(){
            font = createFont();

            font.fontSize = 50;
            font.fontFamily = "sans-serif";


            context = {
                save: sandbox.stub(),
                restore: sandbox.stub(),
                measureText: function (str) {
                    return {
                        width: str.length * font.fontSize
                    }
                },
                fillText: sandbox.stub(),
                strokeText: sandbox.stub(),
                setTransform: sandbox.stub()
            }

            setFakeContext(context);


            setPosition(0, 0);

            setDimensions(500, 400);


            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                width: 1000,
                height: 800
            })

            font.init();
        });

        it("if the new data equal old data, not dirty and not update text", function(){
            sandbox.stub(font, "reFormat");

            font.update();

            expect(font.reFormat).not.toCalled();

            font.text = "a";

            font.update();

            expect(font.reFormat).toCalledOnce();

            font.text = "a";

            font.update();

            expect(font.reFormat).toCalledOnce();

        });

        describe("else", function(){
            beforeEach(function(){
                font.text = "阿斯";

                font.update();
            });

            it("formatText when change text", function(){
                font.text = "a";

                font.update();

                expect(context.fillText.secondCall).toCalledWith("a", -250, -200);
            });
            it("formatText and update line height change fontSize", function(){
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                font.text = "a\nb";
                font.fontSize = 200;

                font.update();

                expect(context.fillText.secondCall).toCalledWith("a", -250, -200);
                expect(context.font).toEqual("200px '" + font.fontFamily + "'");

                expect(font._lineHeight).toEqual(200);
                expect(context.fillText.getCall(2)).toCalledWith("b", -250, 0);
            });
            it("formatText and update line height change fontFamily", function(){
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                font.fontFamily = "aaa";

                font.update();

                expect(context.font).toEqual("50px 'aaa'");
                //lineHeight should be affected by the fontFamily, but here it can't test(the lineHeight will not change here)
                expect(font._lineHeight).toEqual(50);
            });
            it("formatText when change width", function(){
                setWidth(2);
                font.xAlignment = wd.EFontXAlignment.LEFT;

                font.update();

                expect(context.fillText.secondCall).toCalledWith("阿", -1, -200);


                if(bowser.firefox){
                }
                else{
                    expect(context.fillText.getCall(2)).toCalledWith("斯", -1, -150);
                }
            });
            it("formatText when change height", function(){
                setHeight(100);
                font.yAlignment = wd.EFontYAlignment.BOTTOM;

                font.update();

                expect(context.fillText.secondCall).toCalledWith("阿斯", -250, 0);
            });
            it("formatText change xAlignment", function(){
                font.xAlignment = wd.EFontXAlignment.RIGHT;

                font.update();

                expect(context.fillText.secondCall).toCalledWith("阿斯", 150, -200);
            });
            it("formatText change yAlignment", function(){
                font.yAlignment = wd.EFontYAlignment.MIDDLE;

                font.update();

                expect(context.fillText.secondCall).toCalledWith("阿斯", -250, -25);
            });
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var text = "A",
                fontSize = 10,
                fontFamily = "b",
                xAlignment = wd.EFontXAlignment.CENTER,
                yAlignment = wd.EFontYAlignment.MIDDLE,
                fillEnabled = false,
                fillStyle = "rgba(0.1, 0, 0, 1)",
                strokeEnabled = true,
                strokeStyle = "rgba(0.2,0,0,1)",
                strokeSize = 10,
                lineHeight = 50;


            cloneTool.extend(font, {
                text: text,
                fontSize: fontSize,
                fontFamily: fontFamily,
                xAlignment: xAlignment,
                yAlignment: yAlignment,
                _fillEnabled: fillEnabled,
                _fillStyle: fillStyle,
                _strokeEnabled: strokeEnabled,
                _strokeStyle: strokeStyle,
                _strokeSize: strokeSize,
                _lineHeight: lineHeight
            });

            var result = font.clone();

            expect(result.text).toEqual(text);
            expect(result.fontSize).toEqual(fontSize);
            expect(result.fontFamily).toEqual(fontFamily);
            expect(result.xAlignment).toEqual(xAlignment);
            expect(result.yAlignment).toEqual(yAlignment);
            expect(result._fillEnabled).toEqual(fillEnabled);
            expect(result._fillStyle).toEqual(fillStyle);
            expect(result._strokeEnabled).toEqual(strokeEnabled);
            expect(result._strokeStyle).toEqual(strokeStyle);
            expect(result._strokeSize).toEqual(strokeSize);
            expect(result._lineHeight).toEqual(lineHeight);
        });
    });
});
