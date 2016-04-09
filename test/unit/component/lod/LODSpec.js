describe("LOD", function() {
    var sandbox = null;
    var lod = null;

    var model;
    var geoLevel1,geoLevel2;
    var geo;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        lod = wd.LOD.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
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
            var rendererComponent;

            beforeEach(function(){
                var result = lodTool.prepareLod(sandbox);
                rendererComponent = result.rendererComponent;
                model = result.model;
                geo = result.geo;
                geoLevel1 = result.geoLevel1;
                geoLevel2 = result.geoLevel2;

                director.scene.addChild(model);

                director._init();
            });

            it("defaultly, select object->geometry", function () {
                director._run(1);

                lodTool.judgeSelectGeometry(0, geo);
            });
            it("if distance of camera->position to object->position >= geoLevel1 distance, use level1 geometry", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(15, 0, 0));

                director._run(1);

                lodTool.judgeSelectGeometry(0, geoLevel1);
            });
            it("if distance of camera->position to object->position >= geoLevel2 distance, use level2 geometry", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                director._run(1);

                lodTool.judgeSelectGeometry(0, geoLevel2);
            });
            it("if distance of camera->position to object->position >= 40, object.isVisible should be false", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(40, 0, 0));

                director._run(1);

                expect(model.isVisible).toBeFalsy();
            });
            it("if distance of camera->position to object->position < level1 distance, use object->geometry", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(10, 0, 0));

                director._run(1);

                lodTool.judgeSelectGeometry(0, geo);
            });

            describe("test special case", function() {
                beforeEach(function () {
                });

                it("if distance of camera->position to object->position >= geoLevel2 distance happen multi times, it should always use level2 geometry", function () {
                    lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                    director._run(1);

                    lodTool.judgeSelectGeometry(0, geoLevel2);


                    lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                    director._run(2);

                    lodTool.judgeSelectGeometry(1, geoLevel2);
                });
                it("if switch from invisible to visible, object.isVisible should be true", function () {
                    lodTool.setCameraPos(camera, wd.Vector3.create(41, 0, 0));

                    director._run(1);



                    lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                    director._run(2);

                    expect(model.isVisible).toBeTruthy();
                });
            });
        });
    });

    describe("init", function(){
        beforeEach(function(){
            model = prepareTool.createSphere();


            lod.entityObject = model;

            geoLevel1 = lodTool.createGeo();

            geoLevel2 = lodTool.createGeo();

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

        beforeEach(function(){
            model = prepareTool.createSphere();


            lod.entityObject = model;

            geoLevel1 = lodTool.createGeo();

            geoLevel2 = lodTool.createGeo();

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
            lodTool.setCameraPos(currentCamera, wd.Vector3.create(0,15,0));
            sandbox.stub(wd.EventManager, "trigger");

            lod.update(1);

            expect(wd.EventManager.trigger).toCalledWith(model, wd.CustomEvent.create(wd.EEngineEvent.COMPONENT_CHANGE));
        });
    });

    describe("clone", function(){
        var geo;

        beforeEach(function(){
            geo = lodTool.createGeo();
            lod.addGeometryLevel(10, geo);
            lod.addGeometryLevel(20, wd.ELODGeometryState.INVISIBLE);
        });

        it("clone levelList", function(){
            var cloneGeo = lodTool.createGeo();
            sandbox.stub(geo, "clone").returns(cloneGeo);

            var result = lod.clone();

            expect(result.levelList.getChildren()).toEqual( [
                    {
                        distanceBetweenCameraAndObject: 20,
                        geometry:wd.ELODGeometryState.INVISIBLE
                    },
                    {
                        distanceBetweenCameraAndObject: 10,
                        geometry:cloneGeo
                    }
                ]
            );
            expect(result !== lod).toBeTruthy();
        });
        it("if param->isShareGeometry is true, cloned levelList->geometry share with source->levelList->geometry", function(){
            var result = lod.clone(true);

            expect(result.levelList.getChildren()).toEqual( [
                    {
                        distanceBetweenCameraAndObject: 20,
                        geometry:wd.ELODGeometryState.INVISIBLE
                    },
                    {
                        distanceBetweenCameraAndObject: 10,
                        geometry:geo
                    }
                ]
            );
            expect(result !== lod).toBeTruthy();
        });
    });
});

