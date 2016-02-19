describe("CameraController", function () {
    var sandbox = null;
    var controller = null;
    var cameraComponent = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        cameraComponent = wd.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = new wd.CameraController(cameraComponent);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("test cache", function(){
        var matrix;
        var object;

        function judgeClearCache(getMethod, getAttr){
            sandbox.stub(controller, getMethod).returns(matrix);
            var m1 = controller[getAttr];

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            var m2 = controller[getAttr];

            expect(m1 === m2).toBeTruthy();
            expect(controller[getMethod]).toCalledTwice();
        }

        beforeEach(function(){
            matrix = wd.Matrix4.create();
            object = wd.GameObject.create();
            object.addComponent(controller);
            controller.init();
        });

        describe("worldToCameraMatrix(getter)", function(){
            beforeEach(function(){
                sandbox.spy(controller, "_getWorldToCameraMatrix");
            });

            it("if entityObject is transform, not cache", function () {
                var m1 = controller.worldToCameraMatrix;
                object.transform.rotate(1,1,1);
                var m2 = controller.worldToCameraMatrix;

                expect(m1 === m2).toBeFalsy();
                expect(controller._getWorldToCameraMatrix).toCalledTwice();
            });
            it("else, cache", function () {
                var m1 = controller.worldToCameraMatrix;
                var m2 = controller.worldToCameraMatrix;

                expect(m1 === m2).toBeTruthy();
                expect(controller._getWorldToCameraMatrix).toCalledOnce();
            });
        });

        it("clear worldToCameraMatrix cache on EndLoop", function () {
            judgeClearCache("_getWorldToCameraMatrix", "worldToCameraMatrix");
        });
    });

    describe("dispose", function(){
        beforeEach(function(){

        });

        it("unbind endloop event", function(){
            var object = wd.GameObject.create();
            object.addComponent(controller);
            controller.init();
            var m1 = controller.cameraToWorldMatrix;

            controller.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(controller._cameraToworldMatrixCache).not.toBeNull();
        });
    });
});

