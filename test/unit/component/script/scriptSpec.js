describe("script", function () {
    var sandbox = null;
    var script = null;
    var director = null;
    var url1 = null;
    var url2 = null;


    var Test = (function () {
        function Test(gameObject) {
            this.a = null;
            this.b = null;
            this.time = null;
            this.isInit = null;
            this.gameObject = null;
            this.a = 0;
            this.b = 0;
            this.time = null;
            this.isInit = false;
            gameObject.a = 100;
            this.gameObject = gameObject;
        }
        Test.prototype.init = function () {
            this.isInit = true;
        };
        Test.prototype.update = function (time) {
            this.time = time;
            this.gameObject.a++;
        };
        Test.prototype.onEnter = function () {
            this.a++;
        };
        Test.prototype.onStartLoop = function () {
            this.b++;
        };
        Test.prototype.onEndLoop = function () {
            this.b -= 2;
        };
        Test.prototype.onExit = function () {
            this.a--;
        };
        Test.prototype.onDispose = function () {
        };
        return Test;
    })();


    var Test2 = (function () {
        function Test2(gameObject) {
            this.gameObject = null;
            this.gameObject = gameObject;
        }
        Test2.prototype.init = function () {
        };
        Test2.prototype.update = function (time) {
            wd.ScriptComponentContainer.getInstance().findScript(this.gameObject, "test").update(time);
        };
        Test2.prototype.onEnter = function () {
        };
        Test2.prototype.onStartLoop = function () {
        };
        Test2.prototype.onEndLoop = function () {
        };
        Test2.prototype.onExit = function () {
        };
        Test2.prototype.onDispose = function () {
        };
        return Test2;
    }());

    function createCamera(){
        return testTool.createCamera();
    }

    function testScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody){
        var gameObject = wd.GameObject.create();

        scriptTool.testScriptNotLoadScript(gameObject, {
            scriptName: "test",
            class: Test,
            judgeOnEnter: judgeOnEnter,
            judgeBeforeLoopBody: judgeBeforeLoopBody,
            judgeAfterLoopBody: judgeAfterLoopBody
        });
    }

    function testTwoScriptNotLoadScript(judgeTest1OnEnter, judgeTest2OnEnter, judgeBeforeLoopBody, judgeAfterLoopBody){
        var gameObject = wd.GameObject.create();

        scriptTool.testTwoScriptsNotLoadScript(gameObject, {
            scriptName: "test",
            class: Test,
            judgeOnEnter: judgeTest1OnEnter,
            judgeBeforeLoopBody: judgeBeforeLoopBody,
            judgeAfterLoopBody: judgeAfterLoopBody
        }, {
            scriptName: "test2",
            class: Test2,
            judgeOnEnter: judgeTest2OnEnter
        });
    }

    function testTwoScript(judgeTest1OnEnter, judgeTest2OnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        wd.LoaderManager.getInstance().load([
            {type:wd.EAssetType.SCRIPT, url: url1, id: "id1"},
            {type:wd.EAssetType.SCRIPT, url: url2, id: "id2"}
        ]).subscribe(null, null, function () {
            var script2 = wd.Script.create();
            var gameObject = wd.GameObject.create();

            // script.url = url1;
            script.id = "id1";
            // script2.url = url2;
            script2.id = "id2";

            gameObject.addComponent(script);
            gameObject.addComponent(script2);

            scriptTool.testTwoScript(gameObject, {
                scriptName: "test",
                class: Test,
                judgeOnEnter: judgeTest1OnEnter,
                judgeBeforeLoopBody: judgeBeforeLoopBody,
                judgeAfterLoopBody: judgeAfterLoopBody
            }, {
                scriptName: "test2",
                class: Test2,
                judgeOnEnter: judgeTest2OnEnter
            }, done);

            done();
        });

    }

    function testSceneScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody){
        scriptTool.testScriptNotLoadScript(director.scene, {
            scriptName: "test",
            class: Test,
            judgeOnEnter: judgeOnEnter,
            judgeBeforeLoopBody: judgeBeforeLoopBody,
            judgeAfterLoopBody: judgeAfterLoopBody
        });
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
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("add script component", function(){
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
        });
    });
    it("test director->scene's script", function(){
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
        });
    });

    it("exec script->init after all children's and all components' init is executed", function () {
        wd.LoaderManager.getInstance().load([
            {type:wd.EAssetType.SCRIPT, url: url1, id: "id1"}
        ]).subscribe(null, null, function () {
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            var gameObject = wd.GameObject.create();

            script.id = "id1";

            gameObject.addComponent(script);

            var geometry = wd.RectGeometry.create();

            sandbox.stub(geometry, "init");


            gameObject.addComponent(geometry);


            var child = wd.GameObject.create();

            sandbox.stub(child, "init");

            gameObject.addChild(child);


            director.scene.addChild(gameObject);


            var test = wd.ScriptComponentContainer.getInstance().findScript(gameObject, "test");
            sandbox.stub(test, "init");






            director._init();



            expect(test.init).toCalledAfter(child.init);
            expect(test.init).toCalledAfter(geometry.init);
        });
    });

    describe("one gameObject can has multi script components", function(){
        it("script should be exected in added order", function(){
            testTwoScriptNotLoadScript(function(test){
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
                //expect(test.init).toCalledBefore(test2.onEnter);
                expect(test.init).toCalledAfter(test2.onEnter);
                expect(test.init).toCalledBefore(test2.init);
            }, function(test, test2, time, gameObject){
                expect(test.update).toCalledWith(time);
                expect(test.time).toEqual(100);
                expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

                expect(test2.update).toCalledWith(time);
                expect(test2.onStartLoop).toCalledBefore(test2.onEndLoop);

                director.scene.removeChild(gameObject);
                expect(test.onExit).toCalledOnce();

                expect(test2.onExit).toCalledOnce();
            });
        });
    });

    it("can load js file of relative or absolute path", function(){
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
        });
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
        it("comunicate with the gameObject's script component according to visitting it directly", function(){
            testTwoScriptNotLoadScript(function(test){
                sandbox.spy(test, "update");
            }, function(test2){
                sandbox.spy(test2, "update");
            }, function(test, test2){
            }, function(test, test2, time, gameObject){
                expect(test.update).toCalledTwice();
                expect(test2.update).toCalledOnce();
                expect(gameObject.a).toEqual(102);
            });
        });
    });

    it("test remove script", function(){
        testScript(function(test){
            sandbox.spy(test, "update");
        }, function(test, entityObject){
            expect(entityObject.scriptManager.hasChild(test)).toBeTruthy();

            wd.ScriptComponentContainer.getInstance().removeChild(entityObject, test);

            expect(entityObject.scriptManager.hasChild(test)).toBeFalsy();
        }, function(test, time, gameObject){
            expect(test.update).not.toCalled();
        });
    });
});
