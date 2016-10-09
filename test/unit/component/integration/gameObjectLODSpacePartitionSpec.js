describe("gameObjectLOD+spacePartition", function() {
    var sandbox = null;

    var model;
    var gameObjectLevel1,gameObjectLevel2;
    var octreeContainer;

    function createGrassMap() {
        var grassMap = wd.ImageTexture.create({});
        var width = grassMap.width / 4,
            height = grassMap.height;
        var mapData = [
            {
                sourceRegion:wd.RectRegion.create(0, 0, width, height)
            },
            {
                sourceRegion:wd.RectRegion.create(width, 0, width, height)
            },
            {
                sourceRegion:wd.RectRegion.create(width * 2, 0, width, height)
            }
        ];



        var material = wd.GrassMapMaterial.create();

        material.grassMap = grassMap;
        material.mapData = mapData;






        var gameObjectmetry = wd.GrassMapGeometry.create();
        gameObjectmetry.material = material;



        var gameObject = wd.GameObject.create();
        gameObject.addComponent(gameObjectmetry);

        gameObject.addComponent(wd.MeshRenderer.create());


        return gameObject;
    }

    function createBillboard() {
        var material = wd.LightMaterial.create();
        material.diffuseMap = wd.GrassProceduralTexture.create();


        var gameObjectmetry = wd.RectGeometry.create();
        gameObjectmetry.material = material;
        // gameObjectmetry.width = 5;
        // gameObjectmetry.height = 5;


        var billboard = wd.Billboard.create();
        billboard.mode = wd.EBillboardMode.Y;


        var gameObject = wd.GameObject.create();
        gameObject.addComponent(gameObjectmetry);
        gameObject.addComponent(billboard);

        gameObject.addComponent(wd.MeshRenderer.create());

        return gameObject;
    }

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

        function prepareLod(defaultSwitchHandler, switchHandlerLevel1, switchHandlerLevel2){
            var model = grassInstanceTool.createGrass("instance");


            var gameObjectLevel1 = createGrassMap();

            var gameObjectLevel2 = createBillboard();

            var lod = wd.GameObjectLOD.create();

            if(defaultSwitchHandler){
                lod.defaultGameObjectSwitchHandler = defaultSwitchHandler;
            }

            if(switchHandlerLevel1){
                lod.addLevel(15, gameObjectLevel1, switchHandlerLevel1);
            }
            else{
                lod.addLevel(15, gameObjectLevel1);
            }

            if(switchHandlerLevel1){
                lod.addLevel(30, gameObjectLevel2, switchHandlerLevel2);
            }
            else{
                lod.addLevel(30, gameObjectLevel2);
            }

            lod.addLevel(40, wd.ELODState.INVISIBLE);

            model.addComponent(lod);



            sandbox.spy(model, "render");
            sandbox.spy(gameObjectLevel1, "render");
            sandbox.spy(gameObjectLevel2, "render");

            return {
                model:model,
                gameObjectLevel1:gameObjectLevel1,
                gameObjectLevel2:gameObjectLevel2
            }
        }


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
                var result = prepareLod();
                model1 = result.model;
                gameObjectLevel11 = result.gameObjectLevel1;
                gameObjectLevel12 = result.gameObjectLevel2;


                result = prepareLod();
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

