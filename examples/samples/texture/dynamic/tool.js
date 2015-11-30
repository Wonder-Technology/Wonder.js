var tool = {
    skybox: null,
    box: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,

    addSkybox: function () {
        var material = dy.SkyboxMaterial.create();
        material.envMap = dy.CubemapTexture.create(
            [
                {
                    asset: dy.LoaderManager.getInstance().get("px")
                },
                {
                    asset: dy.LoaderManager.getInstance().get("nx")
                },
                {
                    asset: dy.LoaderManager.getInstance().get("py")
                },
                {
                    asset: dy.LoaderManager.getInstance().get("ny")
                },
                {
                    asset: dy.LoaderManager.getInstance().get("pz")
                },
                {
                    asset: dy.LoaderManager.getInstance().get("nz")
                }
            ]
        );

        var geometry = dy.BoxGeometry.create();
        geometry.material = material;
        geometry.width = 100;
        geometry.height = 100;
        geometry.depth = 100;


        this.skybox = dy.Skybox.create();
        this.skybox.addComponent(geometry);


        var director = dy.Director.getInstance();

        director.scene.addChild(this.skybox);
    },
    addBox: function () {
        this.box1 = dy.GameObject.create();
        this.box2 = dy.GameObject.create();
        this.box3 = dy.GameObject.create();
        this.box4 = dy.GameObject.create();
        this.box5 = dy.GameObject.create();
        this.box6 = dy.GameObject.create();


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("#ffffff");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box1.addComponent(dy.MeshRenderer.create());
        this.box1.addComponent(geometry);


        var action = dy.RepeatForever.create(dy.CallFunc.create(function () {
            this.box1.transform.rotateAround(0.5, dy.Vector3.create(0, 0, 0), dy.Vector3.up);
        }, this));

        this.box1.addComponent(action);


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("rgb(0, 255, 255)");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box2.addComponent(dy.MeshRenderer.create());
        this.box2.addComponent(geometry);


        this.box2.transform.translate(-40, 0, 40);


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("rgb(255, 0, 255)");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box3.addComponent(dy.MeshRenderer.create());
        this.box3.addComponent(geometry);


        this.box3.transform.translate(-80, 0, 0);


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("rgb(0, 0, 255)");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box4.addComponent(dy.MeshRenderer.create());
        this.box4.addComponent(geometry);


        this.box4.transform.translate(-40, 0, -40);


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("rgb(0, 255, 0)");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box5.addComponent(dy.MeshRenderer.create());
        this.box5.addComponent(geometry);


        this.box5.transform.translate(-40, 40, 0);


        var material = dy.BasicMaterial.create();
        material.color = dy.Color.create("#999999");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box6.addComponent(dy.MeshRenderer.create());
        this.box6.addComponent(geometry);


        this.box6.transform.translate(-40, -40, 0);

        var director = dy.Director.getInstance();

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
        var sphere = dy.GameObject.create();


        var texture = dy.DynamicCubemapTexture.create();
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


        var material = dy.BasicMaterial.create();
        material.envMap = texture;
        material.color = dy.Color.create("#ffffff");
        material.shading = dy.Shading.SMOOTH;
        setFunc(material);


        var geometry = dy.SphereGeometry.create();
        geometry.radius = 10;
        geometry.segments = 20;


        geometry.material = material;


        sphere.addComponent(dy.MeshRenderer.create());
        sphere.addComponent(geometry);


        sphere.transform.translate(-40, 0, 0);


        var director = dy.Director.getInstance();
        director.scene.addChild(sphere);
    },
    addCamera: function () {
        var camera = dy.GameObject.create(),
            view = dy.Director.getInstance().view,
            cameraComponent = dy.PerspectiveCamera.create();

        cameraComponent.fovy = 60;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        var controller = dy.FlyCameraController.create(cameraComponent);
        camera.addComponent(controller);

        camera.transform.translateLocal(dy.Vector3.create(0, 0, 30));
        camera.transform.lookAt(dy.Vector3.create(-40, 0, 0));

        var director = dy.Director.getInstance();

        director.scene.addChild(camera);
    }
};





