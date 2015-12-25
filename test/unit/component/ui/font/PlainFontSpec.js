describe("PlainFont", function () {
    var sandbox = null;
    var Font = null;
    var font;

    function setDimensions(width, height) {
        font.width = width;
        font.height = height || 0;
    }

    function createFont() {
        font = Font.create();

        font.gameObject = {};


        sandbox.stub(font, "getContext");


        return font;
    }

    function setPosition(x, y){
        font.gameObject.transform = {
            position: wd.Vector3.create(x, y, 0)
        }
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
        });

        describe("format text, ensure it don't exceed the dimension", function () {
            beforeEach(function () {
                font.fontSize = 50;
                font.fontFamily = "sans-serif";


                setFakeContext({
                    measureText: function (str) {
                        return {
                            width: str.length * font.fontSize
                        }
                    }
                });
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

            it("if set width/height to be auto, it can equal view.width/height", function(){
                sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    width: 1000,
                    height: 800
                })
                font.text = "阿斯";
                setDimensions(wd.FontDimension.AUTO, wd.FontDimension.AUTO);

                font.init();

                expect(font.width).toEqual(1000);
                expect(font.height).toEqual(800);
            });
        });


        describe("set default lineHeight", function () {
            function setDefaultLineHeight57() {
                font.fontSize = 57;
                font.fontFamily = "sans-serif";
            }

            it("default lineHeight is equal to fontSize", function () {
                setDefaultLineHeight57();

                font.init();

                expect(font._lineHeight).toEqual(57);
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

        describe("if text if multi lines", function(){
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
                    expect(context.fillText.firstCall).toCalledWith("测试", 500, 400);
                    expect(context.fillText.secondCall).toCalledWith("12 34", 500, 400 + font._lineHeight);
                    expect(context.fillText.thirdCall).toCalledWith("hello", 500, 400 + font._lineHeight + 60);
                });
                it("if use stroke to draw, use strokeText", function(){
                    var strokeStyle = "rgba(10,10,10,1)";
                    font.enableStroke(strokeStyle);

                    font.update(1);

                    expect(context.strokeStyle).toEqual(strokeStyle);
                    expect(context.strokeText).toCalledThrice();
                    expect(context.strokeText.firstCall).toCalledWith("测试", 500, 400);
                    expect(context.strokeText.secondCall).toCalledWith("12 34", 500, 400 + font._lineHeight);
                    expect(context.strokeText.thirdCall).toCalledWith("hello", 500, 400 + font._lineHeight + 60);
                });
            });

            describe("if alignment is CENTER-BOTTOM", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.FontXAlignment.CENTER;
                    font.yAlignment = wd.FontYAlignment.BOTTOM;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledThrice();
                    expect(context.fillText.firstCall).toCalledWith("测试", 700, 630);
                    expect(context.fillText.secondCall).toCalledWith("12 34", 625, 690);
                    expect(context.fillText.thirdCall).toCalledWith("hello", 625, 750);
                });
            });

            describe("if alignment is RIGHT-MIDDLE", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.FontXAlignment.RIGHT;
                    font.yAlignment = wd.FontYAlignment.MIDDLE;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledThrice();
                    expect(context.fillText.firstCall).toCalledWith("测试", 900, 515);
                    expect(context.fillText.secondCall).toCalledWith("12 34", 750, 575);
                    expect(context.fillText.thirdCall).toCalledWith("hello", 750, 635);
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
                    expect(context.fillText).toCalledWith("hi 1;", 500, 400);
                });
                it("if use stroke to draw, use strokeText", function(){
                    var strokeStyle = "rgba(10,10,10,1)";
                    font.enableStroke(strokeStyle);

                    font.update(1);

                    expect(context.strokeStyle).toEqual(strokeStyle);
                    expect(context.strokeText).toCalledWith("hi 1;", 500, 400);
                });
            });

            describe("if alignment is CENTER-BOTTOM", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.FontXAlignment.CENTER;
                    font.yAlignment = wd.FontYAlignment.BOTTOM;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledWith("hi 1;", 625, 750);
                });
            });

            describe("if alignment is RIGHT-MIDDLE", function(){
                it("test use fill to draw", function(){
                    var fillStyle = "rgba(10,10,10,1)";
                    font.enableFill(fillStyle);
                    font.xAlignment = wd.FontXAlignment.RIGHT;
                    font.yAlignment = wd.FontYAlignment.MIDDLE;

                    font.update(1);

                    expect(context.fillStyle).toEqual(fillStyle);
                    expect(context.fillText).toCalledWith("hi 1;", 750, 575);
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
            expect(context.fillText.firstCall).toCalledWith("测试", 600, 300);
            expect(context.fillText.secondCall).toCalledWith("12 34", 600, font._lineHeight - 100 + 400);
            expect(context.fillText.thirdCall).toCalledWith("hello", 600, font._lineHeight + 60 - 100 + 400);
        });

        it("restore context", function(){
            font.update(1);

            expect(context.restore).toCalledOnce();
            expect(context.restore).toCalledAfter(context.save);
        });


        describe("change data will cause dirty and update font", function(){
            beforeEach(function(){
                sandbox.stub(font, "updateWhenDirty");

                font.update();

                expect(font.updateWhenDirty).not.toCalled();
            });

            it("if the new data equal old data, not dirty and not update text", function(){
                font.text = "a";

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();

                font.text = "a";

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();

            });
            it("update when change text", function(){
                font.text = "a";

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change fontSize", function(){
                font.fontSize = 100;

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change fontFamily", function(){
                font.fontFamily = "aaa";

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change width", function(){
                font.width = 100;

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change height", function(){
                font.height = 100;

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change xAlignment", function(){
                sandbox.stub(font.context, "measureText", function () {
                    return {
                        width: 0
                    }
                });
                font.xAlignment = wd.FontXAlignment.RIGHT;

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
            it("update when change yAlignment", function(){
                font.yAlignment = wd.FontYAlignment.MIDDLE;

                font.update();

                expect(font.updateWhenDirty).toCalledOnce();
            });
        });
    });
});
