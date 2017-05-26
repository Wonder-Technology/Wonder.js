describe("CustomGeometry", function () {
    var sandbox = null;
    var geo;
    var director;
    var gameObject;

    var CustomGeometry = wd.CustomGeometry;
    var BoxGeometry = wd.BoxGeometry;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        director = directorTool.getDirector();

        geo = customGeometryTool.create();

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

            director._init();

            expect(testTool.getValues(
                geometryTool.getVertices(geo)
            )).toEqual(
                vertices
            )
        });
        it("can get indices from user setted data", function () {
            var indices = [1,2,3,2,2,4,3,3,3];
            customGeometryTool.setIndices(geo, indices);

            director._init();

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
        it("test \"add two BoxGeometrys->dispose first BoxGeometrys->add one CustomGeometry\"", function () {
            var data = sceneTool.prepareGameObjectAndAddToScene(true);
            var gameObject = data.gameObject;
            var geo = data.geometry;

            var data2 = sceneTool.prepareGameObjectAndAddToScene(true);
            var gameObject2 = data2.gameObject;
            // var geo2 = data.geometry;

            // gameObjectTool.disposeComponent(gameObject, geo);
            // gameObjectTool.disposeComponent(gameObject2, geo2);

            gameObjectTool.dispose(gameObject);
            // gameObjectTool.dispose(gameObject2);

            // gameObjectTool.addComponent(gameObject, customGeometryTool.create());

            var data3 = sceneTool.prepareGameObjectAndAddToScene(true, customGeometryTool.create());
            var gameObject3 = data3.gameObject;

            expect(gameObjectTool.hasComponent(gameObject3, CustomGeometry)).toBeTruthy();
        });
    });
});
