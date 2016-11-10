describe("EntityObject", function() {
    var sandbox = null;
    var entityObject = null;
    var EntityObject = null;
    var Vector3 = wd.Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        EntityObject = wd.EntityObject;
        entityObject = new EntityObject();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("initComponent", function(){
        beforeEach(function(){

        });

        it("firstly, init geometry component", function(){
            var geometry = wd.BoxGeometry.create();
            sandbox.stub(geometry, "init");

            var collider = wd.BoxCollider.create();
            sandbox.stub(collider, "init");

            var octree = wd.Octree.create();
            sandbox.stub(octree, "init");

            entityObject.addComponent(collider);
            entityObject.addComponent(octree);
            entityObject.addComponent(geometry);

            entityObject.init();

            expect(geometry.init).toCalledBefore(collider.init);
            expect(geometry.init).toCalledBefore(octree.init);
        });
    });

    describe("getComponent", function(){
        var component;

        beforeEach(function(){
            component = wd.BoxCollider.create();
            entityObject.addComponent(component);
        });

        describe("test cache", function(){
            beforeEach(function(){
                sandbox.spy(entityObject.getComponents(), "findOne");
            });

            it("if cached, return cache data", function(){
                var component1 = entityObject.getComponent(wd.BoxCollider);
                var component2 = entityObject.getComponent(wd.BoxCollider);

                expect(component1).toEqual(component);
                expect(component1 === component2).toBeTruthy();
                expect(entityObject.getComponents().findOne).toCalledOnce();
            });
        });

        it("get component", function () {
            var component1 = entityObject.getComponent(wd.BoxCollider);

            expect(component1).toEqual(component);
        });
    });

    describe("hasComponent", function(){
        var component;

        beforeEach(function(){
            component = wd.BoxCollider.create();
            entityObject.addComponent(component);
        });

        describe("test cache", function(){
            beforeEach(function(){
                sandbox.spy(entityObject.getComponents(), "hasChild");
                sandbox.spy(entityObject.getComponents(), "hasChildWithFunc");
            });

            describe("if cached, return cache data", function(){
                it("test param is class", function () {
                    var hasComponent1 = entityObject.hasComponent(wd.BoxCollider);
                    var hasComponent2 = entityObject.hasComponent(wd.BoxCollider);

                    expect(hasComponent1).toBeTruthy();
                    expect(hasComponent2).toBeTruthy();
                    expect(entityObject.getComponents().hasChildWithFunc).toCalledOnce();
                });
                it("test param is Component instance", function () {
                    var hasComponent1 = entityObject.hasComponent(component);
                    var hasComponent2 = entityObject.hasComponent(component);

                    expect(hasComponent1).toBeTruthy();
                    expect(hasComponent2).toBeTruthy();
                    expect(entityObject.getComponents().hasChild).toCalledOnce();
                });
            });
        });

        it("test param is class", function () {
            var hasComponent1 = entityObject.hasComponent(wd.BoxCollider);

            expect(hasComponent1).toBeTruthy();
        });
        it("test param is Component instance", function () {
            var hasComponent1 = entityObject.hasComponent(component);

            expect(hasComponent1).toBeTruthy();
        });
    });

    describe("test operate component", function(){
        var component;

        beforeEach(function(){
            component = wd.BoxCollider.create();
            entityObject.addComponent(component);
        });

        describe("addChildren", function(){
            beforeEach(function(){

            });

            it("set children->transform's parent", function(){
                var child1 = new wd.EntityObject();
                child1.addComponent(wd.ThreeDTransform.create());

                var child2 = new wd.EntityObject();
                child2.addComponent(wd.ThreeDTransform.create());


                entityObject.addComponent(wd.ThreeDTransform.create());

                entityObject.addChildren([child1, child2]);

                expect(child1.transform.parent).toEqual(entityObject.transform);
                expect(child2.transform.parent).toEqual(entityObject.transform);
            });
        });

        describe("addComponent", function(){
            it("if component exist, contract error", function(){
                testTool.openContractCheck(sandbox);

                expect(function(){
                    entityObject.addComponent(component);
                }).toThrow();
            });

            it("clear component cache", function(){
                var hasComponent = entityObject.hasComponent(component);
                var getComponent = entityObject.getComponent(wd.BoxCollider);

                expect(entityObject._hasComponentCache.getCount()).not.toEqual(0);
                expect(entityObject._getComponentCache.getCount()).not.toEqual(0);


                var component2 = wd.SphereCollider.create();
                entityObject.addComponent(component2);

                expect(entityObject._hasComponentCache.getCount()).toEqual(0);
                expect(entityObject._getComponentCache.getCount()).toEqual(0);
            });

            describe("if component is transform, ", function () {
                it("if already add transform component, replace it to be the new one", function () {
                    var transform1 = wd.ThreeDTransform.create();
                    var transform2 = wd.ThreeDTransform.create();

                    entityObject.addComponent(transform1);
                    entityObject.addComponent(transform2);

                    expect(testTool.getAllComponents(entityObject, wd.ThreeDTransform).getCount()).toEqual(1);
                    expect(entityObject.hasComponent(transform2)).toBeTruthy();
                });
            });

            //todo test more
        });

        describe("removeComponent", function(){
            it("clear component cache", function(){
                var hasComponent = entityObject.hasComponent(component);
                var getComponent = entityObject.getComponent(wd.BoxCollider);


                expect(entityObject._hasComponentCache.getCount()).not.toEqual(0);
                expect(entityObject._getComponentCache.getCount()).not.toEqual(0);


                entityObject.removeComponent(component);

                expect(entityObject._hasComponentCache.getCount()).toEqual(0);
                expect(entityObject._getComponentCache.getCount()).toEqual(0);
            });
            //todo test more
        });

        describe("removeAllComponent", function(){
            beforeEach(function(){

            });

            it("clear component cache", function(){
                var hasComponent = entityObject.hasComponent(component);
                var getComponent = entityObject.getComponent(wd.BoxCollider);

                expect(entityObject._hasComponentCache.getCount()).not.toEqual(0);
                expect(entityObject._getComponentCache.getCount()).not.toEqual(0);


                entityObject.removeAllComponent();

                expect(entityObject._hasComponentCache.getCount()).toEqual(0);
                expect(entityObject._getComponentCache.getCount()).toEqual(0);
            });
            //todo test more
        });
    });

    describe("removeAllChildren", function(){
        it("remove all children", function(){
            var child1 = new EntityObject();
            child1.addComponent(wd.ThreeDTransform.create());
            var child2 = new EntityObject();
            child2.addComponent(wd.ThreeDTransform.create());
            entityObject.addChildren([child1, child2]);

            entityObject.removeAllChildren();

            expect(entityObject.getAllChildren().getCount()).toEqual(0);
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        describe("bind component_change event", function(){
            beforeEach(function(){
                entityObject.init();

                sandbox.stub(entityObject, "clearCache");
            });

            it("clear cache", function(){
                wd.EventManager.trigger(entityObject, wd.CustomEvent.create(wd.EEngineEvent.COMPONENT_CHANGE));

                expect(entityObject.clearCache).toCalledOnce();
            });
        });

        //todo test more
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("unbind component_change event", function(){
            entityObject.init();
            sandbox.stub(entityObject, "_onComponentChange");

            wd.EventManager.trigger(entityObject, wd.CustomEvent.create(wd.EEngineEvent.COMPONENT_CHANGE));

            expect(entityObject._onComponentChange).toCalledOnce();


            entityObject.dispose();


            wd.EventManager.trigger(entityObject, wd.CustomEvent.create(wd.EEngineEvent.COMPONENT_CHANGE));

            expect(entityObject._onComponentChange).not.toCalledTwice();
        });
        it("off custom event", function () {
            var a = 0;
            var b = 0;

            wd.EventManager.on(entityObject, "customEvent1", function(){
                a++;
            });

            wd.EventManager.on(entityObject, "customEvent2", function(){
                a++;
            });

            entityObject.dispose();

            wd.EventManager.trigger(entityObject, wd.CustomEvent.create("customEvent1"));
            wd.EventManager.trigger(entityObject, wd.CustomEvent.create("customEvent2"));

            expect(a).toEqual(0);
            expect(b).toEqual(0);
        });
        //todo test more
    });
});
