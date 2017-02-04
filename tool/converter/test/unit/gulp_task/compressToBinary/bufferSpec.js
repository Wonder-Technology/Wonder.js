var CompressorManager = require("../../../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager,
    BufferReader = require("../../../../dist/converter/common/BufferReader"),
    Base64Utils = require("../../../../dist/converter/common/Base64Utils"),
    path = require("path"),
    testTool = require("../../../../../js/testTool"),
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

    describe("test buffer content", function () {
        describe("test buffer content", function() {
            function judgeMorphTargets(arraybuffer, primitiveData, json, index) {
                var index = index || 0;

                var morphTargets = json.meshes.geometry1.primitives[index].morphTargets;

                morphTargets.forEach(function (frame, index) {
                    _judgeMorphFrame(arraybuffer, frame.vertices, "vertices", primitiveData, json, index);
                    if(frame.normals){
                        _judgeMorphFrame(arraybuffer, frame.normals, "normals", primitiveData, json, index);
                    }
                });
            }

            function _judgeMorphFrame(arraybuffer, accessor, type, primitiveData, json, index) {
                var accessorData = json.accessors[accessor];

                var count = tool.getLength(accessorData);

                var view = new DataView(arraybuffer, tool.getOffset(accessorData, json), count * 4);

                var data = [];
                var offset =0 ;
                for(var i = 0; i < count; i++){
                    data.push(view.getFloat32(offset, true));

                    offset += 4;
                }



                expect(testTool.getValues(
                    data
                )).toEqual(testTool.getValues(
                    primitiveData.morphTargets[index][type]
                ));

                //todo test normals
            }

            function judgeInverseBindMatrices(arraybuffer, accessor, data, json) {
                var accessorData = json.accessors[accessor];

                var count = tool.getLength(accessorData);

                var view = new DataView(arraybuffer, tool.getOffset(accessorData, json), count * 4);

                var data = [];
                var offset =0 ;
                for(var i = 0; i < count; i++){
                    data.push(view.getFloat32(offset, true));

                    offset += 4;
                }



                expect(testTool.getValues(
                    data,
                    2
                )).toEqual(testTool.getValues(
                    data,
                    2
                ));
            }

            beforeEach(function () {
            });

            it("test meshes", function () {
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

                var data = compressorManager.compress("", "", fileJson);


                // var reader = BufferReader.create(data.buffer);

                var arraybuffer = tool.getArraybuffer(data);


                // console.log(arraybuffer.buffer)
                tool.judgeIndice(arraybuffer, primitiveData, data.json);

                tool.judgePosition(arraybuffer, primitiveData, data.json);
                tool.judgeNormal(arraybuffer, primitiveData, data.json);
                tool.judgeTexCoord(arraybuffer, primitiveData, data.json);
                tool.judgeColor(arraybuffer, primitiveData, data.json);
                tool.judgeJoint(arraybuffer, primitiveData, data.json);
                tool.judgeWeight(arraybuffer, primitiveData, data.json);
            });
            it("test meshes + animations + skins", function () {
                // var primitiveData = tool.getPrimitiveData();
                var primitiveData = tool.getPrimitiveDataWithSkinData();
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

                var data = compressorManager.compress("", "", fileJson);


                var arraybuffer = tool.getArraybuffer(data);

                tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "TIME");
                tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "translation");
                tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale");

                tool.judgeAnimation(arraybuffer, animData2, data.json, "animation_2", "TIME");
                tool.judgeAnimation(arraybuffer, animData2, data.json, "animation_2", "rotation");

                tool.judgeIndice(arraybuffer, primitiveData, data.json);

                tool.judgePosition(arraybuffer, primitiveData, data.json);
                tool.judgeNormal(arraybuffer, primitiveData, data.json);
                tool.judgeTexCoord(arraybuffer, primitiveData, data.json);
                tool.judgeColor(arraybuffer, primitiveData, data.json);
                tool.judgeJoint(arraybuffer, primitiveData, data.json);
                tool.judgeWeight(arraybuffer, primitiveData, data.json);

                judgeInverseBindMatrices(arraybuffer, data.json.skins.skin1.inverseBindMatrices, inverseBindMatrices, data.json);
            });
            it("test morphTargets", function () {
                var primitiveData = tool.getPrimitiveData();


                primitiveData.morphTargets = [
                    {
                        name: "FRAME000",
                        vertices: [
                            1, 10, 2,
                            0.2, 5, 5,
                            -2, -5, 3
                        ],
                        normals: [
                            1, 10, 2,
                            0.2, 5, 5,
                            -1, 4, 10
                        ]
                    },
                    {
                        name: "FRAME001",
                        vertices: [
                            0.2, 5, 5,
                            1, 10, 2,
                            0.2, 5, 10
                        ],
                        normals: [
                            0.2, 5, 5,
                            3, 10, 2,
                            2, 3, 6
                        ]
                    }
                ]


                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData
                            ]
                        }
                    }
                });

                var data = compressorManager.compress("", "", fileJson);


                // var reader = BufferReader.create(data.buffer);

                var arraybuffer = tool.getArraybuffer(data);

                var json = data.json;


                judgeMorphTargets(arraybuffer, primitiveData, json);

                tool.judgeIndice(arraybuffer, primitiveData, json);

                tool.judgePosition(arraybuffer, primitiveData, json);
                tool.judgeNormal(arraybuffer, primitiveData, json);
                tool.judgeTexCoord(arraybuffer, primitiveData, json);
                tool.judgeColor(arraybuffer, primitiveData, json);


                expect(data.json.accessors).toEqual(
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
                            bufferView: 'bufferView_2',
                            byteOffset: 0,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_6: {
                            bufferView: 'bufferView_2',
                            byteOffset: 36,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_7: {
                            bufferView: 'bufferView_2',
                            byteOffset: 72,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        },
                        accessor_8: {
                            bufferView: 'bufferView_2',
                            byteOffset: 108,
                            count: 3,
                            componentType: 5126,
                            type: 'VEC3'
                        }
                    }
                );

                expect(data.json.bufferViews).toEqual(
                    {
                        bufferView_0: {
                            buffer: '',
                            byteLength: 6,
                            byteOffset: 0,
                            target: 34963
                        },
                        bufferView_1: {
                            buffer: '',
                            byteLength: 132,
                            byteOffset: 6,
                            target: 34962
                        },
                        bufferView_2: {
                            buffer: '',
                            byteLength: 144,
                            byteOffset: 138,
                            target: 34962
                        }
                    }
                );
            });
            it("support convert buffer to base64", function(){
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

                var data = compressorManager.compress("", "", fileJson, "", true);





                var arraybuffer = tool.getArraybuffer(Base64Utils.decode(data.uri));


                tool.judgeIndice(arraybuffer, primitiveData, data.json);

                tool.judgePosition(arraybuffer, primitiveData, data.json);
                tool.judgeNormal(arraybuffer, primitiveData, data.json);
                tool.judgeTexCoord(arraybuffer, primitiveData, data.json);
                tool.judgeColor(arraybuffer, primitiveData, data.json);
                tool.judgeJoint(arraybuffer, primitiveData, data.json);
                tool.judgeWeight(arraybuffer, primitiveData, data.json);
            });
        });
    });
});

