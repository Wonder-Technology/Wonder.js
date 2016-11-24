var CompressorManager = require("../../../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager,
    ExtendUtils = require("../../../../dist/ts/ExtendUtils"),
    BufferReader = require("../../../../dist/converter/common/BufferReader"),
    testTool = require("../../../../../js/testTool"),
    sinon = require("sinon");

describe("compressToBinary->CompressorManager", function () {
    var sandbox = null;
    var compressorManager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        compressorManager = CompressorManager.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("compress", function () {
        var fileJson = null;

        function setFileJson(data) {
            ExtendUtils.extend(fileJson, data);
        }

        function getAnimationData1(animationIndex, meshId) {
            var samplers = {
            }

            samplers["animation_" + animationIndex + "_scale_sampler"] = {
                "input": "TIME",
                "interpolation": "LINEAR",
                "output": "scale"            }


            samplers["animation_" + animationIndex + "_translation_sampler"] = {
                "input": "TIME",
                "interpolation": "LINEAR",
                "output": "translation"
            }

            return {
                "channels": [
                    {
                        "sampler": "animation_" + animationIndex + "_scale_sampler",
                        "target": {
                            "id": meshId,
                            "path": "scale"
                        }
                    },
                    {
                        "sampler": "animation_" + animationIndex + "_translation_sampler",
                        "target": {
                            "id": meshId,
                            "path": "translation"
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
                        1,1,1,
                        2,2,2,
                        3,3,3
                    ],
                    "translation": [
                        0,0,0,
                        1,0,2,
                        2,0,4
                    ]
                },
                "samplers": samplers
            }
        }

        function getAnimationData2(animationIndex, meshId) {
            var samplers = {
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
                            "path": "rotation"
                        }
                    }
                ],
                "parameters": {
                    "TIME": [
                        1,
                        2
                    ],
                    "rotation": [
                        1,1,1,1,
                        0.2,0.5,0.4,0.8
                    ]
                },
                "samplers": samplers
            }
        }

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

        function getPrimitiveData() {
            return {
                "attributes": {
                    "POSITION": [
                        1, 10, 2,
                        0.2, 5, 5,
                        -2, -5, 3
                    ],
                    "NORMAL": [

                        2, 5, 3,
                        3, 3, 4,
                        1, 4.5, 2
                    ],
                    "COLOR": [

                        0.1, 0.2, 0.1,
                        0.3, 0.1, 0.1,
                        0.1, 0.5, 0.2
                    ],
                    "TEXCOORD": [

                        0.2, 0.1,
                        0.1, 0.2,
                        0.3, 0.5
                    ]
                },
                "indices": [

                    3, 1, 2
                ]
            }
        }

        function getPrimitiveData2() {
            return {
                "attributes": {
                    "POSITION": [
                        3, 3, 4,
                        2, 5, 3,
                        1, 4.5, 2
                    ],
                    "NORMAL": [
                        0.2, 5, 5,
                        1, 10, 2,
                        -2, -5, 3
                    ],
                    "TEXCOORD": [
                        0.8, 0.5,
                        0.1, 0.2,
                        0.2, 0.1
                    ]
                },
                "indices": [
                    1,3,2
                ]
            }
        }

        beforeEach(function () {
            fileJson = {};
        });

        describe("generate one binary buffer", function () {
            it("buffer should be Buffer type", function () {
                setFileJson({
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": [],
                                        "POSITION": [],
                                        "TEXCOORD": []
                                    },
                                    "indices": []
                                }
                            ]
                        }
                    }
                });

                var data = compressorManager.compress("", "", fileJson);

                expect(data.buffer instanceof Buffer).toBeTruthy();
            });
        });

        it("return the buffer's uri(the path related to .wd file)", function () {
            var primitiveData = getPrimitiveData();

            setFileJson({
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            primitiveData
                        ]
                    }
                }
            });

            var data = compressorManager.compress("wdFileName", "../", fileJson);

            var buffers = data.json.buffers;


            expect(data.json.buffers.wdFileName.uri).toEqual("../wdFileName.bin");
        });

        describe("test buffer content and new fileJson file", function () {
            function getOffset(accessorData, json) {
                var bufferViewData = json.bufferViews[accessorData.bufferView];

                return accessorData.byteOffset + bufferViewData.byteOffset;
            }

            function getLength(accessorData) {
                return accessorData.count * getAccessorTypeSize(accessorData)
            }

            function getAccessorTypeSize(accessor){
                var type = accessor.type;

                switch (type) {
                    case "VEC2":
                        return 2;
                    case "VEC3":
                        return 3;
                    case "VEC4":
                        return 4;
                    case "MAT2":
                        return 4;
                    case "MAT3":
                        return 9;
                    case "MAT4":
                        return 16;
                    default:
                        return 1;
                }
            }

            function judgeAnimation(arraybuffer, animationData, json, animationName, parameterName) {
                var timeAccessor = json.animations[animationName].parameters[parameterName];

                _judgeAnimationData(arraybuffer, timeAccessor, json, animationData.parameters[parameterName]);
            }

            function _judgeAnimationData(arraybuffer, accessor, json, targetData) {
                var accessorData = json.accessors[accessor];

                var count = getLength(accessorData);

                var view = new DataView(arraybuffer, getOffset(accessorData, json), count * 4);


                var data = [];
                var offset =0 ;
                for(var i = 0; i < count; i++){
                    data.push(view.getFloat32(offset, true));

                    offset += 4;
                }



                expect(testTool.getValues(
                    data
                )).toEqual(testTool.getValues(targetData));
            }

            function judgeIndice(arraybuffer, primitiveData, json, index) {
                index = index || 0;
                var accessor = json.meshes.geometry1.primitives[index].indices;

                var accessorData = json.accessors[accessor];

                // var indices = new Uint16Array(arraybuffer, getOffset(accessorData, json), getLength(accessorData));

                var count = getLength(accessorData);

                var view = new DataView(arraybuffer, getOffset(accessorData, json), count * 4);

                var data = [];
                var offset =0 ;
                for(var i = 0; i < count; i++){
                    data.push(view.getUint16(offset, true));

                    offset += 2;
                }


                expect(data).toEqual(primitiveData.indices);
            }

            function judgePosition(arraybuffer, primitiveData, json, index) {
                _judgeAttributeData("POSITION", arraybuffer, primitiveData, json, index);
            }

            function judgeNormal(arraybuffer, primitiveData, json, index) {
                _judgeAttributeData("NORMAL", arraybuffer, primitiveData, json, index);

            }

            function judgeTexCoord(arraybuffer, primitiveData, json, index) {
                _judgeAttributeData("TEXCOORD", arraybuffer, primitiveData, json, index);
            }

            function judgeColor(arraybuffer, primitiveData, json, index) {
                _judgeAttributeData("COLOR", arraybuffer, primitiveData, json, index);
            }

            function _judgeAttributeData(semantic, arraybuffer, primitiveData, json, index) {
                index = index || 0;
                var accessor = json.meshes.geometry1.primitives[index].attributes[semantic];

                var accessorData = json.accessors[accessor];

                var count = getLength(accessorData);

                var view = new DataView(arraybuffer, getOffset(accessorData, json), count * 4);

                // console.log(getLength(accessorData), getOffset(accessorData, json))

                // var data = new Float32Array(arraybuffer, getOffset(accessorData, json), getLength(accessorData));

                var data = [];
                var offset =0 ;
                for(var i = 0; i < count; i++){
                    data.push(view.getFloat32(offset, true));

                    offset += 4;
                }



                expect(testTool.getValues(
                    data
                )).toEqual(testTool.getValues(
                    primitiveData.attributes[semantic]
                ));
            }

            beforeEach(function () {
            });

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

                        var count = getLength(accessorData);

                        var view = new DataView(arraybuffer, getOffset(accessorData, json), count * 4);

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

                beforeEach(function () {
                });

                it("test meshes", function () {
                    var primitiveData = getPrimitiveData();

                    setFileJson({
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

                    var arraybuffer = data.buffer.buffer;

                    // console.log(arraybuffer.buffer)
                    judgeIndice(arraybuffer, primitiveData, data.json);

                    judgePosition(arraybuffer, primitiveData, data.json);
                    judgeNormal(arraybuffer, primitiveData, data.json);
                    judgeTexCoord(arraybuffer, primitiveData, data.json);
                    judgeColor(arraybuffer, primitiveData, data.json);
                });
                it("test meshes + animations", function () {
                    var primitiveData = getPrimitiveData();
                    var animData1 = getAnimationData1(1, "geometry1");
                    var animData2 = getAnimationData2(2, "geometry1");

                    setFileJson({
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


                    var arraybuffer = data.buffer.buffer;

                    judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "TIME");
                    judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "translation");
                    judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale");

                    judgeAnimation(arraybuffer, animData2, data.json, "animation_2", "TIME");
                    judgeAnimation(arraybuffer, animData2, data.json, "animation_2", "rotation");

                    judgeIndice(arraybuffer, primitiveData, data.json);

                    judgePosition(arraybuffer, primitiveData, data.json);
                    judgeNormal(arraybuffer, primitiveData, data.json);
                    judgeTexCoord(arraybuffer, primitiveData, data.json);
                    judgeColor(arraybuffer, primitiveData, data.json);


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
                it("test morphTargets", function () {
                    var primitiveData = getPrimitiveData();


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


                    setFileJson({
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

                    var arraybuffer = data.buffer.buffer;

                    var json = data.json;


                    judgeMorphTargets(arraybuffer, primitiveData, json);

                    judgeIndice(arraybuffer, primitiveData, json);

                    judgePosition(arraybuffer, primitiveData, json);
                    judgeNormal(arraybuffer, primitiveData, json);
                    judgeTexCoord(arraybuffer, primitiveData, json);
                    judgeColor(arraybuffer, primitiveData, json);


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
            });

            describe("modify .wd fileJson file", function () {
                beforeEach(function () {
                });

                it("add 'accessors', 'bufferViews', 'buffers' field", function () {
                    var primitiveData = getPrimitiveData();

                    setFileJson({
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
                        wdFileName: {byteLength: 138, type: 'arraybuffer', uri: 'wdFileName.bin'}
                    });
                    expect(json.bufferViews).toEqual({
                        bufferView_0: {
                            buffer: 'wdFileName',
                            byteLength: 6,
                            byteOffset: 0,
                            target: 34963
                        }, bufferView_1: {buffer: 'wdFileName', byteLength: 132, byteOffset: 6, target: 34962}
                    });
                    expect(json.accessors).toEqual({
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
                        }
                    });
                });

                it("replace 'meshes'->primitives->attributes,indices array data with accessor id", function () {
                    var primitiveData = getPrimitiveData();

                    setFileJson({
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

                    expect(json.meshes).toEqual({
                        geometry1: {
                            primitives: [{
                                attributes: {
                                    POSITION: 'accessor_1',
                                    NORMAL: 'accessor_2',
                                    COLOR: 'accessor_4',
                                    TEXCOORD: 'accessor_3'
                                }, indices: 'accessor_0'
                            }]
                        }
                    });
                });
            });

            describe("test multi primitive datas", function(){
                function judgeData(json) {
                    expect(json.buffers).toEqual({
                        wdFileName: {byteLength: 240, type: 'arraybuffer', uri: 'wdFileName.bin'}
                    });

                    expect(json.bufferViews).toEqual(
                        {
                            bufferView_0: {buffer: 'wdFileName', byteLength: 12, byteOffset: 0, target: 34963},
                            bufferView_1: {buffer: 'wdFileName', byteLength: 228, byteOffset: 12, target: 34962}
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
                                type: 'VEC3'
                            },
                            accessor_7: {
                                bufferView: 'bufferView_1',
                                byteOffset: 168,
                                count: 3,
                                componentType: 5126,
                                type: 'VEC3'
                            },
                            accessor_8: {
                                bufferView: 'bufferView_1',
                                byteOffset: 204,
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
                    var primitiveData = getPrimitiveData(),
                        primitiveData2 = getPrimitiveData2();

                    setFileJson({
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

                    expect(json.meshes).toEqual({
                        geometry1: {
                            primitives: [{
                                attributes: {
                                    POSITION: 'accessor_2',
                                    NORMAL: 'accessor_3',
                                    COLOR: 'accessor_5',
                                    TEXCOORD: 'accessor_4'
                                }, indices: 'accessor_0'
                            }]
                        },
                        geometry2: {
                            primitives: [{
                                attributes: {
                                    POSITION: 'accessor_6',
                                    NORMAL: 'accessor_7',
                                    TEXCOORD: 'accessor_8'
                                }, indices: 'accessor_1'
                            }]
                        }
                    });

                    judgeData(json);
                });
                it("test multi primitives", function () {
                    var primitiveData = getPrimitiveData(),
                        primitiveData2 = getPrimitiveData2();

                    setFileJson({
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
                                primitives: [{
                                    attributes: {
                                        POSITION: 'accessor_2',
                                        NORMAL: 'accessor_3',
                                        COLOR: 'accessor_5',
                                        TEXCOORD: 'accessor_4'
                                    }, indices: 'accessor_0'
                                }, {
                                    attributes: {POSITION: 'accessor_6', NORMAL: 'accessor_7', TEXCOORD: 'accessor_8'},
                                    indices: 'accessor_1'
                                }]
                            }
                        }
                    );

                    judgeData(json);
                });
            });

            describe("test special cases", function () {
                beforeEach(function () {
                });

                it("if primitives has duplicate data, the ones share the same accessor", function () {
                    var primitiveData = getPrimitiveData();

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

                    setFileJson({
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



                    var arraybuffer = data.buffer.buffer;




                    judgeIndice(arraybuffer, primitiveData2, data.json, 2);




                    judgePosition(arraybuffer, primitiveData2, data.json, 2);
                    judgeNormal(arraybuffer, primitiveData2, data.json, 2);
                    judgeTexCoord(arraybuffer, primitiveData2, data.json, 2);
                });

                describe("test animations", function(){
                    beforeEach(function(){
                    });

                    it("if animations has duplicate data, the ones share the same accessor", function () {
                        var primitiveData = getPrimitiveData();
                        var animData1 = getAnimationData1(1, "geometry1");
                        var animData2 = getAnimationData3(2, "geometry1");

                        setFileJson({
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
                        var primitiveData = getPrimitiveData();

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

                        setFileJson({
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


                        var arraybuffer = data.buffer.buffer;


                        judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "TIME");
                        judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale");
                        judgeAnimation(arraybuffer, animData1, data.json, "animation_1", "scale1");

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
});
