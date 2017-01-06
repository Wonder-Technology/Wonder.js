describe("event component", function () {
    var sandbox = null;
    var director;
    var manager;
    var view;

    var Event = (function () {
        function Event(entityObject) {
        }
        Event.prototype.onPointTap = function (e) {
        };
        Event.prototype.onPointOver = function (e) {
        };
        Event.prototype.onPointOut = function (e) {
        };
        Event.prototype.onPointMove = function (e) {
        };
        Event.prototype.onPointDown = function (e) {
        };
        Event.prototype.onPointUp = function (e) {
        };
        Event.prototype.onPointScale = function (e) {
        };
        Event.prototype.onPointDrag = function (e) {
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


        sandbox.stub(wd.LoaderManager.getInstance(), "get").returns({
            name:"",
            class:function(){}
        });


        manager = wd.EventManager;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        $("canvas").remove();

        sandbox.restore();
    });

    describe("integration test", function(){
        var fakeEvent;
        var id = null;

        function createGameObject(){
            return eventScriptTool.createGameObject(id);
        }

        function createUIObject(renderer){
            var bar = wd.ProgressBar.create();


            var barUIObject = wd.UIObject.create();

            barUIObject.addComponent(bar);

            var eventTriggerDetector = wd.UIEventTriggerDetector.create();

            barUIObject.addComponent(eventTriggerDetector);



            barUIObject.addComponent(wd.Script.create(id));




            barUIObject.addComponent(renderer);

            return barUIObject;
        }

        function createUIRenderer(){
            var renderer = wd.UIRenderer.create();

            return renderer;
        }

        beforeEach(function(){
            // id = "http://" + location.host + "/" + testTool.resPath + "test/res/script/event.js";
            id = null;
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











                    // var engineEvent = wd.EEngineEvent.POINT_TAP;
                    var engineEvent = wd.EEngineEvent.POINT_TAP;
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




                    var engineEvent = wd.EEngineEvent.POINT_TAP;
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











                var engineEvent = wd.EEngineEvent.POINT_TAP;
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

        describe("test trigger Scene point event and trigger script handler", function() {
            beforeEach(function () {
                director.scene.addComponent(wd.Script.create(id));
            });

            describe("test trigger onPointMove,onPointOver,onPointOut", function () {
                function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name) {
                    manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName[eventName]));


                    expect(test[eventHandlerName]).toCalledOnce();


                    var event = test[eventHandlerName].args[0][0];
                    expect(event.name).toEqual("wd_" + name);
                    expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                    expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                }

                it("when move onto view, trigger onPointOver; then, when move on view, trigger onPointMove; when move out view, trigger onPointOut", function () {
                    testSceneScript(function (test) {
                        sandbox.spy(test, "onPointMove");
                        sandbox.spy(test, "onPointOver");
                        sandbox.spy(test, "onPointOut");
                    },
                    function (test) {
                        judgeEvent(test, {
                            pageX: 1,
                            pageY: 0
                        }, "onPointOver", "MOUSEMOVE", "pointover");

                        judgeEvent(test, {
                            pageX: 10,
                            pageY: 20
                        }, "onPointMove", "MOUSEMOVE", "pointmove");
                        judgeEvent(test, {
                            pageX: 1001,
                            pageY: 0
                        }, "onPointOut", "MOUSEMOVE", "pointout");
                    });
                });
                it("it should trigger scene->mouseover and trigger scene->mousemove when mouseout object which is in scene range", function(){
                    var renderer = createUIRenderer();
                    var uiObject1 = createUIObject(renderer);
                    director.scene.addChild(uiObject1);





                    var inObject1FakeEvent = {
                        pageX: 300,
                        pageY: 100
                    };
                    var outObject1FakeEvent = {
                        pageX: 300 - 100 / 2 - 1,
                        pageY: 100
                    };

                    uiObject1.transform.width = 100;
                    uiObject1.transform.height = 100;

                    uiObject1.transform.position = wd.Vector2.create(300, 100);






                    var moveEventName = wd.EEventName.MOUSEMOVE;

                    var sceneHandler = sandbox.stub();
                    var uiObject1Handler = sandbox.stub();

                    wd.EventManager.on(director.scene, wd.EEngineEvent.POINT_MOVE, function (e) {
                        sceneHandler(e.name);
                    });
                    wd.EventManager.on(director.scene, wd.EEngineEvent.POINT_OVER, function (e) {
                        sceneHandler(e.name);
                    });
                    wd.EventManager.on(director.scene, wd.EEngineEvent.POINT_OUT, function (e) {
                        sceneHandler(e.name);
                    });

                    wd.EventManager.on(uiObject1, wd.EEngineEvent.POINT_MOVE, function (e) {
                        uiObject1Handler(e.name);
                    });
                    wd.EventManager.on(uiObject1, wd.EEngineEvent.POINT_OVER, function (e) {
                        uiObject1Handler(e.name);
                    });
                    wd.EventManager.on(uiObject1, wd.EEngineEvent.POINT_OUT, function (e) {
                        uiObject1Handler(e.name);
                    });


                    director._init();






                    manager.trigger(wd.MouseEvent.create(inObject1FakeEvent, moveEventName));

                    expect(uiObject1Handler).toCalledBefore(sceneHandler);
                    expect(uiObject1Handler).toCalledWith(wd.EEngineEvent.POINT_OVER);
                    expect(sceneHandler).toCalledWith(wd.EEngineEvent.POINT_OVER);




                    manager.trigger(wd.MouseEvent.create(outObject1FakeEvent, moveEventName));


                    expect(uiObject1Handler.secondCall).toCalledBefore(sceneHandler.secondCall);
                    expect(uiObject1Handler.secondCall).toCalledWith(wd.EEngineEvent.POINT_OUT);
                    expect(sceneHandler.secondCall).toCalledWith(wd.EEngineEvent.POINT_OUT);
                    expect(sceneHandler.getCall(2)).toCalledWith(wd.EEngineEvent.POINT_OVER);
                    expect(sceneHandler).toCalledThrice();
                });
            });
        });

        describe("test trigger UIObject mouse event script and trigger point event by judge hitting RectTransform->width,height", function(){
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
                        sandbox.spy(test, "onPointTap");
                    }, function(test){
                        fakeEvent = {
                            pageX: 300 - 200 / 2 - 1,
                            pageY:100 - 100 / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).not.toCalled();
                    }, function(test, time, gameObject){
                    });
                });

                describe("test trigger", function(){
                    function judge(eventHandlerName, bindedEventName, triggeredEventName){
                        testScript(uiObject, "event", function(test, uiObject){
                            sandbox.spy(test, eventHandlerName);

                            // wd.EventManager.on(uiObject, wd.EEngineEvent[wd.EventTriggerTable.getScriptEngineEvent(wd.EEventName[eventName])], function(e){
                            wd.EventManager.on(uiObject, wd.EEventName[bindedEventName], function(e){
                                expect(e).toBeInstanceOf(wd.CustomEvent);
                                expect(e.userData).toBeInstanceOf(wd.PointEvent);
                            });

                        }, function(test){
                            fakeEvent = {
                                pageX: 300 - 200 / 2,
                                pageY:100 - 100 / 2
                            };
                            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName[triggeredEventName]));


                            expect(test[eventHandlerName]).toCalledOnce();

                            var event = test[eventHandlerName].args[0][0];
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }, function(test, time, uiObject){
                        });
                    }

                    beforeEach(function(){

                    });


                    describe("test trigger onPointMove,onPointOver,onPointOut", function(){
                        function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name){
                            manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();


                            var event = test[eventHandlerName].args[0][0];
                            expect(event.name).toEqual("wd_" + name);
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }

                        beforeEach(function(){
                        });

                        it("when move onto entityObject, trigger onPointOver; then, when move on entityObject, trigger onPointMove; when move out entityObject, trigger onPointOut", function(){
                            testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onPointMove");
                                sandbox.spy(test, "onPointOver");
                                sandbox.spy(test, "onPointOut");
                            }, function(test){
                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                }, "onPointOver", "MOUSEMOVE", "pointover");

                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2 + 10,
                                    pageY:100 - 100 / 2
                                }, "onPointMove", "MOUSEMOVE", "pointmove");
                                judgeEvent(test, {
                                    pageX: 300 - 200 / 2 - 1,
                                    pageY:100 - 100 / 2
                                }, "onPointOut", "MOUSEMOVE", "pointout");



                                manager.trigger(document.body, wd.MouseEvent.create({
                                    pageX: 300 - 200 / 2 - 1,
                                    pageY:100 - 100 / 2
                                }, wd.EEventName.MOUSEMOVE));

                                expect(test.onPointMove).not.toCalledTwice();

                            }, function(test, time, gameObject){
                            });
                        });
                    });

                    describe("test trigger onPointDrag", function(){
                        beforeEach(function(){
                        });

                        it("test trigger drag event", function(){
                            testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onPointMove");
                                sandbox.spy(test, "onPointDown");
                                sandbox.spy(test, "onPointUp");
                                sandbox.spy(test, "onPointDrag");
                            }, function(test){
                                fakeEvent = {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                };

                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));
                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEUP));


                                expect(test.onPointDrag).toCalledOnce();


                                var event = test.onPointDrag.args[0][0];
                                expect(event.name).toEqual(wd.EEngineEvent.POINT_DRAG);
                                expect(event.type).toEqual(wd.EEventType.POINT);
                                expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                                expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                            }, function(test, time, gameObject){
                            });
                        });
                        it("trigger mousemove script handler during drag event is triggering", function () {
                            testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onPointMove");
                                sandbox.spy(test, "onPointDown");
                                sandbox.spy(test, "onPointUp");
                                sandbox.spy(test, "onPointDrag");
                            }, function(test){
                                fakeEvent = {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                };

                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));



                                expect(test.onPointDrag).toCalledOnce();
                                expect(test.onPointMove).not.toCalled();



                                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));



                                expect(test.onPointDrag).toCalledTwice();
                                expect(test.onPointMove).toCalledOnce();
                            }, function(test, time, gameObject){
                            });
                        });
                    });


                    it("test trigger onPointTap", function(){
                        judge("onPointTap", "POINTTAP", "CLICK");
                    });
                    it("test trigger onPointDown", function(){
                        judge("onPointDown", "POINTDOWN", "MOUSEDOWN");
                    });
                    it("test trigger onPointUp", function(){
                        judge("onPointUp", "POINTUP", "MOUSEUP");
                    });
                    it("test trigger onPointWheel", function(){
                        judge("onPointScale", "POINTSCALE", "MOUSEWHEEL");
                    });
                });
            });
        });

        describe("test trigger GameObject point event script and trigger point event by ray cast test", function(){
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
                        sandbox.spy(test, "onPointTap");
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2 - 100,
                            pageY: view.height / 2
                        };

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).not.toCalled();
                    });
                });
                it("test trigger", function () {
                    testScript(gameObject, "event", function (test, gameObject) {
                        sandbox.spy(test, "onPointTap");


                        wd.EventManager.on(gameObject, wd.EEngineEvent.POINT_TAP, function(e){
                            expect(e).toBeInstanceOf(wd.CustomEvent);
                            expect(e.userData).toBeInstanceOf(wd.PointEvent);
                        });
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).toCalledOnce();
                    });
                });
            });

            it("test trigger point event script by touch event", function () {
                sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);

                testScript(gameObject, "event", function (test, gameObject) {
                    sandbox.spy(test, "onPointDown");


                    wd.EventManager.on(gameObject, wd.EEngineEvent.POINT_DOWN, function(e){
                        expect(e).toBeInstanceOf(wd.CustomEvent);
                        expect(e.userData).toBeInstanceOf(wd.PointEvent);
                    });
                }, function (test) {
                }, function (test, time, gameObject) {
                    fakeEvent = eventTool.buildFakeTouchEvent(view.width / 2, view.height / 2);

                    manager.trigger(document.body, wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                    expect(test.onPointDown).toCalledOnce();
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
                        sandbox.spy(test, "onPointTap");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };


                        director.pause();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).not.toCalled();



                        director.resume();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).toCalledOnce();
                    }, function (test, time, gameObject) {
                    });
                });
            });

            describe("test Director->start/stop event", function(){
                it("if stop, remove event", function(){
                    testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onPointTap");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };



                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onPointTap).toCalledOnce();



                        director.stop();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));


                        expect(test.onPointTap).not.toCalledTwice();
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



                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

                expect(domEventManager._findTopGameObject.callCount).toEqual(1);

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));


                expect(domEventManager._findTopGameObject.callCount).toEqual(1 + 2);

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

                expect(domEventManager._findTopGameObject.callCount).toEqual(4);
            });

            it("if designate the triggerList, just use it and not to find triggerList", function () {
                director._init();

                sandbox.spy(domEventManager, "_findTopGameObject");
                sandbox.spy(domEventManager, "_trigger");

                domEventManager.designatedTriggerList = wdCb.Collection.create([director.scene]);



                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));


                expect(director.domEventManager._findTopGameObject.callCount).toEqual(0);
                expect(director.domEventManager._trigger.callCount).toEqual(3);
                expect(director.domEventManager._trigger.args[0][1]).toEqual(director.scene);

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

                expect(director.domEventManager._findTopGameObject.callCount).toEqual(0);
                expect(director.domEventManager._trigger.callCount).toEqual(3 + 2);
                expect(director.domEventManager._trigger.args[1][1]).toEqual(director.scene);
            });
        });
    });
});

