describe("CollisionDetector", function () {
    var sandbox = null;
    var detector;
    var Detector = wd.CollisionDetector;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        //detector = wd.ColliderEngine.getInstance()._collisionDetector;
        detector = Detector.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("update", function(){
        beforeEach(function(){
        });

        describe("detect collision and trigger collision event", function(){
            var gameObjectScene;
            var box1,box2,box3,box4;

            function judge(box, expectedCollideObjectArr,  onCollisionStartCallCount, callIndex){
                var onCollisionStartCallCount = onCollisionStartCallCount || 1,
                    callIndex = callIndex || 0;

                expect(box.scriptManager.execScriptWithData.withArgs("onCollisionStart").callCount).toEqual(onCollisionStartCallCount);

                judgeCollideObjects(box, "onCollisionStart", callIndex, expectedCollideObjectArr);
                //judgeCollideObjects(box, "onContact", callIndex, expectedCollideObjectArr);
            }

            function judgeCollideObjects(box, event, callIndex, expectedCollideObjectArr){
                var collideObjects = box.scriptManager.execScriptWithData.withArgs(event).getCall(callIndex).args[1];

                judgeTool.isObjectListEqual(collideObjects.getChildren(), expectedCollideObjectArr);
            }

            function createBox(name, size){
                var box = colliderTool.createBox(wd.BoxCollider, size || 3);

                if(name){
                    box.name = name;
                }

                sandbox.stub(box.scriptManager, "execScript");
                sandbox.stub(box.scriptManager, "execScriptWithData");

                return box;
            }

            function test(updateAll){
                gameObjectScene.init();


                //box1.update();
                //octreeContainer.update();
                updateAll();





                judge(box1, [box3]);
                judge(box3, [box1]);


                box1.transform.position = wd.Vector3.create(25, 0, 0);


                //box1.update();
                //octreeContainer.update();
                updateAll();




                expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
            }

            beforeEach(function(){
                gameObjectScene = wd.GameObjectScene.create();
                sandbox.stub(wd.Director.getInstance().scene, "gameObjectScene", gameObjectScene);


                box1 = createBox("box1");
                box1.transform.position = wd.Vector3.create(9, 9, 9);

                box2 = createBox("box2");
                box2.transform.position = wd.Vector3.create(-10,-10, -10);

                box3 = createBox("box3");
                box3.transform.position = wd.Vector3.create(10,10, 10);

                box4 = createBox("box4");
                box4.transform.position = wd.Vector3.create(2, 2, 2);



                gameObjectScene.addChildren([box2, box3, box4]);
            });

            describe("test gameObject collide with gameObject", function(){
                function updateAll(){
                    [box1,box2,box3,box4].forEach(function(box){
                        box.update();
                    });

                    wd.ColliderEngine.getInstance().update();
                    wd.ColliderEngine.getInstance().detect();
                }

                it("collide test1", function () {
                    gameObjectScene.addChild(box1);

                    test(updateAll);
                });

                describe("optimize", function(){
                    beforeEach(function(){
                    });

                    it("if gameObject->Collider->enable === false, not check if it collide with others", function(){
                        gameObjectScene.addChild(box1);

                        box1.getComponent(wd.Collider).enable = false;

                        gameObjectScene.init();


                        updateAll();





                        expect(box1.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                        expect(box3.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();






                        box1.getComponent(wd.Collider).enable = true;

                        updateAll();




                        judge(box1, [box3]);
                        judge(box3, [box1]);
                    });
                });
            });

            describe("test octree", function(){
                var octreeContainer;

                beforeEach(function(){

                    octreeContainer = wd.GameObject.create();
                    octreeContainer.addComponent(wd.Octree.create());
                });

                describe("test gameObject collide with octree", function() {
                    function updateAll(){
                        box1.update();
                        octreeContainer.update();

                        wd.ColliderEngine.getInstance().update();
                        wd.ColliderEngine.getInstance().detect();
                    }

                    beforeEach(function () {
                        octreeContainer.addChildren([box2, box3, box4]);
                    });

                    it("collide test1", function () {
                        gameObjectScene.addChildren([box1, octreeContainer]);

                        test(updateAll);
                    });
                    it("collide test2", function () {
                        gameObjectScene.addChildren([octreeContainer, box1]);

                        test(updateAll);
                    });

                    it("test trigger collisionStart->onContact->collisionEnd twice", function () {
                        gameObjectScene.addChildren([octreeContainer, box1]);

                        gameObjectScene.init();







                        updateAll();





                        judge(box1, [box3]);
                        judge(box3, [box1]);



                        box1.transform.position = wd.Vector3.create(25, 0, 0);


                        updateAll();



                        expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                        expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();











                        box1.transform.position = wd.Vector3.create(9, 9, 9);

                        updateAll();



                        judge(box1, [box3], 2, 1);
                        judge(box3, [box1], 2, 1);

                        expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).not.toCalledTwice();
                        expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).not.toCalledTwice();


                        box1.transform.position = wd.Vector3.create(25, 0, 0);


                        updateAll();




                        expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledTwice();
                        expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledTwice();
                    });

                    it("test collide twice", function () {
                        gameObjectScene.addChildren([octreeContainer, box1]);

                        gameObjectScene.init();


                        updateAll();




                        expect(box1.scriptManager.execScriptWithData.withArgs("onContact")).toCalledOnce();
                        expect(box3.scriptManager.execScriptWithData.withArgs("onContact")).toCalledOnce();
                        judgeCollideObjects(box1, "onContact", 0, [box3]);
                        judgeCollideObjects(box3, "onContact", 0, [box1]);


                        updateAll();




                        expect(box1.scriptManager.execScriptWithData.withArgs("onContact")).toCalledTwice();
                        expect(box3.scriptManager.execScriptWithData.withArgs("onContact")).toCalledTwice();
                        judgeCollideObjects(box1, "onContact", 1, [box3]);
                        judgeCollideObjects(box3, "onContact", 1, [box1]);
                    });
                });


                describe("test octree collide with octree", function() {
                    it("test octree, octree, gameObject collide with each other", function() {
                        function updateAll(){
                            box1.update();
                            octreeContainer.update();
                            octreeContainer2.update();

                            wd.ColliderEngine.getInstance().update();
                            wd.ColliderEngine.getInstance().detect();
                        }

                        var box5 = createBox("box5");
                        box5.transform.position = wd.Vector3.create(8, 9, 9);

                        var box6 = createBox("box6");
                        box6.transform.position = wd.Vector3.create(8, 9, 8);


                        var octreeContainer2 = wd.GameObject.create();
                        octreeContainer2.addComponent(wd.Octree.create());

                        octreeContainer.addChildren([box2, box3, box5]);
                        octreeContainer2.addChildren([box4, box6]);

                        gameObjectScene.addChildren([box1, octreeContainer, octreeContainer2]);



                        gameObjectScene.init();


                        //gameObjectScene.update();
                        updateAll();







                        judge(box1, [box3, box5, box6]);
                        judge(box3, [box1, box6]);
                        judge(box5, [box1, box6]);
                        judge(box6, [box1, box3, box5]);

                        expect(box3.scriptManager.execScriptWithData.withArgs("onContact").callCount).toEqual(1);
                        expect(box5.scriptManager.execScriptWithData.withArgs("onContact").callCount).toEqual(1);
                        expect(box6.scriptManager.execScriptWithData.withArgs("onContact").callCount).toEqual(1);




                        box1.transform.position = wd.Vector3.create(25, 0, 0);
                        box5.transform.position = wd.Vector3.create(35, 0, 0);
                        box6.transform.position = wd.Vector3.create(45, 0, 0);



                        updateAll();





                        expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                        expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                        expect(box5.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                        expect(box6.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    });
                });

                it("test onCollisionEnd event", function () {
                    function updateAll(){
                        box1.update();
                        octreeContainer.update();

                        wd.ColliderEngine.getInstance().update();
                        wd.ColliderEngine.getInstance().detect();
                    }

                    octreeContainer.addChildren([box2, box3, box4]);

                    gameObjectScene.addChildren([box1, octreeContainer]);


                    gameObjectScene.init();


                    updateAll();
                    //gameObjectScene.update();


                    box1.transform.position = wd.Vector3.create(25, 0, 0);



                    updateAll();





                    expect(box1.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box3.scriptManager.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                });

                describe("optimize", function(){
                    function updateAll(){
                        box1.update();
                        octreeContainer.update();
                        wd.ColliderEngine.getInstance().update();
                        wd.ColliderEngine.getInstance().detect();
                    }

                    beforeEach(function(){
                        octreeContainer.addChildren([box2, box3, box4]);
                    });

                    it("if octree->isCollideEnable === false, it not collide", function () {
                        var octree = octreeContainer.getComponent(wd.SpacePartition);
                        octree.isCollideEnable = false;

                        gameObjectScene.addChildren([box1, octreeContainer]);

                        gameObjectScene.init();


                        updateAll();





                        expect(box1.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                        expect(box3.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                    });

                    describe("if gameObject->Collider->enable === false, not check if it collide with others", function(){
                        it("test gameObject collide with octree", function () {
                            gameObjectScene.addChildren([octreeContainer, box1]);


                            box3.getComponent(wd.Collider).enable = false;



                            gameObjectScene.init();


                            updateAll();





                            expect(box1.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                            expect(box3.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                        });
                        it("test octree collide with octree", function () {
                            var octreeContainer2 = wd.GameObject.create();
                            octreeContainer2.addComponent(wd.Octree.create());
                            octreeContainer2.addChild(box1);


                            gameObjectScene.addChildren([octreeContainer, octreeContainer2]);


                            box3.getComponent(wd.Collider).enable = false;



                            gameObjectScene.init();


                            updateAll();





                            expect(box1.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                            expect(box3.scriptManager.execScriptWithData.withArgs("onCollisionStart")).not.toCalled();
                        });
                    });
                });
            });
        });
    });
});

