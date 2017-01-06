describe("parse wd animation", function () {
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    function setJson(data) {
        cloneTool.extend(json, data);
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
    });
    afterEach(function () {
        sandbox.restore();
    });


    describe("parse articulated animation", function(){
        var times,
            scales,
            scale2s,
            translations,
            rotations;

        function buildArrayBuffer(times, translation, rotation, scales, scale2s) {
            var dataArr = times.concat(translation, rotation, scales, scale2s);


            var length = 4 * dataArr.length;

            var writer = BufferWriter.create(length);


            dataArr.forEach(function(val){
                writer.writeFloat(val);
            });

            return writer.arraybuffer;
        }

        function judgeChannelData(channel, startIndex, rotationStartIndex) {
            expect(testTool.getValues(
                channel.targets.getChild(0).data
            )).toEqual(translations.slice(startIndex, startIndex + 3))
            expect(
                channel.targets.getChild(0).target
            ).toEqual("position")


            expect(testTool.getValues(
                channel.targets.getChild(1).data
            )).toEqual(rotations.slice(rotationStartIndex, rotationStartIndex + 4))
            expect(
                channel.targets.getChild(1).target
            ).toEqual("rotation")




            expect(testTool.getValues(
                channel.targets.getChild(2).data
            )).toEqual(scales.slice(startIndex, startIndex + 3))
            expect(
                channel.targets.getChild(2).target
            ).toEqual("scale")


            expect(testTool.getValues(
                channel.targets.getChild(3).data
            )).toEqual(scale2s.slice(startIndex, startIndex + 3))
            expect(
                channel.targets.getChild(3).target
            ).toEqual("scale")
        }

        beforeEach(function(){
        });

        it("test", function(){
            setJson({
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

                "nodes": {
                    "node_1": {
                        "children": [],
                        "name": "1"
                        // "matrix": matrix
                    }
                },
                "animations": {
                    "animation_0": {
                        "channels": [
                            {
                                "sampler": "animation_0_translation_sampler",
                                "target": {
                                    "id": "node_1",
                                    "path": "translation"
                                }
                            },
                            {
                                "sampler": "animation_0_rotation_sampler",
                                "target": {
                                    "id": "node_1",
                                    "path": "rotation"
                                }
                            },
                            {
                                "sampler": "animation_0_scale_sampler",
                                "target": {
                                    "id": "node_1",
                                    "path": "scale"
                                }
                            },
                            {
                                "sampler": "animation_0_scale1_sampler",
                                "target": {
                                    "id": "node_1",
                                    "path": "scale"
                                }
                            }
                        ],
                        "parameters": {
                            "TIME": "animAccessor_0",
                            "translation": "animAccessor_1",
                            "rotation": "animAccessor_2",
                            "scale": "animAccessor_3",
                            "scale1": "animAccessor_4"
                        },
                        "samplers": {
                            "animation_0_translation_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "translation"
                            },
                            "animation_0_rotation_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "rotation"
                            },
                            "animation_0_scale_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "scale"
                            },
                            "animation_0_scale1_sampler": {
                                "input": "TIME",
                                "interpolation": "LINEAR",
                                "output": "scale1"
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
                        "byteOffset": 12,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC3"
                    },
                    "animAccessor_2": {
                        "bufferView": "bufferView_0",
                        "byteOffset": 48,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC4"
                    },
                    "animAccessor_3": {
                        "bufferView": "bufferView_0",
                        "byteOffset": 96,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC3"
                    },
                    "animAccessor_4": {
                        "bufferView": "bufferView_0",
                        "byteOffset": 132,
                        "count": 3,
                        "componentType": 5126,
                        "type": "VEC3"
                    }
                }
            })

            times = [
                1,
                3,
                5
            ]

            scales = [
                1,1,1,
                1.2,1.4,1.6,
                1.4,1.6,1.9
            ]

            scale2s = [
                1.2,1.4,1.6,
                1.4,1.6,1.9,
                1,1,1
            ]

            translations = [
                2,3,4,
                5,3,6,
                7,3,8
            ]

            rotations = [
                0.7,0.1,0.3,0.5,
                0.8,0.2,0.6,0.7,
                0.9,0.3,0.10,0.10
            ]




            sandbox.stub(arrayBufferMap, "getChild").returns(buildArrayBuffer(times, translations, rotations, scales, scale2s));



            var data = parser.parse(json, arrayBufferMap, imageMap);




            var object = data.objects.getChild(0);

            var animation = object.components.getChild(0);

            expect(animation["animation_0"].getCount()).toEqual(3);

            var channel1 = animation["animation_0"].getChild(0),
                channel2 = animation["animation_0"].getChild(1),
                channel3 = animation["animation_0"].getChild(2);

            expect(channel1.time).toEqual(1000);
            expect(channel2.time).toEqual(3000);
            expect(channel3.time).toEqual(5000);

            judgeChannelData(channel1, 0, 0);

            judgeChannelData(channel2, 3, 4);
            judgeChannelData(channel3, 6, 8);
        });
    });
});

