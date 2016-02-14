describe("Button", function() {
    var sandbox = null;
    var Button = null;
    var button;
    var uiObject;
    var director;
    var renderer;
    var ObjectName = wd.EButtonObjectName;

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

        uiObject.name = ObjectName.TEXT;


        return uiObject;
    }


    function setPosition(x, y) {
        uiObject.transform.position = wd.Vector2.create(x, y);
    }

    function getImage(button){
        return button.getObject(ObjectName.BACKGROUND).getComponent(wd.Image);
    }

    function getFontObject(){
        return button.getObject(ObjectName.TEXT);
    }

    function getBackgroundObject(){
        return button.getObject(ObjectName.BACKGROUND);
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

                    expect(uiObject.getChildren().getCount()).toEqual(2);
                    expect(button.getObject(ObjectName.Text).getComponent(wd.PlainFont).text).toEqual("bbb");
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
                            expect(font.xAlignment).toEqual(wd.EFontXAlignment.CENTER);
                            expect(font.yAlignment).toEqual(wd.EFontYAlignment.MIDDLE);
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


            describe("change text will cause update", function(){
                beforeEach(function(){
                    sandbox.stub(button, "update");

                    director.scene.addChild(uiObject);
                });

                describe("test change text", function(){
                    beforeEach(function(){
                        button.text = "ccc";

                        director.initUIObjectScene();

                        director.runUIObjectScene();
                        director.runUIObjectScene();

                        expect(button.update).toCalledOnce();

                    });

                    it("if the new data equal old data, not dirty and not update text", function(){
                        button.text = "ccc";

                        director.runUIObjectScene();

                        expect(button.update).not.toCalledTwice();
                    });

                    it("else, cause update", function(){
                        button.text = "ddd";

                        director.runUIObjectScene();

                        expect(button.update).toCalledTwice();
                    });
                });
            });
        });
    });

    describe("getObject", function(){
        it("get PlainFont UIObject", function(){
            button.text = "ccc";

            button.getObject(ObjectName.TEXT).getComponent(wd.PlainFont).text = "aaa";

            expect(button.text).toEqual("aaa");
        });
        it("get Background UIObject", function(){
            uiObject.init();

            expect(button.getObject(ObjectName.BACKGROUND)).toBeInstanceOf(wd.UIObject);
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        describe("if not has Font Object", function(){
            beforeEach(function(){

            });

            describe("add font object", function(){
                describe("test font object", function(){
                    beforeEach(function(){

                    });

                    it("add and set PlainFont component", function(){
                        button.text = "a";

                        uiObject.init();

                        var font = getFontObject().getComponent(wd.PlainFont);
                        expect(font.text).toEqual("a");
                        expect(font._fillEnabled).toBeTruthy();
                        expect(font.xAlignment).toEqual(wd.EFontXAlignment.CENTER);
                        expect(font.yAlignment).toEqual(wd.EFontYAlignment.MIDDLE);
                    });
                    it("add the same UIRenderer of Button", function () {
                        uiObject.init();

                        expect(getFontObject().getComponent(wd.UIRenderer) === renderer).toBeTruthy();
                    });
                    it("width,height is equal UIObject.transform->width,height", function(){
                        setWidth(100);
                        setHeight(50);

                        uiObject.init();

                        expect(getFontObject().transform.width).toEqual(100);
                        expect(getFontObject().transform.height).toEqual(50);
                    });
                    it("name is TEXT", function(){
                        uiObject.init();

                        expect(getFontObject().name).toEqual(ObjectName.TEXT);
                    });
                    it("zIndex > Background->zIndex", function(){
                        uiObject.init();

                        expect(getFontObject().transform.zIndex > getBackgroundObject().transform.zIndex).toBeTruthy();
                    });
                });
            });
        });

        describe("add background object", function(){
            beforeEach(function(){
            });

            describe("test background object", function(){
                beforeEach(function(){

                });

                it("add Image component", function(){
                    uiObject.init();

                    expect(getBackgroundObject().hasComponent(wd.Image)).toBeTruthy();
                });
                it("add the same UIRenderer of Button", function () {
                    uiObject.init();

                    expect(getBackgroundObject().getComponent(wd.UIRenderer) === renderer).toBeTruthy();
                });
                it("width,height is equal UIObject.transform->width,height", function(){
                    setWidth(100);
                    setHeight(50);

                    uiObject.init();

                    expect(getBackgroundObject().transform.width).toEqual(100);
                    expect(getBackgroundObject().transform.height).toEqual(50);
                });
                it("name is BACKGROUND", function(){
                    uiObject.init();

                    expect(getBackgroundObject().name).toEqual(ObjectName.BACKGROUND);
                });
                it("zIndex < Font->zIndex", function(){
                    uiObject.init();

                    expect(getBackgroundObject().transform.zIndex < getFontObject().transform.zIndex).toBeTruthy();
                });
            });
        });

        describe("bind event", function(){
            var EventManager = wd.EventManager;
            var EngineEvent = wd.EngineEvent;
            var State = wd.EUIState;

            function trigger(engineEvent){
                EventManager.trigger(uiObject, wd.CustomEvent.create(engineEvent));
            }

            beforeEach(function(){
                button.init();
            });

            describe("bind mousedown event", function(){
                it("if disabled, return", function(){
                    button.disable();
                    trigger(EngineEvent.MOUSE_DOWN);

                    expect(button.currentState).toEqual(State.DISABLED);
                });
                it("else, change state to PRESSED", function () {
                    trigger(EngineEvent.MOUSE_DOWN);

                    expect(button.currentState).toEqual(State.PRESSED);
                });

            });

            describe("bind mouseup event", function(){
                it("if disabled, return", function(){
                    button.disable();
                    trigger(EngineEvent.MOUSE_UP);

                    expect(button.currentState).toEqual(State.DISABLED);
                });
                it("else, back state", function () {
                    trigger(EngineEvent.MOUSE_DOWN);
                    trigger(EngineEvent.MOUSE_UP);

                    expect(button.currentState).toEqual(State.NORMAL);
                });
            });

            describe("bind mouseover event", function(){
                it("if disabled, return", function(){
                    button.disable();
                    trigger(EngineEvent.MOUSE_OVER);

                    expect(button.currentState).toEqual(State.DISABLED);
                });
                it("else, change state to HIGHLIGHT", function () {
                    trigger(EngineEvent.MOUSE_OVER);

                    expect(button.currentState).toEqual(State.HIGHLIGHT);
                });
            });

            describe("bind mousedown event", function(){
                it("if disabled, return", function(){
                    button.disable();
                    trigger(EngineEvent.MOUSE_OVER);

                    expect(button.currentState).toEqual(State.DISABLED);
                });
                it("else, change state to PRESSED", function () {
                    trigger(EngineEvent.MOUSE_OVER);
                    trigger(EngineEvent.MOUSE_OUT);

                    expect(button.currentState).toEqual(State.NORMAL);
                });
            });
        })
    });

    describe("dispose", function(){
        var EventManager = wd.EventManager;
        var EngineEvent = wd.EngineEvent;
        var State = wd.EUIState;

        function trigger(engineEvent){
            EventManager.trigger(uiObject, wd.CustomEvent.create(engineEvent));
        }
        
        beforeEach(function(){
            button.init();
        });
        
        describe("off event", function(){
            beforeEach(function(){
                sandbox.stub(button._stateMachine, "changeState");
                sandbox.stub(button._stateMachine, "backState");

                button.dispose();
            });
            
            it("off mousedown event", function(){
                trigger(EngineEvent.MOUSE_DOWN);

                expect(button._stateMachine.changeState).not.toCalled();
            });
            it("off mouseup event", function(){
                trigger(EngineEvent.MOUSE_UP);

                expect(button._stateMachine.backState).not.toCalled();
            });
            it("off mouseover event", function(){
                trigger(EngineEvent.MOUSE_OVER);

                expect(button._stateMachine.changeState).not.toCalled();
            });
            it("off mouseout event", function(){
                trigger(EngineEvent.MOUSE_OUT);

                expect(button._stateMachine.backState).not.toCalled();
            });
        });
    });

    describe("update", function(){
        beforeEach(function(){
            renderer.context = canvasTool.buildFakeContext(sandbox);

            context = renderer.context;
        });

        describe("if transition mode === SPRITE", function(){
            var source;
            var target;

            function judge(drawSource){
                var width = 100,
                    height = 50;
                var position = wd.Vector2.create(10, 20);
                setWidth(width);
                setHeight(height);
                setPosition(position.x, position.y);

                director.scene.addChild(uiObject);


                director.initUIObjectScene();

                getImage(button).source = source;

                director.runUIObjectScene(1);



                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage).toCalledWith(
                    drawSource, position.x - width / 2, position.y - height / 2, width, height
                );

            }

            beforeEach(function(){
                source = wd.ImageTextureAsset.create({});
                target = wd.ImageTextureAsset.create({a:1});

                button.transitionMode = wd.ETransitionMode.SPRITE;
            });

            describe("if background transition->target === null,", function(){
                beforeEach(function(){
                    button.getObjectTransition(ObjectName.BACKGROUND).normalSprite = null;
                });

                it("draw background->Image->source", function () {
                    judge(source.source);
                });

                it("fix bug:if background transition->normalSprite === null, then: 1.draw;" +
                    "2.change state to HIGHTLIGHT and draw;" +
                    "3.back state to NORMAL and draw;" +
                    "the third draw source should equal the first draw source", function() {
                    button.getObjectTransition(ObjectName.BACKGROUND).highlightSprite = target;

                    director.scene.addChild(uiObject);





                    director.initUIObjectScene();

                    getImage(button).source = source;

                    director.runUIObjectScene(1);


                    button._stateMachine.changeState(wd.EUIState.HIGHLIGHT);

                    director.runUIObjectScene(2);


                    button._stateMachine.backState();

                    director.runUIObjectScene(2);





                    expect(context.drawImage.callCount).toEqual(3);
                    expect(context.drawImage.firstCall.args[0]).toEqual(source.source);
                    expect(context.drawImage.getCall(1).args[0]).toEqual(target.source);
                    expect(context.drawImage.getCall(2).args[0]).toEqual(source.source);
                });
            });
            it("else, draw background transition->target", function(){
                button.getObjectTransition(ObjectName.BACKGROUND).normalSprite = target;

                judge(target.source);
            });

            it("test if disable, draw disable sprite", function(){
               var backgroundTransition = button.getObjectTransition(ObjectName.BACKGROUND);
                backgroundTransition.normalSprite = null;
                backgroundTransition.disabledSprite = target;

                button.disable();




                director.scene.addChild(uiObject);

                director.initUIObjectScene();

                director.runUIObjectScene(1);



                expect(context.drawImage).toCalledOnce();
                expect(context.drawImage.firstCall.args[0]).toEqual(target.source);
            });
        });

        describe("if transition mode === COLOR", function(){
            var source;
            var color;
            var target;

            function judge(drawColor){
                var width = 100,
                    height = 50;
                var position = wd.Vector2.create(10, 20);
                setWidth(width);
                setHeight(height);
                setPosition(position.x, position.y);

                director.scene.addChild(uiObject);


                director.initUIObjectScene();



                sandbox.stub(getImage(button), "_setFillStyle");

                getImage(button).color = color;

                director.runUIObjectScene(1);



                expect(context.fillRect).toCalledOnce();
                expect(getImage(button)._setFillStyle).toCalledWith(drawColor.toString());
            }

            beforeEach(function(){
                source = wd.ImageTextureAsset.create({});
                color = wd.Color.create("rgb(1.0, 0.1, 0.0)");
                target = wd.Color.create("rgb(0.0, 0.0, 1.0)");

                button.transitionMode = wd.ETransitionMode.COLOR;
            });

            describe("if background transition->target === null,", function(){
                beforeEach(function(){
                    button.getObjectTransition(ObjectName.BACKGROUND).normalColor = null;
                });

                it("fillRect background->Image->color", function () {
                    judge(color);
                });

                it("fix bug:if background transition->normalColor === null, then: 1.fillRect;" +
                    "2.change state to HIGHTLIGHT and fillRect;" +
                    "3.back state to NORMAL and fillRect;" +
                    "the third fillStyle should equal the first fillStyle", function() {
                    button.getObjectTransition(ObjectName.BACKGROUND).highlightColor = target;

                    director.scene.addChild(uiObject);





                    director.initUIObjectScene();

                    sandbox.stub(getImage(button), "_setFillStyle");

                    getImage(button).color = color;


                    director.runUIObjectScene(1);


                    button._stateMachine.changeState(wd.EUIState.HIGHLIGHT);

                    director.runUIObjectScene(2);


                    button._stateMachine.backState();

                    director.runUIObjectScene(2);




                    expect(getImage(button)._setFillStyle.callCount).toEqual(3);
                    expect(getImage(button)._setFillStyle.firstCall.args[0]).toEqual(color.toString());
                    expect(getImage(button)._setFillStyle.getCall(1).args[0]).toEqual(target.toString());
                    expect(getImage(button)._setFillStyle.getCall(2).args[0]).toEqual(color.toString());
                });
            });

            it("else, fillRect background transition->target", function(){
                button.getObjectTransition(ObjectName.BACKGROUND).normalColor = target;

                judge(target.toString());
            });
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




                var fontObject = button.getObject(ObjectName.TEXT);
                sandbox.stub(fontObject.getComponent(wd.PlainFont), "draw");

                director.runUIObjectScene(1);


                expect(context.setTransform).toCalledOnce();
            })
        });
    });

    describe("enable", function(){
        beforeEach(function(){
            sandbox.stub(button.transitionManager, "changeState");

            button.disable();
            button.enable();
        });

        it("change state to NORMAL", function(){
            expect(button.currentState).toEqual(wd.EUIState.NORMAL);
        });
        it("change transition->state", function(){
            expect(button.transitionManager.changeState.secondCall).toCalledWith(wd.EUIState.NORMAL);
        });
    });

    describe("disable", function(){
        beforeEach(function(){
            sandbox.stub(button.transitionManager, "changeState");

            button.disable();
        });

        it("change state to DISABLED", function(){
            expect(button.isDisabled).toBeTruthy();
        });
        it("change transition->state", function(){
            expect(button.transitionManager.changeState).toCalledWith(wd.EUIState.DISABLED);
        });
    });
});
