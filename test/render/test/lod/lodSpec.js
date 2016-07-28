describe("lod", function () {
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
        var tester;

        describe("test switch(discrete)_selection(range-base) lod", function () {
            function body(wrapper){
                wrapper.load([

                    ])
                    .do(initSample);

                function initSample(){
                    var director = wd.Director.getInstance();


                    director.scene.addChildren(createSpheres());

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

                    director.scene.addChild(createCamera());


                    director.start();
                }


                function createSpheres(){
                    var spheres = [];
                    var count = 2;
                    var scale = 4;

                    for (var x = -count; x <= count; x++) {
                        for (var y = -count; y <= count; y++) {
                            for (var z = 5; z < 10; z++) {
                                var sphere = createSphere();

                                sphere.transform.position = wd.Vector3.create(x * scale, y * scale, z * scale);

                                spheres.push(sphere);
                            }
                        }
                    }

                    return spheres;
                }

                function createSphere(){
                    var geometry = createSphereGeometry(wd.Color.create("rgb(1.0, 0.0, 0.0)"), 20);

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());




                    var geometryLevel1 = createSphereGeometry(wd.Color.create("rgb(0.0, 1.0, 0.0)"), 5);
                    var geometryLevel2 = createSphereGeometry(wd.Color.create("#ffffff"), 2);

                    var lod = wd.LOD.create();

                    lod.addGeometryLevel(15, geometryLevel1);
                    lod.addGeometryLevel(30, geometryLevel2);
                    lod.addGeometryLevel(40, wd.ELODGeometryState.INVISIBLE);


                    gameObject.addComponent(lod);

                    return gameObject;
                }

                function createSphereGeometry(color, segments){
                    var material = wd.LightMaterial.create();
                    material.color = color;

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 1;
                    geometry.segments = segments;


                    return geometry;
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

                    directionLight.transform.translate(wd.Vector3.create(0, 50, 50));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 10000;

                    var controller = wd.ArcballCameraController.create(cameraComponent);

                    controller.distance = 80;


                    camera.addComponent(controller);


                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test distance 80", function (done) {
                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "lod/lod_switch(discrete)_selection(range-base)_distance80.png",
                    done: done
                });
            });
            it("test distance 50", function (done) {
                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "lod/lod_switch(discrete)_selection(range-base)_distance50.png",
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        var controller = camera.getComponent(wd.CameraController);

                        controller.distance = 50;
                    },
                    done: done
                });
            });
            it("test distance 30", function (done) {
                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "lod/lod_switch(discrete)_selection(range-base)_distance30.png",
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        var controller = camera.getComponent(wd.CameraController);

                        controller.distance = 30;
                    },
                    done: done
                });
            });
        });
    });
});
