describe("Octree", function () {
    var sandbox = null;
    var tree = null;
    var Octree = wd.Octree;
    var Vector3 = wd.Vector3;
    var octreeObject;
    var obj1, obj2, obj3, obj4;

    function createObject(pos, size) {
        var obj = prepareTool.createBox(size || 5);

        if(pos){
            obj.transform.position = Vector3.create(pos[0], pos[1], pos[2]);
        }

        return obj;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        tree = Octree.create();


        octreeObject = wd.GameObject.create();

        octreeObject.addComponent(tree);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("addToObject", function(){
        it("if not add to GameObject, contract error", function(){
            expect(function(){
                tree.addToObject(wd.UIObject.create())
            }).toThrow();
        });
    });

    describe("build", function () {

        function getRoot(){
            return tree._root;
        }

        function judgeRoot(){
            var root = getRoot();
            expect(root.nodeList.getCount()).toEqual(8);
            expect(root.entityObjectList.getCount()).toEqual(0);
        }

        function judgeFirstDepthChild(index, entityObjectListCount, entityObject){
            var root = getRoot();
            var child = root.nodeList.getChild(index);
            expect(child.nodeList.getCount()).toEqual(0);
            expect(child.entityObjectList.getCount()).toEqual(entityObjectListCount);

            if(entityObjectListCount > 0){
                expect(child.entityObjectList.getChild(0)).toEqual(entityObject);
            }
        }

        beforeEach(function () {

        });

        describe("test when depth === 1", function(){
            beforeEach(function(){
                tree.maxDepth = 2;
            });

            it("test", function () {
                obj1 = createObject([10, 10, 10]);
                obj2 = createObject([-10, -10, -10]);

                octreeObject.addChildren([obj1, obj2]);

                octreeObject.init();





                tree.build();





                judgeRoot();
                judgeFirstDepthChild(0, 1, obj2);
                judgeFirstDepthChild(1, 0);
                judgeFirstDepthChild(2, 0);
                judgeFirstDepthChild(3, 0);
                judgeFirstDepthChild(4, 0);
                judgeFirstDepthChild(5, 0);
                judgeFirstDepthChild(6, 0);
                judgeFirstDepthChild(7, 1, obj1);
            });
        });

        describe("test when depth === 2", function(){
            function judgeSecondDepthChild(root, index, entityObjectListCount, entityObject){
                var child = root.nodeList.getChild(index);
                expect(child.nodeList.getCount()).toEqual(0);
                expect(child.entityObjectList.getCount()).toEqual(entityObjectListCount);

                if(entityObjectListCount > 0){
                    expect(child.entityObjectList.getChild(0)).toEqual(entityObject);
                }
            }

            beforeEach(function(){
                tree.maxDepth = 2;
                tree.maxNodeCapacity = 1;
            });

            it("test if node->entityObjectCount > maxNodeCapacity, build down", function () {
                obj1 = createObject([20, 20, 20]);
                obj2 = createObject([-20, -20, -20]);
                obj3 = createObject([-6, -6, -20]);

                octreeObject.addChildren([obj1, obj2, obj3]);

                octreeObject.init();





                tree.build();





                judgeRoot();


                var root = getRoot();
                var child = root.nodeList.getChild(0);
                expect(child.nodeList.getCount()).toEqual(8);
                expect(child.entityObjectList.getCount()).toEqual(2);

                judgeSecondDepthChild(child, 0, 1, obj2);
                judgeSecondDepthChild(child, 1, 0);
                judgeSecondDepthChild(child, 2, 0);
                judgeSecondDepthChild(child, 3, 0);
                judgeSecondDepthChild(child, 4, 0);
                judgeSecondDepthChild(child, 5, 0);
                judgeSecondDepthChild(child, 6, 1, obj3);
                judgeSecondDepthChild(child, 7, 0);


                judgeFirstDepthChild(1, 0);
                judgeFirstDepthChild(2, 0);
                judgeFirstDepthChild(3, 0);
                judgeFirstDepthChild(4, 0);
                judgeFirstDepthChild(5, 0);
                judgeFirstDepthChild(6, 0);
                judgeFirstDepthChild(7, 1, obj1);
            });
        });

        it("if octree->depth(except root) >= maxDepth, stop build down", function () {
            tree.maxDepth = 1;

            obj1 = createObject([20, 20, 20]);
            obj2 = createObject([-20, -20, -20]);
            obj3 = createObject([-6, -6, -20]);


            octreeObject.addChildren([obj1, obj2, obj3]);

            octreeObject.init();





            tree.build();





            judgeRoot();


            var root = getRoot();
            var child = root.nodeList.getChild(0);
            expect(child.nodeList.getCount()).toEqual(0);
            expect(child.entityObjectList.getCount()).toEqual(2);

            judgeFirstDepthChild(1, 0);
            judgeFirstDepthChild(2, 0);
            judgeFirstDepthChild(3, 0);
            judgeFirstDepthChild(4, 0);
            judgeFirstDepthChild(5, 0);
            judgeFirstDepthChild(6, 0);
            judgeFirstDepthChild(7, 1, obj1);
        });
        it("if object->bounding region intersect with multi nodeList, the nodeList should all add it", function () {
            function judge(index){
                judgeFirstDepthChild(index, 1, obj1);
            }


            tree.maxDepth = 2;
            tree.maxNodeCapacity = 2;

            obj1 = createObject([0, 0, 0]);
            octreeObject.addChild(obj1);
            octreeObject.init();



            tree.build();



            judgeRoot();

            judge(0);
            judge(1);
            judge(2);
            judge(3);
            judge(4);
            judge(5);
            judge(6);
            judge(7);
        });

        describe("test whether add objects in octree correctly", function(){
            beforeEach(function(){
            });

            it("when add parent object, only handle parent object except child object", function(){
                obj1 = createObject();
                obj2 = createObject();

                obj1.addChild(obj2);

                obj1.transform.position = Vector3.create(10, 10, 10);
                obj2.transform.position = Vector3.create(-10, -10, -10);

                octreeObject.addChild(obj1);

                octreeObject.init();



                tree.build();


                judgeRoot();

                judgeFirstDepthChild(0, 1, obj1);
                judgeFirstDepthChild(1, 1, obj1);
                judgeFirstDepthChild(2, 1, obj1);
                judgeFirstDepthChild(3, 1, obj1);
                judgeFirstDepthChild(4, 1, obj1);
                judgeFirstDepthChild(5, 1, obj1);
                judgeFirstDepthChild(6, 1, obj1);
                judgeFirstDepthChild(7, 1, obj1);
            });
            it("test add obj object", function (done) {
                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/wd/test.wd", id: "sceneModel"}
                ]).subscribe(function (data) {
                }, function (err) {
                    expect().toFail(err.message);
                    done();
                }, function () {
                    var sceneModel = wd.LoaderManager.getInstance().get("sceneModel");


                    var result = sceneModel;

                    var objModel = result.getChild("models").getChild(0);

                    //obj1 = createObject();

                    //obj1.addChild(objModel);

                    obj1.transform.position = Vector3.create(10, 10, 10);
                    objModel.transform.position = Vector3.create(-10, -10, -10);

                    octreeObject.addChild(objModel);

                    octreeObject.init();



                    tree.build();


                    judgeRoot();

                    judgeFirstDepthChild(0, 1, objModel);
                    judgeFirstDepthChild(1, 1, objModel);
                    judgeFirstDepthChild(2, 1, objModel);
                    judgeFirstDepthChild(3, 1, objModel);
                    judgeFirstDepthChild(4, 1, objModel);
                    judgeFirstDepthChild(5, 1, objModel);
                    judgeFirstDepthChild(6, 1, objModel);
                    judgeFirstDepthChild(7, 1, objModel);

                    done();
                });
            });
        });

        it("test rebuild", function () {
            obj1 = createObject([10, 10, 10]);
            obj2 = createObject([-10, -10, -10]);

            octreeObject.addChildren([obj1, obj2]);

            octreeObject.init();





            tree.build();

            obj1.transform.position = Vector3.create(-10, -10, -10);
            obj2.transform.position = Vector3.create(10, 10, 10);

            tree.build();




            judgeRoot();
            judgeFirstDepthChild(0, 1, obj1);
            judgeFirstDepthChild(1, 0);
            judgeFirstDepthChild(2, 0);
            judgeFirstDepthChild(3, 0);
            judgeFirstDepthChild(4, 0);
            judgeFirstDepthChild(5, 0);
            judgeFirstDepthChild(6, 0);
            judgeFirstDepthChild(7, 1, obj2);
        });
    });

    describe("getRenderListByFrustumCull", function(){
        var cameraObject;
        var director;

        function createCamera(pos, lookAtPoint, near, far, fovy){
            cameraObject = testTool.createCamera(pos, lookAtPoint, near, far, fovy);

            director.scene.addChild(cameraObject);
        }

        function createObj(pos, size) {
            var obj = createObject(pos, size);

            sandbox.stub(obj, "render");

            return obj;
        }

        beforeEach(function(){
            director = wd.Director.getInstance();


            tree.maxDepth = 2;
            tree.maxCapacity = 1;
        });

        describe("get render list by frustum cull", function(){
            describe("integration test", function(){
                beforeEach(function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                });

                it("test1", function(){
                    createCamera(Vector3.create(0,0,0), Vector3.create(10,10,10));

                    obj1 = createObj([10, 10, 10]);
                    obj2 = createObj([-10, -10, -10]);

                    octreeObject.addChildren([obj1, obj2]);

                    director.scene.addChild(octreeObject);


                    director._init();

                    director._run(1);


                    expect(obj1.render).toCalledOnce();
                    expect(obj2.render).not.toCalled();
                });
                it("no repeat entityObject", function () {
                    createCamera(Vector3.create(0,0,0), Vector3.create(10,0, 0));

                    obj1 = createObj([0, 0, 0]);

                    octreeObject.addChildren([obj1]);

                    director.scene.addChild(octreeObject);


                    director._init();

                    director._run(1);


                    expect(obj1.render).toCalledOnce();
                });
            });
        });
    });

    describe("getIntersectListWithRay", function(){
        describe("test trigger the event script handler of the top gameObject intersected with ray", function(){
            describe("integration test", function(){
                var url;
                var director;
                var manager;
                var fakeEvent;
                var gameObject;
                var view;

                function createGameObject(){
                    return eventScriptTool.createGameObject(url);
                }


                beforeEach(function(){
                    url = "http://" + location.host + "/" + testTool.resPath + "test/res/script/event.js";



                    director = wd.Director.getInstance();

                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        x: 0,
                        y: 0,
                        width:1000,
                        height: 500,

                        offset:{
                            x:0,
                            y:0
                        }
                    });


                    view = wd.DeviceManager.getInstance().view;

                    sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


                    manager = wd.EventManager;
                });
                afterEach(function () {
                    testTool.clearInstance();

                    $("canvas").remove();

                    sandbox.restore();
                });

                it("test1", function(done){
                    gameObject = createGameObject();
                    octreeObject.addChild(gameObject);

                    director.scene.addChild(testTool.createCamera());
                    director.scene.addChild(octreeObject);

                    director.scene.currentCamera.position = wd.Vector3.create(0, 0, 20);




                    scriptTool.testScript(gameObject, "event", function (test, gameObject) {
                        sandbox.spy(test, "onMouseClick");


                        wd.EventManager.on(gameObject, wd.EEngineEvent["MOUSE_CLICK"], function(e){
                            expect(e).toBeInstanceOf(wd.CustomEvent);
                            expect(e.userData).toBeInstanceOf(wd.MouseEvent);
                        });
                    }, function (test) {
                    }, function (test, time, gameObject) {
                        fakeEvent = {
                            pageX: view.width / 2,
                            pageY: view.height / 2
                        };
                        manager.trigger(document.body, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(test.onMouseClick).toCalledOnce();
                    }, done, true);
                });
                it("only trigger parent gameObject except trigger child gameObject", function () {
                    gameObject = createGameObject();
                    var gameObject2 = createGameObject();

                    gameObject.addChild(gameObject2);

                    octreeObject.addChild(gameObject);


                    fakeEvent = {
                        pageX: view.width / 2,
                        pageY: view.height / 2
                    };

                    var fakeMouseEvent = wd.MouseEvent.create(fakeEvent);

                    var domEventManager = director.domEventManager;

                    director.scene.addChild(testTool.createCamera());
                    director.scene.addChild(octreeObject);

                    director._init();




                    var resultList = domEventManager._findTriggerGameObjectList(fakeMouseEvent, director.scene.gameObjectScene);




                    //expect(resultList.getCount()).toEqual(2);
                    expect(resultList.getCount()).toEqual(1);
                    expect(resultList.getChild(0)).toEqual(gameObject);
                    //expect(resultList.getChild(1)).toEqual(gameObject2);
                });
            });
        });
    });

    describe("getCollideObjects", function(){
        function createAABB(center, halfExtends){
            var shape = wd.AABBShape.create();
            shape.center = center;
            shape.halfExtents = halfExtends || Vector3.create(1,1,1);

            return shape;
        }

        beforeEach(function(){

        });

        it("get objects which collided with the shape", function(){
            obj1 = createObject([-10, -10, -10]);
            obj2 = createObject([10, 10, 10]);
            obj3 = createObject([6, 6, 6]);

            octreeObject.addChildren([obj1, obj2, obj3]);
            octreeObject.init();

            tree.build();





            var result = tree.getCollideObjects(createAABB(Vector3.create(2,2,2)));
            expect(result.getCount()).toEqual(2);
            expect(result.getChildren()).toEqual([obj2, obj3])



            result = tree.getCollideObjects(createAABB(Vector3.create(-2,-2,-2)));
            expect(result.getCount()).toEqual(1);
            expect(result.getChildren()).toEqual([obj1])
        });
    });
});

