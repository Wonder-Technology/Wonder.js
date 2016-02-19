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

        function clearCacheJudge(getMethod, getAttr){
            sandbox.stub(controller, getMethod).returns(matrix);
            var m1 = controller[getAttr];

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            var m2 = controller[getAttr];

            expect(m1 === m2).toBeTruthy();
            expect(controller[getMethod]).toCalledTwice();
        }

        beforeEach(function(){
            matrix = wd.Matrix4.create();
            var object = wd.GameObject.create();
            object.addComponent(controller);
            controller.init();
        });

        it("cameraToWorldMatrix(getter)", function(){
            sandbox.spy(controller, "_getCameraToWorldMatrix");

            var m1 = controller.cameraToWorldMatrix;
            var m2 = controller.cameraToWorldMatrix;

            expect(m1 === m2).toBeTruthy();
            expect(controller._getCameraToWorldMatrix).toCalledOnce();
        });
        it("worldToCameraMatrix(getter)", function(){
            sandbox.spy(controller, "_getWorldToCameraMatrix");

            var m1 = controller.worldToCameraMatrix;
            var m2 = controller.worldToCameraMatrix;

            expect(m1 === m2).toBeTruthy();
            expect(controller._getWorldToCameraMatrix).toCalledOnce();
        });
        it("pMatrix(getter)", function(){
            sandbox.spy(controller, "_getPMatrix");

            var m1 = controller.pMatrix;
            var m2 = controller.pMatrix;

            expect(m1 === m2).toBeTruthy();
            expect(controller._getPMatrix).toCalledOnce();
        });

        it("clear cameraToWorldMatrix cache on EndLoop", function () {
            clearCacheJudge("_getCameraToWorldMatrix", "cameraToWorldMatrix");
        });
        it("clear worldToCameraMatrix cache on EndLoop", function () {
            clearCacheJudge("_getWorldToCameraMatrix", "worldToCameraMatrix");
        });
        it("clear pMatrix cache on EndLoop", function () {
            clearCacheJudge("_getPMatrix", "pMatrix");
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

