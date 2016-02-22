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

        function judgeClearCacheOnEndLoop(getMethod, getAttr, eventName){
            sandbox.stub(controller, getMethod).returns(matrix);
            var m1 = controller[getAttr];

            wd.EventManager.trigger(wd.CustomEvent.create(eventName));

            var m2 = controller[getAttr];

            expect(m1 === m2).toBeTruthy();
            expect(controller[getMethod]).toCalledTwice();
        }

        function judgeClearCacheOnTransform(getMethod, getAttr, eventName){
            sandbox.stub(controller, getMethod).returns(matrix);
            var m1 = controller[getAttr];

            wd.EventManager.trigger(controller.entityObject, wd.CustomEvent.create(eventName));

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

        it("clear worldToCameraMatrix cache on EndLoop event", function () {
            judgeClearCacheOnEndLoop("_getWorldToCameraMatrix", "worldToCameraMatrix", wd.EEngineEvent.ENDLOOP);
        });
        it("clear worldToCameraMatrix cache on TRANSFORM_TRANSLATE event", function () {
            judgeClearCacheOnTransform("_getWorldToCameraMatrix", "worldToCameraMatrix", wd.EEngineEvent.TRANSFORM_TRANSLATE);
        });
        it("clear worldToCameraMatrix cache on TRANSFORM_ROTATE event", function () {
            judgeClearCacheOnTransform("_getWorldToCameraMatrix", "worldToCameraMatrix", wd.EEngineEvent.TRANSFORM_ROTATE);
        });
        it("clear worldToCameraMatrix cache on TRANSFORM_SCALE event", function () {
            judgeClearCacheOnTransform("_getWorldToCameraMatrix", "worldToCameraMatrix", wd.EEngineEvent.TRANSFORM_SCALE);
        });
    });

    describe("dispose", function(){
        beforeEach(function(){

        });

        it("unbind clear cache event", function(){
            var object = wd.GameObject.create();
            object.addComponent(controller);
            controller.init();
            var m1 = controller.cameraToWorldMatrix;

            controller.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.TRANSFORM_TRANSLATE));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.TRANSFORM_ROTATE));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.TRANSFORM_SCALE));

            expect(controller._cameraToworldMatrixCache).not.toBeNull();
        });
    });
});

