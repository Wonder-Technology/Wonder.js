describe("Octree", function () {
    var sandbox = null;
    var tree = null;
    var Octree = wd.Octree;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        tree = Octree.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("build", function () {
        var obj1, obj2, obj3;

        function createObject(pos) {
            var obj = prepareTool.createBox(5);

            if(pos){
                obj.transform.position = wd.Vector3.create(pos[0], pos[1], pos[2]);
            }

            return obj;
        }

        function getRoot(){
            return tree._root;
        }

        function judgeRoot(){
            var root = getRoot();
            expect(root.nodes.getCount()).toEqual(8);
            expect(root.entityObjects.getCount()).toEqual(0);
        }

        function judgeFirstDepthChild(index, entityObjectsCount, entityObject){
            var root = getRoot();
            var child = root.nodes.getChild(index);
            expect(child.nodes.getCount()).toEqual(0);
            expect(child.entityObjects.getCount()).toEqual(entityObjectsCount);

            if(entityObjectsCount > 0){
                expect(child.entityObjects.getChild(0)).toEqual(entityObject);
            }
        }

        beforeEach(function () {

        });

        describe("test when depth === 1", function(){
            beforeEach(function(){
                tree.maxDepth = 2;
            });

            it("test", function () {
                var octreeObject = wd.GameObject.create();

                octreeObject.addComponent(tree);

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
            function judgeSecondDepthChild(root, index, entityObjectsCount, entityObject){
                var child = root.nodes.getChild(index);
                expect(child.nodes.getCount()).toEqual(0);
                expect(child.entityObjects.getCount()).toEqual(entityObjectsCount);

                if(entityObjectsCount > 0){
                    expect(child.entityObjects.getChild(0)).toEqual(entityObject);
                }
            }

            beforeEach(function(){
                tree.maxDepth = 2;
                tree.maxNodeCapacity = 1;
            });

            it("test if node->entityObjectCount > maxNodeCapacity, build down", function () {
                var octreeObject = wd.GameObject.create();

                octreeObject.addComponent(tree);

                obj1 = createObject([20, 20, 20]);
                obj2 = createObject([-20, -20, -20]);
                obj3 = createObject([-6, -6, -20]);

                octreeObject.addChildren([obj1, obj2, obj3]);

                octreeObject.init();





                tree.build();





                judgeRoot();


                var root = getRoot();
                var child = root.nodes.getChild(0);
                expect(child.nodes.getCount()).toEqual(8);
                expect(child.entityObjects.getCount()).toEqual(2);

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

            var octreeObject = wd.GameObject.create();

            octreeObject.addComponent(tree);

            obj1 = createObject([20, 20, 20]);
            obj2 = createObject([-20, -20, -20]);
            obj3 = createObject([-6, -6, -20]);


            octreeObject.addChildren([obj1, obj2, obj3]);

            octreeObject.init();





            tree.build();





            judgeRoot();


            var root = getRoot();
            var child = root.nodes.getChild(0);
            expect(child.nodes.getCount()).toEqual(0);
            expect(child.entityObjects.getCount()).toEqual(2);

            judgeFirstDepthChild(1, 0);
            judgeFirstDepthChild(2, 0);
            judgeFirstDepthChild(3, 0);
            judgeFirstDepthChild(4, 0);
            judgeFirstDepthChild(5, 0);
            judgeFirstDepthChild(6, 0);
            judgeFirstDepthChild(7, 1, obj1);
        });
        it("if object->bounding region intersect with multi nodes, the nodes should all add it", function () {
            function judge(index){
                judgeFirstDepthChild(index, 1, obj1);
            }

            var octreeObject = wd.GameObject.create();

            tree.maxDepth = 2;
            tree.maxNodeCapacity = 2;

            octreeObject.addComponent(tree);

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

            it("test add parent-child object", function(){
                var octreeObject = wd.GameObject.create();

                octreeObject.addComponent(tree);

                obj1 = createObject();
                obj2 = createObject();

                obj1.addChild(obj2);

                obj1.transform.position = wd.Vector3.create(10, 10, 10);
                obj2.transform.position = wd.Vector3.create(-10, -10, -10);

                octreeObject.addChild(obj1);

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

                    var octreeObject = wd.GameObject.create();

                    octreeObject.addComponent(tree);


                    obj1 = createObject();

                    obj1.addChild(objModel);

                    obj1.transform.position = wd.Vector3.create(10, 10, 10);
                    objModel.transform.position = wd.Vector3.create(-10, -10, -10);

                    octreeObject.addChild(obj1);

                    octreeObject.init();



                    tree.build();


                    judgeRoot();

                    judgeFirstDepthChild(0, 1, objModel);
                    judgeFirstDepthChild(1, 0);
                    judgeFirstDepthChild(2, 0);
                    judgeFirstDepthChild(3, 0);
                    judgeFirstDepthChild(4, 0);
                    judgeFirstDepthChild(5, 0);
                    judgeFirstDepthChild(6, 0);
                    judgeFirstDepthChild(7, 1, obj1);

                    done();
                });
            });
        });

        it("test rebuild", function () {
            var octreeObject = wd.GameObject.create();

            octreeObject.addComponent(tree);

            obj1 = createObject([10, 10, 10]);
            obj2 = createObject([-10, -10, -10]);

            octreeObject.addChildren([obj1, obj2]);

            octreeObject.init();





            tree.build();

            obj1.transform.position = wd.Vector3.create(-10, -10, -10);
            obj2.transform.position = wd.Vector3.create(10, 10, 10);

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
});

