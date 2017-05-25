describe("Geometry", function () {
    var sandbox = null;
    var gameObject;
    var geo;
    var director;

    var EDrawMode = wd.EDrawMode;

    var defaultVerticesData,
        defaultIndicesData;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        director = directorTool.getDirector();

        geo = boxGeometryTool.create();

        gameObject = gameObjectTool.create();

        gameObjectTool.addComponent(gameObject, geo);

        sceneTool.addGameObject(gameObject);


        defaultVerticesData = [
            -10, -10, 10, -10, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 10, -10, 10, 10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10
        ];

        defaultIndicesData = [
            0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21
        ]
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("init", function () {
        beforeEach(function () {
            boxGeometryTool.setConfigData(geo, {
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
            var gl = glslTool.buildFakeGl(sandbox);
            deviceManagerTool.setGL(gl);

            director._init();

            expect(gl.createBuffer).not.toCalled();
        });
    });

    describe("getDrawMode", function () {
        beforeEach(function () {
        });

        it("default is TRIANGLES", function () {
            expect(geometryTool.getDrawMode(geo)).toEqual(EDrawMode.TRIANGLES);
        });
    });

    describe("setDrawMode", function () {
        beforeEach(function () {
        });

        it("default is TRIANGLES", function () {
            var drawMode = EDrawMode.LINE_LOOP;

            geometryTool.setDrawMode(geo, drawMode);

            expect(geometryTool.getDrawMode(geo)).toEqual(drawMode);
        });
    });

    describe("disposeComponent", function () {
        beforeEach(function () {
            director._init();

            gameObjectTool.disposeComponent(gameObject, geo);
        });

        it("remove vertices", function () {
            expect(geometryTool.getVertices(geo)).toBeUndefined();
        });
        it("remove indices", function () {
            expect(geometryTool.getIndices(geo)).toBeUndefined();
        });
        it("remove config data", function () {
            expect(geometryTool.getConfigData(geo)).toBeUndefined();
        });
        it("remove draw mode", function () {
            expect(geometryTool.getDrawMode(geo)).toBeUndefined();
        });
        it("remove from gameObject", function () {
            expect(gameObjectTool.hasComponent(gameObject, wd.Geometry)).toBeFalsy();
            expect(geometryTool.getGameObject(geo)).toBeUndefined();
        });
        it("test gameObject add new geometry after dispose old one", function () {
            geo = boxGeometryTool.create();

            gameObjectTool.addComponent(gameObject, geo);

            geometryTool.initGeometry(geo);

            expect(testTool.getValues(geometryTool.getVertices(geo))).toEqual(defaultVerticesData);
        });
    });

    describe("initGeometry", function () {
        beforeEach(function () {
        });

        it("compute data", function () {
            geometryTool.initGeometry(geo);

            expect(testTool.getValues(geometryTool.getVertices(geo))).toEqual(defaultVerticesData);
            expect(testTool.getValues(geometryTool.getIndices(geo))).toEqual(defaultIndicesData);
        });
    });

    describe("getGeometryConfigData", function () {
        beforeEach(function () {
        });

        it("get config data", function () {
            var configData = {
                width: 10,
                height: 20,
                depth: 30,
                widthSegments: 2,
                heightSegments: 2,
                depthSegments: 2
            };
            boxGeometryTool.setConfigData(geo, configData);

            expect(geometryTool.getConfigData(geo)).toEqual(configData);
        });
    });
});
