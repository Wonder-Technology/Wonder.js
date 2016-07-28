describe("water", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function(){
        describe("test bump", function(){
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/water/bump.png", id: "bump"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                    {url: "../../asset/texture/1.jpg", id: "sphere"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var sphere = createSphere();
                    var ground = createGround();

                    director.scene.addChild(skybox);
                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);
                    director.scene.addChild(createWater(skybox, sphere, ground));

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

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
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("sphere").toTexture();

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 20, 0);

                    return gameObject;
                }

                function createWater(skybox, sphere, ground) {
                    var material = wd.WaterMaterial.create();
                    material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                    //material.fresnelLevel = 0.5;
                    //material.refractionLevel = 0.8;
                    //material.reflectionLevel = 0.8;

                    material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                    //var reflectionTexture = wd.MirrorTexture.create();
                    //reflectionTexture.width = 512;
                    //reflectionTexture.height = 512;
                    //reflectionTexture.renderList = [skybox, sphere, ground];
                    //
                    //var refractionTexture = wd.RefractionTexture.create();
                    //refractionTexture.width = 512;
                    //refractionTexture.height = 512;
                    //refractionTexture.renderList = [skybox, sphere, ground];
                    //
                    //material.reflectionMap = reflectionTexture;
                    //material.refractionMap = refractionTexture;



                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createGround() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 0, 0);

                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 100, 100));

                    return directionLight;
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

                    camera.transform.translate(0, 20, 50);
                    camera.transform.lookAt(0, 10, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test only has bump texture", function(done){
                tester.compareAt(1, "water/water_bump.png", done);
            });
        });

        describe("test refraction", function(){
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/water/bump.png", id: "bump"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                    {url: "../../asset/texture/1.jpg", id: "sphere"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var sphere = createSphere();
                    var ground = createGround();

                    director.scene.addChild(skybox);
                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);
                    director.scene.addChild(createWater(skybox, sphere, ground));

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

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
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("sphere").toTexture();

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 20, 0);

                    return gameObject;
                }

                function createWater(skybox, sphere, ground) {
                    var material = wd.WaterMaterial.create();
                    material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                    material.fresnelLevel = 0.5;
                    material.refractionLevel = 0.8;
                    //material.reflectionLevel = 0.8;

                    material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                    //var reflectionTexture = wd.MirrorTexture.create();
                    //reflectionTexture.width = 512;
                    //reflectionTexture.height = 512;
                    //reflectionTexture.renderList = [skybox, sphere, ground];
                    //
                    var refractionTexture = wd.RefractionTexture.create();
                    refractionTexture.width = 512;
                    refractionTexture.height = 512;
                    refractionTexture.renderList = [skybox, sphere, ground];

                    //material.reflectionMap = reflectionTexture;
                    material.refractionMap = refractionTexture;



                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createGround() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 0, 0);

                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 100, 100));

                    return directionLight;
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

                    camera.transform.translate(0, 20, 50);
                    camera.transform.lookAt(0, 10, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test bump texture + refraction texture", function(done){
                tester.compareAt(1, "water/water_bump_refraction.png", done);
            });
        });

        describe("test reflection", function(){
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/water/bump.png", id: "bump"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                    {url: "../../asset/texture/1.jpg", id: "sphere"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var sphere = createSphere();
                    var ground = createGround();

                    director.scene.addChild(skybox);
                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);
                    director.scene.addChild(createWater(skybox, sphere, ground));

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

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
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("sphere").toTexture();

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 20, 0);

                    return gameObject;
                }

                function createWater(skybox, sphere, ground) {
                    var material = wd.WaterMaterial.create();
                    material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                    //material.fresnelLevel = 0.5;
                    //material.refractionLevel = 0.8;
                    material.reflectionLevel = 0.8;

                    material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                    var reflectionTexture = wd.MirrorTexture.create();
                    reflectionTexture.width = 512;
                    reflectionTexture.height = 512;
                    reflectionTexture.renderList = [skybox, sphere, ground];

                    //var refractionTexture = wd.RefractionTexture.create();
                    //refractionTexture.width = 512;
                    //refractionTexture.height = 512;
                    //refractionTexture.renderList = [skybox, sphere, ground];

                    material.reflectionMap = reflectionTexture;
                    //material.refractionMap = refractionTexture;



                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createGround() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 0, 0);

                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 100, 100));

                    return directionLight;
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

                    camera.transform.translate(0, 20, 50);
                    camera.transform.lookAt(0, 10, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test bump texture + reflection texture", function(done){
                tester.compareAt(1, "water/water_bump_reflection.png", done);
            });
        });

        describe("test fresnel", function(){
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/water/bump.png", id: "bump"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                    {url: "../../asset/texture/1.jpg", id: "sphere"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var sphere = createSphere();
                    var ground = createGround();

                    director.scene.addChild(skybox);
                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);
                    director.scene.addChild(createWater(skybox, sphere, ground));

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

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
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("sphere").toTexture();

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 20, 0);

                    return gameObject;
                }

                function createWater(skybox, sphere, ground) {
                    var material = wd.WaterMaterial.create();
                    material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                    material.fresnelLevel = 0.5;
                    material.refractionLevel = 0.8;
                    material.reflectionLevel = 0.8;

                    material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                    var reflectionTexture = wd.MirrorTexture.create();
                    reflectionTexture.width = 512;
                    reflectionTexture.height = 512;
                    reflectionTexture.renderList = [skybox, sphere, ground];

                    var refractionTexture = wd.RefractionTexture.create();
                    refractionTexture.width = 512;
                    refractionTexture.height = 512;
                    refractionTexture.renderList = [skybox, sphere, ground];

                    material.reflectionMap = reflectionTexture;
                    material.refractionMap = refractionTexture;



                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createGround() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 0, 0);

                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 100, 100));

                    return directionLight;
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

                    camera.transform.translate(0, 20, 50);
                    camera.transform.lookAt(0, 10, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test bump texture + fresnel", function(done){
                tester.compareAt(1, "water/water_bump_fresnel.png", done);
            });
        });

        describe("test change reflection,refraction texture", function(){
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/water/bump.png", id: "bump"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                    {url: "../../asset/texture/1.jpg", id: "sphere"},
                    {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                    {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                    {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                    {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                    {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                    {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var sphere = createSphere();
                    var ground = createGround();

                    var water = createWater(skybox, sphere, ground);
                    director.scene.addChild(skybox);
                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);
                    director.scene.addChild(water);

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

                    director.scene.addChild(createCamera());

                    director.start();



                    var renderList = [skybox, sphere, ground];

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        water.getComponent(wd.Geometry).material.reflectionMap.renderList = [];
                        water.getComponent(wd.Geometry).material.refractionMap.renderList = [];
                    }, 1);

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        water.getComponent(wd.Geometry).material.reflectionMap.renderList = renderList;
                        water.getComponent(wd.Geometry).material.refractionMap.renderList = renderList;
                    }, 2);
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
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("sphere").toTexture();

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 20, 0);

                    return gameObject;
                }

                function createWater(skybox, sphere, ground) {
                    var material = wd.WaterMaterial.create();
                    material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                    material.fresnelLevel = 0.5;
                    material.refractionLevel = 0.8;
                    material.reflectionLevel = 0.8;

                    material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                    var reflectionTexture = wd.MirrorTexture.create();
                    reflectionTexture.width = 512;
                    reflectionTexture.height = 512;
                    reflectionTexture.renderList = [skybox, sphere, ground];

                    var refractionTexture = wd.RefractionTexture.create();
                    refractionTexture.width = 512;
                    refractionTexture.height = 512;
                    refractionTexture.renderList = [skybox, sphere, ground];

                    material.reflectionMap = reflectionTexture;
                    material.refractionMap = refractionTexture;



                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createGround() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 50;
                    geometry.height = 50;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 0, 0);

                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 100, 100));

                    return directionLight;
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

                    camera.transform.translate(0, 20, 50);
                    camera.transform.lookAt(0, 10, 0);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test remove reflection and refraction texture", function(done){
                tester.compareAt(1, "water/water_remove_reflectionAndRefraction.png", done);
            });
            it("test add reflection and refraction texture", function(done){
                tester.compareAt(2, "water/water_add_reflectionAndRefraction.png", done);
            });
        });
    });
});
