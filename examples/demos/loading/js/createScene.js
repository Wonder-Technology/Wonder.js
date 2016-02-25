var scene = (function(){
    var director = wd.Director.getInstance();

    function initSample() {

        director.scene.addChild(createSkybox());
        director.scene.addChild(createSphere());
        director.scene.addChild(createCamera());

        director.start();
    }

    function createSkybox() {
        var cubemap = wd.CubemapTexture.create(
            [
                {
                    asset: wd.LoaderManager.getInstance().get("px")
                },
                {
                    asset: wd.LoaderManager.getInstance().get("nx")
                },
                {
                    asset: wd.LoaderManager.getInstance().get("py")
                },
                {
                    asset: wd.LoaderManager.getInstance().get("ny")
                },
                {
                    asset: wd.LoaderManager.getInstance().get("pz")
                },
                {
                    asset: wd.LoaderManager.getInstance().get("nz")
                }
            ]
        );

        var material = wd.SkyboxMaterial.create();
        material.envMap = cubemap;


        var geometry = wd.BoxGeometry.create();
        geometry.material = material;
        geometry.width = 5;
        geometry.height = 5;
        geometry.depth = 5;


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(wd.SkyboxRenderer.create());
        gameObject.addComponent(geometry);

        return gameObject;
    }

    function createSphere() {
        var material = wd.BasicMaterial.create();
        material.map = wd.LoaderManager.getInstance().get("texture");

        var geometry = wd.SphereGeometry.create();
        geometry.material = material;
        geometry.radius = 5;

        var gameObject = wd.GameObject.create();
        gameObject.addComponent(geometry);

        gameObject.addComponent(wd.MeshRenderer.create());

        return gameObject;
    }


    function createCamera() {
        var camera = wd.GameObject.create(),
            view = wd.Director.getInstance().view,
            cameraComponent = wd.PerspectiveCamera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        var controller = wd.FlyCameraController.create(cameraComponent);
        camera.addComponent(controller);

        camera.transform.translate(0, 0, 20);

        return camera;
    }

    return {
        initSample:initSample
    }
})();
