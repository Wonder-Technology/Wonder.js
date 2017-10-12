describe("BoxGeometry", function () {
    var sandbox = null;
    var geo;
    var director;
    var gameObject;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount:200
        });

        director = directorTool.getDirector();

        geo = boxGeometryTool.create();

        gameObject = gameObjectSystemTool.create();

        gameObjectSystemTool.addComponent(gameObject, geo);

        sceneSystemTool.addGameObject(gameObject);

        state = stateTool.createAndSetFakeGLState(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("init", function () {
        beforeEach(function () {
        });

        it("test with 2 segements", function () {
            boxGeometryTool.setConfigData(geo, {
                width: 10,
                height: 20,
                depth: 30,
                widthSegments: 2,
                heightSegments: 2,
                depthSegments: 2
            })

            director._init(state);

            expect(testTool.getValues(
                geometrySystemTool.getVertices(geo)
            )).toEqual(
                [-10, -20, 30, -10, 0, 30, -10, 20, 30, 0, -20, 30, 0, 0, 30, 0, 20, 30, 10, -20, 30, 10, 0, 30, 10, 20, 30, 10, -20, -30, 10, 0, -30, 10, 20, -30, 0, -20, -30, 0, 0, -30, 0, 20, -30, -10, -20, -30, -10, 0, -30, -10, 20, -30, -10, 20, 30, -10, 20, 0, -10, 20, -30, 0, 20, 30, 0, 20, 0, 0, 20, -30, 10, 20, 30, 10, 20, 0, 10, 20, -30, 10, -20, 30, 10, -20, 0, 10, -20, -30, 0, -20, 30, 0, -20, 0, 0, -20, -30, -10, -20, 30, -10, -20, 0, -10, -20, -30, 10, -20, 30, 10, 0, 30, 10, 20, 30, 10, -20, 0, 10, 0, 0, 10, 20, 0, 10, -20, -30, 10, 0, -30, 10, 20, -30, -10, -20, -30, -10, 0, -30, -10, 20, -30, -10, -20, 0, -10, 0, 0, -10, 20, 0, -10, -20, 30, -10, 0, 30, -10, 20, 30]
            )

            expect(testTool.getValues(
                geometrySystemTool.getIndices(geo)
            )).toEqual(
                [
                    0, 3, 1, 3, 4, 1, 1, 4, 2, 4, 5, 2, 3, 6, 4, 6, 7, 4, 4, 7, 5, 7, 8, 5, 9, 12, 10, 12, 13, 10, 10, 13, 11, 13, 14, 11, 12, 15, 13, 15, 16, 13, 13, 16, 14, 16, 17, 14, 18, 21, 19, 21, 22, 19, 19, 22, 20, 22, 23, 20, 21, 24, 22, 24, 25, 22, 22, 25, 23, 25, 26, 23, 27, 30, 28, 30, 31, 28, 28, 31, 29, 31, 32, 29, 30, 33, 31, 33, 34, 31, 31, 34, 32, 34, 35, 32, 36, 39, 37, 39, 40, 37, 37, 40, 38, 40, 41, 38, 39, 42, 40, 42, 43, 40, 40, 43, 41, 43, 44, 41, 45, 48, 46, 48, 49, 46, 46, 49, 47, 49, 50, 47, 48, 51, 49, 51, 52, 49, 49, 52, 50, 52, 53, 50
                ]
            );

        });
        // it("test smooth shading", function(){
        //     geo.material.shading = wd.EShading.SMOOTH;
        //
        //     judgeOneSegemets();
        // });
    });

    describe("setConfigData", function () {
        beforeEach(function () {
        });

        it("set default data when create", function () {
            director._init(state);

            expect(geometrySystemTool.getConfigData(geo)).toEqual({
                width: 10,
                height: 10,
                depth: 10,
                widthSegments: 1,
                heightSegments: 1,
                depthSegments: 1
            });
            expect(testTool.getValues(
                geometrySystemTool.getVertices(geo)
            )).toEqual(
                [
                    -10, -10, 10, -10, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 10, -10, 10, 10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10
                ]
            )


            expect(testTool.getValues(
                geometrySystemTool.getNormals(geo)
            )).toEqual(
                [
                    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
                ]
            )

            expect(testTool.getValues(
                geometrySystemTool.getTexCoords(geo)
            )).toEqual(
                [
                    0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1
                ]
            )

            expect(testTool.getValues(
                geometrySystemTool.getIndices(geo)
            )).toEqual(
                [
                    0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21
                ]
            );
        });
        it("if not pass full data, use default data", function () {
            boxGeometryTool.setConfigData(geo, {
                width: 10,
                widthSegments: 2,
                depthSegments: 2
            })

            director._init(state);

            expect(geometrySystemTool.getConfigData(geo)).toEqual({
                width: 10,
                height: 10,
                depth: 10,
                widthSegments: 2,
                heightSegments: 1,
                depthSegments: 2
            });
            expect(testTool.getValues(
                geometrySystemTool.getVertices(geo)
            )).toEqual(
                [
                    -10, -10, 10, -10, 10, 10, 0, -10, 10, 0, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, 0, -10, -10, 0, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, 0, -10, 10, -10, 0, 10, 10, 0, 10, 0, 0, 10, -10, 10, 10, 10, 10, 10, 0, 10, 10, -10, 10, -10, 10, 10, -10, 0, 10, -10, -10, 0, -10, 10, 0, -10, 0, 0, -10, -10, -10, -10, 10, -10, -10, 0, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 0, 10, 10, 0, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 0, -10, 10, 0, -10, -10, 10, -10, 10, 10
                ]
            )

            expect(testTool.getValues(
                geometrySystemTool.getNormals(geo)
            )).toEqual(
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0]
            )
            expect(testTool.getValues(
                geometrySystemTool.getIndices(geo)
            )).toEqual(
                [
                    0, 3, 1, 3, 4, 1, 3, 6, 4, 6, 7, 4, 6, 9, 7, 9, 10, 7, 9, 12, 10, 12, 13, 10, 12, 15, 13, 15, 16, 13, 13, 16, 14, 16, 17, 14, 15, 18, 16, 18, 19, 16, 16, 19, 17, 19, 20, 17, 21, 24, 22, 24, 25, 22, 22, 25, 23, 25, 26, 23, 24, 27, 25, 27, 28, 25, 25, 28, 26, 28, 29, 26, 30, 33, 31, 33, 34, 31, 33, 36, 34, 36, 37, 34, 36, 39, 37, 39, 40, 37, 39, 42, 40, 42, 43, 40
                ]
            );
        });
    });
});
