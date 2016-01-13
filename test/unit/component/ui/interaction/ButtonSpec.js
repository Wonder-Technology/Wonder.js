describe("Button", function() {
    var sandbox = null;
    var Button = null;
    var button;
    var uiObject;
    var director;
    var renderer;

    function setWidth(width) {
        uiObject.transform.width = width;
    }

    function setHeight(height) {
        uiObject.transform.height = height;
    }

    function createButton(buttonComponent, rendererComponent) {
        if(buttonComponent){
            button = buttonComponent;
        }
        else{
            button = wd.Button.create();
        }


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(button);


        if(rendererComponent){
            renderer = rendererComponent;
        }
        else{
            renderer = wd.UIRenderer.create();
        }


        uiObject.addComponent(renderer);


        return uiObject;
    }

    function createFont() {
        var font = wd.PlainFont.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(font);


        uiObject.addComponent(renderer);


        return uiObject;
    }


    function setPosition(x, y) {
        uiObject.transform.position = wd.Vector2.create(x, y);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        Button = wd.Button;

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width: 1000,
            height: 800
        });


        uiObject = createButton();



        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("text", function(){
        beforeEach(function(){
        });

        describe("get text", function(){
            it("if Button component isn't added to UiObject yet, return _text", function(){
                var button = Button.create();

                //default is "button"
                expect(button.text).toEqual("button");


                button.text = "bbb";

                expect(button.text).toEqual("bbb");
            });

            describe("else", function(){
                it("if has PlainText child UIObject, return its text", function(){
                    var fontObject = createFont();
                    fontObject.getComponent(wd.PlainFont).text = "aaa";
                    uiObject.addChild(fontObject);

                    expect(button.text).toEqual("aaa");
                });
                it("else, return null", function(){
                    expect(button.text).toBeNull();
                });
            });
        });

        describe("set text", function(){
            describe("if Button component isn't added to UiObject yet", function(){
                var button;

                beforeEach(function(){
                    button = Button.create();

                    button.text = "bbb";
                });

                it("just set _text and return", function(){
                    expect(button.text).toEqual("bbb");
                });
                it("defer to create PlainFont UIObject when init", function(){
                    var uiObject = createButton(button);

                    expect(uiObject.getChildren().getCount()).toEqual(0);

                    uiObject.init();

                    expect(uiObject.getChildren().getCount()).toEqual(1);
                    expect(uiObject.getChild(0).getComponent(wd.PlainFont).text).toEqual("bbb");
                });
            });

            describe("else", function(){
                it("if has PlainText child UIObject, set its text", function(){
                    var fontObject = createFont();
                    var font = fontObject.getComponent(wd.PlainFont);
                    uiObject.addChild(fontObject);

                    button.text = "ccc";

                    expect(font.text).toEqual("ccc");
                });

                describe("else", function(){
                    describe("create PlainFont UIObject and add it to Button UIObject", function(){
                        var font;
                        var fontObject;

                        beforeEach(function(){
                            setPosition(10, 20);
                            setWidth(100);
                            setHeight(50);

                            button.text = "ccc";

                            fontObject = uiObject.getChild(0);
                            font = fontObject.getComponent(wd.PlainFont);
                        });

                        it("set its text", function(){
                            expect(font.text).toEqual("ccc");
                        });
                        it("fillText text", function(){
                            expect(font._fillEnabled).toBeTruthy();
                            expect(font._fillStyle).toEqual("#000000");
                        });
                        it("text->alignment is center", function(){
                            expect(font.xAlignment).toEqual(wd.FontXAlignment.CENTER);
                            expect(font.yAlignment).toEqual(wd.FontYAlignment.MIDDLE);
                        });
                        it("text->draw position equal button->draw position", function(){
                            expect(testTool.getValues(fontObject.transform.position)).toEqual([10, 20]);
                        });
                        it("text->width/height equal button->width/height", function(){
                            expect(fontObject.transform.width).toEqual(100);
                            expect(fontObject.transform.height).toEqual(50);
                        });
                    });
                });
            });
        });
    });

    describe("getFontObject", function(){
        it("get PlainFont child UIObject", function(){
            button.text = "ccc";

            button.getFontObject().getComponent(wd.PlainFont).text = "aaa";

            expect(button.text).toEqual("aaa");
        });
    });

    describe("update", function(){
        beforeEach(function(){
            context = renderer.context;
        });

        it("if transition.target === null, return", function(){
            button.transition.target = null;

            button.init();
            button.update(1);

            expect(context.save).not.toCalled();
        });

        describe("else", function(){
            var target;

            beforeEach(function(){
                target = wd.ImageTextureAsset.create({});

                button.transitionMode = wd.TransitionMode.SPRITE;
                button.transition.normalSprite = target;
            });

            it("draw button", function(){
                var width = 100,
                    height = 50;
                var position = wd.Vector2.create(10, 20);
                setWidth(width);
                setHeight(height);
                setPosition(position.x, position.y);

                button.init();

                sandbox.stub(context, "drawImage");

                button.update(1);

                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage).toCalledWith(
                    target.source, position.x - width / 2, position.y - height / 2, width, height
                );
            });

            describe("test draw font", function(){
                beforeEach(function(){

                });

                it("if rotate Button UIObject when defer to create PlainFont UIObject, the Font UIObject should also be rotated", function(){
                    button.text = "ccc";
                    var uiObject = createButton(button, renderer);


                    uiObject.transform.rotate(10);


                    director.scene.addChild(uiObject);



                    director.initUIObjectScene();

                    sandbox.stub(context, "drawImage");
                    sandbox.stub(context, "setTransform");




                    var fontObject = button.getFontObject();
                    sandbox.stub(fontObject.getComponent(wd.PlainFont), "draw");

                    director.runUIObjectScene(1);


                    expect(context.setTransform).toCalledTwice();
                })
            });
        });

        it("test if disable, draw disable sprite", function(){
            target = wd.ImageTextureAsset.create({});

            button.transitionMode = wd.TransitionMode.SPRITE;
            button.transition.normalSprite = null;
            button.transition.disabledSprite = target;

            button.disable();


            button.init();

            sandbox.stub(context, "drawImage");

            button.update(1);

            expect(context.drawImage).toCalledOnce();
            expect(context.drawImage.firstCall.args[0]).toEqual(target.source);
        });
    });

    describe("enable", function(){
        beforeEach(function(){
            sandbox.stub(button.transition, "changeState");

            button.disable();
            button.enable();
        });

        it("change state to NORMAL", function(){
            expect(button.getCurrentState()).toEqual(wd.UIState.NORMAL);
        });
        it("change transition->state", function(){
            expect(button.transition.changeState.secondCall).toCalledWith(wd.UIState.NORMAL);
        });
    });

    describe("disable", function(){
        beforeEach(function(){
            sandbox.stub(button.transition, "changeState");

            button.disable();
        });

        it("change state to DISABLED", function(){
            expect(button.isDisabled()).toBeTruthy();
        });
        it("change transition->state", function(){
            expect(button.transition.changeState).toCalledWith(wd.UIState.DISABLED);
        });
    });
});
