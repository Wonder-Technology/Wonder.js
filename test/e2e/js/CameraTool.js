var CameraTool = (function () {
    return {
        createCamera: function (state) {
            var data = wd.createBasicCameraView(state);
            var state = data[0];
            var basicCameraView = data[1];


            var data = wd.createPerspectiveCameraProjection(state);
            var state = data[0];
            var perspectiveCameraProjection = data[1];


            state = wd.setPerspectiveCameraNear(perspectiveCameraProjection, 0.1, state);
            state = wd.setPerspectiveCameraFar(perspectiveCameraProjection, 2000, state);
            state = wd.setPerspectiveCameraFovy(perspectiveCameraProjection, 60, state);
            state = wd.setPerspectiveCameraAspect(perspectiveCameraProjection, 1.0, state);




            var data = wd.createGameObject(state);
            var state = data[0];
            var obj = data[1];

            state = wd.addGameObjectBasicCameraViewComponent(obj, basicCameraView, state);

            state = wd.addGameObjectPerspectiveCameraProjectionComponent(obj, perspectiveCameraProjection, state);

            var transform = wd.unsafeGetGameObjectTransformComponent(obj, state);

            state = wd.setTransformLocalPosition(transform, [0, 0, 1500], state);

            return [state, obj];
        }
    }
})();