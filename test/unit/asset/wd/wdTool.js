var wdTool = (function () {
    return {
        buildArrayBuffer: function (vertices, texCoords, indices, morphTargets) {
            var attributeArr = vertices.concat(texCoords);


            var length = 0;

            length += 4 * attributeArr.length;
            length += 2 * indices.length;


            if (!!morphTargets) {
                morphTargets.forEach(function (frame) {
                    length += 4 * frame.vertices.length;

                    if (!!frame.normals) {
                        length += 4 * frame.normals.length;
                    }
                });
            }

            var writer = BufferWriter.create(length);

            indices.forEach(function (indice) {
                writer.writeUInt16(indice);
            });


            attributeArr.forEach(function (val) {
                writer.writeFloat(val);
            });

            if (!!morphTargets) {
                morphTargets.forEach(function (frame) {
                    frame.vertices.forEach(function (val) {
                        writer.writeFloat(val);
                    });

                    if (!!frame.normals) {
                        frame.normals.forEach(function (val) {
                            writer.writeFloat(val);
                        });
                    }
                });
            }


            return writer.arraybuffer;
        },
        setJson: function (json, data) {
            cloneTool.extend(json, data);
        },
        prepare: function (sandbox, json, arrayBufferMap) {
            this.setJson(json, {
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
                        "byteLength": 72,
                        "byteOffset": 0,
                        "target": 34963
                    },
                    "bufferView_1": {
                        "buffer": "result",
                        "byteLength": 480,
                        "byteOffset": 72,
                        "target": 34962
                    }
                },
                "accessors": {
                    "accessor_0": {
                        "bufferView": "bufferView_0",
                        "byteOffset": 0,
                        "count": 36,
                        "componentType": 5123,
                        "type": "SCALAR"
                    },
                    "accessor_1": {
                        "bufferView": "bufferView_1",
                        "byteOffset": 0,
                        "count": 24,
                        "componentType": 5126,
                        "type": "VEC3"
                    },
                    "accessor_2": {
                        "bufferView": "bufferView_1",
                        "byteOffset": 288,
                        "count": 24,
                        "componentType": 5126,
                        "type": "VEC2"
                    }
                }


                // "materials": {
                //     "Effect-Red": {
                //         "name": "Red"
                //     }
                // }
            })

            vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5];

            texCoords = [0.25, 1, 0.25, 0.6666669845581055, 0.5, 1, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0, 0.6666669845581055, 0.25, 0.33333301544189453, 0, 0.33333301544189453, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0.5, 0.33333301544189453, 0.25, 0.33333301544189453, 0.75, 0.6666669845581055, 0.5, 0.6666669845581055, 0.75, 0.33333301544189453, 0.5, 0.33333301544189453, 1, 0.6666669845581055, 0.75, 0.6666669845581055, 1, 0.33333301544189453, 0.75, 0.33333301544189453, 0.25, 0, 0.5, 0, 0.25, 0.33333301544189453, 0.5, 0.33333301544189453];
            indices = [0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5, 8, 9, 10, 11, 10, 9, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23, 22, 21];


            sandbox.stub(arrayBufferMap, "getChild").returns(this.buildArrayBuffer(vertices, texCoords, indices));

            return [vertices, texCoords, indices];
        },
        getAttributeData: function () {
            return {
                "POSITION": "accessor_1",
                "TEXCOORD": "accessor_2"
            }
        },
        getIndiceData: function () {
            return "accessor_0";
        },
        judgeGeometryDataEqual: function (source, target, size){
            var sourceData = [];

            for(var i = 0, len = source.length; i < len; i++){
                sourceData.push(source[i]);
            }

            expect(sourceData).toEqual(target);
        },
        createColor: function (valueArr){
            var color = wd.Color.create();

            color.r = valueArr[0];
            color.g = valueArr[1];
            color.b = valueArr[2];

            if(valueArr.length === 4){
                color.a = valueArr[3];
            }

            return color;
        }
    }
}());
