var CameraTool = (function () {
    return {
        createCamera: function (state) {
            var data = wd.createCameraController(state);
            var state = data[0];
            var cameraController = data[1];

            state = wd.setPerspectiveCameraNear(cameraController, 0.1, state);
            state = wd.setPerspectiveCameraFar(cameraController, 2000, state);
            state = wd.setPerspectiveCameraFovy(cameraController, 60, state);
            state = wd.setPerspectiveCameraAspect(cameraController, 1.0, state);


            state = wd.setCameraControllerPerspectiveCamera(cameraController, state);



            var data = wd.createGameObject(state);
            var state = data[0];
            var obj = data[1];

            state = wd.addGameObjectCameraControllerComponent(obj, cameraController, state);

            var transform = wd.getGameObjectTransformComponent(obj, state);

            state = wd.setTransformLocalPosition(transform, [0, 0, 15], state);

            return [state, obj];
        }
    }
})();