describe("GameObjectLOD", function() {
    var sandbox = null;
    var lod = null;

    var model;
    var gameObjectLevel1,gameObjectLevel2;
    var gameObject;


    function prepareLod(){
        var model = grassInstanceTool.createGrass("instance");

        // rendererComponent = model.getComponent(wd.MeshRenderer);

        // sandbox.spy(rendererComponent, "render");

        var gameObjectLevel1 = createGrassMap();

        var gameObjectLevel2 = createBillboard();

        lod = wd.GameObjectLOD.create();

        lod.addLevel(15, gameObjectLevel1);
        lod.addLevel(30, gameObjectLevel2);
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
        // lod = wd.GameObjectLOD.create();

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
    });

    //
    // describe("clone", function(){
    //     var gameObject;
    //
    //     beforeEach(function(){
    //         gameObject = lodTool.createGeo();
    //         lod.addGeometryLevel(10, gameObject);
    //         lod.addGeometryLevel(20, wd.ELODGeometryState.INVISIBLE);
    //     });
    //
    //     it("clone _gameObjectLevelList", function(){
    //         var cloneGeo = lodTool.createGeo();
    //         sandbox.stub(gameObject, "clone").returns(cloneGeo);
    //
    //         var result = lod.clone();
    //
    //         expect(result._gameObjectLevelList.getChildren()).toEqual( [
    //                 {
    //                     distanceBetweenCameraAndObject: 20,
    //                     gameObject:wd.ELODGeometryState.INVISIBLE
    //                 },
    //                 {
    //                     distanceBetweenCameraAndObject: 10,
    //                     gameObject:cloneGeo
    //                 }
    //             ]
    //         );
    //         expect(result !== lod).toBeTruthy();
    //     });
    //     //it("if param->isShareGeometry is true, cloned _gameObjectLevelList->gameObject share with source->_gameObjectLevelList->gameObject", function(){
    //     //    var result = lod.clone(true);
    //     //
    //     //    expect(result._gameObjectLevelList.getChildren()).toEqual( [
    //     //            {
    //     //                distanceBetweenCameraAndObject: 20,
    //     //                gameObject:wd.ELODGeometryState.INVISIBLE
    //     //            },
    //     //            {
    //     //                distanceBetweenCameraAndObject: 10,
    //     //                gameObject:gameObject
    //     //            }
    //     //        ]
    //     //    );
    //     //    expect(result !== lod).toBeTruthy();
    //     //});
    // });
});

