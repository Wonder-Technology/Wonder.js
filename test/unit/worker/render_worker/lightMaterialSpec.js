describe("light material", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var LightMaterialData = wd.LightMaterialData;

    var LightMaterialWorkerData = wdrd.LightMaterialWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("send map data to render worker", function() {
        beforeEach(function(){
        });

        it("test send mapMap", function () {
            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            var mat = data.material;

            var texture1 = textureTool.create();
            var texture2 = textureTool.create();

            lightMaterialTool.setDiffuseMap(mat, texture1);
            lightMaterialTool.setSpecularMap(mat, texture2);

            directorTool.init(sandbox);

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:{
                    buffer: sinon.match.any,
                    basicMaterialData:sinon.match.any,
                    lightMaterialData:{
                        startIndex:sinon.match.any,
                        index:sinon.match.any,
                        diffuseMapMap: LightMaterialData.diffuseMapMap,
                        specularMapMap: LightMaterialData.specularMapMap
                    }
                },
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                textureData: sinon.match.any
            });
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            it("set mapMap", function () {
                var materialData = materialWorkerTool.buildSendInitMaterialData()

                materialData.lightMaterialData.diffuseMapMap = [undefined, 0, undefined];
                materialData.lightMaterialData.specularMapMap = [2, undefined, 1];

                e = {
                    data:{
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                        geometryData: null,
                        lightData:null,
                        textureData: null,
                        materialData: materialData
                    }
                }


                workerTool.execRenderWorkerMessageHandler(e);

                expect(LightMaterialWorkerData.diffuseMapMap).toEqual(materialData.lightMaterialData.diffuseMapMap);
                expect(LightMaterialWorkerData.specularMapMap).toEqual(materialData.lightMaterialData.specularMapMap);
            });
        });
    });
});

