describe("texture", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function() {
        describe("test anisotropic", function () {
            var tester;

            function body(assetParentDirPath, done){

                wd.LoaderManager.getInstance().load([
                    {url: assetParentDirPath + "asset/texture/crate.gif", id: "texture"}
                ]).subscribe(null, null, function () {
                    initSample();


                    tester.init();

                    if(done){
                        done();
                    }
                });

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createPlane());
                    director.scene.addChild(createCamera());

                    //director.start();
                }

                function createPlane() {
                    var map = wd.LoaderManager.getInstance().get("texture").toTexture();
                    map.wrapS = map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0, 0, 512, 512);
                    /*!annotate this line to see the difference*/
                    map.anisotropy = wd.GPUDetector.getInstance().maxAnisotropy;

                    var material = wd.BasicMaterial.create();
                    material.map = map;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 100;
                    geometry.height = 100;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(30, 0, 0));
                    gameObject.transform.scale = wd.Vector3.create(100, 100, 100);

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

                    camera.transform.translate(wd.Vector3.create(0, 0, 100));

                    return camera;
                }

            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_anisotropic.png", done);
            });
        });

        describe("test draw canvas to texture", function () {
            var tester;

            function body(assetParentDirPath, done){
        initSample();


        tester.init();

        if(done){
            done();
        }

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createPlane());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createPlane() {
            var canvas = document.createElement( "canvas" );
            canvas.width = 10;
            canvas.height = 10;

            var ctx = canvas.getContext("2d");

            ctx.fillStyle = "rgba(0, 255, 0, 1)";
            ctx.fillRect(0,0, 5, 10);
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.fillRect(5,0, 5, 10);

            var material = wd.BasicMaterial.create();
            material.map = wd.ImageTexture.create(canvas);


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 10;
            geometry.depth = 10;

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

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.distance = 40;

            camera.addComponent(controller);

            return camera;
        }
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_canvas.png", done);
            });
        });

        describe("test compressed texture", function () {
            var tester;

            function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/compressed/disturb_dxt1_mip.dds", id: "texture"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createTriangle());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createTriangle() {
            var material = wd.BasicMaterial.create();

            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


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
            cameraComponent.far = 80;

            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(0, 0, 5);

            return camera;
        }
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_compressed.png", done);
            });
        });

        describe("test reflection texture", function () {
            var tester;

            function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/skybox/px.jpg", id: "px"},
            {url: assetParentDirPath + "asset/texture/skybox/nx.jpg", id: "nx"},
            {url: assetParentDirPath + "asset/texture/skybox/py.jpg", id: "py"},
            {url: assetParentDirPath + "asset/texture/skybox/ny.jpg", id: "ny"},
            {url: assetParentDirPath + "asset/texture/skybox/pz.jpg", id: "pz"},
            {url: assetParentDirPath + "asset/texture/skybox/nz.jpg", id: "nz"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSkybox());
            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            //director.start();
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
            cubemap.mode = wd.EEnvMapMode.REFLECTION;


            var material = wd.BasicMaterial.create();
            material.envMap = cubemap;
            material.shading = wd.EShading.SMOOTH;

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
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_reflection.png", done);
            });
        });

        describe("test refraction texture", function () {
            var tester;

            function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/skybox/px.jpg", id: "px"},
            {url: assetParentDirPath + "asset/texture/skybox/nx.jpg", id: "nx"},
            {url: assetParentDirPath + "asset/texture/skybox/py.jpg", id: "py"},
            {url: assetParentDirPath + "asset/texture/skybox/ny.jpg", id: "ny"},
            {url: assetParentDirPath + "asset/texture/skybox/pz.jpg", id: "pz"},
            {url: assetParentDirPath + "asset/texture/skybox/nz.jpg", id: "nz"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSkybox());
            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            //director.start();
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
            cubemap.mode = wd.EEnvMapMode.REFRACTION;


            var material = wd.BasicMaterial.create();
            material.envMap = cubemap;
            material.shading = wd.EShading.SMOOTH;
            material.refractionRatio = 1.52;

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
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_refraction.png", done);
            });
        });

        describe("test fresnel texture", function () {
            var tester;

            function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/skybox/px.jpg", id: "px"},
            {url: assetParentDirPath + "asset/texture/skybox/nx.jpg", id: "nx"},
            {url: assetParentDirPath + "asset/texture/skybox/py.jpg", id: "py"},
            {url: assetParentDirPath + "asset/texture/skybox/ny.jpg", id: "ny"},
            {url: assetParentDirPath + "asset/texture/skybox/pz.jpg", id: "pz"},
            {url: assetParentDirPath + "asset/texture/skybox/nz.jpg", id: "nz"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSkybox());
            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            //director.start();
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
            cubemap.mode = wd.EEnvMapMode.FRESNEL;


            var material = wd.BasicMaterial.create();
            material.envMap = cubemap;
            material.shading = wd.EShading.SMOOTH;
            material.reflectivity = 0.5;

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
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_fresnel.png", done);
            });
        });

        describe("test manual mipmap texture", function () {
            var tester;

            function body(assetParentDirPath, done){
                wd.LoaderManager.getInstance().load([
                    {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"}
                ]).subscribe(null, null, function () {
                    initSample();


                    tester.init();

                    if(done){
                        done();
                    }
                });

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSphere());
                    director.scene.addChild(createCamera());

                    //director.start();
                }

                function createSphere() {
                    var canvas = mipmap(128, '#f00');
                    var textureCanvas = wd.ImageTexture.create(canvas);
                    textureCanvas.wrapS = wd.ETextureWrapMode.REPEAT;
                    textureCanvas.wrapT = wd.ETextureWrapMode.REPEAT;
                    textureCanvas.repeatRegion = wd.Vector4.create(0, 0, 10, 10);
                    textureCanvas.mipmaps.addChild(canvas);
                    textureCanvas.mipmaps.addChild(mipmap(64, '#0f0'));
                    textureCanvas.mipmaps.addChild(mipmap(32, '#00f'));
                    textureCanvas.mipmaps.addChild(mipmap(16, '#400'));
                    textureCanvas.mipmaps.addChild(mipmap(8, '#040'));
                    textureCanvas.mipmaps.addChild(mipmap(4, '#004'));
                    textureCanvas.mipmaps.addChild(mipmap(2, '#044'));
                    textureCanvas.mipmaps.addChild(mipmap(1, '#404'));
                    textureCanvas.needsUpdate = true;


                    var material = wd.BasicMaterial.create();
                    material.map = textureCanvas;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 2;
                    geometry.segments = 30;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());


                    return gameObject;
                }

                function mipmap(size, color) {
                    var imageCanvas = document.createElement("canvas"),
                        context = imageCanvas.getContext("2d");

                    imageCanvas.width = imageCanvas.height = size;

                    context.fillStyle = "#444";
                    context.fillRect(0, 0, size, size);

                    context.fillStyle = color;
                    context.fillRect(0, 0, size / 2, size / 2);
                    context.fillRect(size / 2, size / 2, size / 2, size / 2);

                    return imageCanvas;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 1000;

                    var controller = wd.ArcballCameraController.create(cameraComponent);


                    controller.distance = 10;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            describe("texture should change when distance between camera and texture change", function () {
                it("test distance = 10", function (done) {
                    tester.compareAt(1, "texture/texture_mipmap_manual_distance10.png", done);
                });
                it("test distance = 30", function (done) {
                    tester.compareAt(1, "texture/texture_mipmap_manual_distance30.png", function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;
                        camera.getComponent(wd.CameraController).distance = 30;
                    }, done);
                });
            });
        });

        describe("test multi texture", function () {
            var tester;

            function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture1"},
            {url: assetParentDirPath + "asset/texture/2.jpg", id: "texture2"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createTriangle());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createTriangle() {
            var material = wd.BasicMaterial.create();
            material.map = [wd.LoaderManager.getInstance().get("texture1").toTexture(), wd.LoaderManager.getInstance().get("texture2").toTexture()];
            material.side = wd.ESide.BOTH;


            var geometry = wd.TriangleGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


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
            cameraComponent.far = 80;

            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(wd.Vector3.create(0, 0, 5));

            return camera;
        }
            }

            beforeEach(function (done) {
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "texture/texture_multi.png", done);
            });
        });
    });
});
