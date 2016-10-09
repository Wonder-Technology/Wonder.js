describe("gameObjectLOD+spacePartition", function() {
    var sandbox = null;
    var octreeContainer;

    function createOctree() {
        return octreeTool.createOctree();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        prepareTool.prepareForMap(sandbox);


        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("integration test", function(){
        var director;
        var camera;
        var lod;

        beforeEach(function(){
            director = wd.Director.getInstance();

            camera = testTool.createCamera(wd.Vector3.create(0,0,0));

            director.scene.addChild(camera);

            director.scene.addChild(lightTool.createDirectionLight());
        });

        describe("test cull and lod", function(){
            var model1,model2;
            var gameObjectLevel11, gameObjectLevel12;
            var gameObjectLevel21, gameObjectLevel22;

            function setCamera(camera, pos, lookAt) {
                camera.transform.position = pos;
                camera.transform.lookAt(lookAt)
            }

            beforeEach(function(){
                var result = gameObjectLODTool.prepareLod(sandbox);
                model1 = result.model;
                gameObjectLevel11 = result.gameObjectLevel1;
                gameObjectLevel12 = result.gameObjectLevel2;


                result = gameObjectLODTool.prepareLod(sandbox);
                model2 = result.model;
                gameObjectLevel21 = result.gameObjectLevel1;
                gameObjectLevel22 = result.gameObjectLevel2;


                octreeContainer = createOctree();

                octreeContainer.addChildren([model1, model2]);



                director.scene.addChild(octreeContainer);

            });

            it("test", function () {
                model1.transform.position = wd.Vector3.create(50, 0, 0);
                model2.transform.position = wd.Vector3.create(-50, 0, 0);

                setCamera(camera, wd.Vector3.create(30, 0, 0), wd.Vector3.create(100, 0, 0));

                director._init();

                director._run(1);


                expect(gameObjectLevel11.render).toCalledOnce();




                setCamera(camera, wd.Vector3.create(-15, 0, 0), wd.Vector3.create(-100, 0, 0));


                director._run(1);


                expect(gameObjectLevel22.render).toCalledOnce();
            });
        });
    });
});

