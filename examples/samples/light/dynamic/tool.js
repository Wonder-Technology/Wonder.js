var tool = {
    skybox: null,
    box: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,

    addSkybox: function () {
        var material = wd.SkyboxMaterial.create();
        material.envMap = wd.CubemapTexture.create(
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

        var geometry = wd.BoxGeometry.create();
        geometry.material = material;
        geometry.width = 100;
        geometry.height = 100;
        geometry.depth = 100;


        this.skybox = wd.Skybox.create();
        this.skybox.addComponent(geometry);


        var director = wd.Director.getInstance();

        director.scene.addChild(this.skybox);
    },
    addBox: function () {
        this.box1 = wd.GameObject.create();
        this.box2 = wd.GameObject.create();
        this.box3 = wd.GameObject.create();
        this.box4 = wd.GameObject.create();
        this.box5 = wd.GameObject.create();
        this.box6 = wd.GameObject.create();


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("#ffffff");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box1.addComponent(wd.MeshRenderer.create());
        this.box1.addComponent(geometry);


        var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
            this.box1.transform.rotateAround(0.5, wd.Vector3.create(0, 0, 0), wd.Vector3.up);
        }, this));

        this.box1.addComponent(action);


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("rgb(0, 255, 255)");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box2.addComponent(wd.MeshRenderer.create());
        this.box2.addComponent(geometry);


        this.box2.transform.translate(-40, 0, 40);


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("rgb(255, 0, 255)");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box3.addComponent(wd.MeshRenderer.create());
        this.box3.addComponent(geometry);


        this.box3.transform.translate(-80, 0, 0);


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("rgb(0, 0, 255)");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box4.addComponent(wd.MeshRenderer.create());
        this.box4.addComponent(geometry);


        this.box4.transform.translate(-40, 0, -40);


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("rgb(0, 255, 0)");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box5.addComponent(wd.MeshRenderer.create());
        this.box5.addComponent(geometry);


        this.box5.transform.translate(-40, 40, 0);


        var material = wd.LightMaterial.create();
        material.color = wd.Color.create("#999999");


        var geometry = wd.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box6.addComponent(wd.MeshRenderer.create());
        this.box6.addComponent(geometry);


        this.box6.transform.translate(-40, -40, 0);

        var director = wd.Director.getInstance();

        director.scene.addChild(this.box1);
        director.scene.addChild(this.box2);
        director.scene.addChild(this.box3);
        director.scene.addChild(this.box4);
        director.scene.addChild(this.box5);
        director.scene.addChild(this.box6);
    },
    addSphere: function (mode, setFunc) {
        var setFunc = setFunc || function () {
            };
        var sphere = wd.GameObject.create();


        var texture = wd.DynamicCubemapTexture.create();
        var list = [this.skybox, this.box1, this.box2, this.box3, this.box4, this.box5, this.box6];

        texture.renderList = {
            px: list,
            nx: list,
            py: list,
            ny: list,
            pz: list,
            nz: list
        };

        texture.near = 0.1;
        texture.far = 1000;
        texture.size = 256;
        texture.mode = mode;


        var material = wd.LightMaterial.create();
        material.envMap = texture;
        material.color = wd.Color.create("#ffffff");
        material.shading = wd.Shading.SMOOTH;
        setFunc(material);


        var geometry = wd.SphereGeometry.create();
        geometry.radius = 10;
        geometry.segments = 20;


        geometry.material = material;


        sphere.addComponent(wd.MeshRenderer.create());
        sphere.addComponent(geometry);


        sphere.transform.translate(-40, 0, 0);


        var director = wd.Director.getInstance();
        director.scene.addChild(sphere);
    },
    addLight: function () {
        var ambientLightComponent = wd.AmbientLight.create();
        ambientLightComponent.color = wd.Color.create("#444444");

        var ambientLight = wd.GameObject.create();
        ambientLight.addComponent(ambientLightComponent);


        var directionLightComponent = wd.DirectionLight.create();
        directionLightComponent.color = wd.Color.create("#ffffff");
        directionLightComponent.intensity = 2;


        var directionLight = wd.GameObject.create();
        directionLight.addComponent(directionLightComponent);


        directionLight.transform.translate(100, 30, 0);


        var director = wd.Director.getInstance();

        director.scene.addChild(ambientLight);
        director.scene.addChild(directionLight);
    },
    addCamera: function () {
        var camera = wd.GameObject.create(),
            view = wd.Director.getInstance().view,
            cameraComponent = wd.PerspectiveCamera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        var controller = wd.FlyCameraController.create(cameraComponent);
        camera.addComponent(controller);

        camera.transform.translateLocal(wd.Vector3.create(0, 0, 30));
        camera.transform.lookAt(wd.Vector3.create(-40, 0, 0));

        var director = wd.Director.getInstance();

        director.scene.addChild(camera);
    }
};





