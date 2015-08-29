//todo test stop loop

//todo pass it

describe("Director", function () {
    var sandbox = null;
    var director = null;

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

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        director = dy.Director.getInstance();
        sandbox.stub(window.performance, "now").returns(0);
        sandbox.stub(director, "gl", testTool.buildFakeGl(sandbox));
        //sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        sandbox.stub(dy.GPUDetector.getInstance(), "detect");
        director.stage.addChild(createCamera());
    });
    afterEach(function () {
        dy.Director._instance = null;
        sandbox.restore();
    });

    describe("tick", function(){
        afterEach(function(){
            director.stop();
        });

        it("gameTime is in seconds", function(){
            director._loopBody(100);

            expect(director.gameTime).toEqual(0.1);
        });

        describe("update fps", function () {
            it("if the updating is the first time, fps will be initial 60", function () {
                director._loopBody(1);

                expect(director.fps).toEqual(60);
            });

            it("compute the actual fps", function () {
                director._loopBody(100);
                director._loopBody(1100);

                expect(director.fps).toEqual(1000 / (1100 - 100));
            });
        });

        describe("start,stop", function(){
            it("test gameTime", function(){
                director.start();
                var result = director._loopBody(100);
                director.stop();

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.1);

                window.performance.now.returns(200);
                result = director._loopBody(200);
                director.start();

                expect(result).toBeFalsy();
                expect(director.gameTime).toEqual(0.1);

                result = director._loopBody(300);
                director.stop();

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.1);

                window.performance.now.returns(500);
                result = director._loopBody(500);
                director.start();

                expect(result).toBeFalsy();
                expect(director.gameTime).toEqual(0.1);

                result = director._loopBody(1000);

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.5);
            });
            it("start/stop scheduler", function(){
                var sum = 0;

                director.scheduler.scheduleLoop(function(data){
                    sum += data
                }, [1]);

                director.start();

                director._loopBody(1);
                director.stop();
                expect(sum).toEqual(1);

                window.performance.now.returns(2);
                director._loopBody(2);
                director.start();
                expect(sum).toEqual(1);

                director._loopBody(100);
                expect(sum).toEqual(2);
            });
            it("start/stop loop", function(){
                director.start();
                sandbox.stub(director._gameLoop, "dispose");

                director._loopBody(100);
                director.stop();

                expect(director._gameLoop.dispose).toCalledOnce();
            });
        });

        describe("pause,resume", function(){
            it("test gameTime", function(){
                director.start();

                window.performance.now.returns(100);
                var result = director._loopBody(100);
                director.pause();

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.1);

                window.performance.now.returns(200);
                result = director._loopBody(200);
                director.resume();

                expect(result).toBeFalsy();
                expect(director.gameTime).toEqual(0.1);

                window.performance.now.returns(300);
                result = director._loopBody(300);
                director.pause();

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.2);

                window.performance.now.returns(500);
                result = director._loopBody(500);
                director.resume();

                expect(result).toBeFalsy();
                expect(director.gameTime).toEqual(0.2);

                result = director._loopBody(1000);

                expect(result).toBeTruthy();
                expect(director.gameTime).toEqual(0.7);
            });
            it("pause/resume scheduler", function(){
                var sum = 0;

                director.scheduler.scheduleInterval(function(data){
                    sum += data
                }, 100, [1]);

                director.start();

                window.performance.now.returns(100);
                director._loopBody(100);
                director.pause();
                expect(sum).toEqual(1);

                window.performance.now.returns(300);
                director._loopBody(300);
                director.resume();
                expect(sum).toEqual(1);

                director._loopBody(350);
                expect(sum).toEqual(1);

                director._loopBody(400);
                expect(sum).toEqual(2);
            });
        });

        it("if start or resume, CommonTimeController->getNow will return Director->elapsed", function(){
            var sum = 0;

            director.scheduler.scheduleInterval(function(){
                sum += 1;
            }, 100);

            director.start();

            director._loopBody(50);
            director.stop();
            expect(sum).toEqual(0);

            window.performance.now.returns(300);
            director._loopBody(300);
            director.start();
            expect(sum).toEqual(0);

            window.performance.now.returns(350);
            director._loopBody(350);
            director.pause();
            expect(sum).toEqual(0);

            window.performance.now.returns(400);
            director._loopBody(400);
            director.resume();
            expect(sum).toEqual(0);

            director._loopBody(410);
            expect(sum).toEqual(0);

            director._loopBody(450);
            expect(sum).toEqual(1);
        });
    });
});
