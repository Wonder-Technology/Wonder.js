describe("material", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var MaterialData = wd.MaterialData;
    var BasicMaterialData = wd.BasicMaterialData;
    var LightMaterialData = wd.LightMaterialData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("test init new one after System->init", function() {
        beforeEach(function(){
        });

        it("send new-inited-material data to render worker", function () {
            sceneTool.prepareGameObjectAndAddToScene(false);

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();



            workerTool.runRender(1);


            var mat1 = basicMaterialTool.create();
            var mat2 = basicMaterialTool.create();

            basicMaterialTool.initMaterial(mat1);
            basicMaterialTool.initMaterial(mat2);


            workerTool.runRender(2);

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                renderCommandBufferData:sinon.match.any,
                materialData:{
                    buffer: MaterialData.buffer,
                    workerInitList:[
                        {
                            index: mat1.index,
                            className: "BasicMaterial"
                        },
                        {
                            index: mat2.index,
                            className: "BasicMaterial"
                        }
                    ]
                },
                disposeData: sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any
            });
        });

        // describe("test in render worker", function() {
        //     var gl;
        //     var e;
        //
        //     var materialDataBuffer;
        //
        //     beforeEach(function () {
        //         gl = workerTool.createGL(sandbox);
        //     });
        //
        //     it("init new materials", function () {
                // var mat1 = basicMaterialTool.create();
                //
                // materialDataBuffer = MaterialData.buffer;
                //
                //
                //
                //
                // e = {
                //     data:{
                //         operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                //         geometryData: null,
                //         lightData:null,
                //         textureData: null,
                //         materialData: materialWorkerTool.buildSendInitMaterialData()
                //     }
                // }
                //
                // workerTool.execRenderWorkerMessageHandler(e);
                //
                //
                //
                //
                // var mat2 = basicMaterialTool.create();
                //
                //
                // var createProgramCallCount = gl.createProgram.callCount;
                //
                //
                // shaderTool.resetData();
                //
                // e = {
                //     data:{
                //         operateType: EWorkerOperateType.DRAW,
                //         renderCommandBufferData:null,
                //         geometryData:null,
                //         lightData:null,
                //         materialData:{
                //             buffer:materialDataBuffer,
                //             workerInitList:[
                //                 // {
                //                 //     index: mat1.index,
                //                 //     className: "BasicMaterial"
                //                 // },
                //                 {
                //                     index: mat2.index,
                //                     className: "BasicMaterial"
                //                 }
                //             ]
                //         },
                //         disposeData: null
                //     }
                // }
                //
                // workerTool.execRenderWorkerMessageHandler(e);
                //
                //
                //
                // expect(gl.createProgram.callCount).toEqual(createProgramCallCount + 1);
            // });
        // });
    });

    it("should not dispose the material which is inited in the same frame", function() {
        var data = sceneTool.prepareGameObjectAndAddToScene(false);
        var mat = data.material,
            obj = data.gameObject;

        basicMaterialTool.initMaterial(mat);

        expect(function(){
            gameObjectTool.disposeComponent(obj, mat);
        }).toThrow("should not dispose the material which is inited in the same frame");
    });
});

