var sceneTool = (function(){
    return {
        createAmbientLight: function (color) {
            var color = color || wd.Color.create("rgb(30, 30, 30)");

            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = color;

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        },
        createDirectionLight: function (position, color, intensity) {
            var position = position || wd.Vector3.create(10, 0, 0),
                color = color || wd.Color.create("#ffffff"),
                intensity = intensity || 1;

            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = color;
            directionLightComponent.intensity = intensity;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.position = position;

            return directionLight;
        },
        createCamera: function (distance, target) {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);

            if(distance){
                controller.distance = distance;

            }

            if(target){
                controller.target = target;
            }

            camera.addComponent(controller);

            return camera;
        }
    }
})();
