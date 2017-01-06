describe("parse wd skin skeleton", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var arrayBufferMap;
    var imageMap;

    function setJson() {
        wdTool.setJson(json, {
            "scene": "defaultScene",
            "scenes": {
                "defaultScene": {
                    "nodes": [
                        "node_root"
                    ]
                }
            },

            "buffers": {
                "box": {
                    "byteLength": 552,
                    "type": "arraybuffer",
                    "uri": "box.bin"
                }
            },

            "nodes": {
                "node_root": {
                    "children": [
                        "node_1",
                        "Armature"
                    ],
                    "name": "nodeRoot",
                    "matrix": [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1
                    ]
                },
                "Armature":{
                    "children":[
                        "ske_root"
                    ],
                    "matrix":[
                        0.0254,
                        0,
                        0,
                        0,
                        0,
                        0.0254,
                        0,
                        0,
                        0,
                        0,
                        0.0254,
                        0,
                        0,
                        0,
                        11.7322,
                        1                            ]
                },
                "node_1": {
                    "children": [],
                    "skeletons": [
                        "ske_root"
                    ],
                    "skin": "skinId",
                    "name": "node_1",
                    "matrix": [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        10,
                        0,
                        0,
                        1                            ]
                },
                "ske_root":{
                    "children": [
                        "ske_1",
                        "ske_2"
                    ],
                    "jointName":"ske_root",
                    "rotation": [
                        0.611681,
                        0.354728,
                        0.611703,
                        0.354731
                    ],
                    "scale": [
                        2,
                        1,
                        1
                    ],
                    "translation": [
                        -1.16286,
                        99.4341,
                        -44.1331
                    ]
                },
                "ske_1":{
                    "children": [
                        "ske_11"
                    ],
                    "jointName":"ske_1",
                    "rotation": [
                        0.894763,
                        -0.0988353,
                        -0.361931,
                        0.242152
                    ],
                    "scale": [
                        1,
                        1,
                        1
                    ],
                    "translation": [
                        0,
                        1,
                        10
                    ]
                },
                "ske_11":{
                    "children": [
                    ],
                    "jointName":"ske_11",
                    "rotation": [
                        -0.361931,
                        0.894763,
                        -0.0988353,
                        0.242152
                    ],
                    "scale": [
                        1,
                        1,
                        1
                    ],
                    "translation": [
                        -3,
                        0,
                        5
                    ]
                },
                "ske_2":{
                    "children": [
                    ],
                    "jointName":"ske_2",
                    "rotation": [
                        -0.629516,
                        -0.328596,
                        0.195815,
                        0.676306
                    ],
                    "scale": [
                        1,
                        1,
                        1
                    ],
                    "translation": [
                        0,
                        0,
                        5
                    ]
                }
            },
            "skins": {
                "skinId": {
                    "bindShapeMatrix": [
                        1,
                        -9.68933e-008,
                        -2.42233e-008,
                        0,
                        4.84467e-008,
                        1,
                        -2.93385e-016,
                        0,
                        4.84467e-008,
                        -2.05369e-015,
                        1,
                        0,
                        4.15673,
                        3.03859,
                        -9.53674e-007,
                        1
                    ],
                    "inverseBindMatrices": "IBM_Armature_node1",
                    "jointNames": [
                        "ske_root",
                        "ske_1",
                        "ske_11",
                        "ske_2"
                    ],
                    "name": "skinName"
                }
            },
            "animations": {
                "animation_0": {
                    "channels": [
                        {
                            "sampler": "animation_0_root_translation_sampler",
                            "target": {
                                "id": "ske_root",
                                "path": "translation"
                            }
                        },
                        {
                            "sampler": "animation_0_root_rotation_sampler",
                            "target": {
                                "id": "ske_root",
                                "path": "rotation"
                            }
                        },
                        {
                            "sampler": "animation_0_root_scale_sampler",
                            "target": {
                                "id": "ske_root",
                                "path": "scale"
                            }
                        },
                        {
                            "sampler": "animation_0_ske1_rotation_sampler",
                            "target": {
                                "id": "ske_1",
                                "path": "rotation"
                            }
                        },
                        {
                            "sampler": "animation_0_ske11_rotation_sampler",
                            "target": {
                                "id": "ske_11",
                                "path": "rotation"
                            }
                        },
                        {
                            "sampler": "animation_0_ske2_translation_sampler",
                            "target": {
                                "id": "ske_2",
                                "path": "translation"
                            }
                        },
                        {
                            "sampler": "animation_0_ske2_rotation_sampler",
                            "target": {
                                "id": "ske_2",
                                "path": "rotation"
                            }
                        }
                    ],
                    "parameters": {
                        "TIME": "animAccessor_0",
                        "TIME1": "animAccessor_1",
                        "TIME11": "animAccessor_2",
                        "TIME2": "animAccessor_3",
                        "translation": "animAccessor_4",
                        "translation2": "animAccessor_9",
                        "rotation": "animAccessor_5",
                        "rotation1": "animAccessor_7",
                        "rotation11": "animAccessor_8",
                        "rotation2": "animAccessor_10",
                        "scale": "animAccessor_6"
                    },
                    "samplers": {
                        "animation_0_root_translation_sampler": {
                            "input": "TIME",
                            "interpolation": "LINEAR",
                            "output": "translation"
                        },
                        "animation_0_ske2_translation_sampler": {
                            "input": "TIME2",
                            "interpolation": "LINEAR",
                            "output": "translation2"
                        },
                        "animation_0_root_rotation_sampler": {
                            "input": "TIME",
                            "interpolation": "LINEAR",
                            "output": "rotation"
                        },
                        "animation_0_ske1_rotation_sampler": {
                            "input": "TIME1",
                            "interpolation": "LINEAR",
                            "output": "rotation1"
                        },
                        "animation_0_ske11_rotation_sampler": {
                            "input": "TIME11",
                            "interpolation": "LINEAR",
                            "output": "rotation11"
                        },
                        "animation_0_ske2_rotation_sampler": {
                            "input": "TIME2",
                            "interpolation": "LINEAR",
                            "output": "rotation2"
                        },
                        "animation_0_root_scale_sampler": {
                            "input": "TIME",
                            "interpolation": "LINEAR",
                            "output": "scale"
                        }
                    }
                }
            },
            "bufferViews": {
                "bufferView_0": {
                    "buffer": "result",
                    "byteLength": 620,
                    "byteOffset": 0
                }
            },
            "accessors": {
                "animAccessor_0": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 0,
                    "count": 3,
                    "componentType": 5126,
                    "type": "SCALAR"
                },
                "animAccessor_1": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 3 * 4,
                    "count": 3,
                    "componentType": 5126,
                    "type": "SCALAR"
                },
                "animAccessor_2": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 3 * 4 * 2,
                    "count": 3,
                    "componentType": 5126,
                    "type": "SCALAR"
                },
                "animAccessor_3": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 3 * 4 * 3,
                    "count": 3,
                    "componentType": 5126,
                    "type": "SCALAR"
                },
                "animAccessor_4": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 3 * 4 * 4,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC3"
                },
                "animAccessor_5": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 48 + 3 * 3 * 4,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC4"
                },
                "animAccessor_6": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 84 + 48,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC3"
                },

                "animAccessor_7": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 132 + 36,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC4"
                },
                "animAccessor_8": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 168 + 48,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC4"
                },
                "animAccessor_9": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 216 + 48,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC3"
                },
                "animAccessor_10": {
                    "bufferView": "bufferView_0",
                    "byteOffset": 264 + 36,
                    "count": 3,
                    "componentType": 5126,
                    "type": "VEC4"
                },
                "IBM_Armature_node1":{
                    "bufferView": "bufferView_0",
                    "byteOffset": 300 + 48,
                    "count": 4,
                    "componentType": 5126,
                    "type": "MAT4"                        }
            }
        });



        var times = [
                1,
                3,
                5
            ],
            times1 = [
                2,
                3,
                4
            ],
            times11 = [
                1,
                3,
                5
            ],
            times2 = [
                6,
                7,
                8
            ];

        var scales = [
            1,1,1,
            1.2,1.4,1.6,
            1.4,1.6,1.9
        ]


        var translations = [
                2,3,4,
                5,3,6,
                7,3,8
            ],
            translations2 = [
                2,5,4,
                5,3,6,
                10,20,30
            ];

        var rotations = [
                0.7,0.1,0.3,0.5,
                0.8,0.2,0.6,0.7,
                0.9,0.3,0.10,0.10
            ],
            rotations1 = [
                0.8,0.2,0.6,0.7,
                0.7,0.1,0.3,0.5,
                0.9,0.3,0.10,0.10
            ],
            rotations11 = [
                0.2,0.2,0.8,10.1,
                0.8,0.2,0.6,0.7,
                0.9,0.3,0.10,0.10
            ],
            rotations2 = [
                0.9,0.3,0.10,0.10,
                0.7,0.1,0.3,0.5,
                0.8,0.2,0.6,0.7
            ];



        var inverseBindMatrices = [
            1,
            -9.68933e-008,
            -2.42233e-008,
            0,
            4.84467e-008,
            1,
            -2.93385e-016,
            0,
            4.84467e-008,
            -2.05369e-015,
            1,
            0,
            0,
            0,
            0,
            1,



            1,
            1,
            -2.93385e-016,
            0,
            4.84467e-008,
            -2.05369e-015,
            -9.68933e-008,
            -2.42233e-008,
            0,
            4.84467e-008,
            1,
            0,
            0,
            0,
            0,
            1,



            -2.42233e-008,
            0,
            4.84467e-008,
            1,
            0,
            0,
            1,
            1,
            -2.93385e-016,
            0,
            4.84467e-008,
            -2.05369e-015,
            -9.68933e-008,
            0,
            0,
            1,




            4.84467e-008,
            1,
            0,
            0,
            -2.42233e-008,
            0,
            1,
            1,
            -2.93385e-016,
            0,
            4.84467e-008,
            -2.05369e-015,
            -9.68933e-008,
            0,
            0,
            1
        ];



        sandbox.stub(arrayBufferMap, "getChild").returns(buildArrayBuffer(
            times.concat(times1, times11, times2,
                translations, rotations, scales,
                rotations1,
                rotations11,
                translations2, rotations2,
                inverseBindMatrices
            )
        ));

        return {
            inverseBindMatrices: inverseBindMatrices,



            times:times,
            times1:times1,
            times11:times11,
            times2:times2,


            translations:translations,
            rotations:rotations,
            scales:scales,

            rotations1:rotations1,

            rotations11:rotations11,

            translations2:translations2,
            rotations2:rotations2
        }
    }

    function buildArrayBuffer(dataArr) {
        var length = 4 * dataArr.length;

        var writer = BufferWriter.create(length);


        dataArr.forEach(function(val){
            writer.writeFloat(val);
        });

        return writer.arraybuffer;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new wd.WDParser();



        arrayBufferMap = wdCb.Hash.create();
        imageMap = wdCb.Hash.create();

        json = {
            scenes: {
            }
        }


        testTool.openContractCheck(sandbox);



        // primitiveData = wdTool.prepare(sandbox, json, arrayBufferMap);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse JOINT,WEIGHT attributes", function(){
        var indices;
        var joints, weights;

        beforeEach(function(){
            wdTool.setJson(json, {
                "scene": "defaultScene",
                "scenes": {
                    "defaultScene": {
                        "nodes": [
                            "node_1"
                        ]
                    }
                },

                "buffers": {
                    "box": {
                        "byteLength": 552,
                        "type": "arraybuffer",
                        "uri": "box.bin"
                    }
                },
                "bufferViews": {
                    "bufferView_0": {
                        "buffer": "result",
                        "byteLength": 3 * 2,
                        "byteOffset": 0,
                        "target": 34963
                    },
                    "bufferView_1": {
                        "buffer": "result",
                        "byteLength": 480,
                        "byteOffset": 3 * 2,
                        "target": 34962
                    }
                },
                "accessors": {
                    "accessor_0": {
                        "bufferView": "bufferView_0",
                        "byteOffset": 0,
                        "count": 3,
                        "componentType": 5123,
                        "type": "SCALAR"
                    },
                    "accessor_1": {
                        "bufferView": "bufferView_1",
                        "byteOffset": 0,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC4"
                    },

                    "accessor_2": {
                        "bufferView": "bufferView_1",
                        "byteOffset": 3 * 16,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC4"
                    }
                }


                // "materials": {
                //     "Effect-Red": {
                //         "name": "Red"
                //     }
                // }
            })


            indices = [0,2,1];
            joints = [
                0,0,1,0,
                0,0,0,0,
                1,1,1,1
            ];
            weights = [
                0,1,0,0,
                1,0,0,0,
                0.25,0.25,0.25,0.25
            ];

            sandbox.stub(arrayBufferMap, "getChild").returns(wdTool.buildArrayBuffer([], [], indices, null, joints, weights));
        });

        it("test parse JOINT", function(){
            wdTool.setJson(json, {
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            {
                                "attributes": {
                                    "JOINT": "accessor_1"
                                },
                                "indices": "accessor_0"
                            }
                        ]
                    }
                },
                "nodes": {
                    "node_1": {
                        "children": [
                        ],
                        "name": "1",
                        "mesh": "geometry1"
                    }
                }
            });



            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());




            var object1 = data.objects.getChild(0);
            var geo = object1.components.getChild(0);

            expect(geo.jointIndices).toEqual(joints);
        });

        describe("test parse WEIGHT", function () {
            it("normalize weight data", function () {
                wdTool.setJson(json, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": {
                                        "WEIGHT": "accessor_2"
                                    },
                                    "indices": "accessor_0"
                                }
                            ]
                        }
                    },
                    "nodes": {
                        "node_1": {
                            "children": [
                            ],
                            "name": "1",
                            "mesh": "geometry1"
                        }
                    }
                });

                weights = [
                    0.1,0.1,0.1,0.1,
                    1,0,0,0,
                    0.25,0.25,0.25,0.25
                ];
                arrayBufferMap.getChild.returns(wdTool.buildArrayBuffer([], [], indices, null, joints, weights));


                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());




                var object1 = data.objects.getChild(0);
                var geo = object1.components.getChild(0);

                expect(geo.jointWeights).toEqual([
                    0.25, 0.25, 0.25, 0.25, 1, 0, 0, 0, 0.25, 0.25, 0.25, 0.25
                ]);
            });
        });
    });

    it("objects shouldn't contain skeleton node", function () {
        setJson();

        var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());




        var object1 = data.objects.getChild(0);
        expect(object1.children.getCount()).toEqual(1);
        expect(object1.children.getChild(0).name).toEqual("node_1");
    });

    describe("parse skinSkeleton component", function(){
        function getSkinSkeletonComponent(data) {
            var object1 = data.objects.getChild(0);


            return object1.children.getChild(0).components.getChild(1);
        }

        function getSkinJson() {
            return json.skins.skinId;
        }

        beforeEach(function(){
        });

        it("if has multi root skeletons, warn and only use the first skeleton", function () {
            sandbox.stub(wd.Log, "warn");
            setJson();
            json.nodes.node_1 = {
                "children": [],
                "skeletons": [
                    "ske_root",
                    "ske_2"
                ],
                "skin": "skinId",
                "name": "node_1",
                "matrix": [
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    10,
                    0,
                    0,
                    1                            ]
            }


            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());




            expect(wd.Log.warn).toCalledOnce();

            var object1 = data.objects.getChild(0);

            expect(object1.children.getChild(0).components.getCount()).toEqual(2);
        });

        it("parse bindShapeMatrix", function () {
            setJson();

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());



            var comp = getSkinSkeletonComponent(data);

            expect(
                testTool.getValues(
                    comp.bindShapeMatrix.values,
                    3
                )
            ).toEqual(
                testTool.getValues(
                    getSkinJson().bindShapeMatrix,
                    3
                )
            );
        });
        it("parse jointNames", function () {
            setJson();

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());



            var comp = getSkinSkeletonComponent(data);

            expect(comp.jointNames).toEqual(getSkinJson().jointNames);
        });
        it("parse inverseBindMatrices", function () {
            var animationData = setJson();

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());



            var comp = getSkinSkeletonComponent(data);


            expect(comp.inverseBindMatrices.length).toEqual(4);


            var index = 0;
            for(var i = 0; i < 4; i++){
                expect(
                    testTool.getValues(
                        comp.inverseBindMatrices[i].values,
                        3
                    )
                ).toEqual(
                    testTool.getValues(
                        animationData.inverseBindMatrices.slice(index, index + 16),
                        3
                    )
                );

                index += 16;
            }
        });

        describe("parse boneMatrixMap", function () {
            function judgeMatrix(boneMatrix, targetValues) {
                expect(boneMatrix._localMatrix.values).toEqual(targetValues);
            }

            function composeMatrix(translation, rotation, scale, matrixArr) {
                if(!!matrixArr){
                    return wd.Matrix4.create(new Float32Array(
                        matrixArr
                    ));
                }

                return wd.Matrix4.create().setTRS(
                    wd.Vector3.create(translation[0], translation[1], translation[2]),
                    wd.Quaternion.create(rotation[0], rotation[1], rotation[2], rotation[3]),
                    wd.Vector3.create(scale[0], scale[1], scale[2])
                )
            }

            function judge(data, skeId, parentId) {
                var comp = getSkinSkeletonComponent(data);
                var boneMatrixMap = comp.boneMatrixMap;
                var ske = boneMatrixMap.getChild(skeId);

                if(parentId){
                    expect(ske.parent === boneMatrixMap.getChild(parentId)).toBeTruthy();
                }
                else{
                    expect(ske.parent).toBeNull();
                }

                var node = json.nodes[skeId];
                judgeMatrix(ske, composeMatrix(
                    node.translation,
                    node.rotation,
                    node.scale,
                    node.matrix
                ).values);
            }

            it("get data and set its'parent", function () {
                setJson();

                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());






                judge(data, "Armature", "node_root");
                judge(data, "ske_root", "Armature");
                judge(data, "ske_1", "ske_root");
                judge(data, "ske_11", "ske_1");
                judge(data, "ske_2", "ske_root");
            });
        });

        describe("parse jointTransformData", function(){
            function judgeTime(channel, targetTime) {
                expect(channel.time).toEqual(targetTime * 1000);
            }

            function judgeChannelData(channel, startIndex, rotationStartIndex, sourceDataIndex, targetData) {
                if(targetData.translations){
                    var sourceTranslations = channel.targets.getChild(sourceDataIndex.translationIndex);

                    expect(testTool.getValues(
                        sourceTranslations.data
                    )).toEqual(targetData.translations.slice(startIndex, startIndex + 3))
                    expect(
                        sourceTranslations.target
                    ).toEqual("position")
                }


                if(targetData.rotations){
                    var sourceRotations = channel.targets.getChild(sourceDataIndex.rotationIndex);

                    expect(testTool.getValues(
                        sourceRotations.data,
                        2
                    )).toEqual(
                        testTool.getValues(
                            targetData.rotations.slice(rotationStartIndex, rotationStartIndex + 4),
                            2
                        )
                    )
                    expect(
                        sourceRotations.target
                    ).toEqual("rotation")

                }


                if(targetData.scales){
                    var sourceScales = channel.targets.getChild(sourceDataIndex.scaleIndex);

                    expect(testTool.getValues(
                        sourceScales.data
                    )).toEqual(targetData.scales.slice(startIndex, startIndex + 3))
                    expect(
                        sourceScales.target
                    ).toEqual("scale")

                }
            }

            function judge(skeData, times, sourceIndexData, targetData) {
                var channel1 = skeData.getChild(0);
                var channel2 = skeData.getChild(1);
                var channel3 = skeData.getChild(2);


                judgeTime(channel1, times[0]);
                judgeTime(channel2, times[1]);
                judgeTime(channel3, times[2]);

                judgeChannelData(channel1, 0, 0, sourceIndexData,targetData
                );

                judgeChannelData(channel2, 3, 4, sourceIndexData, targetData);

                judgeChannelData(channel3, 6, 8, sourceIndexData, targetData);
            }

            it("test", function () {
                var animationData = setJson();

                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());



                var comp = getSkinSkeletonComponent(data);
                var data = comp.jointTransformData;





                judge(
                    data.getChild("animation_0").getChild("ske_root"),
                    animationData.times,
                    {
                        translationIndex:0,
                        rotationIndex:1,
                        scaleIndex:2
                    },
                    {
                        translations:animationData.translations,
                        rotations:animationData.rotations,
                        scales:animationData.scales
                    }
                )


                judge(
                    data.getChild("animation_0").getChild("ske_1"),
                    animationData.times1,
                    {
                        rotationIndex:0,
                    },
                    {
                        rotations:animationData.rotations1
                    }
                )


                judge(
                    data.getChild("animation_0").getChild("ske_11"),
                    animationData.times11,
                    {
                        rotationIndex:0,
                    },
                    {
                        rotations:animationData.rotations11
                    }
                )


                judge(
                    data.getChild("animation_0").getChild("ske_2"),
                    animationData.times2,
                    {
                        translationIndex:0,
                        rotationIndex:1
                    },
                    {
                        translations:animationData.translations2,
                        rotations:animationData.rotations2
                    }
                )
            });
        });
    });
});
