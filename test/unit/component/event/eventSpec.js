describe("event component", function () {
    var sandbox = null;
    var director;
    var manager;
    var view;

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
        testTool.clearInstance();

        $("canvas").remove();

        sandbox.restore();
    });

    describe("integration test", function(){
        var fakeEvent;
        var url = null;

        function createGameObject(){
            var gameObject = wd.GameObject.create();

            var eventTriggerDetector = wd.RayCasterEventTriggerDetector.create();

            gameObject.addComponent(eventTriggerDetector);


            gameObject.addComponent(wd.Script.create(url));



            var material = wd.BasicMaterial.create();


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 2;
            geometry.height = 2;
            geometry.depth = 2;

            gameObject.addComponent(geometry);



            var collider = wd.BoxCollider.create();

            gameObject.addComponent(collider);


            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
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

        describe("test trigger Scene mouse event and trigger EngineEvent", function() {
            beforeEach(function () {
                director.scene.addComponent(wd.Script.create(url));
            });

            describe("test trigger onMouseMove,onMouseOver,onMouseOut", function () {
                function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name) {
                    manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName[eventName]));


                    expect(test[eventHandlerName]).toCalledOnce();


                    var event = test[eventHandlerName].args[0][0];
                    expect(event.name).toEqual(name);
                    expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                    expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                }

                it("when move onto view, trigger onMouseOver; then, when move on view, trigger onMouseMove; when move out view, trigger onMouseOut", function (done) {
                    scriptTool.testScript(director.scene, "event", function (test) {
                        sandbox.spy(test, "onMouseMove");
                        sandbox.spy(test, "onMouseOver");
                        sandbox.spy(test, "onMouseOut");
                    }, function (test) {
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
                    }, function (test, time, gameObject) {
                    }, done);
                });
            });
        });

        describe("test trigger UIObject mouse event script and trigger EngineEvent by judge hitting RectTransforn->width,height", function(){
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

                it("test not trigger", function(done){
                    scriptTool.testScript(uiObject, "event", function(test){
                        sandbox.spy(test, "onMouseClick");
                    }, function(test){
                        fakeEvent = {
                            pageX: 300 - 200 / 2 - 1,
                            pageY:100 - 100 / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();
                    }, function(test, time, gameObject){
                    }, done);
                });

                describe("test trigger", function(){
                    function judge(eventHandlerName, eventName, done){
                        scriptTool.testScript(uiObject, "event", function(test, uiObject){
                            sandbox.spy(test, eventHandlerName);

                            wd.EventManager.on(uiObject, wd.EngineEvent[wd.EventTriggerTable.getScriptEngineEvent(wd.EventName[eventName])], function(e){
                                expect(e).toBeInstanceOf(wd.CustomEvent);
                                expect(e.userData).toBeInstanceOf(wd.MouseEvent);
                            });

                        }, function(test){
                            fakeEvent = {
                                pageX: 300 - 200 / 2,
                                pageY:100 - 100 / 2
                            };
                            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();

                            var event = test[eventHandlerName].args[0][0];
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }, function(test, time, uiObject){
                        }, done);
                    }

                    beforeEach(function(){

                    });


                    describe("test trigger onMouseMove,onMouseOver,onMouseOut", function(){
                        function judgeEvent(test, fakeEvent, eventHandlerName, eventName, name){
                            manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();


                            var event = test[eventHandlerName].args[0][0];
                            expect(event.name).toEqual(name);
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }

                        beforeEach(function(){
                        });

                        it("when move onto entityObject, trigger onMouseOver; then, when move on entityObject, trigger onMouseMove; when move out entityObject, trigger onMouseOut", function(done){
                            scriptTool.testScript(uiObject, "event", function(test){
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
                                }, wd.EventName.MOUSEMOVE));

                                expect(test.onMouseMove).not.toCalledTwice();

                            }, function(test, time, gameObject){
                            }, done);
                        });
                    });

                    describe("test trigger onMouseDrag", function(){
                        beforeEach(function(){
                        });

                        it("test", function(done){
                            scriptTool.testScript(uiObject, "event", function(test){
                                sandbox.spy(test, "onMouseMove");
                                sandbox.spy(test, "onMouseDown");
                                sandbox.spy(test, "onMouseUp");
                                sandbox.spy(test, "onMouseDrag");
                            }, function(test){
                                fakeEvent = {
                                    pageX: 300 - 200 / 2,
                                    pageY:100 - 100 / 2
                                }

                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEDOWN));
                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEMOVE));
                                manager.trigger(document, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEUP));


                                expect(test.onMouseDrag).toCalledOnce();


                                var event = test.onMouseDrag.args[0][0];
                                expect(event.name).toEqual(wd.EventName.MOUSEDRAG);
                                expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                                expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                            }, function(test, time, gameObject){
                            }, done);
                        });
                    });


                    it("test trigger onMouseClick", function(done){
                        judge("onMouseClick", "CLICK", done);
                    });
                    it("test trigger onMouseDown", function(done){
                        judge("onMouseDown", "MOUSEDOWN", done);
                    });
                    it("test trigger onMouseUp", function(done){
                        judge("onMouseUp", "MOUSEUP", done);
                    });
                    it("test trigger onMouseWheel", function(done){
                        judge("onMouseWheel", "MOUSEWHEEL", done);
                    });
                });
            });

            describe("test trigger multi ones", function(){
                var renderer;

                function getEventTriggerListByTriggerMode(triggerList){
                    return director.scene.uiObjectScene.eventTriggerUtils.getEventTriggerListByTriggerMode(triggerList);
                }

                beforeEach(function(){
                    renderer = createUIRenderer();
                });

                it("the top one is computed by transform->zIndex", function(){

                    var uiObject1 = createUIObject(renderer);
                    var detector1 = uiObject1.getComponent(wd.EventTriggerDetector);
                    detector1.triggerMode = wd.EventTriggerMode.TOP;

                    uiObject1.transform.zIndex = 5;


                    var uiObject2 = createUIObject(renderer);
                    var detector2 = uiObject2.getComponent(wd.EventTriggerDetector);
                    detector2.triggerMode = wd.EventTriggerMode.TOP;

                    uiObject2.transform.zIndex = 10;

                    var triggerList = wdCb.Collection.create([
                        {
                            entityObject:uiObject1,
                            triggerMode:detector1.triggerMode
                        },
                        {
                            entityObject: uiObject2,
                            triggerMode: detector2.triggerMode
                        }
                    ]);

                    var result = getEventTriggerListByTriggerMode(triggerList);

                    expect(result.getChildren()).toEqual([
                        uiObject2
                    ]);
                });
                it("trigger all selected ones(triggerMode === SELECTED) and the top one(triggerMode === TOP)", function(){
                    var uiObject1 = createUIObject(renderer);
                    var detector1 = uiObject1.getComponent(wd.EventTriggerDetector);
                    detector1.triggerMode = wd.EventTriggerMode.TOP;

                    uiObject1.transform.zIndex = 5;


                    var uiObject2 = createUIObject(renderer);
                    var detector2 = uiObject2.getComponent(wd.EventTriggerDetector);
                    detector2.triggerMode = wd.EventTriggerMode.SELECTED;

                    uiObject2.transform.zIndex = 10;



                    var uiObject3 = createUIObject(renderer);
                    var detector3 = uiObject3.getComponent(wd.EventTriggerDetector);
                    detector3.triggerMode = wd.EventTriggerMode.SELECTED;

                    uiObject3.transform.zIndex = 9;



                    var uiObject4 = createUIObject(renderer);
                    var detector4 = uiObject4.getComponent(wd.EventTriggerDetector);
                    detector4.triggerMode = wd.EventTriggerMode.TOP;

                    uiObject4.transform.zIndex = 1;


                    var triggerList = wdCb.Collection.create([
                        {
                            entityObject:uiObject1,
                            triggerMode:detector1.triggerMode
                        },
                        {
                            entityObject: uiObject2,
                            triggerMode: detector2.triggerMode
                        },
                        {
                            entityObject: uiObject3,
                            triggerMode: detector3.triggerMode
                        },
                        {
                            entityObject:uiObject4,
                            triggerMode:detector4.triggerMode
                        }
                    ]);


                    var result = getEventTriggerListByTriggerMode(triggerList);

                    expect(result.getCount()).toEqual(3);
                    expect(result.getChildren()).toEqual([
                        uiObject2,
                        uiObject3,
                        uiObject1
                    ])
                });
            });
        });

        describe("test trigger GameObject mouse event script and trigger EngineEvent by ray cast test", function(){
            var gameObject;

            beforeEach(function(){
                gameObject = createGameObject();
                director.scene.addChild(testTool.createCamera());

                director.scene.camera.position = wd.Vector3.create(0, 0, 20);
            });


            describe("test trigger single one", function() {
                beforeEach(function(){
                });

                it("test not trigger", function (done) {
                    scriptTool.testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2 - 100,
                            pageY: view.height / 2
                        };

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();
                    }, done);
                });
                it("test trigger", function (done) {
                    scriptTool.testScript(gameObject, "event", function (test, gameObject) {
                        sandbox.spy(test, "onMouseClick");


                        wd.EventManager.on(gameObject, wd.EngineEvent["MOUSE_CLICK"], function(e){
                            expect(e).toBeInstanceOf(wd.CustomEvent);
                            expect(e.userData).toBeInstanceOf(wd.MouseEvent);
                        });
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();
                    }, done);
                });
            });

            describe("test trigger multi ones", function(){
                function getEventTriggerListByTriggerMode(triggerList){
                    return director.scene.gameObjectScene.eventTriggerUtils.getEventTriggerListByTriggerMode(triggerList);
                }

                beforeEach(function(){
                });

                it("the top one is the nearest one to camera", function(){


                    var gameObject1 = createGameObject();
                    var detector1 = gameObject1.getComponent(wd.EventTriggerDetector);
                    detector1.triggerMode = wd.EventTriggerMode.TOP;

                    gameObject1.transform.translate(0, 0, -1);


                    var gameObject2 = createGameObject();
                    var detector2 = gameObject2.getComponent(wd.EventTriggerDetector);
                    detector2.triggerMode = wd.EventTriggerMode.TOP;

                    gameObject2.transform.translate(0, 0, -3);

                    var triggerList = wdCb.Collection.create([
                        {
                            entityObject:gameObject1,
                            triggerMode:detector1.triggerMode
                        },
                        {
                            entityObject: gameObject2,
                            triggerMode: detector2.triggerMode
                        }
                    ]);

                    var result = getEventTriggerListByTriggerMode(triggerList);

                    expect(result.getChildren()).toEqual([
                        gameObject1
                    ]);
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
                it("if pause, not trigger event script handler", function(done){
                    scriptTool.testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };


                        director.pause();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).not.toCalled();



                        director.resume();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();
                    }, function (test, time, gameObject) {
                    }, done);
                });
            });

            describe("test Director->start/stop event", function(){
                it("if stop, remove event", function(done){
                    scriptTool.testScript(gameObject, "event", function (test) {
                        sandbox.spy(test, "onMouseClick");
                    }, function (test) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };



                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();



                        director.stop();

                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));


                        expect(test.onMouseClick).not.toCalledTwice();
                    }, function (test, time, gameObject) {
                    }, done);
                });
            });
        });
    });
});

