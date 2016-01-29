describe("CollisionDetector", function () {
    var sandbox = null;
    var detector;
    var Detector = wd.CollisionDetector;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        detector = Detector.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("detect", function(){
        beforeEach(function(){
        });

        describe("detect collision and trigger collision event", function(){
            function createBox(name){
                var box = colliderTool.createBox(wd.BoxCollider, 3);

                if(name){
                    box.name = name;
                }

                sandbox.stub(box, "execScript");

                return box;
            }

            describe("test octree", function(){
                var gameObjectScene;
                var octreeContainer;
                var box1,box2,box3,box4;

                function judge(box, expectedCollideObjectArr){
                    expect(box.execScript.withArgs("onCollisionStart").callCount).toEqual(1);
                    var collideObjects = box.execScript.withArgs("onCollisionStart").firstCall.args[1];
                    expect(collideObjects.getChildren()).toEqual(expectedCollideObjectArr);
                }

                beforeEach(function(){
                    gameObjectScene = wd.GameObjectScene.create();

                    octreeContainer = wd.GameObject.create();
                    octreeContainer.addComponent(wd.Octree.create());

                    box1 = createBox("box1");
                    box1.transform.position = wd.Vector3.create(9, 9, 9);

                    box2 = createBox("box2");
                    box2.transform.position = wd.Vector3.create(-10,-10, -10);

                    box3 = createBox("box3");
                    box3.transform.position = wd.Vector3.create(10,10, 10);

                    box4 = createBox("box4");
                    box4.transform.position = wd.Vector3.create(2,2,2);
                });

                it("test gameObjecct collide with octree", function(){
                    octreeContainer.addChildren([box2, box3, box4]);

                    gameObjectScene.addChildren([box1, octreeContainer]);


                    gameObjectScene.init();
                    box1.update(1);
                    octreeContainer.update(1);


                    //gameObjectScene.update(1);

                    detector.detect(gameObjectScene);





                    judge(box1, [box3]);
                    judge(box3, [box1]);




                    box1.transform.position = wd.Vector3.create(25, 0, 0);



                    box1.update(1);
                    octreeContainer.update(1);
                    detector.detect(gameObjectScene);




                    expect(box1.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box3.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                });
                it("test octree, octree, gameObject collide with each other", function() {
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
                    box1.update(1);
                    octreeContainer.update(1);
                    octreeContainer2.update(1);


                    //gameObjectScene.update(1);

                    detector.detect(gameObjectScene);





                    judge(box1, [box3, box5, box6]);
                    judge(box3, [box1, box6]);
                    judge(box5, [box1, box6]);
                    judge(box6, [box1, box3, box5]);

                    expect(box3.execScript.withArgs("onContact").callCount).toEqual(1);
                    expect(box5.execScript.withArgs("onContact").callCount).toEqual(1);
                    expect(box6.execScript.withArgs("onContact").callCount).toEqual(1);




                    box1.transform.position = wd.Vector3.create(25, 0, 0);
                    box5.transform.position = wd.Vector3.create(35, 0, 0);
                    box6.transform.position = wd.Vector3.create(45, 0, 0);



                    box1.update(1);
                    octreeContainer.update(1);
                    octreeContainer2.update(1);
                    detector.detect(gameObjectScene);




                    expect(box1.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box3.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box5.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box6.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                });
                it("test onCollisionEnd event", function () {
                    octreeContainer.addChildren([box2, box3, box4]);

                    gameObjectScene.addChildren([box1, octreeContainer]);


                    gameObjectScene.init();
                    box1.update(1);
                    octreeContainer.update(1);
                    //gameObjectScene.update(1);
                    detector.detect(gameObjectScene);

                    box1.transform.position = wd.Vector3.create(25, 0, 0);



                    box1.update(1);
                    octreeContainer.update(1);
                    detector.detect(gameObjectScene);




                    expect(box1.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                    expect(box3.execScript.withArgs("onCollisionEnd")).toCalledOnce();
                });

            });
        });
    });
});

