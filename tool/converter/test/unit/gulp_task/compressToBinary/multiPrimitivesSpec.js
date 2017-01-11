var CompressorManager = require("../../../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager,
    tool = require("./tool"),
    sinon = require("sinon");

describe("compress", function(){
    var sandbox = null;
    var compressorManager;
    var fileJson = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        compressorManager = CompressorManager.create();


        fileJson = {};
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("test new fileJson file", function () {
        describe("test multi primitive datas", function(){
            function judgeData(json) {
                expect(json.buffers).toEqual({
                    wdFileName: {byteLength: 336, type: 'arraybuffer', uri: 'wdFileName.bin'}
                });

                expect(json.bufferViews).toEqual(
                    {
                        bufferView_0: {
                            buffer: 'wdFileName',
                            byteLength: 12,
                            byteOffset: 0,
                            target: 34963
                        },
                        bufferView_1: {
                            buffer: 'wdFileName',
                            byteLength: 324,
                            byteOffset: 12,
                            target: 34962
                        }
                    }
                );

                expect(json.accessors).toEqual(
                    {
                        accessor_0: {
                            bufferView: 'bufferView_0',
                            byteOffset: 0,
                            count: 3,
                            componentType: 5123,
                            type: 'SCALAR'
                        },
                        accessor_1: {
                            bufferView: 'bufferView_0',
                            byteOffset: 6,
                            count: 3,
                            componentType: 5123,
                            type: 'SCALAR'
                        },
                        accessor_2: {
                            bufferView: 'bufferView_1',
                            byteOffset: 0,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_3: {
                            bufferView: 'bufferView_1',
                            byteOffset: 36,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_4: {
                            bufferView: 'bufferView_1',
                            byteOffset: 72,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC2'
                        },
                        accessor_5: {
                            bufferView: 'bufferView_1',
                            byteOffset: 96,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_6: {
                            bufferView: 'bufferView_1',
                            byteOffset: 132,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC4'
                        },
                        accessor_7: {
                            bufferView: 'bufferView_1',
                            byteOffset: 180,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC4'
                        },
                        accessor_8: {
                            bufferView: 'bufferView_1',
                            byteOffset: 228,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_9: {
                            bufferView: 'bufferView_1',
                            byteOffset: 264,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_10: {
                            bufferView: 'bufferView_1',
                            byteOffset: 300,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC2'
                        }
                    }
                );
            }

            beforeEach(function(){

            });

            it("test multi meshes", function () {
                var primitiveData = tool.getPrimitiveDataWithSkinData(),
                    primitiveData2 = tool.getPrimitiveData2();

                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData
                            ]
                        },
                        "geometry2": {
                            "primitives": [
                                primitiveData2
                            ]
                        }
                    }
                });

                var data = compressorManager.compress("wdFileName", "./", fileJson);

                var json = data.json;

                expect(json.meshes).toEqual(
                    {
                        geometry1: {
                            primitives: [
                                {
                                    attributes: {
                                        POSITION: 'accessor_2',
                                        NORMAL: 'accessor_3',
                                        COLOR: 'accessor_5',
                                        TEXCOORD: 'accessor_4',
                                        JOINT: 'accessor_6',
                                        WEIGHT: 'accessor_7'
                                    },
                                    indices: 'accessor_0'
                                }
                            ]
                        },
                        geometry2: {
                            primitives: [
                                {
                                    attributes: {
                                        POSITION: 'accessor_8',
                                        NORMAL: 'accessor_9',
                                        TEXCOORD: 'accessor_10'
                                    },
                                    indices: 'accessor_1'
                                }
                            ]
                        }
                    }
                );

                judgeData(json);
            });
            it("test multi primitives", function () {
                var primitiveData = tool.getPrimitiveDataWithSkinData(),
                    primitiveData2 = tool.getPrimitiveData2();

                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData,
                                primitiveData2
                            ]
                        }
                    }
                });

                var data = compressorManager.compress("wdFileName", "./", fileJson);

                var json = data.json;

                expect(json.meshes).toEqual(
                    {
                        geometry1: {
                            primitives: [
                                {
                                    attributes: {
                                        POSITION: 'accessor_2',
                                        NORMAL: 'accessor_3',
                                        COLOR: 'accessor_5',
                                        TEXCOORD: 'accessor_4',
                                        JOINT: 'accessor_6',
                                        WEIGHT: 'accessor_7'
                                    },
                                    indices: 'accessor_0'
                                },
                                {
                                    attributes: {
                                        POSITION: 'accessor_8',
                                        NORMAL: 'accessor_9',
                                        TEXCOORD: 'accessor_10'
                                    },
                                    indices: 'accessor_1'
                                }
                            ]
                        }
                    }
                );

                judgeData(json);
            });
        });
    });
});

