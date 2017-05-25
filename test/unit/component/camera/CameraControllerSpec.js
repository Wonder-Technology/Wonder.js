describe("CameraController", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;
    var gameObject;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;
    var CameraControllerData = wd.CameraControllerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectTool.getComponent(cameraGameObject, wd.CameraController);

        gameObject = data.gameObject;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getWorldToCameraMatrixCamera", function() {
        beforeEach(function(){

        });

        describe("test cache", function(){
            var mat;
            var transform, position,pos;

            beforeEach(function(){
                transform = gameObjectTool.getTransform(cameraGameObject);
                position;
                pos = 0;

                mat = Matrix4.create().setTranslate(1,2,3);
                position = mat.getTranslation();
                threeDTransformTool.setPosition(transform, position);

                gl.getUniformLocation.withArgs(sinon.match.any, "u_vMatrix").returns(pos);
            });
            it("cache data", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.clone().invert().values);


                directorTool.loopBody(state);

                expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.clone().invert().values);
            });
            it("update should clear cache", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                var mat2 = Matrix4.create().setTranslate(10,2,3),
                    position2 = mat2.getTranslation();
                threeDTransformTool.setPosition(transform, position2);

                directorTool.loopBody(state);

                expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat2.clone().invert().values);
            });
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove from gameObject", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(gameObjectTool.hasComponent(gameObject, wd.CameraController)).toBeFalsy();
            expect(cameraControllerTool.getGameObject(cameraController)).toBeUndefined();
        });
        it("remove worldToCameraMatrix", function () {
            directorTool.loopBody(state);

            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(CameraControllerData.worldToCameraMatrixCacheMap[cameraController.index]).toBeUndefined();
        });
        it("remove from dirtyIndexArray", function () {
            cameraControllerTool.setCameraFar(cameraController, 200);
            cameraControllerTool.setCameraNear(cameraController, 0.1);

            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(CameraControllerData.dirtyIndexArray).toEqual([])
        });
    });
});
