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

        var test = null;
        var onEnter = director.scene.gameObjectScene.onEnter;
        director.scene.gameObjectScene.onEnter = function(){
            test = gameObject.scriptList.getChild("test");
            judgeOnEnter(test, gameObject);
            onEnter.call(director.scene);
        };

        director.scene.addChild(gameObject);

        var loopBody = director._loopBody;
        director._loopBody = function(){
            var time = 100;

            judgeBeforeLoopBody(test, gameObject);

            loopBody.call(director, time);

            judgeAfterLoopBody(test, time, gameObject);

            director.stop();

            done();
        };

        director.start();
    }

    function testTwoScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        var script2 = wd.Script.create();
        var gameObject = wd.GameObject.create();

        script.url = url1;
        script2.url = url2;

        gameObject.addComponent(script);
        gameObject.addComponent(script2);

        var test = null;
        var test2 = null;
        var onEnter = director.scene.gameObjectScene.onEnter;
        director.scene.gameObjectScene.onEnter = function(){
            test = gameObject.scriptList.getChild("test");
            test2 = gameObject.scriptList.getChild("test2");

            judgeOnEnter(test, test2, gameObject);

            onEnter.call(director.scene);
        };

        director.scene.addChild(gameObject);

        var loopBody = director._loopBody;
        director._loopBody = function(){
            var time = 100;

            judgeBeforeLoopBody(test, test2, gameObject);

            loopBody.call(director, time);

            judgeAfterLoopBody(test, test2, time, gameObject);

            director.stop();

            done();
        };

        director.start();
    }


    function testSceneScript(judgeOnEnter, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        script.url = url1;

        director.scene.addComponent(script);

        var test = null;
        var onEnter = director.scene.gameObjectScene.onEnter;
        director.scene.gameObjectScene.onEnter = function(){
            test = this.scriptList.getChild("test");
            judgeOnEnter(test, this);
            onEnter.call(director.scene.gameObjectScene);
        };

        var loopBody = director._loopBody;
        director._loopBody = function(){
            var time = 100;

            judgeBeforeLoopBody(test, director.scene);

            loopBody.call(director, time);

            judgeAfterLoopBody(test, time, director.scene);

            director.stop();

            done();
        };

        director.start();
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        script = wd.Script.create();
        director = wd.Director.getInstance();
        sandbox.stub(window.performance, "now").returns(0);
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.GPUDetector.getInstance(), "detect");
        director.scene.addChild(createCamera());

        url1 = testTool.resPath + "test/res/test.js";
        url2 = testTool.resPath + "test/res/test2.js";
    });
    afterEach(function () {
        $("script").remove();
        wd.Director._instance = null;
        wd.JsLoader._instance = null;
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

            /*!
            the script's onEnter,onExit before the loopBody is invoked will not be invoked, because the script is not loaded into engine at that time
             */

            //expect(test.onEnter).toCalledOnce();
            expect(test.onEnter).not.toCalled();

        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            //expect(test.b).toEqual(-1);

            director.scene.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            //expect(test.b).toEqual(-1);
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
            /*!
                scene->onEnter will be called, because it's invoked after the script is loaded
             */
            expect(test.onEnter).toCalledBefore(test.init);
        }, function(test, time, scene){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);

            scene.dispose();

            expect(test.onDispose).toCalledOnce();
        }, done);
    });

    it("only load script once at first time of Director->start", function(){
        sandbox.stub(wdFrp, "intervalRequest").returns(
            wdFrp.empty()
        );
        sandbox.spy(director, "_buildLoadScriptStream");
        var script = wd.Script.create();
        var gameObject = wd.GameObject.create();

        script.url = url1;

        director.scene.addChild(gameObject);

        director.start();
        director.stop();
        director.start();

        expect(director._buildLoadScriptStream.callCount).toEqual(1);
    });
    it("one gameObject can has multi script components", function(done){
        testTwoScript(function(test, test2){
            sandbox.spy(test, "init");
            sandbox.spy(test, "update");
            sandbox.spy(test, "onStartLoop");
            sandbox.spy(test, "onEndLoop");
            sandbox.spy(test, "onEnter");
            sandbox.spy(test, "onExit");

            sandbox.spy(test2, "init");
            sandbox.spy(test2, "update");
            sandbox.spy(test2, "onStartLoop");
            sandbox.spy(test2, "onEndLoop");
            sandbox.spy(test2, "onEnter");
            sandbox.spy(test2, "onExit");
        }, function(test, test2){
            expect(test.init).toCalledOnce();
            expect(test.isInit).toBeTruthy();
            //expect(test.onEnter).toCalledOnce();
            expect(test.onEnter).not.toCalled();
            //expect(test.a).toEqual(1);
            //expect(test.a).toEqual(0);

            expect(test2.init).toCalledOnce();
            //expect(test2.onEnter).toCalledOnce();
            expect(test2.onEnter).not.toCalled();
        }, function(test, test2, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(100);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            //expect(test.b).toEqual(-1);

            expect(test2.update).toCalledWith(time);
            expect(test2.onStartLoop).toCalledBefore(test2.onEndLoop);

            director.scene.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            //expect(test.b).toEqual(-1);

            expect(test2.onExit).toCalledOnce();
        }, done);
    });
    it("can load js file of relative or absolute path", function(done){
        url1 = "http://" + location.host + "/" + testTool.resPath + "test/res/test.js";

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
            //expect(test.onEnter).toCalledOnce();
            expect(test.onEnter).not.toCalled();
            //expect(test.a).toEqual(1);
        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            //expect(test.b).toEqual(-1);

            director.scene.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            //expect(test.b).toEqual(-1);
        }, done);
    });
    it("only load the the script(based on url) once", function(done){
        url2 = url1;
        testTwoScript(function(test, test2){
            expect(test).not.toBeUndefined();
            expect(test2).toBeUndefined();
        }, function(test, test2){
        }, function(test, test2, time, gameObject){
        }, done);
    });

    describe("communicate with other script component", function(){
        it("comunicate with the gameObject's script component according to visitting it directly", function(done){
            testTwoScript(function(test, test2){
                sandbox.spy(test, "update");
                sandbox.spy(test2, "update");
            }, function(test, test2){
            }, function(test, test2, time, gameObject){
                expect(test.update).toCalledTwice();
                expect(test2.update).toCalledOnce();
                expect(gameObject.a).toEqual(102);
            }, done);
        });
    });
});
