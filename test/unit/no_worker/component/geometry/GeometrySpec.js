describe("Geometry", function () {
    var sandbox = null;
    var gameObject;
    var geo;

    var EDrawMode = wd.EDrawMode;
    var DataBufferConfig = wd.DataBufferConfig;

    var defaultVerticesData,
        defaultNormalsData,
        defaultTexCoordsData,
        defaultIndicesData;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount:200
        });

        geo = boxGeometryTool.create();

        gameObject = gameObjectTool.create();

        gameObjectTool.addComponent(gameObject, geo);

        sceneTool.addGameObject(gameObject);


        defaultVerticesData = [
            -10, -10, 10, -10, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 10, -10, 10, 10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10
        ];

        defaultNormalsData = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0];


        defaultTexCoordsData = [
            0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1
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
            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getVertices(geo)
            )).toEqual([-10, -20, 30, -10, 20, 30, 10, -20, 30, 10, 20, 30, 10, -20, -30, 10, 20, -30, -10, -20, -30, -10, 20, -30, -10, 20, 30, -10, 20, -30, 10, 20, 30, 10, 20, -30, 10, -20, 30, 10, -20, -30, -10, -20, 30, -10, -20, -30, 10, -20, 30, 10, 20, 30, 10, -20, -30, 10, 20, -30, -10, -20, -30, -10, 20, -30, -10, -20, 30, -10, 20, 30]);
        });
        it("save normals to map", function () {
            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getNormals(geo)
            )).toEqual(defaultNormalsData);
        });
        it("save texCoords to map", function () {
            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getTexCoords(geo)
            )).toEqual(defaultTexCoordsData);
        });
        it("save indices to map", function () {
            directorTool.init(sandbox);

            expect(testTool.getValues(
                geometryTool.getIndices(geo)
            )).toEqual([
                0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15, 13, 16, 18, 17, 18, 19, 17, 20, 22, 21, 22, 23, 21
            ]);
        });
        it("not create buffers", function () {
            var gl = glslTool.buildFakeGl(sandbox);
            deviceManagerTool.setGL(gl);

            directorTool.init(sandbox);

            expect(gl.createBuffer).not.toCalled();
        });
    });

    describe("getDrawMode", function () {
        beforeEach(function () {
        });

        it("return TRIANGLES", function () {
            expect(geometryTool.getDrawMode(geo)).toEqual(EDrawMode.TRIANGLES);
        });
    });

    // describe("setDrawMode", function () {
    //     beforeEach(function () {
    //     });
    //
    //     it("default is TRIANGLES", function () {
    //         var drawMode = EDrawMode.LINE_LOOP;
    //
    //         geometryTool.setDrawMode(geo, drawMode);
    //
    //         expect(geometryTool.getDrawMode(geo)).toEqual(drawMode);
    //     });
    // });

    describe("disposeComponent", function () {
        // describe("test dispose array data", function() {
        //     var geo2;
        //
        //     beforeEach(function(){
        //         geo2 = boxGeometryTool.create();
        //         var gameObject2 = gameObjectTool.create();
        //         gameObjectTool.addComponent(gameObject2, geo2);
        //         sceneTool.addGameObject(gameObject2);
        //         directorTool.init(sandbox);
        //     });
        //
        //     it("remove vertices", function () {
        //         gameObjectTool.disposeComponent(gameObject, geo);
        //
        //         // expect(geometryTool.getVertices(geo)).toBeUndefined();
        //         expect(geometryTool.getVertices(geo2)).toBeExist();
        //     });
        //     it("remove indices", function () {
        //         gameObjectTool.disposeComponent(gameObject, geo);
        //
        //         // expect(geometryTool.getIndices(geo)).toBeUndefined();
        //         expect(geometryTool.getIndices(geo2)).toBeExist();
        //     });
        // });

        it("mark geometry removed", function () {
            directorTool.init(sandbox);

            gameObjectTool.disposeComponent(gameObject, geo);

            componentTool.judgeIsComponentIndexNotRemoved(geo, expect);
        });

        describe("test dispose map data", function() {
            beforeEach(function () {
                directorTool.init(sandbox);

                gameObjectTool.disposeComponent(gameObject, geo);
            });

            // it("remove config data", function () {
            //     expect(geometryTool.getConfigData(geo)).toBeUndefined();
            // });
            it("remove from gameObject", function () {
                expect(gameObjectTool.hasComponent(gameObject, wd.Geometry)).toBeFalsy();
                // expect(geometryTool.getGameObject(geo)).toBeUndefined();
            });
        });

        it("test gameObject add new geometry after dispose old one", function () {
            directorTool.init(sandbox);

            gameObjectTool.disposeComponent(gameObject, geo);

            var geo2 = boxGeometryTool.create();

            gameObjectTool.addComponent(gameObject, geo2);

            geometryTool.initGeometry(geo2);

            // expect(testTool.getValues(geometryTool.getVertices(geo))).toBeUndefined();
            expect(testTool.getValues(geometryTool.getVertices(geo2))).toEqual(defaultVerticesData);
        });

        it("if geometry is disposed, operate it should error", function () {
            directorTool.init(sandbox);

            var errMsg = "component should alive";

            gameObjectTool.disposeComponent(gameObject, geo);

            expect(function () {
                geometryTool.getVertices(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getNormals(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getTexCoords(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getDrawMode(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getIndices(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getConfigData(geo);
            }).toThrow(errMsg);

            expect(function () {
                geometryTool.getGameObject(geo);
            }).toThrow(errMsg);
        });

        describe("if dispose too many components", function() {
            var MemoryConfig = wd.MemoryConfig;

            beforeEach(function(){
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);
            });

            describe("dispose buffers", function(){
                it("test dispose vertex buffers and index buffer", function () {
                    var geo1 = boxGeometryTool.create();
                    var geo2 = boxGeometryTool.create();

                    var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                    var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

                    var obj1 = data1.gameObject,
                        obj2 = data2.gameObject;

                    directorTool.init(sandbox);


                    var buffer1 = {},
                        buffer2 = {a:2},
                        buffer3 = {a:3},
                        buffer4 = {a:4};

                    var gl = stateTool.getGLFromFakeGLState(null);
                    gl.createBuffer.onCall(0).returns(buffer1);
                    gl.createBuffer.onCall(1).returns(buffer2);
                    gl.createBuffer.onCall(2).returns(buffer3);
                    gl.createBuffer.onCall(3).returns(buffer4);


                    directorTool.loopBody(null, null);


                    gameObjectTool.disposeComponent(obj1, geo1);


                    expect(gl.deleteBuffer.callCount).toEqual(0);



                    gameObjectTool.disposeComponent(obj2, geo2);

                    expect(gl.deleteBuffer.callCount).toEqual(4);
                    expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                    expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                    expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                    expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                });
                it("test dispose normal buffers", function () {
                    var geo1 = boxGeometryTool.create();
                    var geo2 = boxGeometryTool.create();

                    var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1, lightMaterialTool.create());
                    var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

                    var obj1 = data1.gameObject,
                        obj2 = data2.gameObject;

                    directorTool.init(sandbox);


                    var buffer1 = {},
                        buffer2 = {a:2},
                        buffer3 = {a:3},
                        buffer4 = {a:4},
                        buffer5 = {a:5};

                    var gl = stateTool.getGLFromFakeGLState(null);
                    gl.createBuffer.onCall(0).returns(buffer1);
                    gl.createBuffer.onCall(1).returns(buffer2);
                    gl.createBuffer.onCall(2).returns(buffer3);
                    gl.createBuffer.onCall(3).returns(buffer4);
                    gl.createBuffer.onCall(4).returns(buffer5);


                    directorTool.loopBody(null, null);

                    gameObjectTool.disposeComponent(obj1, geo1);


                    expect(gl.deleteBuffer.callCount).toEqual(0);



                    gameObjectTool.disposeComponent(obj2, geo2);

                    expect(gl.deleteBuffer.callCount).toEqual(5);
                    expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                    expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                    expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                    expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                    expect(gl.deleteBuffer.getCall(4)).toCalledWith(buffer5)
                });
                it("test dispose texCoord buffers", function () {
                    var geo1 = boxGeometryTool.create();
                    var geo2 = boxGeometryTool.create();

                    var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                    var mat1 = data1.material;

                    basicMaterialTool.addMap(mat1, textureTool.create());


                    var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);



                    var obj1 = data1.gameObject,
                        obj2 = data2.gameObject;

                    directorTool.init(sandbox);


                    var buffer1 = {},
                        buffer2 = {a:2},
                        buffer3 = {a:3},
                        buffer4 = {a:4},
                        buffer5 = {a:5};

                    var gl = stateTool.getGLFromFakeGLState(null);
                    gl.createBuffer.onCall(0).returns(buffer1);
                    gl.createBuffer.onCall(1).returns(buffer2);
                    gl.createBuffer.onCall(2).returns(buffer3);
                    gl.createBuffer.onCall(3).returns(buffer4);
                    gl.createBuffer.onCall(4).returns(buffer5);


                    directorTool.loopBody(null, null);

                    gameObjectTool.disposeComponent(obj1, geo1);


                    expect(gl.deleteBuffer.callCount).toEqual(0);



                    gameObjectTool.disposeComponent(obj2, geo2);

                    expect(gl.deleteBuffer.callCount).toEqual(5);
                    expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                    expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                    expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                    expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                    expect(gl.deleteBuffer.getCall(4)).toCalledWith(buffer5)
                });
            });
        });
    });

    describe("initGeometry", function () {
        beforeEach(function () {
        });

        it("compute data", function () {
            geometryTool.initGeometry(geo);

            expect(testTool.getValues(geometryTool.getVertices(geo))).toEqual(defaultVerticesData);
            expect(testTool.getValues(geometryTool.getNormals(geo))).toEqual(defaultNormalsData);
            expect(testTool.getValues(geometryTool.getTexCoords(geo))).toEqual(defaultTexCoordsData);
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

    describe("contract check", function() {
        beforeEach(function(){
            testTool.openContractCheck();

            gameObject = gameObjectTool.create();
            geo = customGeometryTool.create();
            gameObjectTool.addComponent(gameObject, geo);
        });

        describe("data.length should not exceed DataBufferConfig->dataBufferCount", function() {
            function prepareNotExceed() {
                sandbox.stub(DataBufferConfig, "geometryDataBufferCount", 3);

                geometryTool.resetData();

                return "should not exceed type arr's length";
            }

            beforeEach(function(){

            });

            it("setVertices", function(){
                var geoVerticesData = [
                    -6, -6, 6, -6, 6, 6, 6, -6, 6,
                    5, -6, 6,
                ];
                var errMsg = prepareNotExceed();

                expect(function () {
                    customGeometryTool.setVertices(geo, geoVerticesData)
                }).toThrow(errMsg);
            });
            it("setNormals", function(){
                var geoNormalsData = [
                    -6, -6, 6, -6, 6, 6, 6, -6, 6,
                    5, -6, 6,
                ];
                var errMsg = prepareNotExceed();

                expect(function () {
                    customGeometryTool.setNormals(geo, geoNormalsData)
                }).toThrow(errMsg);
            });
            it("setTexCoords", function(){
                var geoTexCoordsData = [
                    -6, -6, -6, 6, 6, -6,
                    5, -6
                ];
                var errMsg = prepareNotExceed();

                expect(function () {
                    customGeometryTool.setTexCoords(geo, geoTexCoordsData)
                }).toThrow(errMsg);
            });
            it("setIndices", function(){
                var geoIndicesData = [
                    2,0,1, 3
                ]
                var errMsg = prepareNotExceed();

                expect(function () {
                    customGeometryTool.setIndices(geo, geoIndicesData)
                }).toThrow(errMsg);
            });
        });
    });

    describe("fix bug", function() {
        beforeEach(function(){

        });

        it("when geometryDataBufferCount is just enough, set indices should not affect set vertices", function(){
            sandbox.stub(DataBufferConfig, "geometryDataBufferCount", 6);

            geometryTool.resetData();


            gameObject = gameObjectTool.create();
            var geoVerticesData = [
                -6, -6, 6, -6, 6, 6, 6, -6, 6,
                5, -6, 6,
            ];

            var geoIndicesData = [
                2,0,1, 3,2,1
            ]
            geo = customGeometryTool.create();
            gameObjectTool.addComponent(gameObject, geo);

            customGeometryTool.setVertices(geo, geoVerticesData)
            customGeometryTool.setIndices(geo, geoIndicesData)

            expect(testTool.getValues(
                geometryTool.getVertices(geo)
            )).toEqual(geoVerticesData);
            expect(testTool.getValues(
                geometryTool.getIndices(geo)
            )).toEqual(geoIndicesData);
        });
    });
});
