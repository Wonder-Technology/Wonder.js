describe("geometry", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var EGeometryWorkerDataOperateType = wd.EGeometryWorkerDataOperateType;

    var GeometryData = wd.GeometryData;

    var GeometryWorkerData = wdrd.GeometryWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount: 200
        });
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("allow set point data of new one after System->init", function() {
        beforeEach(function(){
        });

        it("send add-new-point data to render worker", function () {
            var geo1 = boxGeometryTool.create();
            sceneSystemTool.prepareGameObjectAndAddToScene(false, geo1);


            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            workerTool.runRender(1);



            var obj2 = gameObjectSystemTool.create();
            var geo2VerticesData = [
                -3, -3, 3, -3, 3, 3, 3, -3, 3,
                5,6,7
            ];

            var geo2NormalsData = [
                15,6,7,
                -10, -3, 3, -3, 3, 3, 3, -3, 3
            ];

            var geo2TexCoordsData = [
                0.1,0.2,
                0.3,0.2,
                0.1,0.2,
                0.1,0.2
            ];


            var geo2IndicesData = [
                2,3,1, 1,3,0
            ]
            var geo2 = customGeometryTool.create();
            gameObjectSystemTool.addComponent(obj2, geo2);

            customGeometryTool.setVertices(geo2, geo2VerticesData)
            customGeometryTool.setNormals(geo2, geo2NormalsData)
            customGeometryTool.setTexCoords(geo2, geo2TexCoordsData)
            customGeometryTool.setIndices(geo2, geo2IndicesData)


            workerTool.runRender(2);

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                renderCommandBufferData:sinon.match.any,
                textureData:sinon.match.any,
                materialData:sinon.match.any,
                disposeData: sinon.match.any,
                lightData: sinon.match.any,
                geometryData:{
                    buffer:sinon.match.any,
                    type:EGeometryWorkerDataOperateType.ADD,
                    "verticesInfoList": [{ "index": geo2.index, "startIndex": 72, "endIndex": 84 }],
                    "normalsInfoList": [{ "index": geo2.index, "startIndex": 72, "endIndex": 84 }],
                    "texCoordsInfoList": [{"index": geo2.index, "startIndex":48,"endIndex":56}],
                    "indicesInfoList": [{ "index": geo2.index, "startIndex": 36, "endIndex": 42 }]
                }
            });
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            var geometryDataBuffer;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            describe("update point cache datas", function () {
                function judgeWithAllDatas(isWithNoNormal, isWithNoTexCoord) {
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    var obj1 = gameObjectSystemTool.create();
                    var geo1VerticesData = [
                        -3, -3, 3, -3, 3, 3, 3, -3, 3,
                        5,6,7
                    ];

                    var geo1NormalsData = [
                        5,6,7,
                        -3, -3, 3, -3, 3, 3, 3, -3, 3
                    ];

                    var geo1TexCoordsData = [
                        0.1,0.2,
                        0.3,0.2,
                        0.1,0.2,
                        0.1,0.2
                    ];

                    var geo1IndicesData = [
                        2,3,1, 1,3,0
                    ]
                    var geo1 = customGeometryTool.create();
                    gameObjectSystemTool.addComponent(obj1, geo1);

                    customGeometryTool.setVertices(geo1, geo1VerticesData)
                    customGeometryTool.setIndices(geo1, geo1IndicesData)

                    if(isWithNoNormal !== true){
                        customGeometryTool.setNormals(geo1, geo1NormalsData)
                    }

                    if(isWithNoTexCoord !== true){
                        customGeometryTool.setTexCoords(geo1, geo1TexCoordsData)
                    }


                    geometryDataBuffer = GeometryData.buffer;




                    e = {
                        data:{
                            operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                            materialData: null,
                            lightData: null,
                            textureData: null,
                            geometryData: {
                                buffer: geometryDataBuffer,
                                indexType: GeometryData.indexType,
                                indexTypeSize: GeometryData.indexTypeSize,
                                verticesInfoList: GeometryData.verticesInfoList,
                                indicesInfoList: GeometryData.indicesInfoList
                            }
                        }
                    }


                    if(isWithNoNormal !== true){
                        e.data.geometryData.normalsInfoList = GeometryData.normalsInfoList;
                    }

                    if(isWithNoTexCoord !== true){
                        e.data.geometryData.texCoordsInfoList = GeometryData.texCoordsInfoList;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);




                    e = {
                        data:{
                            operateType: EWorkerOperateType.DRAW,
                            textureData:null,
                            renderCommandBufferData:null,
                            materialData:null,
                            geometryData:null,
                            lightData: null,
                            disposeData: null
                        }
                    }
                    workerTool.execRenderWorkerMessageHandler(e);




                    var obj2 = gameObjectSystemTool.create();
                    var geo2VerticesData = [
                        -300, -3, 3, -3, 3, 3, 3, -3, 3,
                        200,6,7
                    ];
                    var geo2NormalsData = [
                        200,6,7,
                        -300, -3, 3, -3, 3, 3, 3, -3, 3
                    ];

                    var geo2TexCoordsData = [
                        0.3,0.2,
                        0.1,0.1,
                        0.4,0.8,
                        0.1,0.3
                    ];

                    var geo2IndicesData = [
                        1,2,3, 1,3,0
                    ]
                    var geo2 = customGeometryTool.create();
                    gameObjectSystemTool.addComponent(obj2, geo2);

                    customGeometryTool.setVertices(geo2, geo2VerticesData)
                    customGeometryTool.setIndices(geo2, geo2IndicesData)


                    if(isWithNoNormal !== true){
                        customGeometryTool.setNormals(geo2, geo2NormalsData);
                    }

                    if(isWithNoTexCoord !== true){
                        customGeometryTool.setTexCoords(geo2, geo2TexCoordsData);
                    }


                    e = {
                        data:{
                            operateType: EWorkerOperateType.DRAW,
                            textureData:null,
                            renderCommandBufferData:null,
                            materialData:null,
                            lightData:null,
                            geometryData:{
                                buffer:geometryDataBuffer,
                                type:EGeometryWorkerDataOperateType.ADD,
                                "verticesInfoList": [{ "index": geo2.index, "startIndex": 12, "endIndex": 24 }],
                                "indicesInfoList": [{ "index": geo2.index, "startIndex": 8, "endIndex": 16 }]
                            },
                            disposeData: null
                        }
                    }


                    if(isWithNoNormal !== true){
                        e.data.geometryData.normalsInfoList = [{ "index": geo2.index, "startIndex": 12, "endIndex": 24 }];
                    }

                    if(isWithNoTexCoord !== true){
                        e.data.geometryData.texCoordsInfoList = [{ "index": geo2.index, "startIndex": 8, "endIndex": 16 }];
                    }

                    workerTool.execRenderWorkerMessageHandler(e);





                    expect(testTool.getValues(
                        GeometryWorkerData.verticesCacheMap[geo2.index]
                    )).toEqual(geo2VerticesData)


                    if(isWithNoNormal !== true){
                        expect(testTool.getValues(
                            GeometryWorkerData.normalsCacheMap[geo2.index]
                        )).toEqual(geo2NormalsData)
                    }
                    if(isWithNoTexCoord !== true){
                        expect(testTool.getValues(
                            GeometryWorkerData.texCoordsCacheMap[geo2.index]
                        )).toEqual(geo2TexCoordsData)
                    }
                }

                it("test only with vertex data", function () {
                    judgeWithAllDatas(true, true);
                });
                it("test with normal data", function () {
                    judgeWithAllDatas(false, true);
                });
                it("test with texCoord data", function () {
                    judgeWithAllDatas(true, false);
                });
            });
        });
    });
});

