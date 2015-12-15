var tool = {
    createAmbientLight: function () {
        var ambientLightComponent = wd.AmbientLight.create();
        ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

        var ambientLight = wd.GameObject.create();
        ambientLight.addComponent(ambientLightComponent);

        return ambientLight;
    },
    createDirectionLight: function (shadowList) {
        var SHADOW_MAP_WIDTH = 1024,
            SHADOW_MAP_HEIGHT = 1024;

        var directionLightComponent = wd.DirectionLight.create();
        directionLightComponent.color = wd.Color.create("#ffffff");
        directionLightComponent.intensity = 1;
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

        directionLightComponent.shadowRenderList = shadowList;


        var directionLight = wd.GameObject.create();
        directionLight.addComponent(directionLightComponent);

        directionLight.transform.translate(wd.Vector3.create(0, 10, 5));

        return directionLight;
    },
    createGround: function () {
        var map = wd.LoaderManager.getInstance().get("ground").toTexture();
        map.wrapS = wd.TextureWrapMode.REPEAT;
        map.wrapT = wd.TextureWrapMode.REPEAT;
        map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


        var material = wd.LightMaterial.create();
        material.diffuseMap = map;


        var plane = wd.PlaneGeometry.create();
        plane.width = 200;
        plane.height = 200;
        plane.material = material;


        var gameObject = wd.GameObject.create();
        gameObject.addComponent(wd.MeshRenderer.create());
        gameObject.addComponent(plane);

        gameObject.transform.translate(0, -10, 0);

        return gameObject;
    },
    createCamera: function (distance) {
        var camera = wd.GameObject.create(),
            view = wd.Director.getInstance().view,
            cameraComponent = wd.PerspectiveCamera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        var controller = wd.BasicCameraController.create(cameraComponent);

        camera.addComponent(controller);

        camera.transform.translate(0, distance, distance);
        camera.transform.lookAt(0, 0, 0);

        return camera;
    }
}
