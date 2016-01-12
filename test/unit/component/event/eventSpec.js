describe("event component", function () {
    var sandbox = null;
    var uiObject;
    var director;

    var manager;

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


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));



        manager = wd.EventManager;

    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function(){
        var fakeEvent;

        describe("test trigger UIObject mouse event script", function(){
            var url = null;

            function createUIRenderer(){
                var renderer = wd.UIRenderer.create();

                return renderer;
            }

            function createProgressBar(renderer){
                var bar = wd.ProgressBar.create();


                var barUIObject = wd.UIObject.create();

                barUIObject.addComponent(bar);

                var eventTriggerDetector = wd.UIEventTriggerDetector.create();

                barUIObject.addComponent(eventTriggerDetector);



                barUIObject.addComponent(wd.Script.create(url));




                barUIObject.addComponent(renderer);

                return barUIObject;
            }

            beforeEach(function(){
                url = "http://" + location.host + "/" + testTool.resPath + "test/res/script/event.js";
            })

            describe("test trigger single one", function(){
                beforeEach(function(){
                    var renderer = createUIRenderer();
                    uiObject = createProgressBar(renderer);


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
                        scriptTool.testScript(uiObject, "event", function(test){
                            sandbox.spy(test, eventHandlerName);
                        }, function(test){
                            fakeEvent = {
                                pageX: 300 - 200 / 2,
                                pageY:100 - 100 / 2
                            };
                            manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EventName[eventName]));


                            expect(test[eventHandlerName]).toCalledOnce();

                            var event = test[eventHandlerName].args[0][0];
                            expect(event.locationInView.x).toEqual(fakeEvent.pageX);
                            expect(event.locationInView.y).toEqual(fakeEvent.pageY);
                        }, function(test, time, gameObject){
                        }, done);
                    }

                    beforeEach(function(){

                    });

                    it("test trigger onMouseClick", function(done){
                        judge("onMouseClick", "CLICK", done);
                    });
                    it("test trigger onMouseOver", function(done){
                        judge("onMouseOver", "MOUSEOVER", done);
                    });
                    it("test trigger onMouseOut", function(done){
                        judge("onMouseOut", "MOUSEOUT", done);
                    });
                    it("test trigger onMouseMove", function(done){
                        judge("onMouseMove", "MOUSEMOVE", done);
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
                beforeEach(function(){

                });

                it("trigger all selected ones(triggerMode === SELECTED) and the top one(triggerMode === TOP)", function(){
                    var renderer = createUIRenderer();


                    var uiObject1 = createProgressBar(renderer);
                    var detector1 = uiObject1.getComponent(wd.EventTriggerDetector);
                    detector1.triggerMode = wd.EventTriggerMode.TOP;

                    uiObject1.transform.zIndex = 5;


                    var uiObject2 = createProgressBar(renderer);
                    var detector2 = uiObject2.getComponent(wd.EventTriggerDetector);
                    detector2.triggerMode = wd.EventTriggerMode.SELECTED;

                    uiObject2.transform.zIndex = 10;



                    var uiObject3 = createProgressBar(renderer);
                    var detector3 = uiObject3.getComponent(wd.EventTriggerDetector);
                    detector3.triggerMode = wd.EventTriggerMode.SELECTED;

                    uiObject3.transform.zIndex = 9;



                    var uiObject4 = createProgressBar(renderer);
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


                    var result = wd.UIEventTriggerUtils.getTriggerListByTriggerMode(triggerList);

                    expect(result.getCount()).toEqual(3);
                    expect(result.getChildren()).toEqual([
                        uiObject2,
                        uiObject3,
                        uiObject1
                    ])
                });
            });
        });

        it("test trigger GameObject mouse event script", function(){
            //todo
        });
    });
});

