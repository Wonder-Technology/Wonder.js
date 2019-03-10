var CameraTool = (function () {
    return {
        createCamera: function (state) {
            var record = wd.createBasicCameraView(state);
            var state = record[0];
            var basicCameraView = record[1];


            var state =
                wd.activeBasicCameraView(
                    basicCameraView, state
                );


            var record = wd.createPerspectiveCameraProjection(state);
            var state = record[0];
            var perspectiveCameraProjection = record[1];


            state = wd.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, state);
            state = wd.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 2000, state);
            state = wd.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, state);




            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            state = wd.addGameObjectBasicCameraViewComponent(obj, basicCameraView, state);



            state = wd.addGameObjectPerspectiveCameraProjectionComponent(obj, perspectiveCameraProjection, state);

            var transform = wd.unsafeGetGameObjectTransformComponent(obj, state);

            state = wd.setTransformLocalPosition(transform, [0, 0, 1500], state);

            return [state, obj];
        },
        createArcballCamera: function (cameraData, state) {
            var [state, camera] = CameraTool.createCamera(state);

            var [state, cameraController] = wd.createArcballCameraController(state);

            var state =
                wd.setArcballCameraControllerDistance(cameraController, cameraData.distance || 50, state);



            var state =
                wd.setArcballCameraControllerPhi(cameraController, cameraData.phi || Math.PI / 2, state);


            var state =
                wd.setArcballCameraControllerTheta(cameraController, cameraData.theta || Math.PI / 2, state);


            var state = wd.addGameObjectArcballCameraControllerComponent(camera, cameraController, state);

            return [state, camera]
        }
    }
})();