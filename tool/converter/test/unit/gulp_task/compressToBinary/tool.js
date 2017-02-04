var ExtendUtils = require("../../../../dist/ts/ExtendUtils"),
    testTool = require("../../../../../js/testTool"),
    bufferToArraybuffer = require("buffer-to-arraybuffer");

var tool = (function () {
    function _getOffset(accessorData, json) {
        var bufferViewData = json.bufferViews[accessorData.bufferView];

        return accessorData.byteOffset + bufferViewData.byteOffset;
    }

    function _getLength(accessorData) {
        return accessorData.count * _getAccessorTypeSize(accessorData)
    }

    function _getAccessorTypeSize(accessor){
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
    function _judgeAttributeData(semantic, arraybuffer, primitiveData, json, index) {
        index = index || 0;
        var accessor = json.meshes.geometry1.primitives[index].attributes[semantic];

        var accessorData = json.accessors[accessor];

        var count = _getLength(accessorData);

        var view = new DataView(arraybuffer, _getOffset(accessorData, json), count * 4);

        // console.log(_getLength(accessorData), _getOffset(accessorData, json))

        // var data = new Float32Array(arraybuffer, _getOffset(accessorData, json), _getLength(accessorData));

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

    function _judgeAnimationData (arraybuffer, accessor, json, targetData) {
        var accessorData = json.accessors[accessor];

        var count = _getLength(accessorData);

        var view = new DataView(arraybuffer, _getOffset(accessorData, json), count * 4);


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




    return {
        setFileJson: function (fileJson, data) {
            ExtendUtils.extend(fileJson, data);
        },
        getAnimationData1: function (animationIndex, meshId) {
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
        },
        getAnimationData2: function (animationIndex, meshId) {
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
        },
        getPrimitiveData:function () {
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
        },
        getPrimitiveData2:function () {
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
        },
        getPrimitiveDataWithSkinData:function () {
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
                    ],
                    "JOINT": [
                        0,1,0,0,
                        0,0,0,2,
                        1,2,0,0
                    ],
                    "WEIGHT": [
                        0.3,0.3,0.1,0.1,
                        0.1,0.1,0.2,0.6,
                        1.0,0.0,0.0,0.0
                    ]
                },
                "indices": [

                    3, 1, 2
                ]
            }
        },
        getArraybuffer:function (data) {
            var arraybuffer = null;

            if(!data.buffer){
                return bufferToArraybuffer.bufferToArrayBuffer(data);
            }

            arraybuffer = data.buffer.buffer;

            if(arraybuffer){
                return arraybuffer;
            }

            if(data instanceof Buffer){
                return bufferToArraybuffer.bufferToArrayBuffer(data);
            }
        },

        getSkinInverseBindMatrices: function () {
            return [
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
                1,



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
        judgeAnimation: function (arraybuffer, animationData, json, animationName, parameterName) {
            var timeAccessor = json.animations[animationName].parameters[parameterName];

            _judgeAnimationData(arraybuffer, timeAccessor, json, animationData.parameters[parameterName]);
        },

        judgeIndice:function (arraybuffer, primitiveData, json, index) {
            index = index || 0;
            var accessor = json.meshes.geometry1.primitives[index].indices;

            var accessorData = json.accessors[accessor];

            // var indices = new Uint16Array(arraybuffer, _getOffset(accessorData, json), _getLength(accessorData));

            var count = _getLength(accessorData);

            var view = new DataView(arraybuffer, _getOffset(accessorData, json), count * 4);

            var data = [];
            var offset =0 ;
            for(var i = 0; i < count; i++){
                data.push(view.getUint16(offset, true));

                offset += 2;
            }


            expect(data).toEqual(primitiveData.indices);
        },

        judgePosition:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("POSITION", arraybuffer, primitiveData, json, index);
        },
        judgeNormal:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("NORMAL", arraybuffer, primitiveData, json, index);

        },
        judgeTexCoord:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("TEXCOORD", arraybuffer, primitiveData, json, index);
        },
        judgeColor:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("COLOR", arraybuffer, primitiveData, json, index);
        },
        judgeJoint:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("JOINT", arraybuffer, primitiveData, json, index);
        },
        judgeWeight:function (arraybuffer, primitiveData, json, index) {
            _judgeAttributeData("WEIGHT", arraybuffer, primitiveData, json, index);
        },
        getLength: function (accessorData) {
            return _getLength(accessorData);
        },
        getOffset: function (accessorData, json) {
            return _getOffset(accessorData, json);
        }
    }
})();

module.exports = tool;
