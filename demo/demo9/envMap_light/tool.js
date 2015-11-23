var tool = {
    skybox:null,
    box:null,
    box2:null,
    box3:null,
    box4:null,
    box5:null,
    box6:null,

    addSkybox:function(){
        var material = dy.SkyboxMaterial.create();
        material.color= dy.Color.create("rgba(255, 0, 0, 0.4)");


        var cubemap = dy.CubemapTexture.create(
            [
                {
                    asset:dy.TextureLoader.getInstance().get("texture1")
                },
                {
                    asset:dy.TextureLoader.getInstance().get("texture2")
                },
                {
                    asset:dy.TextureLoader.getInstance().get("texture3")
                },
                {
                    asset:dy.TextureLoader.getInstance().get("texture4")
                },
                {
                    asset:dy.TextureLoader.getInstance().get("texture5")
                },
                {
                    asset:dy.TextureLoader.getInstance().get("texture6")
                }
            ]
        );

        material.envMap = cubemap;



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
        this.box = dy.GameObject.create();
        this.box2 = dy.GameObject.create();
        this.box3 = dy.GameObject.create();
        this.box4 = dy.GameObject.create();
        this.box5 = dy.GameObject.create();
        this.box6 = dy.GameObject.create();


        var material = dy.LightMaterial.create();
        material.color = dy.Color.create("#ffffff");


        var geometry = dy.BoxGeometry.create();
        geometry.width = 10;
        geometry.height = 10;
        geometry.depth = 10;


        geometry.material = material;


        this.box.addComponent(dy.MeshRenderer.create());
        this.box.addComponent(geometry);


//            this.box.transform.translate(5, 0, 0);


        var action1 = dy.RepeatForever.create(dy.CallFunc.create(function () {
            this.box.transform.rotateAround(0.5, dy.Vector3.create(0, 0, 0), dy.Vector3.up);
        }, this));


        this.box.addComponent(action1);


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

        director.scene.addChild(this.box);
        director.scene.addChild(this.box2);
        director.scene.addChild(this.box3);
        director.scene.addChild(this.box4);
        director.scene.addChild(this.box5);
        director.scene.addChild(this.box6);
    },
    addSphere: function (mode, setFunc) {
        var setFunc = setFunc || function(){};
        var sphere = dy.GameObject.create();


        var texture = dy.DynamicCubemapTexture.create();
//            var list = [skybox];
//    var list = [skybox, box, box2, box3, box4, box5, box6];
        var list = [this.skybox, this.box, this.box2, this.box3, this.box4, this.box5, this.box6];
//            var list = [skybox, box];
//            var list = [ box];
        texture.renderList = {
            px: list,
            nx: list,
            py: list,
            ny: list,
            pz: list,
            nz: list
        };
//            texture.renderList = {
//                px:list,
//                nx:list,
//                py:list,
//                ny:list,
//                pz:list,
//                nz:list
//            };
        texture.near = 0.1;
        texture.far = 1000;
        texture.size = 256;

//            texture.mode = dy.EnvMapMode.REFLECTION;


        texture.mode = mode;


        var material = dy.LightMaterial.create();
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
    addLight: function () {
        var ambientLightComponent = dy.AmbientLight.create();
        ambientLightComponent.color = dy.Color.create("#444444");

        var ambientLight = dy.GameObject.create();
        ambientLight.addComponent(ambientLightComponent);


        var directionLightComponent = dy.DirectionLight.create();
        directionLightComponent.color = dy.Color.create("#ffffff");
        directionLightComponent.intensity = 2;


        var directionLight = dy.GameObject.create();
        directionLight.addComponent(directionLightComponent);


        directionLight.transform.translate(100, 30, 0);


        var director = dy.Director.getInstance();

        director.scene.addChild(ambientLight);
        director.scene.addChild(directionLight);
    },
    addCamera: function () {
        var camera = dy.GameObject.create();

        var cameraComponent = dy.PerspectiveCamera.create();


        cameraComponent.fovy = 60;
        cameraComponent.aspect = canvas.width / canvas.height;
        cameraComponent.near = 0.1;
        cameraComponent.far = 100;


        camera.addComponent(dy.FlyCameraController.create(cameraComponent));

        camera.transform.translateLocal(dy.Vector3.create(0, 0, 30));
        camera.transform.lookAt(dy.Vector3.create(-40, 0, 0));

        var director = dy.Director.getInstance();

        director.scene.addChild(camera);
    }
}





