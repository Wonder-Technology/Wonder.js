var tool = (function () {
    return {
        createBasicCamera: function (canvas) {
            var camera = dy.GameObject.create();

            var cameraComponent = dy.PerspectiveCamera.create();
            cameraComponent.fovy = 60;
            cameraComponent.aspect = canvas.width / canvas.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 100;

            var controller = dy.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(dy.Vector3.create(0, 0, 30));


            return camera;
        }
    }
})();
