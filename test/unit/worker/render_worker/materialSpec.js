describe("material", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var MaterialData = wd.MaterialData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("test init new one after System->init", function() {
        beforeEach(function(){
        });

        it("send new-inited-material data to render worker", function () {
            sceneTool.prepareGameObjectAndAddToScene(false);


            directorTool.init(sandbox);

            workerTool.runRender(1);


            var mat1 = basicMaterialTool.create();
            var mat2 = basicMaterialTool.create();

            materialTool.initMaterial(mat1);
            materialTool.initMaterial(mat2);


            workerTool.runRender(2);


            worker = workerTool.getRenderWorker();
            expect(worker.postMessage.getCall(2)).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                renderCommandBufferData:sinon.match.any,
                materialData:{
                    buffer: MaterialData.buffer,
                    workerInitList:[mat1.index, mat2.index]
                },
                disposeData: sinon.match.any,
                geometryData:sinon.match.any
            });
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            var materialDataBuffer;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            it("init new materials", function () {
                var mat1 = basicMaterialTool.create();



                materialDataBuffer = MaterialData.buffer;




                e = {
                    data:{
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY,
                        geometryData: null,
                        materialData: {
                            buffer: materialDataBuffer,
                            materialCount: MaterialData.count,
                            materialClassNameTable: MaterialData.materialClassNameTable,
                            shaderIndexTable: MaterialData.shaderIndexTable
                        }
                    }
                }
                workerTool.execRenderWorkerMessageHandler(e);




                var mat2 = basicMaterialTool.create();


                var createProgramCallCount = gl.createProgram.callCount;


                shaderTool.resetData();

                e = {
                    data:{
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData:[],
                        geometryData:null,
                        materialData:{
                            buffer:materialDataBuffer,
                            workerInitList:[mat2.index]
                        },
                        disposeData: null
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);



                expect(gl.createProgram.callCount).toEqual(createProgramCallCount + 1);
            });
        });
    });
});

