describe("GameObjectLOD", function() {
    var sandbox = null;

    var model;
    var gameObjectLevel1,gameObjectLevel2;
    var gameObject;

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

            lod = wd.GameObjectLOD.create();

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

        describe("select level gameObject by range-base", function(){

            // function judgeSelectGameObject (callCount, gameObject, renderer) {
            function judgeSelectGameObject (gameObject) {
                [model, gameObjectLevel1, gameObjectLevel2].forEach(function(object){
                    if(!wd.JudgeUtils.isEqual(object, gameObject)){
                        expect(object.render).not.toCalled();
                    }
                });

                expect(gameObject.render).toCalledOnce();
            }



            beforeEach(function(){
                var result = prepareLod();
                model = result.model;
                gameObjectLevel1 = result.gameObjectLevel1;
                gameObjectLevel2 = result.gameObjectLevel2;

                director.scene.addChild(model);

                director._init();
            });

            it("defaultly, render lod.entityObject", function () {
                director._run(1);

                judgeSelectGameObject(model);
            });
            it("if distance of camera->position to object->position >= gameObjectLevel1 distance, render level1 gameObject", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(15, 0, 0));

                director._run(1);

                judgeSelectGameObject(gameObjectLevel1);
            });
            it("if distance of camera->position to object->position >= gameObjectLevel2 distance, render level2 gameObject", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                director._run(1);

                judgeSelectGameObject(gameObjectLevel2);
            });
            it("if distance of camera->position to object->position >= 40, not render", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(40, 0, 0));

                director._run(1);



                [model, gameObjectLevel1, gameObjectLevel2].forEach(function(object){
                    expect(object.render).not.toCalled();
                });
            });
            it("if distance of camera->position to object->position < level1 distance, render lod.entityObject", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(30, 0, 0));

                director._run(1);




                lodTool.setCameraPos(camera, wd.Vector3.create(10, 0, 0));

                director._run(1);

                expect(model.render).toCalledOnce();
                expect(gameObjectLevel2.render).toCalledOnce();

                expect(model.render).toCalledAfter(gameObjectLevel2.render);

                expect(gameObjectLevel1.render).not.toCalled();
            });
        });

        describe("init", function(){
            beforeEach(function(){
                var result = prepareLod();
                model = result.model;
                gameObjectLevel1 = result.gameObjectLevel1;
                gameObjectLevel2 = result.gameObjectLevel2;


                sandbox.stub(gameObjectLevel1, "init");

                sandbox.stub(gameObjectLevel2, "init");

                director.scene.addChild(model);
            });

            it("set level gameObjects invisible", function () {
                director._init();

                expect(gameObjectLevel1.isVisible).toBeFalsy();
                expect(gameObjectLevel2.isVisible).toBeFalsy();
            });
            it("add level gameObjects to be children of lod.entityObject", function () {
                director._init();

                var children = lod.entityObject.getChildren();
                expect(children.hasChild(gameObjectLevel1)).toBeTruthy();
                expect(children.hasChild(gameObjectLevel2)).toBeTruthy();
            });
            it("init level gameObjects", function () {
                director._init();

                expect(gameObjectLevel1.init).toCalledOnce();
                expect(gameObjectLevel2.init).toCalledOnce();
            });
        });

        describe("test trigger corresponding switch handler when switch gameObject", function(){
         var defaultSwitchHandler, switchHandlerLevel1, switchHandlerLevel2;


            beforeEach(function(){
                defaultSwitchHandler = sandbox.stub();
                switchHandlerLevel1 = sandbox.stub();
                switchHandlerLevel2 = sandbox.stub();


                var result = prepareLod(defaultSwitchHandler, switchHandlerLevel1, switchHandlerLevel2);
                model = result.model;
                gameObjectLevel1 = result.gameObjectLevel1;
                gameObjectLevel2 = result.gameObjectLevel2;

                director.scene.addChild(model);

                director._init();
            });

            it("when switch to lod.entityObject, trigger defaultGameObjectSwitchHandler", function() {
                lodTool.setCameraPos(camera, wd.Vector3.create(10, 0, 0));

                director._run(1);

                expect(defaultSwitchHandler).toCalledOnce();
                expect(defaultSwitchHandler).toCalledWith(model);
            });
            it("when switch to level1, trigger switchHandlerLevel1", function() {
                lodTool.setCameraPos(camera, wd.Vector3.create(20, 0, 0));

                director._run(1);

                expect(switchHandlerLevel1).toCalledWith(gameObjectLevel1);
            });
            it("when switch to level2, trigger switchHandlerLevel2", function() {
                lodTool.setCameraPos(camera, wd.Vector3.create(31, 0, 0));

                director._run(1);

                expect(switchHandlerLevel2).toCalledWith(gameObjectLevel2);
            });
            it("test together", function () {
                lodTool.setCameraPos(camera, wd.Vector3.create(31, 0, 0));

                director._run(1);

                expect(switchHandlerLevel2).toCalledOnce();


                lodTool.setCameraPos(camera, wd.Vector3.create(40, 0, 0));

                director._run(1);




                lodTool.setCameraPos(camera, wd.Vector3.create(10, 0, 0));

                director._run(1);


                expect(defaultSwitchHandler).toCalledOnce();



                lodTool.setCameraPos(camera, wd.Vector3.create(25, 0, 0));

                director._run(1);


                expect(switchHandlerLevel1).toCalledOnce();
            });
        });
    });


    describe("clone", function(){
        var lod;

        beforeEach(function(){
            lod = wd.GameObjectLOD.create();

            gameObjectLevel1 = createGrassMap();
            lod.addLevel(10, gameObjectLevel1);
            lod.addLevel(20, wd.ELODState.INVISIBLE);
        });

        it("clone activeGameObject,defaultGameObjectSwitchHandler", function () {
            var activeGameObject = {};
            var defaultGameObjectSwitchHandler = function(){};

            lod.activeGameObject = activeGameObject;
            lod.defaultGameObjectSwitchHandler = defaultGameObjectSwitchHandler;


            var result = lod.clone();


            expect(result.activeGameObject).toEqual(activeGameObject);
            expect(result.defaultGameObjectSwitchHandler).toEqual(defaultGameObjectSwitchHandler);
        });
        it("clone _gameObjectLevelList", function(){
            var cloneGameObject = createGrassMap();
            sandbox.stub(gameObjectLevel1, "clone").returns(cloneGameObject);

            var result = lod.clone();

            expect(result._gameObjectLevelList.getChildren()).toEqual( [
                    {
                        distanceBetweenCameraAndObject: 20,
                        gameObject:wd.ELODState.INVISIBLE,
                        switchHandler:lod._gameObjectLevelList.getChild(0).switchHandler
                    },
                    {
                        distanceBetweenCameraAndObject: 10,
                        gameObject:cloneGameObject,
                        switchHandler:lod._gameObjectLevelList.getChild(1).switchHandler
                    }
                ]
            );
            expect(result !== lod).toBeTruthy();
        });
    });
});

