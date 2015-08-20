describe("script", function () {
    var sandbox = null;
    var script = null;
    var director = null;

    function createCamera(){
        var camera = dy.GameObject.create(),
            cameraComponent = dy.Camera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = canvas.width / canvas.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 100;

        camera.addComponent(cameraComponent);

        return camera;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        script = dy.Script.create();
        director = dy.Director.getInstance();
        sandbox.stub(window.performance, "now").returns(0);
        canvas = $("<canvas id='test'></canvas>");
        $("html").append(canvas);
        director.createGL("#test");
        director.stage.addChild(createCamera());
    });
    afterEach(function () {
        canvas.remove();
        dy.Director._instance = null;
        sandbox.restore();
    });

    it("add script component", function(done){
        var script = dy.Script.create();
        var gameObject = dy.GameObject.create();
        script.url = testTool.resPath + "test/res/test.js";

        gameObject.addComponent(script);

        var test = null;
        var init = director.stage.init;
        director.stage.init = function(){
            test = gameObject.script.getChild("test");
            sandbox.spy(test, "init");
            sandbox.spy(test, "update");
            sandbox.spy(test, "onStartLoop");
            sandbox.spy(test, "onEndLoop");
            sandbox.spy(test, "onEnter");
            sandbox.spy(test, "onExit");

            init.call(director.stage);
        };

        director.stage.addChild(gameObject);

        var loopBody = director._loopBody;
        director._loopBody = function(){
            var time = 100;

            expect(test.init).toCalledOnce();
            expect(test.isInit).toBeTruthy();
            expect(test.onEnter).toCalledOnce();
            expect(test.a).toEqual(1);

            loopBody.call(director, time);

            expect(test.time).toEqual(100);
            expect(test.onStartLoop).toCalledBefore(test.onEndLoop);
            expect(test.b).toEqual(-1);

            director.stage.removeChild(gameObject);
            expect(test.onExit).toCalledOnce();
            expect(test.b).toEqual(-1);

            director.stop();

            done();
        };

        director.start();
    });
    it("if load script error, stream will be ended and not invoke game loop", function(){

    });
    //it("one gameObject can only has one script component", function(){
    //
    //});
    it("one gameObject can has multi script components", function(){

    });
    it("can load js file of relative or absolute path", function(){

    });

    describe("communicate with other script component", function(){
        it("comunicate with the same gameObject's script component according to visitting it directly", function(){

        });
        it("comunicate with other gameObject's script component according to custom event", function(){

        });
    });
});
