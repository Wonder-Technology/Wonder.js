describe("DebugStatistics", function () {
    var sandbox = null;
    var Debug = wd.DebugStatistics;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("count", function(){
        describe("get totalGameObjects", function(){
            it("get all first level child of scene", function(){
                var obj1 = wd.GameObject.create();
                var obj2 = wd.GameObject.create();

                obj1.addChild(obj2);

                director.scene.addChild(obj1);
                director.scene.addChild(wd.UIObject.create());

                expect(Debug.count.totalGameObjects).toEqual(2);
            });
            it("get octree->children", function(){
                var octreeContainer = wd.GameObject.create();
                octreeContainer.addComponent(wd.Octree.create());

                var obj1 = wd.GameObject.create();
                var obj2 = wd.GameObject.create();

                octreeContainer.addChild(obj1);
                octreeContainer.addChild(obj2);

                var obj3 = wd.GameObject.create();

                director.scene.addChild(octreeContainer);
                director.scene.addChild(obj3);

                expect(Debug.count.totalGameObjects).toEqual(3);
            });
        });
    });

    describe("dispose", function(){
        it("unbind STARTLOOP event", function(){
            sandbox.stub(wd.DebugConfig, "showDebugPanel", true);
            sandbox.stub(Debug, "clear");

            Debug.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.STARTLOOP));

            expect(Debug.clear).toCalledOnce();





            Debug.dispose();




            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.STARTLOOP));

            expect(Debug.clear).not.toCalledTwice();
        });
    });
});
