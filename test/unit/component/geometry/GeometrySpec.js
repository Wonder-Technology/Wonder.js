describe("Geometry", function () {
    var sandbox = null;
    var gameObject;
    var geo;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = directorTool.getDirector();

        geo = boxGeometryTool.create();

        gameObject = gameObjectTool.create();

        gameObjectTool.addComponent(gameObject, geo);

        sceneTool.addGameObject(gameObject);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("init", function () {
        beforeEach(function () {
            boxGeometryTool.setData(geo, {
                width: 10,
                height: 20,
                depth: 30
            })
        });

        it("save vertices to map", function () {
            director._init();

            expect(testTool.getValues(
                geometryTool.getVertices(geo)
            )).toEqual([-10, -20, 30, -10, 20, 30, 10, -20, 30, 10, 20, 30, 10, -20, -30, 10, 20, -30, -10, -20, -30, -10, 20, -30, -10, 20, 30, -10, 20, -30, 10, 20, 30, 10, 20, -30, 10, -20, 30, 10, -20, -30, -10, -20, 30, -10, -20, -30, 10, -20, 30, 10, 20, 30, 10, -20, -30, 10, 20, -30, -10, -20, -30, -10, 20, -30, -10, -20, 30, -10, 20, 30]);
        });
        it("save indices to map", function () {
            director._init();

            expect(testTool.getValues(
                geometryTool.getIndices(geo)
            )).toEqual([
                0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21
            ]);
        });
        it("not create buffers", function () {
            var gl = testTool.buildFakeGl(sandbox);
            deviceManagerTool.setGL(gl);

            director._init();

            expect(gl.createBuffer).not.toCalled();
        });
    });
});
