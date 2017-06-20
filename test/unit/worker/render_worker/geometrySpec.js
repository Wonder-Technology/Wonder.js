describe("geometry", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var EGeometryWorkerDataOperateType = wd.EGeometryWorkerDataOperateType;

    var GeometryData = wd.GeometryData;

    var GeometryWorkerData = wdrd.GeometryWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount: 200
        });
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("allow set point data of new one after System->init", function() {
        beforeEach(function(){
        });

        it("send add-new-point data to render worker", function () {
            var geo1 = boxGeometryTool.create();
            sceneTool.prepareGameObjectAndAddToScene(false, geo1);


            directorTool.init(sandbox);

            workerTool.runRender(1);



            var obj2 = gameObjectTool.create();
            var geo2VerticesData = [
                -3, -3, 3, -3, 3, 3, 3, -3, 3,
                5,6,7
            ];

            var geo2IndicesData = [
                2,3,1, 1,3,0
            ]
            var geo2 = customGeometryTool.create();
            gameObjectTool.addComponent(obj2, geo2);

            customGeometryTool.setVertices(geo2, geo2VerticesData)
            customGeometryTool.setIndices(geo2, geo2IndicesData)


            workerTool.runRender(2);

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage.getCall(2)).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                renderCommandBufferData:sinon.match.any,
                materialData:sinon.match.any,
                disposeData: sinon.match.any,
                geometryData:{
                    buffer:sinon.match.any,
                    type:EGeometryWorkerDataOperateType.ADD,
                    "verticesInfoList": [{ "index": geo2.index, "startIndex": 72, "endIndex": 84 }],
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

            it("update point cache datas", function () {
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                var obj1 = gameObjectTool.create();
                var geo1VerticesData = [
                    -3, -3, 3, -3, 3, 3, 3, -3, 3,
                    5,6,7
                ];

                var geo1IndicesData = [
                    2,3,1, 1,3,0
                ]
                var geo1 = customGeometryTool.create();
                gameObjectTool.addComponent(obj1, geo1);

                customGeometryTool.setVertices(geo1, geo1VerticesData)
                customGeometryTool.setIndices(geo1, geo1IndicesData)



                geometryDataBuffer = GeometryData.buffer;




                e = {
                    data:{
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY,
                        materialData: null,
                        geometryData: {
                            buffer: geometryDataBuffer,
                            indexType: GeometryData.indexType,
                            indexTypeSize: GeometryData.indexTypeSize,
                            verticesInfoList: GeometryData.verticesInfoList,
                            indicesInfoList: GeometryData.indicesInfoList
                        }
                    }
                }
                workerTool.execRenderWorkerMessageHandler(e);




                e = {
                    data:{
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData:null,
                        materialData:null,
                        geometryData:null,
                        disposeData: null
                    }
                }
                workerTool.execRenderWorkerMessageHandler(e);




                var obj2 = gameObjectTool.create();
                var geo2VerticesData = [
                    -300, -3, 3, -3, 3, 3, 3, -3, 3,
                    200,6,7
                ];

                var geo2IndicesData = [
                    1,2,3, 1,3,0
                ]
                var geo2 = customGeometryTool.create();
                gameObjectTool.addComponent(obj2, geo2);

                customGeometryTool.setVertices(geo2, geo2VerticesData)
                customGeometryTool.setIndices(geo2, geo2IndicesData)



                e = {
                    data:{
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData:null,
                        materialData:null,
                        geometryData:{
                            buffer:geometryDataBuffer,
                            type:EGeometryWorkerDataOperateType.ADD,
                            "verticesInfoList": [{ "index": geo2.index, "startIndex": 12, "endIndex": 24 }],
                            "indicesInfoList": [{ "index": geo2.index, "startIndex": 8, "endIndex": 16 }]
                        },
                        disposeData: null
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);





                expect(testRenderWorkerTool.getValues(
                    GeometryWorkerData.verticesCacheMap[geo2.index]
                )).toEqual(geo2VerticesData)
            });
        });
    });
});

