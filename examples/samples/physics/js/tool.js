var tool = {
    createAmbientLight: function () {
        var ambientLightComponent = wd.AmbientLight.create();
        ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

        var ambientLight = wd.GameObject.create();
        ambientLight.addComponent(ambientLightComponent);

        return ambientLight;
    },
    createDirectionLight: function () {
        var SHADOW_MAP_WIDTH = 1024,
            SHADOW_MAP_HEIGHT = 1024;

        var directionLightComponent = wd.DirectionLight.create();
        directionLightComponent.color = wd.Color.create("#ffffff");
        directionLightComponent.intensity = 1;

        //if(shadowList){
        directionLightComponent.castShadow = true;
        directionLightComponent.shadowCameraLeft = -100;
        directionLightComponent.shadowCameraRight = 100;
        directionLightComponent.shadowCameraTop = 100;
        directionLightComponent.shadowCameraBottom = -100;
        directionLightComponent.shadowCameraNear = 0.1;
        directionLightComponent.shadowCameraFar = 1000;
        directionLightComponent.shadowBias = 0.002;
        directionLightComponent.shadowDarkness = 0.2;
        directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
        directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

        //}


        var directionLight = wd.GameObject.create();
        directionLight.addComponent(directionLightComponent);

        directionLight.transform.translate(wd.Vector3.create(0, 100, 50));

        return directionLight;
    },
    createGround: function () {
        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("#dddddd");

        var geometry = wd.BoxGeometry.create();
        geometry.material = material;
        geometry.width = 100;
        geometry.height = 1;
        geometry.depth = 100;


        var collision = wd.BoxCollider.create();


        var rigidBody = wd.StaticRigidBody.create();


        var gameObject = wd.GameObject.create();
        gameObject.addComponent(geometry);
        gameObject.addComponent(collision);
        gameObject.addComponent(rigidBody);

        gameObject.addComponent(wd.MeshRenderer.create());

        var shadow = wd.Shadow.create();
        shadow.cast = false;
        shadow.receive = true;

        gameObject.addComponent(shadow);


        gameObject.transform.translate(0, -2.5, 0);


        return gameObject;
    },
    createCamera: function (distance,target) {
            var camera = wd.GameObject.create(),
                    view = wd.Director.getInstance().view,
                    cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.distance = distance || 30;
        if(target){
            controller.target = target;
        }

            camera.addComponent(controller);

            return camera;
    }
}
