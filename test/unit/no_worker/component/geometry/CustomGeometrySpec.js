describe("CustomGeometry", function () {
    var sandbox = null;
    var geo;
    var gameObject;

    var CustomGeometry = wd.CustomGeometry;
    var MemoryConfig = wd.MemoryConfig;

    function createCustomGeometry() {
        var customGeo = customGeometryTool.create();
        var vertices = [1,2,3,2,2,4,3,3,3];
        customGeometryTool.setVertices(customGeo, vertices);
        var indices = [1,2,3,2,2,4,3,3,3];
        customGeometryTool.setIndices(customGeo, indices);

        return customGeo;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        geo = createCustomGeometry();

        gameObject = gameObjectTool.create();

        gameObjectTool.addComponent(gameObject, geo);

        sceneTool.addGameObject(gameObject);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("init", function () {
        beforeEach(function () {
        });

        it("can get vertices from user setted data", function () {
            var vertices = [1,2,3,2,2,4,3,3,3];
            customGeometryTool.setVertices(geo, vertices);

            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getVertices(geo)
            )).toEqual(
                vertices
            )
        });
        it("can get indices from user setted data", function () {
            var indices = [1,2,3,2,2,4,3,3,3];
            customGeometryTool.setIndices(geo, indices);

            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getIndices(geo)
            )).toEqual(
                indices
            )
        });
    });

    describe("fix bug", function() {
        beforeEach(function(){

        });

        it("gameObject should has it after added it", function(){
            var data = sceneTool.prepareGameObjectAndAddToScene(true, customGeometryTool.create());
            var gameObject = data.gameObject;

            expect(gameObjectTool.hasComponent(gameObject, CustomGeometry)).toBeTruthy();
        });
        describe("test \"add two BoxGeometrys->dispose first BoxGeometrys->add one CustomGeometry\"", function () {
            function judge() {
                var data = sceneTool.prepareGameObjectAndAddToScene(true);
                var gameObject = data.gameObject;
                var geo = data.geometry;

                var data2 = sceneTool.prepareGameObjectAndAddToScene(true);
                var gameObject2 = data2.gameObject;

                directorTool.init(sandbox);

                gameObjectTool.dispose(gameObject);


                var data3 = sceneTool.prepareGameObjectAndAddToScene(true, createCustomGeometry());
                var gameObject3 = data3.gameObject;

                expect(gameObjectTool.hasComponent(gameObject3, CustomGeometry)).toBeTruthy();
            }

            it("test with no reallocate", function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                judge();
            });
            it("test with reallocate", function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 1);

                judge();
            });
        });
    });
});
