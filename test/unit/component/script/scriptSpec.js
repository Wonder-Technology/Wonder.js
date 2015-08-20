describe("script", function () {
    var sandbox = null;
    var script = null;
    var director = null;
    var url1 = null;
    var url2 = null;

    function createCamera(){
        var camera = dy.GameObject.create(),
            cameraComponent = dy.Camera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 100;

        camera.addComponent(cameraComponent);

        return camera;
    }

    function testScript(judgeInit, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        var gameObject = dy.GameObject.create();

        script.url = url1;

        gameObject.addComponent(script);

        var test = null;
        var init = director.stage.init;
        director.stage.init = function(){
            test = gameObject.script.getChild("test");

            judgeInit(test, gameObject);

            init.call(director.stage);
        };

        director.stage.addChild(gameObject);

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

    function testTwoScript(judgeInit, judgeBeforeLoopBody, judgeAfterLoopBody, done){
        var script2 = dy.Script.create();
        var gameObject = dy.GameObject.create();

        script.url = url1;
        script2.url = url2;

        gameObject.addComponent(script);
        gameObject.addComponent(script2);

        var test = null;
        var test2 = null;
        var init = director.stage.init;
        director.stage.init = function(){
            test = gameObject.script.getChild("test");
            test2 = gameObject.script.getChild("test2");

            judgeInit(test, test2, gameObject);

            init.call(director.stage);
        };

        director.stage.addChild(gameObject);

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

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        script = dy.Script.create();
        director = dy.Director.getInstance();
        sandbox.stub(window.performance, "now").returns(0);
        director.gl = testTool.buildFakeGl(sandbox);
        director.stage.addChild(createCamera());

        url1 = testTool.resPath + "test/res/test.js";
        url2 = testTool.resPath + "test/res/test2.js";
    });
    afterEach(function () {
        $("script").remove();
        dy.Director._instance = null;
        dy.JsLoader._instance = null;
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
            expect(test.onEnter).toCalledOnce();
            expect(test.a).toEqual(1);
        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            expect(test.b).toEqual(-1);

            director.stage.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            expect(test.b).toEqual(-1);
        }, done);
    });

    it("only load script once at first time of Director->start", function(){
        sandbox.stub(dyRt, "intervalRequest").returns(
            dyRt.empty()
        );
        sandbox.spy(dyRt, "fromCollection");
        var script = dy.Script.create();
        var gameObject = dy.GameObject.create();

        script.url = url1;

        director.stage.addChild(gameObject);

        director.start();
        director.stop();
        director.start();

        expect(dyRt.fromCollection).toCalledThrice();
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
            expect(test.onEnter).toCalledOnce();
            expect(test.a).toEqual(1);

            expect(test2.init).toCalledOnce();
            expect(test2.onEnter).toCalledOnce();
        }, function(test, test2, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(100);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            expect(test.b).toEqual(-1);

            expect(test2.update).toCalledWith(time);
            expect(test2.onStartLoop).toCalledBefore(test2.onEndLoop);

            director.stage.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            expect(test.b).toEqual(-1);

            expect(test2.onExit).toCalledOnce();
        }, done);
    });
    it("can load js file of relative or absolute path", function(done){
        url1 = "http://localhost:9876/" + testTool.resPath + "test/res/test.js";

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
            expect(test.a).toEqual(1);
        }, function(test, time, gameObject){
            expect(test.update).toCalledWith(time);
            expect(test.time).toEqual(time);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            expect(test.b).toEqual(-1);

            director.stage.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            expect(test.b).toEqual(-1);
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
        it("comunicate with the same gameObject's or the other gameObject's script component according to visitting it directly", function(done){
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
