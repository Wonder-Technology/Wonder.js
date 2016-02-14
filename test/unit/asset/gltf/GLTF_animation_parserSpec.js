describe("GLTF animation parser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.GLTFUtils;
    var arrayBufferMap;

    function setJson(data) {
        testTool.extend(json, data);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new wd.GLTFArticulatedAnimationParser();



        arrayBufferMap = wdCb.Hash.create();

        json = {
            scenes: {
            }
        }

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse animation", function(){
        beforeEach(function(){
        });

        describe("parse articulated animation", function(){
            var animationComponent;

            beforeEach(function(){
                setJson({
                    "scene": "defaultScene",

                    "buffers": {
                        "input": {
                            "byteLength": 11376,
                            "type": "arraybuffer",
                            "uri": "data:application/octet-stream;base64,AACgPwAAIEAAAAAAAAAAAAAAAAAAAIA/AACAvwAAAIAAAACAEnVFrgAAAAAAAKA/AAAgQEdVbUAAAAAAAAAAAAAAAAAAAAAArkchQAAAAAAAAAAArkchQAAAAAAAAAAAAAAAAAAAAAAAAAEAAgACAAMAAAAEAAUABgAGAAcABAAIAAkACgAKAAsACAAMAA0ADgAOAA8ADAAQABEAEgASABMAEAAUABUAFgAWABcAFAAYABkAGgAaABsAGAAcAB0AHgAeAB8AHAAgACEAIgAiACMAIAAkACUAJgAmACcAJAAoACkAKgAqACsAKAAsAC0ALgAuAC8ALAAwADEAMgAyADMAMAA0ADUANgA2ADcANAA4ADkAOgA6ADsAOAA8AD0APgA+AD8APABAAEEAQgBCAEMAQABEAEUARgBGAEcARABIAEkASgBKAEsASABMAE0ATgBOAE8ATABQAFEAUgBSAFMAUABUAFUAVgBWAFcAVABYAFkAWgBaAFsAWABcAF0AXgBeAF8AXABgAGEAYgBiAGMAYABkAGUAZgBmAGcAZABoAGkAagBqAGsAaABsAG0AbgBuAG8AbABwAHEAcgByAHMAcAB0AHUAdgB2AHcAdAB4AHkAegB6AHsAeAB8AH0AfgB+AH8AfACAAIEAggCCAIMAgACEAIUAhgCGAIcAhACIAIkAigCKAIsAiACMAI0AjgCOAI8AjACQAJEAkgCSAJMAkACUAJUAlgCWAJcAlACYAJkAmgCaAJsAmACcAJ0AngCeAJ8AnAApACgAQwBDAEIAKQAFAAQAKwArACoABQBVAFQABwAHAAYAVQBBAEAAVwBXAFYAQQCgAKEAogCiAKMAoACkAKUApgCmAKcApACoAKkAqgCqAKsAqACsAK0ArgCuAK8ArACwALEAsgCyALMAsAC0ALUAtgC2ALcAtAC4ALAAswCzALkAuAC6ALQAtwC3ALsAugC8ALgAuQC5AL0AvACxALoAuwC7ALIAsQC+ALwAvQC9AL8AvgC1AL4AvwC/ALYAtQDAAMEAwgDCAMMAwADEAMUAxgDGAMcAxADIAMkAygDKAMsAyADMAM0AzgDOAM8AzADQANEA0gDSANMA0ADUANUA1gDWANcA1ADYANkA2gDaANsA2ADcAN0A3gDeAN8A3AAAAAEAAgACAAMAAAAEAAUABgAGAAcABAAIAAkA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AAAAAPcENb/3BDU/AAAAAPcENb/3BDU/AAAAAPcENb/3BDU/AAAAAPcENb8AAAAAaM0TP9EFUT8AAAAAaM0TP9EFUT8AAAAAaM0TP9EFUT8AAAAAaM0TP9EFUT8AAAAAAACAvwAAAIAAAAAAAACAvwAAAIAAAAAAAACAvwAAAIAAAAAAAACAvwAAAIAAAACAurgtP7cIPD8AAACAurgtP7cIPD8AAACAurgtP7cIPD8AAACAurgtP7cIPD/3BDW/AAAAAPcENb/3BDW/AAAAAPcENb/3BDW/AAAAAPcENb/3BDW/AAAAAPcENb/RBVE/aM0TPwAAAIDRBVE/aM0TPwAAAIDRBVE/aM0TPwAAAIDRBVE/aM0TPwAAAIDRBVG/aM0TPwAAAADRBVG/aM0TPwAAAADRBVG/aM0TPwAAAADRBVG/aM0TPwAAAAAAAAAAAACAvwAAAIAAAAAAAACAvwAAAIAAAAAAAACAvwAAAIAAAAAAAACAvwAAAID3BDW/AAAAAPcENT/3BDW/AAAAAPcENT/3BDW/AAAAAPcENT/3BDW/AAAAAPcENT8AAAAAaM0TP9EFUb8AAAAAaM0TP9EFUb8AAAAAaM0TP9EFUb8AAAAAaM0TP9EFUb+9//++GAU1v73//769//++GAU1v73//769//++GAU1v73//769//++GAU1v73//769//8+GAU1v73//769//8+GAU1v73//769//8+GAU1v73//769//8+GAU1v73//769//8+GAU1v73//z69//8+GAU1v73//z69//8+GAU1v73//z69//8+GAU1v73//z69//++GAU1v73//z69//++GAU1v73//z69//++GAU1v73//z69//++GAU1v73//z69//++GAU1P73//769//++GAU1P73//769//++GAU1P73//769//++GAU1P73//769//8+GAU1P73//769//8+GAU1P73//769//8+GAU1P73//769//8+GAU1P73//769//8+GAU1P73//z69//8+GAU1P73//z69//8+GAU1P73//z69//8+GAU1P73//z69//++GAU1P73//z69//++GAU1P73//z69//++GAU1P73//z69//++GAU1P73//z4/xvQ+lJ88vz/G9D4/xvQ+lJ88vz/G9D4/xvQ+lJ88vz/G9D4/xvQ+lJ88vz/G9D4/xvS+lJ88vz/G9D4/xvS+lJ88vz/G9D4/xvS+lJ88vz/G9D4/xvS+lJ88vz/G9D4/xvS+lJ88vz/G9L4/xvS+lJ88vz/G9L4/xvS+lJ88vz/G9L4/xvS+lJ88vz/G9L4/xvQ+lJ88vz/G9L4/xvQ+lJ88vz/G9L4/xvQ+lJ88vz/G9L4/xvQ+lJ88vz/G9L4/xvQ+lJ88Pz/G9D4/xvQ+lJ88Pz/G9D4/xvQ+lJ88Pz/G9D4/xvQ+lJ88Pz/G9D4/xvS+lJ88Pz/G9D4/xvS+lJ88Pz/G9D4/xvS+lJ88Pz/G9D4/xvS+lJ88Pz/G9D4/xvS+lJ88Pz/G9L4/xvS+lJ88Pz/G9L4/xvS+lJ88Pz/G9L4/xvS+lJ88Pz/G9L4/xvQ+lJ88Pz/G9L4/xvQ+lJ88Pz/G9L4/xvQ+lJ88Pz/G9L4/xvQ+lJ88Pz/G9L4AAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAACAAAAAAAAAgD8AAACAAAAAAAAAgD8AAACAAAAAAAAAgD8AAACAAAAAAAAAgD8AAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAACAAAAAgAAAgL8AAACAAAAAgAAAgL8AAACAAAAAgAAAgL8AAACAAAAAgAAAgL8AAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAACAAAAAgAAAgL8AAACAAAAAgAAAgL8AAACAAAAAgAAAgL8AAACAAAAAgAAAgL/3BDW/AAAAAPcENT/3BDW/AAAAAPcENT/3BDW/AAAAAPcENT/3BDW/AAAAAPcENT8AAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/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"
                        }
                    },
                    "bufferViews": {
                        "bufferView_63": {
                            "buffer": "input",
                            "byteLength": 104,
                            "byteOffset": 0
                        }
                    },
                    "accessors": {
                        "animAccessor_0": {
                            "bufferView": "bufferView_63",
                            "byteOffset": 0,
                            "componentType": 5126,
                            "count": 2,
                            "type": "SCALAR"
                        },
                        "animAccessor_1": {
                            "bufferView": "bufferView_63",
                            "byteOffset": 8,
                            "componentType": 5126,
                            "count": 2,
                            "type": "VEC4"
                        },
                        "animAccessor_2": {
                            "bufferView": "bufferView_63",
                            "byteOffset": 40,
                            "componentType": 5126,
                            "count": 4,
                            "type": "SCALAR"
                        },
                        "animAccessor_3": {
                            "bufferView": "bufferView_63",
                            "byteOffset": 56,
                            "componentType": 5126,
                            "count": 4,
                            "type": "VEC3"
                        }
                    }
                });

                sandbox.stub(arrayBufferMap, "getChild").returns(Utils.decodeArrayBuffer(json.buffers.input.uri));
            });

            describe("test only one node has animations", function(){
                var object;

                function judgePos(keyIndex, time, posArr){
                    var key1 = animationComponent.animation_1.getChild(keyIndex);
                    expect(Math.floor(key1.time)).toEqual(time);
                    expect(key1.interpolationMethod).toEqual(wd.KeyFrameInterpolation.LINEAR);
                    expect(key1.targets.getCount()).toEqual(1);
                    var target1 = key1.targets.getChild(0);
                    expect(target1.target).toEqual(wd.ArticulatedAnimationTarget.TRANSLATION);
                    expect(target1.data).toBeInstanceOf(wd.Vector3);
                    expect(
                        testTool.getValues(target1.data, 2)
                    ).toEqual(posArr);
                }

                function judgeRotation(keyIndex, time){
                    var key1 = animationComponent.animation_0.getChild(keyIndex);
                    expect(key1.time).toEqual(time);
                    expect(key1.interpolationMethod).toEqual(wd.KeyFrameInterpolation.LINEAR);
                    expect(key1.targets.getCount()).toEqual(1);
                    var target1 = key1.targets.getChild(0);
                    expect(target1.target).toEqual(wd.ArticulatedAnimationTarget.ROTATION);
                    expect(target1.data).toBeInstanceOf(wd.Quaternion);
                }

                beforeEach(function(){
                    setJson({
                        "scenes": {
                            "defaultScene": {
                                "nodes": [
                                    "node_1"
                                ]
                            }
                        },
                        "animations": {
                            "animation_0": {
                                "channels": [
                                    {
                                        "sampler": "animation_0_rotation_sampler",
                                        "target": {
                                            "id": "node_1",
                                            "path": "rotation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_0",
                                    "rotation": "animAccessor_1"
                                },
                                "samplers": {
                                    "animation_0_rotation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "rotation"
                                    }
                                }
                            },
                            "animation_1": {
                                "channels": [
                                    {
                                        "sampler": "animation_1_translation_sampler",
                                        "target": {
                                            "id": "node_1",
                                            "path": "translation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_2",
                                    "translation": "animAccessor_3"
                                },
                                "samplers": {
                                    "animation_1_translation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "translation"
                                    }
                                }
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [
                                ],
                                "name": "1"
                            }
                        }
                    })
                    var objects = wdCb.Collection.create([
                        {
                            id:"node_1",

                            isContainer:false,

                            components: wdCb.Collection.create(),

                            children: wdCb.Collection.create()
                        }
                    ])


                    parser.parse(json, objects, arrayBufferMap);


                    object = objects.getChild(0);
                    animationComponent = object.components.getChild(0);
                });

                it("test node should only has 1 animation component", function(){
                    expect(object.components.getCount()).toEqual(1)
                });
                it("test animation_0", function(){
                    expect(animationComponent.animation_0.getCount()).toEqual(2);

                    judgeRotation(0, 1250);
                    judgeRotation(1, 2500);
                });
                it("test animation_1", function(){
                    expect(animationComponent.animation_1.getCount()).toEqual(4);

                    judgePos(0, 0, [0,0,0]);
                    judgePos(1, 1250, [0,2.52,0]);
                    judgePos(2, 2500, [0,2.52,0]);
                    judgePos(3, 3708, [0,0,0]);
                });
            });

            describe("test multi nodes has animations", function(){
                beforeEach(function(){
                    setJson({
                        "scenes": {
                            "defaultScene": {
                                "nodes": [
                                    "node_1",
                                    "node_2"
                                ]
                            }
                        },
                        "animations": {
                            "animation_0": {
                                "channels": [
                                    {
                                        "sampler": "animation_0_rotation_sampler",
                                        "target": {
                                            "id": "node_1",
                                            "path": "rotation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_0",
                                    "rotation": "animAccessor_1"
                                },
                                "samplers": {
                                    "animation_0_rotation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "rotation"
                                    }
                                }
                            },
                            "animation_1": {
                                "channels": [
                                    {
                                        "sampler": "animation_1_translation_sampler",
                                        "target": {
                                            "id": "node_2",
                                            "path": "translation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_2",
                                    "translation": "animAccessor_3"
                                },
                                "samplers": {
                                    "animation_1_translation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "translation"
                                    }
                                }
                            },
                            "animation_2": {
                                "channels": [
                                    {
                                        "sampler": "animation_1_translation_sampler",
                                        "target": {
                                            "id": "node_2",
                                            "path": "translation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_2",
                                    "translation": "animAccessor_3"
                                },
                                "samplers": {
                                    "animation_1_translation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "translation"
                                    }
                                }
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [
                                ],
                                "name": "1"
                            },
                            "node_2": {
                                "children": [
                                ],
                                "name": "2"
                            }
                        }
                    })
                });

                it("test node should only has 1 animation component", function(){
                    var objects = wdCb.Collection.create([
                        {
                            id:"node_1",

                            isContainer:false,

                            components: wdCb.Collection.create(),

                            children: wdCb.Collection.create()
                        },
                        {
                            id:"node_2",

                            isContainer:false,

                            components: wdCb.Collection.create(),

                            children: wdCb.Collection.create()
                        }
                    ])




                    parser.parse(json, objects, arrayBufferMap);





                    var object1 = objects.getChild(0);
                    expect(object1.components.getCount()).toEqual(1)

                    var object2 = objects.getChild(1);
                    expect(object2.components.getCount()).toEqual(1)

                    var animComponent2 = object2.components.getChild(0);
                    expect(animComponent2.animation_1).toBeDefined();
                    expect(animComponent2.animation_2).toBeDefined();
                });
            });

            describe("test animation attach to the child of node", function () {
                beforeEach(function(){
                    setJson({
                        "scenes": {
                            "defaultScene": {
                                "nodes": [
                                    "node_1"
                                ]
                            }
                        },
                        "animations": {
                            "animation_0": {
                                "channels": [
                                    {
                                        "sampler": "animation_0_rotation_sampler",
                                        "target": {
                                            "id": "node_11",
                                            "path": "rotation"
                                        }
                                    }
                                ],
                                "parameters": {
                                    "TIME": "animAccessor_0",
                                    "rotation": "animAccessor_1"
                                },
                                "samplers": {
                                    "animation_0_rotation_sampler": {
                                        "input": "TIME",
                                        "interpolation": "LINEAR",
                                        "output": "rotation"
                                    }
                                }
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [
                                    "node_11"
                                ],
                                "name": "1"
                            },
                            "node_11": {
                                "children": [
                                ],
                                "name": "2"
                            }
                        }
                    })
                });

                it("test when the node is container", function () {
                    var objects = wdCb.Collection.create([
                        {
                            id:"node_1",

                            isContainer:true,

                            components: wdCb.Collection.create(),

                            children: wdCb.Collection.create([

                                {
                                    id:"node_11",

                                    isContainer:false,

                                    components: wdCb.Collection.create(),

                                    children: wdCb.Collection.create()
                                }
                            ])
                        }
                    ])




                    parser.parse(json, objects, arrayBufferMap);





                    var object11 = objects.getChild(0).children.getChild(0);
                    expect(object11.components.getCount()).toEqual(1)

                    var animComponent11 = object11.components.getChild(0);
                    expect(animComponent11.animation_0).toBeDefined();
                });
            });
        });
    });
});

