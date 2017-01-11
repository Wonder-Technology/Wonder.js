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

    describe("test buffer content and new fileJson file", function () {
        describe("test special cases", function () {
            beforeEach(function () {
            });

            it("if primitives has duplicate data, the ones share the same accessor", function () {
                var primitiveData = tool.getPrimitiveData();

                var primitiveData2 = {
                    "attributes": {
                        "POSITION": [
                            5, 10, 2,
                            0.6, 5, 5,
                            -6, -5, 3
                        ],
                        "NORMAL": [
                            0.6, 5, 5,
                            5, 10, 2,
                            -6, -5, 3
                        ],
                        "TEXCOORD": [
                            0.6, 0.1,
                            0.6, 0.1,
                            0.6, 0.1
                        ]
                    },
                    "indices": [

                        2,1,3
                    ]
                };

                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData,
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
                                        TEXCOORD: 'accessor_4'
                                    },
                                    indices: 'accessor_0'
                                },
                                {
                                    attributes: {
                                        POSITION: 'accessor_2',
                                        NORMAL: 'accessor_3',
                                        COLOR: 'accessor_5',
                                        TEXCOORD: 'accessor_4'
                                    },
                                    indices: 'accessor_0'
                                },
                                {
                                    attributes: {
                                        POSITION: 'accessor_6',
                                        NORMAL: 'accessor_7',
                                        TEXCOORD: 'accessor_8'
                                    },
                                    indices: 'accessor_1'
                                }
                            ]
                        }
                    }
                );



                var arraybuffer = tool.getArraybuffer(data);




                tool.judgeIndice(arraybuffer, primitiveData2, data.json, 2);




                tool.judgePosition(arraybuffer, primitiveData2, data.json, 2);
                tool.judgeNormal(arraybuffer, primitiveData2, data.json, 2);
                tool.judgeTexCoord(arraybuffer, primitiveData2, data.json, 2);
            });

            describe("test animations", function(){
                function getAnimationData3(animationIndex, meshId) {
                    var samplers = {
                    }

                    samplers["animation_" + animationIndex + "_translation_sampler"] = {
                        "input": "TIME",
                        "interpolation": "LINEAR",
                        "output": "translation"
                    }

                    samplers["animation_" + animationIndex + "_rotation_sampler"] = {
                        "input": "TIME",
                        "interpolation": "LINEAR",
                        "output": "rotation"
                    }

                    return {
                        "channels": [
                            {
                                "sampler": "animation_" + animationIndex + "_rotation_sampler",
                                "target": {
                                    "id": meshId,
                                    "path": "translation"
                                }
                            },
                            {
                                "sampler": "animation_" + animationIndex + "_rotation_sampler",
                                "target": {
                                    "id": meshId,
                                    "path": "rotation"
                                }
                            }
                        ],
                        "parameters": {
                            "TIME": [
                                1,
                                2,
                                3
                            ],
                            "translation": [
                                0,0,0,
                                1,0,2,
                                2,0,4
                            ],
                            "rotation": [
                                1,1,1,1,
                                0.2,0.5,0.4,0.8,
                                0.1,0.3,0.2,0.3
                            ]
                        },
                        "samplers": samplers
                    }
                }

                beforeEach(function(){
                });

                it("if animations has duplicate data, the ones share the same accessor", function () {
                    var primitiveData = tool.getPrimitiveData();
                    var animData1 = tool.getAnimationData1(1, "geometry1");
                    var animData2 = getAnimationData3(2, "geometry1");

                    tool.setFileJson(fileJson, {
                        "animations": {
                            "animation_1":animData1,
                            "animation_2":animData2
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



                    expect(data.json.animations).toEqual(
                        {
                            animation_1: {
                                channels: [
                                    {
                                        sampler: 'animation_1_scale_sampler',
                                        target: {
                                            id: 'geometry1',
                                            path: 'scale'
                                        }
                                    },
                                    {
                                        sampler: 'animation_1_translation_sampler',
                                        target: {
                                            id: 'geometry1',
                                            path: 'translation'
                                        }
                                    }
                                ],
                                parameters: {
                                    TIME: 'animAccessor_0',
                                    scale: 'animAccessor_1',
                                    translation: 'animAccessor_2'
                                },
                                samplers: {
                                    animation_1_scale_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'scale'
                                    },
                                    animation_1_translation_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'translation'
                                    }
                                }
                            },
                            animation_2: {
                                channels: [
                                    {
                                        sampler: 'animation_2_rotation_sampler',
                                        target: {
                                            id: 'geometry1',
                                            path: 'translation'
                                        }
                                    },
                                    {
                                        sampler: 'animation_2_rotation_sampler',
                                        target: {
                                            id: 'geometry1',
                                            path: 'rotation'
                                        }
                                    }
                                ],
                                parameters: {
                                    TIME: 'animAccessor_0',
                                    translation: 'animAccessor_2',
                                    rotation: 'animAccessor_3'
                                },
                                samplers: {
                                    animation_2_translation_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'translation'
                                    },
                                    animation_2_rotation_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'rotation'
                                    }
                                }
                            }
                        }
                    );
                });
                it("one animation data support multi transform datas of one transform type(e.g. scale,...) which are corresponding to different meshes", function () {
                    var primitiveData = tool.getPrimitiveData();

                    var meshId1 = "geometry1",
                        meshId2 = "geometry2";

                    var animData1 = {
                        "channels": [
                            {
                                "sampler": "animation_1_scale_sampler",
                                "target": {
                                    "id": meshId1,
                                    "path": "scale"
                                }
                            },
                            {
                                "sampler": "animation_1_scale1_sampler",
                                "target": {
                                    "id": meshId2,
                                    "path": "scale"
                                }
                            }
                        ],
                        "parameters": {
                            "TIME": [
                                1,
                                2,
                                3
                            ],
                            "scale": [
                                1, 1, 1,
                                2, 2, 2,
                                3, 3, 3
                            ],
                            "scale1": [
                                3, 3, 3,
                                2, 2, 2,
                                1, 1, 1
                            ]
                        },
                        "samplers": {
                            "animation_1_scale_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "scale"
                            },

                            "animation_1_scale1_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "scale1"
                            }
                        }
                    }

                    tool.setFileJson(fileJson, {
                        "animations": {
                            "animation_1": animData1
                        },
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    primitiveData
                                ]
                            },
                            "geometry2": {
                                "primitives": [
                                    primitiveData
                                ]
                            }
                        }
                    });

                    var data = compressorManager.compress("wdFileName", "./", fileJson);


                    var arraybuffer = tool.getArraybuffer(data);


                    tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "TIME");
                    tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale");
                    tool.judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale1");

                    expect(data.json.animations).toEqual(
                        {
                            animation_1: {
                                channels: [
                                    {
                                        sampler: 'animation_1_scale_sampler',
                                        target: {
                                            id: 'geometry1',
                                            path: 'scale'
                                        }
                                    },
                                    {
                                        sampler: 'animation_1_scale1_sampler',
                                        target: {
                                            id: 'geometry2',
                                            path: 'scale'
                                        }
                                    }
                                ],
                                parameters: {
                                    TIME: 'animAccessor_0',
                                    scale: 'animAccessor_1',
                                    scale1: 'animAccessor_2'
                                },
                                samplers: {
                                    animation_1_scale_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'scale'
                                    },
                                    animation_1_scale1_sampler: {
                                        input: 'TIME',
                                        interpolation: 'LINEAR',
                                        output: 'scale1'
                                    }
                                }
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
                            accessor_0: {
                                bufferView: 'bufferView_1',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5123,
                                type: 'SCALAR'
                            },
                            accessor_1: {
                                bufferView: 'bufferView_2',
                                byteOffset: 0,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_2: {
                                bufferView: 'bufferView_2',
                                byteOffset: 36,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_3: {
                                bufferView: 'bufferView_2',
                                byteOffset: 72,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC2'
                            },
                            accessor_4: {
                                bufferView: 'bufferView_2',
                                byteOffset: 96,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            }
                        }
                    );
                });
            });
        });
    });
});

