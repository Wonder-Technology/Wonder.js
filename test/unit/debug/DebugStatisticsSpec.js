describe("DebugStatistics", function () {
    var sandbox = null;
    var Debug = wd.DebugStatistics;
    var director;
    var deviceManager = wd.DeviceManager;

    function getPanel() {
        return director.scene.uiObjectScene.getChild(0);
    }

    function getFps() {
        return getPanel().getChild(0);
    }

    function getTotalGameObjects() {
        return getPanel().getChild(1);
    }

    function getRenderGameObjects() {
        return getPanel().getChild(2);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();



        sandbox.stub(deviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500,

            offset:{
                x:0,
                y:0
            }
        });
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();

        $("canvas").remove();
    });

    describe("count", function(){
        describe("get totalGameObjects", function(){
            it("get all first level child of scene", function(){
                var obj1 = wd.GameObject.create();
                var obj2 = wd.GameObject.create();

                obj1.addChild(obj2);

                director.scene.addChild(obj1);
                director.scene.addChild(wd.UIObject.create());

                expect(Debug.count.totalGameObjects).toEqual(2);
            });
            it("get octree->children", function(){
                var octreeContainer = wd.GameObject.create();
                octreeContainer.addComponent(wd.Octree.create());

                var obj1 = wd.GameObject.create();
                var obj2 = wd.GameObject.create();

                octreeContainer.addChild(obj1);
                octreeContainer.addChild(obj2);

                var obj3 = wd.GameObject.create();

                director.scene.addChild(octreeContainer);
                director.scene.addChild(obj3);

                expect(Debug.count.totalGameObjects).toEqual(3);
            });
        });
    });

    describe("init", function(){
        beforeEach(function(){
            
        });
        
        describe("if show debug panel", function(){
            beforeEach(function(){
                wd.DebugConfig.showDebugPanel = true;
            });

            describe("show debug panel", function(){
                it("add one overlay canvas to show ui", function(){
                    Debug.init();

                    expect($("canvas").length).toEqual(1);
                    expect($("canvas").css("zIndex")).toEqual("30");
                });

                describe("create ui", function(){
                    function judgeFont(name, getObjFunc) {
                        describe("create " + name, function(){
                            var obj;

                            beforeEach(function(){
                                Debug.init();

                                obj = getObjFunc();
                            });

                            it("create plain font ui", function(){
                                expect(obj).toBeInstanceOf(wd.UIObject);
                                expect(obj.getComponent(wd.PlainFont)).toBeInstanceOf(wd.PlainFont);
                            });
                            it("not set text", function () {
                                expect(obj.getComponent(wd.PlainFont).text).toEqual("");
                            });
                        });
                    }

                    beforeEach(function(){
                    });

                    describe("create panel", function () {
                        beforeEach(function(){
                            Debug.init();
                        });

                        it("create panel ui", function () {
                            expect(director.scene.uiObjectScene.getChildren().getCount()).toEqual(1);

                            var panel = getPanel();
                            expect(panel).toBeInstanceOf(wd.UIObject);
                        });
                        it("panel' width/height === view.width/height", function () {
                            expect(director.scene.uiObjectScene.getChildren().getCount()).toEqual(1);

                            var panel = getPanel();
                            var view = deviceManager.getInstance().view;


                            expect(panel.transform.width).toEqual(view.width);
                            expect(panel.transform.height).toEqual(view.height);
                        });
                    });

                    judgeFont("fps", getFps);
                    judgeFont("totalGameObjects", getTotalGameObjects);
                    judgeFont("renderGameObjects", getRenderGameObjects);

                    describe("if show in mobile", function(){
                        beforeEach(function(){
                            sandbox.stub(bowser, "mobile", true);

                            Debug.init();
                        });

                        it("font size should be 30", function(){
                            expect(getFps().getComponent(wd.PlainFont).fontSize).toEqual(30);
                        });
                    });
                });

                it("show panel", function () {
                    Debug.init();

                    expect(getPanel().isVisible).toBeTruthy();
                });
            });
            
            describe("during each loop", function(){
                beforeEach(function(){
                    Debug.init();
                });

                describe("update debug info", function(){
                    beforeEach(function(){

                    });

                    describe("update fps", function(){
                        var directorInstance;

                        function setFps(fps) {
                            directorInstance.fps = fps;
                            wd.Director.getInstance.returns(directorInstance);
                        }

                        beforeEach(function(){
                            directorInstance = cloneTool.extend({},  wd.Director.getInstance());

                            sandbox.stub(wd.Director, "getInstance");
                        });

                        it("update at 10 loops rate", function () {
                            var fps = getFps();
                            var currentFps = 50;
                            setFps(currentFps);

                            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

                            expect(fps.getComponent(wd.PlainFont).text).toEqual("fps:" + currentFps);


                            for(var i = 0; i < 10; i++){
                                setFps(1);

                                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

                                expect(fps.getComponent(wd.PlainFont).text).toEqual("fps:" + currentFps);
                            }


                            setFps(2);

                            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

                            expect(fps.getComponent(wd.PlainFont).text).toEqual("fps:" + 2);
                        });
                    });
                });

                it("reset statistics data", function () {
                    
                });
            });
        });
    });
    
    describe("dispose", function(){
        it("unbind STARTLOOP event", function(){
            sandbox.stub(wd.DebugConfig, "showDebugPanel", true);
            sandbox.stub(Debug, "resetData");

            Debug.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

            expect(Debug.resetData).toCalledOnce();





            Debug.dispose();




            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

            expect(Debug.resetData).not.toCalledTwice();
        });

        describe("if show debug panel", function() {
            beforeEach(function () {
                wd.DebugConfig.showDebugPanel = true;
            });

            it("dispose panel", function () {
                Debug.init();
                var panel = getPanel();
                sandbox.stub(panel, "dispose");

                Debug.dispose();

                expect(panel.dispose).toCalledOnce();
            });
            it("remove overlay canvas", function () {
                Debug.init();

                Debug.dispose();

                expect($("canvas").length).toEqual(0);
            });
        });
    });
});
