describe("script", function () {
    var sandbox = null;
    var script = null;
    var director = null;
    var url1 = null;
    var url2 = null;

    function createCamera(){
        return testTool.createCamera();
    }

    function testScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        var gameObject = wd.GameObject.create();

        script.url = url1;

        gameObject.addComponent(script);


        scriptTool.testScript(gameObject, "test", judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done);
    }

    function testTwoScript(judgeTest1OnEnter, judgeTest2OnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        var script2 = wd.Script.create();
        var gameObject = wd.GameObject.create();

        script.url = url1;
        script2.url = url2;

        gameObject.addComponent(script);
        gameObject.addComponent(script2);

        var test = null;
        var test2 = null;

        /*!
         script->handler is invoked before script2->handler
         */

        var execScript = gameObject.execScript;


        var count = 0;


        director.scene.addChild(gameObject);


        gameObject.execScript = function(scriptHandlerName){
            if(scriptHandlerName !== "onEnter" && scriptHandlerName !== "init"){
                execScript.apply(gameObject, arguments);

                return
            }


            count ++;

            //script->onEnter
            if(count === 1){
                test = gameObject.scriptList.getChild("test");

                //if(test){
                    judgeTest1OnEnter(test, gameObject);
                //}

                    execScript.apply(gameObject, arguments);
            }

            //script->init
            else if(count === 2){
                execScript.apply(gameObject, arguments);
            }

            //script2->onEnter
            else if(count === 3){
                test2 = gameObject.scriptList.getChild("test2");
                judgeTest2OnEnter(test2, gameObject);

                execScript.apply(gameObject, arguments);
            }

            //script2->init
            else if(count === 4){
                execScript.apply(gameObject, arguments);

                director._loopBody(1);
            }
        }


        var loopBody = director._loopBody;
        director._loopBody = function(){
            var time = 100;

            judgeBeforeLoopBody(test, test2, gameObject);

            loopBody.call(director, time);

            judgeAfterLoopBody(test, test2, time, gameObject);

            director.stop();

            done();
        };

        director._init();
    }

    function testSceneScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        script.url = url1;

        director.scene.addComponent(script);

        scriptTool.testScript(director.scene, "test", judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done);
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        script = wd.Script.create();
        director = wd.Director.getInstance();
        sandbox.stub(window.performance, "now").returns(0);
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.GPUDetector.getInstance(), "detect");
        director.scene.addChild(createCamera());

        url1 = testTool.resPath + "test/res/script/test.js";
        url2 = testTool.resPath + "test/res/script/test2.js";
    });
    afterEach(function () {
        $("script").remove();
        testTool.clearInstance();
        sandbox.restore();
    });

    it("add script component", function(done){
        testScript(function(test){
            sandbox.spy(test, "init");
            sandbox.spy(test, "update");
            sandbox.spy(test, "onStartLoop");
            sandbox.spy(test, "onEndLoop");
            sandbox.spy(test, "onEnter");
            sandbox.spy(test, "onExit");
        }, function(test){
            expect(test.init).toCalledOnce();
            expect(test.isInit).toBeTruthy();

            expect(test.onEnter).toCalledBefore(test.init);

        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

            director.scene.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
        }, done);
    });
    it("test director->scene's script", function(done){
        testSceneScript(function(test){
            sandbox.spy(test, "init");
            sandbox.spy(test, "update");
            sandbox.spy(test, "onStartLoop");
            sandbox.spy(test, "onEndLoop");
            sandbox.spy(test, "onEnter");
            sandbox.spy(test, "onExit");
            sandbox.spy(test, "onDispose");
        }, function(test){
            expect(test.onEnter).toCalledBefore(test.init);
        }, function(test, time, scene){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

            scene.dispose();

            expect(test.onDispose).toCalledOnce();
        }, done);
    });

    describe("one gameObject can has multi script components", function(){
        it("script should be exected in added order", function(done){
            testTwoScript(function(test){
                sandbox.spy(test, "init");
                sandbox.spy(test, "update");
                sandbox.spy(test, "onStartLoop");
                sandbox.spy(test, "onEndLoop");
                sandbox.spy(test, "onEnter");
                sandbox.spy(test, "onExit");
            }, function(test2){
                sandbox.spy(test2, "init");
                sandbox.spy(test2, "update");
                sandbox.spy(test2, "onStartLoop");
                sandbox.spy(test2, "onEndLoop");
                sandbox.spy(test2, "onEnter");
                sandbox.spy(test2, "onExit");
            }, function(test, test2){
                expect(test.init).toCalledOnce();
                expect(test.isInit).toBeTruthy();
                expect(test.onEnter).toCalledOnce();

                expect(test2.init).toCalledOnce();
                expect(test2.onEnter).toCalledOnce();

                expect(test.onEnter).toCalledBefore(test2.onEnter);
                expect(test.init).toCalledBefore(test2.onEnter);
            }, function(test, test2, time, gameObject){
                expect(test.update).toCalledWith(time);
                expect(test.time).toEqual(100);
                expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

                expect(test2.update).toCalledWith(time);
                expect(test2.onStartLoop).toCalledBefore(test2.onEndLoop);

                director.scene.removeChild(gameObject);
                expect(test.onExit).toCalledOnce();

                expect(test2.onExit).toCalledOnce();
            }, done);
        });
    });

    it("can load js file of relative or absolute path", function(done){
        url1 = "http://" + location.host + "/" + testTool.resPath + "test/res/script/test.js";

        testScript(function(test){
            sandbox.spy(test, "init");
            sandbox.spy(test, "update");
            sandbox.spy(test, "onStartLoop");
            sandbox.spy(test, "onEndLoop");
            sandbox.spy(test, "onEnter");
            sandbox.spy(test, "onExit");
        }, function(test){
            expect(test.init).toCalledOnce();
            expect(test.isInit).toBeTruthy();
            expect(test.onEnter).toCalledOnce();
        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

            director.scene.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
        }, done);
    });
    it("only load the the script(based on url) once", function(done){
        url2 = url1;
        testTwoScript(function(test){
            expect(test).not.toBeUndefined();
        }, function(test2){
            expect(test2).toBeUndefined();
        }, function(test, test2){
        }, function(test, test2, time, gameObject){
        }, done);
    });

    describe("communicate with other script component", function(){
        it("comunicate with the gameObject's script component according to visitting it directly", function(done){
            testTwoScript(function(test){
                sandbox.spy(test, "update");
            }, function(test2){
                sandbox.spy(test2, "update");
            }, function(test, test2){
            }, function(test, test2, time, gameObject){
                expect(test.update).toCalledTwice();
                expect(test2.update).toCalledOnce();
                expect(gameObject.a).toEqual(102);
            }, done);
        });
    });

    describe("trigger global event after script loaded", function(){
        var entityObject;

        beforeEach(function(){
            var data = {
                class:function(){},
                name:""
            };
            entityObject = wd.GameObject.create();


            sandbox.stub(wd.EventManager, "trigger");
            sandbox.stub(wd.CustomEvent, "create");
            sandbox.stub(entityObject, "execScript");

            script._handlerAfterLoadedScript(data, entityObject);

            expect(wd.EventManager.trigger.callCount).toEqual(3);
        });

        it("trigger global BEFORE_GAMEOBJECT_INIT before trigger script->init", function(){
            expect(wd.CustomEvent.create.withArgs(wd.EEngineEvent.BEFORE_GAMEOBJECT_INIT)).toCalledBefore(entityObject.execScript.withArgs("init"));
        });
        it("trigger global AFTER_GAMEOBJECT_INIT after trigger script->init", function(){
            expect(wd.CustomEvent.create.withArgs(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT)).toCalledAfter(entityObject.execScript.withArgs("init"));
        });
        it("trigger global AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT after trigger global AFTER_GAMEOBJECT_INIT", function(){
            expect(wd.CustomEvent.create.withArgs(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT)).toCalledAfter(wd.CustomEvent.create.withArgs(wd.EEngineEvent.AFTER_GAMEOBJECT_INIT));
        });
    });
});
