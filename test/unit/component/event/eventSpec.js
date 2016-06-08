describe("event component", function () {
    var sandbox = null;
    var director;
    var manager;
    var view;

    var Event = (function () {
        function Event(entityObject) {
        }
        Event.prototype.onMouseClick = function (e) {
        };
        Event.prototype.onMouseOver = function (e) {
        };
        Event.prototype.onMouseOut = function (e) {
        };
        Event.prototype.onMouseMove = function (e) {
        };
        Event.prototype.onMouseDown = function (e) {
        };
        Event.prototype.onMouseUp = function (e) {
        };
        Event.prototype.onMouseWheel = function (e) {
        };
        Event.prototype.onMouseDrag = function (e) {
        };
        return Event;
    }());

    function testScript(gameObject, eventName, judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        scriptTool.testScriptNotLoadScript(gameObject, {
            scriptName: eventName,
            class: Event,
            judgeOnEnter: judgeOnEnter,
            judgeBeforeLoopBody: judgeBeforeLoopBody,
            judgeAfterLoopBody: judgeAfterLoopBody
        }, done);
    }

    function testSceneScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody){
        scriptTool.testScriptNotLoadScript(director.scene, {
            scriptName: "event",
            class: Event,
            judgeOnEnter: judgeOnEnter,
            judgeBeforeLoopBody: judgeBeforeLoopBody,
            judgeAfterLoopBody: judgeAfterLoopBody
        });
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500,

            offset:{
                x:0,
                y:0
            }
        });


        view = wd.DeviceManager.getInstance().view;

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        manager = wd.EventManager;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        $("canvas").remove();

        sandbox.restore();
    });

    describe("integration test", function(){
        var fakeEvent;
        var url = null;

        function createGameObject(){
            return eventScriptTool.createGameObject(url);
        }

        function createUIObject(renderer){
            var bar = wd.ProgressBar.create();


            var barUIObject = wd.UIObject.create();

            barUIObject.addComponent(bar);

            var eventTriggerDetector = wd.UIEventTriggerDetector.create();

            barUIObject.addComponent(eventTriggerDetector);



            barUIObject.addComponent(wd.Script.create(url));




            barUIObject.addComponent(renderer);

            return barUIObject;
        }

        function createUIRenderer(){
            var renderer = wd.UIRenderer.create();

            return renderer;
        }

        beforeEach(function(){
            url = "http://" + location.host + "/" + testTool.resPath + "test/res/script/event.js";
        });

        describe("trigger order should be bubble up to scene(include scene)", function() {
            beforeEach(function () {

            });

            describe("test trigger GameObject and scene mouse event", function () {
                beforeEach(function(){

                });

                it("it will trigger the top one, then bubble up", function(){
                    var gameObject1 = createGameObject();


                    var gameObject2 = createGameObject();


                    gameObject1.addChild(gameObject2);

                    director.scene.addChild(gameObject1);





                    director.scene.addChild(testTool.createCamera());

                    director.scene.currentCamera.position = wd.Vector3.create(0, 0, 20);
                    fakeEvent = {
                        pageX: view.width / 2,
                        pageY: view.height / 2
                    };

                    gameObject1.transform.position = wd.Vector3.create(0, 0, 1);
                    gameObject2.transform.position = wd.Vector3.create(0, 0, 2);











                    var engineEvent = wd.EEngineEvent.MOUSE_CLICK;
                    var eventName = wd.EEventName.CLICK;


                    var sceneHandler = sandbox.stub();
                    var gameObject1Handler = sandbox.stub();
                    var gameObject2Handler = sandbox.stub();
                    var sceneEvent,gameObject1Event,gameObject2Event;

                    wd.EventManager.on(director.scene, engineEvent, function(e){
                        sceneEvent = e;
                        sceneHandler();
                    });
                    wd.EventManager.on(gameObject1, engineEvent, function(e){
                        gameObject1Event = e;
                        gameObject1Handler();
                    });
                    wd.EventManager.on(gameObject2, engineEvent, function(e){
                        gameObject2Event = e;
                        gameObject2Handler();
                    });


                    director._init();



                    manager.trigger(wd.MouseEvent.create(fakeEvent, eventName));



                    expect(sceneHandler).toCalledOnce();
                    expect(gameObject1Handler).toCalledOnce();
                    expect(gameObject2Handler).toCalledOnce();


                    expect(gameObject2Handler).toCalledBefore(gameObject1Handler);
                    expect(gameObject1Handler).toCalledBefore(sceneHandler);

                    //todo pass all unit test(Arc, customEventSpec)
                    expect(sceneEvent.target).toEqual(gameObject2);
                    expect(sceneEvent.currentTarget).toEqual(director.scene);
                    expect(gameObject1Event.target).toEqual(gameObject2);
                    expect(gameObject1Event.currentTarget).toEqual(gameObject1);
                    expect(gameObject2Event.target).toEqual(gameObject2);
                    expect(gameObject2Event.currentTarget).toEqual(gameObject2);
                });
            });

            describe("test trigger UIObject and scene mouse event", function () {
                it("it will trigger the top one, then bubble up", function() {
                    var renderer = createUIRenderer();


                    var uiObject1 = createUIObject(renderer);


                    var uiObject2 = createUIObject(renderer);


                    uiObject1.addChild(uiObject2);

                    director.scene.addChild(uiObject1);






                    fakeEvent = {
                        pageX: 300,
                        pageY: 100
                    }

                    uiObject1.transform.width = 100;
                    uiObject1.transform.height = 100;

                    uiObject1.transform.position = wd.Vector2.create(300, 100);

                    uiObject1.transform.zIndex = 1;


                    uiObject2.transform.width = 100;
                    uiObject2.transform.height = 100;

                    uiObject2.transform.position = wd.Vector2.create(300, 100);


                    uiObject2.transform.zIndex = 2;




                    var engineEvent = wd.EEngineEvent.MOUSE_CLICK;
                    var eventName = wd.EEventName.CLICK;


                    var sceneHandler = sandbox.stub();
                    var uiObject1Handler = sandbox.stub();
                    var uiObject2Handler = sandbox.stub();

                    wd.EventManager.on(director.scene, engineEvent, function (e) {
                        sceneHandler();
                    });
                    wd.EventManager.on(uiObject1, engineEvent, function (e) {
                        uiObject1Handler();
                    });
                    wd.EventManager.on(uiObject2, engineEvent, function (e) {
                        uiObject2Handler();
                    });


                    director._init();


                    manager.trigger(wd.MouseEvent.create(fakeEvent, eventName));

                    expect(uiObject2Handler).toCalledBefore(uiObject1Handler);
                    expect(uiObject1Handler).toCalledBefore(sceneHandler);
                });
            });

            it("test stopPropagation", function(){
                var gameObject1 = createGameObject();


                var gameObject2 = createGameObject();


                gameObject1.addChild(gameObject2);

                director.scene.addChild(gameObject1);





                director.scene.addChild(testTool.createCamera());

                director.scene.currentCamera.position = wd.Vector3.create(0, 0, 20);
                fakeEvent = {
                    pageX: view.width / 2,
                    pageY: view.height / 2
                };

                gameObject1.transform.position = wd.Vector3.create(0, 0, 1);
                gameObject2.transform.position = wd.Vector3.create(0, 0, 2);











                var engineEvent = wd.EEngineEvent.MOUSE_CLICK;
                var eventName = wd.EEventName.CLICK;


                var sceneHandler = sandbox.stub();
                var gameObject1Handler = sandbox.stub();
                var gameObject2Handler = sandbox.stub();
                var sceneEvent,gameObject1Event,gameObject2Event;

                wd.EventManager.on(director.scene, engineEvent, function(e){
                    sceneEvent = e;
                    sceneHandler();
                });
                wd.EventManager.on(gameObject1, engineEvent, function(e){
                    gameObject1Event = e;
                    gameObject1Handler();

                    e.stopPropagation();
                });
                wd.EventManager.on(gameObject2, engineEvent, function(e){
                    gameObject2Event = e;
                    gameObject2Handler();
                });


                director._init();



                manager.trigger(wd.MouseEvent.create(fakeEvent, eventName));



                expect(sceneHandler).not.toCalled();
                expect(gameObject1Handler).toCalledOnce();
                expect(gameObject2Handler).toCalledOnce();


                expect(gameObject2Handler).toCalledBefore(gameObject1Handler);
            });
        });

        describe("test trigger Scene mouse event and trigger EEngineEvent", function() {
            beforeEach(function () {
                director.scene.addComponent(wd.Script.create(url));
            });

            describe("test trigger onMouseMove,onMouseOver,onMouseOut", function () {
                function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name) {
                    manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName[eventName]));


                    expect(test[eventHandlerName]).toCalledOnce();


                    var event = test[eventHandlerName].args[0][0];
                    expect(event.name).toEqual(name);
                    expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                    expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                }

                it("when move onto view, trigger onMouseOver; then, when move on view, trigger onMouseMove; when move out view, trigger onMouseOut", function () {
                    testSceneScript(function (test) {
                        sandbox.spy(test, "onMouseMove");
                        sandbox.spy(test, "onMouseOver");
                        sandbox.spy(test, "onMouseOut");
                    },
                    function (test) {
                        judgeEvent(test, {
                            pageX: 1,
                            pageY: 0
                        }, "onMouseOver", "MOUSEMOVE", "mouseover");

                        judgeEvent(test, {
                            pageX: 10,
                            pageY: 20
                        }, "onMouseMove", "MOUSEMOVE", "mousemove");
                        judgeEvent(test, {
                            pageX: 1001,
                            pageY: 0
                        }, "onMouseOut", "MOUSEMOVE", "mouseout");
                    });
                });
                it("it should trigger scene->mouseoverand trigger scene->mousemove when mouseout object which is in scene range", function(){
                    var renderer = createUIRenderer();
                    var uiObject1 = createUIObject(renderer);
                    director.scene.addChild(uiObject1);





                    inObject1FakeEvent = {
                        pageX: 300,
                        pageY: 100
                    };
                    outObject1FakeEvent = {
                        pageX: 300 - 100 / 2 - 1,
                        pageY: 100
                    };

                    uiObject1.transform.width = 100;
                    uiObject1.transform.height = 100;

                    uiObject1.transform.position = wd.Vector2.create(300, 100);






                    var moveEventName = wd.EEventName.MOUSEMOVE;

                    var sceneHandler = sandbox.stub();
                    var uiObject1Handler = sandbox.stub();

                    wd.EventManager.on(director.scene, wd.EEngineEvent.MOUSE_MOVE, function (e) {
                        sceneHandler(e.name);
                    });
                    wd.EventManager.on(director.scene, wd.EEngineEvent.MOUSE_OVER, function (e) {
                        sceneHandler(e.name);
                    });
                    wd.EventManager.on(director.scene, wd.EEngineEvent.MOUSE_OUT, function (e) {
                        sceneHandler(e.name);
                    });

                    wd.EventManager.on(uiObject1, wd.EEngineEvent.MOUSE_MOVE, function (e) {
                        uiObject1Handler(e.name);
                    });
                    wd.EventManager.on(uiObject1, wd.EEngineEvent.MOUSE_OVER, function (e) {
                        uiObject1Handler(e.name);
                    });
                    wd.EventManager.on(uiObject1, wd.EEngineEvent.MOUSE_OUT, function (e) {
                        uiObject1Handler(e.name);
                    });


                    director._init();






                    manager.trigger(wd.MouseEvent.create(inObject1FakeEvent, moveEventName));

                    expect(uiObject1Handler).toCalledBefore(sceneHandler);
                    expect(uiObject1Handler).toCalledWith(wd.EEngineEvent.MOUSE_OVER);
                    expect(sceneHandler).toCalledWith(wd.EEngineEvent.MOUSE_OVER);




                    manager.trigger(wd.MouseEvent.create(outObject1FakeEvent, moveEventName));


                    expect(uiObject1Handler.secondCall).toCalledBefore(sceneHandler.secondCall);
                    expect(uiObject1Handler.secondCall).toCalledWith(wd.EEngineEvent.MOUSE_OUT);
                    expect(sceneHandler.secondCall).toCalledWith(wd.EEngineEvent.MOUSE_OUT);
                    expect(sceneHandler.getCall(2)).toCalledWith(wd.EEngineEvent.MOUSE_OVER);
                    expect(sceneHandler).toCalledThrice();
                });
            });
        });

        describe("test trigger UIObject mouse event script and trigger EEngineEvent by judge hitting RectTransform->width,height", function(){
            var uiObject;

            describe("test trigger single one", function(){
                beforeEach(function(){
                    var renderer = createUIRenderer();
                    uiObject = createUIObject(renderer);


                    uiObject.transform.width = 200;
                    uiObject.transform.height = 100;


                    //uiObject.transform.scale = wd.Vector2.create(1,2);
                    uiObject.transform.translate(300,100);
                });

                it("test not trigger", function(){
                    testScript(uiObject, "event", function(test){
                        sandbox.spy(test, "onMouseClick");
                    }, function(test){
                        fakeEvent = {
                            pageX: 300 - 200 / 2 - 1,
                            pageY:100 - 100 / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();
                    }, function(test, time, gameObject){
                    });
                });

                describe("test trigger", function(){
                    function judge(eventHandlerName, eventName){
                        testScript(uiObject, "event", function(test, uiObject){
                            sandbox.spy(test, eventHandlerName);

                            wd.EventManager.on(uiObject, wd.EEngineEvent[wd.EventTriggerTable.getScriptEngineEvent(wd.EEventName[eventName])], function(e){
                                expect(e).toBeInstanceOf(wd.CustomEvent);
                                expect(e.userData).toBeInstanceOf(wd.MouseEvent);
                            });

                        }, function(test){
                            fakeEvent = {
                                pageX: 300 - 200 / 2,
                                pageY:100 - 100 / 2
                            };
                            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();

                            var event = test[eventHandlerName].args[0][0];
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }, function(test, time, uiObject){
                        });
                    }

                    beforeEach(function(){

                    });


                    describe("test trigger onMouseMove,onMouseOver,onMouseOut", function(){
                        function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name){
                            manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();


                            var event = test[eventHandlerName].args[0][0];
                            expect(event.name).toEqual(name);
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }

                        beforeEach(function(){
                        });

                        it("when move onto entityObject, trigger onMouseOver; then, when move on entityObject, trigger onMouseMove; when move out entityObject, trigger onMouseOut", function(){
                            testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onMouseMove");
                                sandbox.spy(test, "onMouseOver");
                                sandbox.spy(test, "onMouseOut");
                            }, function(test){
                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                }, "onMouseOver", "MOUSEMOVE", "mouseover");

                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2 + 10,
                                    pageY:100 - 100 / 2
                                }, "onMouseMove", "MOUSEMOVE", "mousemove");
                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2 - 1,
                                    pageY:100 - 100 / 2
                                }, "onMouseOut", "MOUSEMOVE", "mouseout");



                                manager.trigger(document.body, wd.MouseEvent.create({
                                    pageX: 300 - 200 / 2 - 1,
                                    pageY:100 - 100 / 2
                                }, wd.EEventName.MOUSEMOVE));

                                expect(test.onMouseMove).not.toCalledTwice();

                            }, function(test, time, gameObject){
                            });
                        });
                    });

                    describe("test trigger onMouseDrag", function(){
                        beforeEach(function(){
                        });

                        it("test", function(){
                            testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onMouseMove");
                                sandbox.spy(test, "onMouseDown");
                                sandbox.spy(test, "onMouseUp");
                                sandbox.spy(test, "onMouseDrag");
                            }, function(test){
                                fakeEvent = {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                }

                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));
                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEUP));


                                expect(test.onMouseDrag).toCalledOnce();


                                var event = test.onMouseDrag.args[0][0];
                                expect(event.name).toEqual(wd.EEventName.MOUSEDRAG);
                                expect(event.type).toEqual(wd.EEventType.MOUSE);
                                expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                                expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                            }, function(test, time, gameObject){
                            });
                        });
                    });


                    it("test trigger onMouseClick", function(){
                        judge("onMouseClick", "CLICK");
                    });
                    it("test trigger onMouseDown", function(){
                        judge("onMouseDown", "MOUSEDOWN");
                    });
                    it("test trigger onMouseUp", function(){
                        judge("onMouseUp", "MOUSEUP");
                    });
                    it("test trigger onMouseWheel", function(){
                        judge("onMouseWheel", "MOUSEWHEEL");
                    });
                });
            });
        });

        describe("test trigger GameObject mouse event script and trigger EEngineEvent by ray cast test", function(){
            var gameObject;

            beforeEach(function(){
                gameObject = createGameObject();
                director.scene.addChild(testTool.createCamera());

                director.scene.currentCamera.position = wd.Vector3.create(0, 0, 20);
            });


            describe("test trigger single one", function() {
                beforeEach(function(){
                });

                it("test not trigger", function () {
                    testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2 - 100,
                            pageY: view.height / 2
                        };

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();
                    });
                });
                it("test trigger", function () {
                    testScript(gameObject, "event", function (test, gameObject) {
                        sandbox.spy(test, "onMouseClick");


                        wd.EventManager.on(gameObject, wd.EEngineEvent["MOUSE_CLICK"], function(e){
                            expect(e).toBeInstanceOf(wd.CustomEvent);
                            expect(e.userData).toBeInstanceOf(wd.MouseEvent);
                        });
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();
                    });
                });
            });
        });

        describe("test Director", function(){
            var gameObject;

            beforeEach(function(){
                gameObject = createGameObject();
                director.scene.addChild(testTool.createCamera());
            });

            describe("test Director->pause/resume event", function(){
                it("if pause, not trigger event script handler", function(){
                    testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };


                        director.pause();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();



                        director.resume();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();
                    }, function (test, time, gameObject) {
                    });
                });
            });

            describe("test Director->start/stop event", function(){
                it("if stop, remove event", function(){
                    testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };



                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();



                        director.stop();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));


                        expect(test.onMouseClick).not.toCalledTwice();
                    }, function (test, time, gameObject) {
                    });
                });
            });
        });


        describe("optimize", function() {
            var domEventManager;

            beforeEach(function () {
                domEventManager = director.domEventManager;
            });

            it("if mousedrag event is triggering, the mousemove event directly get triggerList from mousedrag event", function () {
                director._init();

                sandbox.spy(domEventManager, "_findTopGameObject");



                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));


                expect(domEventManager._findTopGameObject.callCount).toEqual(1);

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

                expect(domEventManager._findTopGameObject.callCount).not.toEqual(2);
            });

            it("if designate the triggerList, just use it and not to find triggerList", function () {
                director._init();

                sandbox.spy(domEventManager, "_findTopGameObject");
                sandbox.spy(domEventManager, "_trigger");

                domEventManager.designatedTriggerList = wdCb.Collection.create([director.scene]);



                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));


                expect(director.domEventManager._findTopGameObject.callCount).toEqual(0);
                expect(director.domEventManager._trigger).toCalledOnce();
                expect(director.domEventManager._trigger.args[0][1]).toEqual(director.scene);

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

                expect(director.domEventManager._findTopGameObject.callCount).toEqual(0);
                expect(director.domEventManager._trigger).toCalledTwice();
                expect(director.domEventManager._trigger.args[1][1]).toEqual(director.scene);
            });
        });
    });
});

