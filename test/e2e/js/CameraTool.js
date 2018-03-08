var CameraTool = (function () {
    return {
        createCamera: function (state) {
            var data = wd.createBasicCameraView(state);
            var state = data[0];
            var basicCameraView = data[1];

            state = wd.setPerspectiveCameraNear(basicCameraView, 0.1, state);
            state = wd.setPerspectiveCameraFar(basicCameraView, 2000, state);
            state = wd.setPerspectiveCameraFovy(basicCameraView, 60, state);
            state = wd.setPerspectiveCameraAspect(basicCameraView, 1.0, state);


            state = wd.setBasicCameraViewPerspectiveCamera(basicCameraView, state);



            var data = wd.createGameObject(state);
            var state = data[0];
            var obj = data[1];

            state = wd.addGameObjectBasicCameraViewComponent(obj, basicCameraView, state);

            var transform = wd.getGameObjectTransformComponent(obj, state);

            state = wd.setTransformLocalPosition(transform, [0, 0, 1500], state);

            return [state, obj];
        }
    }
})();