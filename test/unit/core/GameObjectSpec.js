describe("GameObject", function() {
    var sandbox = null;
    var gameObject = null;
    var GameObject = null;
    var Vector3 = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        GameObject = wd.GameObject;
        gameObject = GameObject.create();
        Vector3 = wd.Vector3;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("static method", function(){
        beforeEach(function(){
        });

        describe("merge", function(){
            var obj1,obj2;

            beforeEach(function(){
                testTool.openContractCheck(sandbox);

                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                obj1 = prepareTool.createBox();
                obj2 = prepareTool.createSphere();
            });

            it("each object should has the same shader, otherwise error", function () {
                expect(function(){
                    GameObject.merge([obj1, obj2]);
                }).not.toThrow();


                obj2.getComponent(wd.Geometry).material = wd.LightMaterial.create();
                expect(function(){
                    GameObject.merge([obj1, obj2]);
                }).toThrow("should has the same material class");
            });
            //it("clone the source object(the first object of the objectArr) as the initial result object but not clone the source's geometry(except the material)", function () {
            it("the merged object should has the cloned components(except geometry component) from the source object(the first object of the objectArr)", function () {
                var collider = wd.BoxCollider.create();
                var clonedCollider = wd.BoxCollider.create();
                sandbox.stub(collider, "clone").returns(clonedCollider);
                obj1.addComponent(collider);


                var mergedObject = GameObject.merge([obj1, obj2]);


                expect(mergedObject.hasComponent(clonedCollider)).toBeTruthy();
            });
            it("the merged object should has ModelGeometry component with the cloned material from the soure object", function () {
                var material = obj1.getComponent(wd.Geometry).material;
                var clonedMaterial = {};
                sandbox.stub(material, "clone").returns(clonedMaterial);


                var mergedObject = GameObject.merge([obj1, obj2]);


                expect(mergedObject.hasComponent(wd.ModelGeometry)).toBeTruthy();
                expect(
                    mergedObject.getComponent(wd.ModelGeometry).material === clonedMaterial
                ).toBeTruthy();
            });
            it("the merged object should only contain one geometry", function () {
                var mergedObject = GameObject.merge([obj1, obj2]);

                expect(mergedObject.getComponentCount(wd.Geometry)).toEqual(1);
            });
            it("the merged object's geometry should merge all objects in the objectArr", function () {
                var modelGeometry = wd.ModelGeometry.create();
                sandbox.stub(modelGeometry, "merge");
                sandbox.stub(wd.ModelGeometry, "create").returns(modelGeometry);

                var mergedObject = GameObject.merge([obj1, obj2]);

                expect(modelGeometry.merge).toCalledTwice();
                expect(modelGeometry.merge.firstCall).toCalledWith(obj1.getComponent(wd.Geometry), obj1.transform);
                expect(modelGeometry.merge.secondCall).toCalledWith(obj2.getComponent(wd.Geometry), obj2.transform);
            });

            it("if object of objectArr has children, not merge its children so that the merged object don't has children", function () {
                var child1 = prepareTool.createSphere();
                obj1.addChild(child1);

                var mergedObject = GameObject.merge([obj1, obj2]);

                expect(mergedObject.getChildren().getCount()).toEqual(0);
            });
        });
    });

    describe("findChildByUid", function(){
        it("match uid, return the first result.", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.uid = 1;
            var child2 = GameObject.create();
            child2.uid = 2;
            var child3 = GameObject.create();
            child3.uid = 3;
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildByUid(2)).toEqual(child2);
            expect(parent.findChildByUid(3)).toEqual(child3);
        });
    });

    describe("findChildByTag", function(){
        it("complete match tag, return the first result.", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.addTag("1");
            var child2 = GameObject.create();
            child2.addTag("a");
            child2.addTag("b");

            var child3 = GameObject.create();
            child3.addTag("a");
            child3.addTag("abc");

            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildByTag("1")).toEqual(child1);
            expect(parent.findChildByTag("a")).toEqual(child2);
            expect(parent.findChildByTag("abc")).toEqual(child3);
        });
    });

    describe("findChildByName", function(){
        it("partial match name, return the first result. name can be string/regex", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.name = "gogogo";
            var child2 = GameObject.create();
            child2.name = "hello";
            var child3 = GameObject.create();
            child3.name = "hello world";
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildByName("hello")).toEqual(child2);
            expect(parent.findChildByName(/go/)).toEqual(child1);
        });
    });

    describe("findChildrenByName", function(){
        it("partial match name, return the all matched results. name can be string/regex", function(){
            var parent = GameObject.create();
            var child1 = GameObject.create();
            child1.name = "hello";
            var child2 = GameObject.create();
            child2.name = "hello world";
            var child3 = GameObject.create();
            child3.name = "gogogo";
            parent.addChild(child1);
            parent.addChild(child2);
            parent.addChild(child3);

            expect(parent.findChildrenByName("hello").getChildren()).toEqual([child1, child2]);
            expect(parent.findChildrenByName(/go/).getChildren()).toEqual([child3]);
        });
    });

    describe("dispose", function(){
        it("off startLoop,endLoop event->exec script handler", function(){
            var script = {
                onStartLoop:sandbox.stub(),
                onEndLoop:sandbox.stub()
            };
            prepareTool.addScript(gameObject, script);

            gameObject.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(script.onStartLoop).toCalledOnce();
            expect(script.onEndLoop).toCalledOnce();


            gameObject.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));
            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));


            expect(script.onStartLoop).toCalledOnce();
            expect(script.onEndLoop).toCalledOnce();
        });
        it("invoke its and children's script->dispose", function(){
            var script1 = {
                onDispose:sandbox.stub()
            };
            var script2 = {
                onDispose:sandbox.stub()
            };
            prepareTool.addScript(gameObject, script1);


            var child = GameObject.create();

            prepareTool.addScript(child, script2);


            gameObject.addChild(child);




            gameObject.dispose();



            expect(script1.onDispose).toCalledOnce();
            expect(script2.onDispose).toCalledOnce();
            expect(script1.onDispose).toCalledBefore(script2.onDispose);
        });
        //todo more test
    });

    //todo move related SceneSpec here

    describe("clone", function(){
        beforeEach(function(){
        });

        describe("clone EntityObject data", function(){
            beforeEach(function(){
            });

            it("share bubbleParent,parent", function(){
                var bubbleParent = {},
                    parent = {a:1};


                cloneTool.extend(gameObject, {
                    bubbleParent:bubbleParent,
                    parent:parent
                })

                var result = gameObject.clone();

                expect(result.bubbleParent === gameObject.bubbleParent).toBeTruthy();
                expect(result.parent === gameObject.parent).toBeTruthy();
            });
            it("clone components", function () {
                var geo = wd.SphereGeometry.create();
                var resultGeo = wd.SphereGeometry.create();
                sandbox.stub(geo, "clone").returns(resultGeo);

                    var shadow = wd.Shadow.create();
                var resultShadow = wd.Shadow.create();
                sandbox.stub(shadow, "clone").returns(resultShadow);

                gameObject.addComponent(geo);
                gameObject.addComponent(shadow);


                var result = gameObject.clone();

                judgeTool.isObjectEqual(result.getComponent(wd.Shadow), (resultShadow));
                judgeTool.isObjectEqual(result.getComponent(wd.Geometry), (resultGeo));
            });
            it("clone children", function () {
                var child1 = wd.GameObject.create();
                var resultChild1 = wd.GameObject.create();
                sandbox.stub(child1, "clone").returns(resultChild1);

                var child2 = wd.GameObject.create();
                sandbox.spy(child2, "clone");

                var child21 = wd.GameObject.create();
                var resultChild21 = wd.GameObject.create();
                sandbox.stub(child21, "clone").returns(resultChild21);

                child2.addChild(child21);


                gameObject.addChildren([child1, child2]);




                var result = gameObject.clone();



                judgeTool.isObjectEqual(result.getChild(0), resultChild1);

                expect(child2.clone).toCalledOnce();
                expect(result.getChild(1)).not.toEqual(child2);
                judgeTool.isObjectEqual(result.getChild(1).getChild(0), resultChild21);
            });
            it("clone data", function () {
                var name = "a",
                    isVisible = false;

                cloneTool.extend(gameObject, {
                    name:name,
                    isVisible:isVisible
                })

                var result = gameObject.clone();

                expect(result.name).toEqual(name);
                expect(result.isVisible).toEqual(isVisible);
            });
        });
    });
});
