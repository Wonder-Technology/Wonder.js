var Compressor = require("../../../../dist/converter/gulp_task/compressToBinary/Compressor").Compressor,
    ExtendUtils = require("../../../../dist/ts/ExtendUtils"),
    BufferReader = require("../../../../dist/converter/common/BufferReader"),
    testTool = require("../../../../../js/testTool"),
    sinon = require("sinon");

describe("compressToBinary->Compressor", function () {
    var sandbox = null;
    var compressor;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        compressor = Compressor.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("compress", function () {
        var fileJson = null;

        function setFileJson(data) {
            ExtendUtils.extend(fileJson, data);
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

                var data = compressor.compress("", "", fileJson);

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

            var data = compressor.compress("wdFileName", "../", fileJson);

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

            function judgeIndice(arraybuffer, primitiveData, json) {
                var accessor = json.meshes.geometry1.primitives[0].indices;

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

            function judgePosition(arraybuffer, primitiveData, json) {
                // var accessor = json.meshes.geometry1.primitives[0].attributes.POSITION;
                //
                // var accessorData = json.accessors[accessor];
                //
                // var count = getLength(accessorData);
                //
                // var view = new DataView(arraybuffer, getOffset(accessorData, json), count * 4);
                //
                // // console.log(getLength(accessorData), getOffset(accessorData, json))
                //
                // // var data = new Float32Array(arraybuffer, getOffset(accessorData, json), getLength(accessorData));
                //
                // var data = [];
                // var offset =0 ;
                // for(var i = 0; i < count; i++){
                //     data.push(view.getFloat32(offset, true));
                //
                //     offset += 4;
                // }
                //
                //
                // expect(testTool.getValues(
                //     data
                // )).toEqual(testTool.getValues(
                //     primitiveData.attributes.POSITION
                // ));
                //
                //
                _judgeAttributeData("POSITION", arraybuffer, primitiveData, json);
            }

            function judgeNormal(arraybuffer, primitiveData, json) {
                _judgeAttributeData("NORMAL", arraybuffer, primitiveData, json);

            }

            function judgeTexCoord(arraybuffer, primitiveData, json) {
                _judgeAttributeData("TEXCOORD", arraybuffer, primitiveData, json);
            }

            function judgeColor(arraybuffer, primitiveData, json) {
                _judgeAttributeData("COLOR", arraybuffer, primitiveData, json);
            }

            function _judgeAttributeData(semantic, arraybuffer, primitiveData, json) {
                var accessor = json.meshes.geometry1.primitives[0].attributes[semantic];

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

            it("test buffer content", function () {
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

                var data = compressor.compress("", "", fileJson);


                // var reader = BufferReader.create(data.buffer);

                var arraybuffer = data.buffer.buffer;

                // console.log(arraybuffer.buffer)
                judgeIndice(arraybuffer, primitiveData, data.json);

                judgePosition(arraybuffer, primitiveData, data.json);
                judgeNormal(arraybuffer, primitiveData, data.json);
                judgeTexCoord(arraybuffer, primitiveData, data.json);
                judgeColor(arraybuffer, primitiveData, data.json);
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

                    var data = compressor.compress("wdFileName", "./", fileJson);

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

                    var data = compressor.compress("wdFileName", "./", fileJson);

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

                    var data = compressor.compress("wdFileName", "./", fileJson);

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

                    var data = compressor.compress("wdFileName", "./", fileJson);

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
        });

        describe("test special cases", function () {
            beforeEach(function () {

            });

            it("if primitives has duplicate data, the ones share the same accessor", function () {
                    var primitiveData = getPrimitiveData();

                setFileJson({
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData,
                                {
                                    "attributes": {
                                        "POSITION": primitiveData.attributes.POSITION,
                                        "NORMAL": [
                                            0.6, 5, 5,
                                            5, 10, 2,
                                            -6, -5, 3
                                        ],
                                        "TEXCOORD": [

                                        ]
                                    },
                                    "indices": [
                                        2,1,3
                                    ]
                                }
                            ]
                        }
                    }
                });

                    var data = compressor.compress("wdFileName", "./", fileJson);

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
                            }, {attributes: {POSITION: 'accessor_2', NORMAL: 'accessor_6'}, indices: 'accessor_1'}]
                        }
                    }
                );
            });
        });
    });
});
