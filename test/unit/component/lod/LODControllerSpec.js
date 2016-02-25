describe("LODController", function() {
    var sandbox = null;
    var lod = null;

    var model;
    var geoLevel1,geoLevel2;
    var geo;

    function createGeo(){
        var geoLevel1 = wd.SphereGeometry.create();

        var matLevel1 = wd.LightMaterial.create();

        geoLevel1.material = matLevel1;

        return geoLevel1;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        lod = wd.LODController.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function(){
        var director;
        var camera;

        beforeEach(function(){
            director = wd.Director.getInstance();

            camera = testTool.createCamera(wd.Vector3.create(0,0,0));

            director.scene.addChild(camera);
        });

        describe("select level geometry by range-base", function(){
            var renderer;

            function judgeSelectGeometry(callCount, geo){
                expect(renderer.render.getCall(callCount).args[1]).toEqual(geo);
            }

            function setCameraPos(pos){
                camera.transform.position = pos;
            }


            beforeEach(function(){
                model = prepareTool.createSphere();
                geo = model.getComponent(wd.Geometry);
                renderer = model.getComponent(wd.MeshRenderer);
                sandbox.stub(renderer, "render");

                geoLevel1 = createGeo();

                geoLevel2 = createGeo();

                lod.addGeometryLevel(15, geoLevel1);
                lod.addGeometryLevel(30, geoLevel2);

                model.addComponent(lod);


                director.scene.addChild(model);

                director._init();
            });

            it("defaultly, select object->geometry", function () {
                director._run(1);

                judgeSelectGeometry(0, geo);
            });
            it("if distance of camera->position to object->position >= level1 distance, use level1 geometry", function () {
                setCameraPos(wd.Vector3.create(15, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geoLevel1);
            });
            it("if distance of camera->position to object->position >= level2 distance, use level2 geometry", function () {
                setCameraPos(wd.Vector3.create(30, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geoLevel2);
            });
            it("if distance of camera->position to object->position < level1 distance, use object->geometry", function () {
                setCameraPos(wd.Vector3.create(10, 0, 0));

                director._run(1);

                judgeSelectGeometry(0, geo);
            });
            
            describe("test special case", function() {
                beforeEach(function () {
                });

                it("if distance of camera->position to object->position >= level2 distance happen multi times, it should always use level2 geometry", function () {
                    setCameraPos(wd.Vector3.create(30, 0, 0));

                    director._run(1);

                    judgeSelectGeometry(0, geoLevel2);


                    setCameraPos(wd.Vector3.create(30, 0, 0));

                    director._run(2);

                    judgeSelectGeometry(1, geoLevel2);
                });
            });
        });
    });

    describe("init", function(){
        beforeEach(function(){
            model = prepareTool.createSphere();


            lod.entityObject = model;

            geoLevel1 = createGeo();

            geoLevel2 = createGeo();

            lod.addGeometryLevel(15, geoLevel1);
            lod.addGeometryLevel(30, geoLevel2);


            sandbox.stub(geoLevel1, "init");
            sandbox.stub(geoLevel1, "createBuffersFromGeometryData");

            sandbox.stub(geoLevel2, "init");
            sandbox.stub(geoLevel2, "createBuffersFromGeometryData");
        });

        it("set active geometry to be object->geometry", function () {
            lod.init();

            expect(lod.activeGeometry).toEqual(model.getComponent(wd.Geometry));
        });
        it("init level geometrys", function(){
            lod.init();

            expect(geoLevel1.init).toCalledOnce();
            expect(geoLevel2.init).toCalledOnce();
        });
        it("create level geometrys->buffers from geometryData to improve lod switch performance", function(){
            lod.init();

            expect(geoLevel1.createBuffersFromGeometryData).toCalledOnce();
            expect(geoLevel2.createBuffersFromGeometryData).toCalledOnce();
        });
    });

    describe("update", function(){
        var currentCamera;

        function setCameraPos(pos){
            currentCamera.transform.position = pos;
        }

        beforeEach(function(){
            model = prepareTool.createSphere();


            lod.entityObject = model;

            geoLevel1 = createGeo();

            geoLevel2 = createGeo();

            lod.addGeometryLevel(15, geoLevel1);
            lod.addGeometryLevel(30, geoLevel2);


            currentCamera = {
                transform: {
                    position: wd.Vector3.create(0,0,0)
                }
            };

            sandbox.stub(wd.Director.getInstance(), "scene", {
                currentCamera:currentCamera
            });
        });

        it("if change activeGeometry, trigger component_change event", function(){
            setCameraPos(wd.Vector3.create(0,15,0));
            sandbox.stub(wd.EventManager, "trigger");

            lod.update(1);

            expect(wd.EventManager.trigger).toCalledWith(model, wd.CustomEvent.create(wd.EEngineEvent.COMPONENT_CHANGE));
        });
    });
});

