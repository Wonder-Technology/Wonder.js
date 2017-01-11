var CompressorManager = require("../../../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager,
    path = require("path"),
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
        describe("modify .wd fileJson file", function () {
            beforeEach(function () {
            });

            describe("add 'accessors', 'bufferViews', 'buffers' field", function () {
                it("test mesh", function () {
                    var primitiveData = tool.getPrimitiveDataWithSkinData();

                    tool.setFileJson(fileJson, {
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    primitiveData
                                ]
                            }
                        }
                    });

                    var data = compressorManager.compress("wdFileName", "./", fileJson);

                    var json = data.json;

                    expect(json.buffers).toEqual({
                        wdFileName: {byteLength: 234, type: 'arraybuffer', uri: 'wdFileName.bin'}
                    });
                    expect(json.bufferViews).toEqual(
                        {
                            bufferView_0: {
                                buffer: 'wdFileName',
                                byteLength: 6,
                                byteOffset: 0,
                                target: 34963
                            },
                            bufferView_1: {
                                buffer: 'wdFileName',
                                byteLength: 228,
                                byteOffset: 6,
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
                                bufferView: 'bufferView_1',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_2: {
                                bufferView: 'bufferView_1',
                                byteOffset: 36,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_3: {
                                bufferView: 'bufferView_1',
                                byteOffset: 72,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC2'
                            },
                            accessor_4: {
                                bufferView: 'bufferView_1',
                                byteOffset: 96,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_5: {
                                bufferView: 'bufferView_1',
                                byteOffset: 132,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC4'
                            },
                            accessor_6: {
                                bufferView: 'bufferView_1',
                                byteOffset: 180,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC4'
                            }
                        }
                    );
                });
                it("test mesh + animation + skins", function () {
                    var primitiveData = tool.getPrimitiveData();
                    var animData1 = tool.getAnimationData1(1, "geometry1");
                    var animData2 = tool.getAnimationData2(2, "geometry1");

                    var inverseBindMatrices =  tool.getSkinInverseBindMatrices();

                    tool.setFileJson(fileJson, {
                        "skins": {
                            "skin1":{
                                "inverseBindMatrices": inverseBindMatrices
                            }
                        },
                        "animations": {
                            "animation_1": animData1,
                            "animation_2": animData2
                        },
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    primitiveData
                                ]
                            }
                        }
                    });

                    var data = compressorManager.compress("wdFileName", "./", fileJson);


                    expect(data.json.buffers).toEqual({
                        wdFileName: {byteLength: 390, type: 'arraybuffer', uri: 'wdFileName.bin'}
                    });

                    expect(data.json.bufferViews).toEqual(
                        {
                            bufferView_0: {
                                buffer: 'wdFileName',
                                byteLength: 124,
                                byteOffset: 0
                            },
                            bufferView_1: {
                                buffer: 'wdFileName',
                                byteLength: 128,
                                byteOffset: 124
                            },
                            bufferView_2: {
                                buffer: 'wdFileName',
                                byteLength: 6,
                                byteOffset: 252,
                                target: 34963
                            },
                            bufferView_3: {
                                buffer: 'wdFileName',
                                byteLength: 132,
                                byteOffset: 258,
                                target: 34962
                            }
                        }
                    );


                    expect(data.json.accessors).toEqual(
                        {
                            animAccessor_0: {
                                bufferView: 'bufferView_0',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5126,
                                type: 'SCALAR'
                            },
                            animAccessor_1: {
                                bufferView: 'bufferView_0',
                                byteOffset: 12,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            animAccessor_2: {
                                bufferView: 'bufferView_0',
                                byteOffset: 48,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            animAccessor_3: {
                                bufferView: 'bufferView_0',
                                byteOffset: 84,
                                count: 2,
                                componentType: 5126,
                                type: 'SCALAR'
                            },
                            animAccessor_4: {
                                bufferView: 'bufferView_0',
                                byteOffset: 92,
                                count: 2,
                                componentType: 5126,
                                type: 'VEC4'
                            },
                            accessor_0: {
                                bufferView: 'bufferView_1',
                                byteOffset: 0,
                                count: 2,
                                componentType: 5126,
                                type: 'MAT4'
                            },
                            accessor_1: {
                                bufferView: 'bufferView_2',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5123,
                                type: 'SCALAR'
                            },
                            accessor_2: {
                                bufferView: 'bufferView_3',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_3: {
                                bufferView: 'bufferView_3',
                                byteOffset: 36,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_4: {
                                bufferView: 'bufferView_3',
                                byteOffset: 72,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC2'
                            },
                            accessor_5: {
                                bufferView: 'bufferView_3',
                                byteOffset: 96,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            }
                        }
                    );
                });
            });

            it("replace 'meshes'->primitives->attributes,indices array data with accessor id", function () {
                var primitiveData = tool.getPrimitiveDataWithSkinData();

                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData
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
                                        POSITION: 'accessor_1',
                                        NORMAL: 'accessor_2',
                                        COLOR: 'accessor_4',
                                        TEXCOORD: 'accessor_3',
                                        JOINT: 'accessor_5',
                                        WEIGHT: 'accessor_6'
                                    },
                                    indices: 'accessor_0'
                                }
                            ]
                        }
                    }
                );
            });

            it("support convert images to base64", function () {
                tool.setFileJson(fileJson, {
                    "images": {
                        "monster_jpg": {
                            "name": "monster_jpg",
                            "uri": "./1.jpg"
                        }
                    }
                });

                var sourceDir = path.join(__dirname, "../../../res/texture/");
                var data = compressorManager.compress("wdFileName", "./", fileJson, sourceDir, true);

                var json = data.json;

                expect(json.images.monster_jpg.uri).toContain(
                    "data:image/jpg;base64, /9j/4AA"
                );
            });
        });
    });
});

