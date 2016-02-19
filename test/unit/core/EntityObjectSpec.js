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
                sandbox.spy(entityObject.components, "findOne");
            });

            it("if cached, return cache data", function(){
                var component1 = entityObject.getComponent(wd.BoxCollider);
                var component2 = entityObject.getComponent(wd.BoxCollider);

                expect(component1).toEqual(component);
                expect(component1 === component2).toBeTruthy();
                expect(entityObject.components.findOne).toCalledOnce();
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
                sandbox.spy(entityObject.components, "hasChild");
            });

            describe("if cached, return cache data", function(){
                it("test param is class", function () {
                    var hasComponent1 = entityObject.hasComponent(wd.BoxCollider);
                    var hasComponent2 = entityObject.hasComponent(wd.BoxCollider);

                    expect(hasComponent1).toBeTruthy();
                    expect(hasComponent2).toBeTruthy();
                    expect(entityObject.components.hasChild).toCalledOnce();
                });
                it("test param is Component instance", function () {
                    var hasComponent1 = entityObject.hasComponent(component);
                    var hasComponent2 = entityObject.hasComponent(component);

                    expect(hasComponent1).toBeTruthy();
                    expect(hasComponent2).toBeTruthy();
                    expect(entityObject.components.hasChild).toCalledOnce();
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

        describe("addComponent", function(){
            it("if component exist, return", function(){
                entityObject.addComponent(component);

                expect(entityObject.components.getCount()).toEqual(1);
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
});
