describe("WDParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    function setJson(data) {
        cloneTool.extend(json, data);
    }

    function createColor(valueArr){
        var color = wd.Color.create();

        color.r = valueArr[0];
        color.g = valueArr[1];
        color.b = valueArr[2];

        if(valueArr.length === 4){
            color.a = valueArr[3];
        }

        return color;
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

    // describe("parse metadata", function(){
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("if json.asset not exist, not parse", function(){
    //         var data = parser.parse(json, arrayBufferMap, imageMap);
    //
    //         expect(data.metadata).toBeUndefined();
    //     });
    //
    //     describe("else", function(){
    //         it("parse version,genertor,premultipliedAlpha, profile data", function(){
    //             setJson({
    //                 asset:{
    //                  "generator": "collada2gltf@ceec062e3d5793f2f249f53cbd843aee382ad40b",
    //                 "premultipliedAlpha": true,
    //                 "profile": {
    //                     "api": "WebGL",
    //                     "version": "1.0.2"
    //                 },
    //                 "version": 1
    //                 }
    //             })
    //
    //             var data = parser.parse(json, arrayBufferMap, imageMap);
    //
    //             expect(data.metadata).toEqual(json.asset);
    //         });
    //     });
    // });

    describe("parse objects", function(){
        var vertices,texCoords,indices;

        function getAttributeData() {
            return {
                "POSITION": "accessor_1",
                "TEXCOORD": "accessor_2"
            }
        }

        function getIndiceData() {
            return "accessor_0";
        }

        function judgeGeometryDataEqual(source, target, size){
            var sourceData = [];

            for(var i = 0, len = source.length; i < len; i++){
                sourceData.push(source[i]);
            }

            expect(sourceData).toEqual(target);
        }

        function buildArrayBuffer(vertices, texCoords, indices, morphTargets) {
            var attributeArr = vertices.concat(texCoords);


            var length = 0;

            length += 4 * attributeArr.length;
            length += 2 * indices.length;


            if(!!morphTargets) {
                morphTargets.forEach(function (frame) {
                    length += 4 * frame.vertices.length;

                    if(!!frame.normals){
                        length += 4 * frame.normals.length;
                    }
                });
            }

            var writer = BufferWriter.create(length);

            indices.forEach(function(indice){
                writer.writeUInt16(indice);
            });


            attributeArr.forEach(function(val){
                writer.writeFloat(val);
            });

            if(!!morphTargets){
                morphTargets.forEach(function(frame){
                    frame.vertices.forEach(function(val){
                        writer.writeFloat(val);
                    });

                    if(!!frame.normals){
                        frame.normals.forEach(function(val){
                            writer.writeFloat(val);
                        });
                    }
                });
            }


            return writer.arraybuffer;
        }

        beforeEach(function(){
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

            vertices =[ -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5 ];

            texCoords =[ 0.25, 1, 0.25, 0.6666669845581055, 0.5, 1, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0, 0.6666669845581055, 0.25, 0.33333301544189453, 0, 0.33333301544189453, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0.5, 0.33333301544189453, 0.25, 0.33333301544189453, 0.75, 0.6666669845581055, 0.5, 0.6666669845581055, 0.75, 0.33333301544189453, 0.5, 0.33333301544189453, 1, 0.6666669845581055, 0.75, 0.6666669845581055, 1, 0.33333301544189453, 0.75, 0.33333301544189453, 0.25, 0, 0.5, 0, 0.25, 0.33333301544189453, 0.5, 0.33333301544189453 ];
            indices = [ 0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5, 8, 9, 10, 11, 10, 9, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23, 22, 21 ];





            sandbox.stub(arrayBufferMap, "getChild").returns(buildArrayBuffer(vertices, texCoords, indices));
        });

        it("parse current scene->nodes", function(){
            setJson({
                "scene": "defaultScene",
                "scenes": {
                    "defaultScene": {
                        "nodes": [
                            "node_2",
                            "node_3"
                        ]
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
                    },
                    "node_3": {
                        "children": [
                        ],
                        "name": "3"
                    }
                }
            })

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());

            expect(data.objects.getCount()).toEqual(2);
            var object1 = data.objects.getChild(0);
            var object2 = data.objects.getChild(1);
            expect(object1.name).toEqual("2");
            expect(object1.id).toEqual("node_2");
            expect(object2.name).toEqual("3");
            expect(object2.id).toEqual("node_3");
        });

        it("test id", function () {
            setJson({
                "scenes": {
                    "defaultScene": {
                        "nodes": [
                            "node_1",
                            "node_2"
                        ]
                    }
                },
                "nodes": {
                    "node_1": {
                        "children": [
                            "node_11"
                        ]
                    },
                    "node_11": {
                        "children": [
                        ]
                    },
                    "node_2": {
                        "children": [
                        ]
                    }
                }
            })

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());

            expect(data.objects.getCount()).toEqual(2);
            expect(data.objects.getChild(0).id).toEqual("node_1");
            expect(data.objects.getChild(0).children.getChild(0).id).toEqual("node_11");
            expect(data.objects.getChild(1).id).toEqual("node_2");
        });

        describe("test name", function(){
            beforeEach(function(){
            });

            it("if !node->name&&mesh.name, use mesh->name to be object.name", function () {
                setJson({
                    "meshes": {
                        "geometry1": {
                            "name": "geo1",
                            "primitives": [
                            ]
                        }
                    },
                    "nodes": {
                        "node_1": {
                            "children": [
                            ],
                            //"name": "1",
                            "mesh": "geometry1"
                        }
                    }
                })

                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());

                expect(data.objects.getCount()).toEqual(1);
                expect(data.objects.getChild(0).name).toEqual("geo1");
            });
            it("else if node->name, use node->name to be object.name", function () {
                setJson({
                    "meshes": {
                        "geometry1": {
                            "name": "geo1",
                            "primitives": [
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
                })

                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());

                expect(data.objects.getCount()).toEqual(1);
                expect(data.objects.getChild(0).name).toEqual("1");
            });
        });

        describe("parse Geometry", function(){
            beforeEach(function(){
                setJson({
                    "materials": {
                        "mat1": {
                            "name": "Red",
                            "technique": "PHONG"
                        },
                        "mat2": {
                            "name": "Blue",
                            "technique": "PHONG"
                        }
                    }
                });
            });

            it("if mesh->primitives has multi ones, the primitives should be children of the node(one primitive is one child)", function(){
                setJson({
                    "meshes": {
                        "geometry1": {
                            //"name": "geo1",
                            "primitives": [
                                {
                                    "attributes": getAttributeData(),
                                    "indices": getIndiceData(),
                                    "material": "mat1",
                                    "mode": 4
                                },
                                {
                                    "attributes": {
                                        "POSITION": "accessor_2",
                                        "TEXCOORD": "accessor_1"
                                    },
                                    "indices": "accessor_0",
                                    "material": "mat2",
                                    "mode": 4
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
                })


                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());





                expect(data.objects.getCount()).toEqual(1);
                var object1 = data.objects.getChild(0);

                expect(object1.isContainer).toBeTruthy();



                expect(object1.children.getCount()).toEqual(2);
                expect(object1.children.getChild(0).name).toEqual("mat1");
                expect(object1.children.getChild(1).name).toEqual("mat2");
            });
            it("test with indices", function(){
                setJson({
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": getAttributeData(),
                                    "indices": getIndiceData(),
                                    "material": "mat1",
                                    "mode": 4
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
                })



                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());





                expect(data.objects.getCount()).toEqual(1);
                var object = data.objects.getChild(0);

                var geo = object.components.getChild(0);

                judgeGeometryDataEqual(vertices, geo.vertices, 3);
                //expect(geo.vertices).toEqual(
                //    vertices
                //);
                //expect(geo.texCoords).toEqual(
                //    texCoords
                //);
                expect(geo.colors).toBeUndefined();
                geometryTool.judgeFaceIndices(geo.faces, indices);
                // expect(geo.drawMode).toEqual(wd.EDrawMode.TRIANGLES);


                //expect(object1.children.getChild(0).name).toEqual("mat1");
                //expect(object1.children.getChild(1).name).toEqual("mat2");
            });
            it("test without indices", function(){
                setJson({
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": getAttributeData(),
                                    "material": "mat1",
                                    "mode": 3
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
                })


                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());





                //expect(data.objects.getCount()).toEqual(1);
                var object = data.objects.getChild(0);

                var geo = object.components.getChild(0);
                //expect(geo.vertices).toEqual(
                //    vertices
                //);
                //expect(geo.texCoords).toEqual(
                //    texCoords
                //);
                //expect(geo.colors).toBeUndefined();

                geometryTool.judgeFaceIndices(geo.faces, []);
                // expect(geo.drawMode).toEqual(wd.EDrawMode.LINE_STRIP);
            });

            describe("test parse morphTargets", function(){
                var morphTargets;


                function judgeMorphDataEqual(animName, sourceMorphTargets, targetMorphTargets, targetMorphNormals){
                    sourceMorphTargets.forEach(function(sourceFrame, index){
                        var targetFrameVertices = targetMorphTargets.getChild(animName).getChild(index),
                            targetFrameNormals = null;

                        expect(sourceFrame.vertices).toEqual(targetFrameVertices);


                        if(!!sourceFrame.normals && !!targetFrameNormals){
                            targetFrameNormals = targetMorphNormals.getChild(animName).getChild(index);

                            expect(sourceFrame.normals).toEqual(targetFrameNormals);
                        }
                    });
                }

                beforeEach(function(){
                    setJson({
                        "buffers": {
                            "box": {
                                "byteLength": 552 + 576,
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
                            },
                            "bufferView_2": {
                                "buffer": "result",
                                "byteLength": 576,
                                "byteOffset": 552,
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
                            },


                            "accessor_3": {
                                "bufferView": "bufferView_2",
                                "byteOffset": 0,
                                "count": 24,
                                "componentType": 5126,
                                "type": "VEC3"
                            },
                            "accessor_4": {
                                "bufferView": "bufferView_2",
                                "byteOffset": 288,
                                "count": 24,
                                "componentType": 5126,
                                "type": "VEC3"
                            }
                        },



                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    {
                                        "attributes": getAttributeData(),
                                        "morphTargets": [
                                            {name:"frame0", vertices:"accessor_3", normals:"accessor_4"}
                                        ],
                                        "indices": getIndiceData(),
                                        "material": "mat1",
                                        "mode": 4
                                    }
                                ]
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [],
                                "name": "1",
                                "mesh": "geometry1"
                            }
                        }
                    });
                });

                it("test get morphTargets", function() {
                    morphTargets = [
                        {
                            name:"anim0",
                            vertices: [ 0.5, 0.5, 2.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -1.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 10 ]
                        },
                        {
                            name:"anim1",
                            vertices: [
                                1,2,10,
                                0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -1.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 10
                            ]
                        }
                    ]

                    sandbox.stub(arrayBufferMap, "getChild").returns(buildArrayBuffer(vertices, texCoords, indices, morphTargets));

                    setJson({
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    {
                                        "attributes": getAttributeData(),
                                        "morphTargets": [
                                            {name:"anim0", vertices:"accessor_3"},

                                            {name:"anim1", vertices:"accessor_4"}
                                        ],
                                        "indices": getIndiceData(),
                                        "material": "mat1",
                                        "mode": 4
                                    }
                                ]
                            }
                        }
                    })




                    var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());


                    expect(data.objects.getCount()).toEqual(1);
                    var object = data.objects.getChild(0);

                    var geo = object.components.getChild(0);

                    judgeMorphDataEqual("anim", morphTargets, geo.morphTargets, geo.morphNormals);

                    judgeGeometryDataEqual(vertices, geo.vertices, 3);

                    expect(geo.colors).toBeUndefined();
                    geometryTool.judgeFaceIndices(geo.faces, indices);
                });
                it("test get morphTargets and morphNormals", function() {
                    morphTargets = [
                        {
                            name:"anim0",
                            vertices: [ 0.5, 0.5, 2.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -1.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 10 ],
                            normals:[
                                1.5, -0.5, 0.5,
                                0.5, 0.5, 2.5,
                                -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -1.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
                                -3.5, 0.5, 10                             ]
                        }
                    ]

                    sandbox.stub(arrayBufferMap, "getChild").returns(buildArrayBuffer(vertices, texCoords, indices, morphTargets));



                    setJson({
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    {
                                        "attributes": getAttributeData(),
                                        "morphTargets": [
                                            {name:"anim0", vertices:"accessor_3", normals:"accessor_4"}
                                        ],
                                        "indices": getIndiceData(),
                                        "material": "mat1",
                                        "mode": 4
                                    }
                                ]
                            }
                        }
                    })




                    var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());


                    expect(data.objects.getCount()).toEqual(1);
                    var object = data.objects.getChild(0);

                    var geo = object.components.getChild(0);

                    judgeMorphDataEqual("anim", morphTargets, geo.morphTargets, geo.morphNormals);

                    judgeGeometryDataEqual(vertices, geo.vertices, 3);

                    expect(geo.colors).toBeUndefined();
                    geometryTool.judgeFaceIndices(geo.faces, indices);
                });
            });

            describe("parse material", function(){
                function getMaterial(data){
                    var geo = data.objects.getChild(0).components.getChild(0);

                    return geo.material;
                }

                function judgeMaterial(data, value){
                    var i = null,
                        mat = getMaterial(data);

                    for(i in value){
                        if(value.hasOwnProperty(i)){
                            expect(mat[i]).toEqual(value[i]);
                        }
                    }
                }

                beforeEach(function(){
                });

                it("if no material data, get default material data", function () {
                    setJson({
                        "meshes": {
                            "geometry1": {
                                "primitives": [
                                    {
                                        "attributes": getAttributeData(),
                                        "indices": getIndiceData(),
                                        // "material": "mat1",
                                        "mode": 4
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
                    })




                    var data = parser.parse(json, arrayBufferMap, imageMap);




                    var material = getMaterial(data);

                    expect(material.type).toEqual("LightMaterial");
                    expect(material.lightModel).toEqual(wd.ELightModel.PHONG);
                });

                // it("if no KHR_materials_common extension found, will use default material instead and log info", function(){
                //     sandbox.stub(wd.Log, "log");
                //     setJson({
                //         "materials": {
                //             "Effect-Red": {
                //                 "name": "Red"
                //             }
                //         }
                //     })
                //
                //
                //     var data = parser.parse(json, arrayBufferMap, imageMap);
                //
                //     expect(wd.Log.log).toCalledOnce();
                //     judgeMaterial(data, {
                //         type:"BasicMaterial",
                //
                //         doubleSided:false
                //     });
                // });

                // describe("else, parse KHR_materials_common extension", function(){
                //     beforeEach(function(){
                //         setJson({
                //             "extensionsUsed": [
                //                 "KHR_materials_common"
                //             ]
                //         })
                //     });

                describe("else", function(){
                    beforeEach(function(){
                        setJson({
                            "meshes": {
                                "geometry1": {
                                    "primitives": [
                                        {
                                            "attributes": getAttributeData(),
                                            "indices": getIndiceData(),
                                            "material": "mat1",
                                            "mode": 4
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
                    });

                    describe("parse technique", function(){
                        function judge(dataFunc){
                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        // "extensions": {
                                        //     "KHR_materials_common": {
                                        "technique": "PHONG"
                                        // }
                                        // }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("PHONG"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        // "extensions": {
                                        //     "KHR_materials_common": {
                                        "technique": "BLINN"
                                        // }
                                        // }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("BLINN"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        // "extensions": {
                                        //     "KHR_materials_common": {
                                        "technique": "LAMBERT"
                                        // }
                                        // }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("LAMBERT"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        // "extensions": {
                                        //     "KHR_materials_common": {
                                        "technique": "CONSTANT"
                                        // }
                                        // }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("CONSTANT"));
                        }

                        beforeEach(function(){
                        });

                        it("material type should always be LightMaterial", function(){
                            judge(function(){
                                return {
                                    type:"LightMaterial"
                                }
                            });
                        });
                        it("get lightModel", function(){
                            judge(function(technique){
                                return {
                                    lightModel:technique
                                }
                            });
                        });
                    });
                    it("parse doubledSided,transparent,transparency", function(){

                        setJson({
                            "materials": {
                                "mat1": {
                                    "name": "Red",
                                    "doubleSided": false,
                                    "transparent": true,
                                    "technique": "PHONG",
                                    "transparency": 0.2
                                }
                            }
                        })


                        var data = parser.parse(json, arrayBufferMap, imageMap);

                        judgeMaterial(data, {
                            doubleSided:false,
                            transparent:true,
                            opacity:0.2
                        });
                    });

                    describe("parse values", function(){
                        var image;

                        function judgeLightColor(name){
                            it("if " + name + " is array, parse " + name + " color", function(){
                                setJson({
                                    "materials": {
                                        "mat1": {
                                            "name": "Red",
                                            "technique": "PHONG",
                                            values:{}
                                        }
                                    }
                                })

                                var colorData = [
                                    0,
                                    0,
                                    0,
                                    1
                                ];

                                json.materials.mat1.values[name] = colorData;


                                var data = parser.parse(json, arrayBufferMap, imageMap);

                                var judgeData = {};
                                judgeData[name + "Color"] = createColor([0,0,0,1]);
                                judgeMaterial(data, judgeData);
                            });

                            judgeLightMap(name);
                        }

                        function judgeLightMap(name, valueName) {
                            if(!valueName){
                                valueName = name;
                            }

                            it("parse " + name + " map", function(){
                                setJson({
                                    "materials": {
                                        "mat1": {
                                            "name": "Red",
                                            "technique": "PHONG",
                                            values:{
                                            }
                                        }
                                    },

                                    "textures": {
                                        "texture_Image0001": {
                                            "format": 6408,
                                            "internalFormat": 6408,
                                            "sampler": "sampler_0",
                                            "source": "Image0001",
                                            "target": 3553,
                                            "type": 5121
                                        }
                                    },
                                    "images": {
                                        "Image0001": {
                                            "name": "Image0001",
                                            "uri": "Cesium_Logo_Flat.png"
                                        }
                                    },
                                    "samplers": {
                                        "sampler_0": {
                                            // "magFilter": 9729,
                                            // "minFilter": 9987,
                                            // "wrapS": 10497,
                                            // "wrapT": 10497
                                        }
                                    }
                                })


                                var colorData = "texture_Image0001";
                                json.materials.mat1.values[valueName] = colorData;






                                var data = parser.parse(json, arrayBufferMap, imageMap);

                                var mat = getMaterial(data);
                                var map = mat[name + "Map"];

                                expect(map).toBeInstanceOf(wd.ImageTexture);
                                expect(map.source).toEqual(image);
                                expect(map.format).toEqual(wd.ETextureFormat.RGBA);
                                expect(map.type).toEqual(wd.ETextureType.UNSIGNED_BYTE);
                                expect(map.minFilter).toEqual(wd.ETextureFilterMode.LINEAR);
                                expect(map.magFilter).toEqual(wd.ETextureFilterMode.LINEAR);
                                expect(map.wrapS).toEqual(wd.ETextureWrapMode.REPEAT);
                                expect(map.wrapT).toEqual(wd.ETextureWrapMode.REPEAT);
                            });
                        }

                        beforeEach(function(){
                            image = {};
                            sandbox.stub(imageMap, "getChild").returns(image);
                            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
                        });

                        describe("parse diffuse", function() {
                            judgeLightColor("diffuse");
                        });

                        describe("parse specular", function() {
                            judgeLightColor("specular");
                        });

                        describe("parse emission", function() {
                            judgeLightColor("emission");
                        });

                        describe("parse lightMap", function() {
                            judgeLightMap("light", "lightMap");
                        });

                        describe("parse normalMap", function() {
                            judgeLightMap("normal", "normalMap");
                        });


                        it("parse shininess", function(){
                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "technique": "BLINN",
                                        values:{
                                            "shininess": 256
                                        }
                                    }
                                }
                            })



                            var data = parser.parse(json, arrayBufferMap, imageMap);

                            judgeMaterial(data, {
                                shininess: 256
                            })
                        });
                    });
                });
            });

            describe("optimize", function(){
                beforeEach(function(){
                });

                describe("the texture which has the same image source+same filter+same wrap share the same webglTexture", function(){
                    var gl;

                    beforeEach(function(){
                        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                        gl = wd.DeviceManager.getInstance().gl;
                    });

                    it("if only repeatRegion is different, share", function(){
                        gl.createTexture.onCall(0).returns({})
                        gl.createTexture.onCall(1).returns({a:1})

                        setJson({

                            "meshes": {
                                "geometry1": {
                                    "primitives": [
                                        {
                                            "attributes": getAttributeData(),
                                            "indices": getIndiceData(),
                                            "material": "mat1",
                                            "mode": 4
                                        }
                                    ]
                                },

                                "geometry2": {
                                    "primitives": [
                                        {
                                            "attributes": getAttributeData(),
                                            "indices": getIndiceData(),
                                            "material": "mat2",
                                            "mode": 4
                                        }
                                    ]
                                }
                            },
                            "nodes": {
                                "node_1": {
                                    "children": [
                                        "node_2"
                                    ],
                                    "name": "1",
                                    "mesh": "geometry1"
                                },
                                "node_2": {
                                    "children": [
                                    ],
                                    "name": "2",
                                    "mesh": "geometry2"
                                }
                            },


                            "materials": {
                                "mat1": {
                                    "name": "Red",
                                    "technique": "PHONG",
                                    values:{
                                        "diffuse": "texture1"
                                    }
                                },
                                "mat2": {
                                    "name": "Red",
                                    "technique": "PHONG",
                                    values:{
                                        "diffuse": "texture2"
                                    }
                                }
                            },

                            "textures": {
                                "texture1": {
                                    "format": 6408,
                                    "internalFormat": 6408,
                                    "sampler": "sampler_0",
                                    "source": "Image0001",
                                    "target": 3553,
                                    "type": 5121
                                },

                                "texture2": {
                                    "format": 6408,
                                    "internalFormat": 6408,
                                    "sampler": "sampler_1",
                                    "source": "Image0001",
                                    "target": 3553,
                                    "type": 5121
                                }
                            },
                            "images": {
                                "Image0001": {
                                    "name": "Image0001",
                                    "uri": "Cesium_Logo_Flat.png"
                                }
                            },
                            "samplers": {
                                "sampler_0": {
                                    "magFilter": 9729,
                                    "minFilter": 9987,
                                    "wrapS": 10497,
                                    "wrapT": 10497,

                                    "repeatRegion": [0, 0, 1, 1]
                                },
                                "sampler_1": {
                                    "magFilter": 9729,
                                    "minFilter": 9987,
                                    "wrapS": 10497,
                                    "wrapT": 10497,
                                    "repeatRegion": [0,0.1, 2,3]

                                }
                            }
                        })


                        var data = parser.parse(json, arrayBufferMap, imageMap);


                        var map1 = data.objects.getChild(0).components.getChild(0).material.diffuseMap;
                        var map2 = data.objects.getChild(0).children.getChild(0).components.getChild(0).material.diffuseMap;


                        expect(map1.glTexture === map2.glTexture).toBeTruthy();
                    });
                });
            });
        });

        // describe("parse light", function(){
        //     function getLight(data){
        //         return data.objects.getChild(0).components.getChild(0);
        //     }
        //
        //     function judgeLight(data, value){
        //         var i = null,
        //             light = getLight(data);
        //
        //         for(i in value){
        //             if(value.hasOwnProperty(i)){
        //                 expect(light[i]).toEqual(value[i]);
        //             }
        //         }
        //     }
        //     beforeEach(function(){
        //
        //     });
        //
        //     it("parse ambient light", function(){
        //         setJson({
        //             "extensions": {
        //                 "KHR_materials_common": {
        //                     "lights": {
        //                         "EnvironmentAmbientLight": {
        //                             "ambient": {
        //                                 "color": [
        //                                     0,
        //                                     0.1,
        //                                     0.2
        //                                 ]
        //                             },
        //                             "name": "EnvironmentAmbientLight",
        //                             "type": "ambient"
        //                         },
        //                     }
        //                 }
        //             },
        //             "extensionsUsed": [
        //                 "KHR_materials_common"
        //             ],
        //             "nodes": {
        //                 "node_1": {
        //                     "children": [
        //                     ],
        //                     "name": "1",
        // "mesh": "geometry1"
        //                     "extensions": {
        //                         "KHR_materials_common": {
        //                             "light": "EnvironmentAmbientLight"
        //                         }
        //                     },
        //                 }
        //             }
        //         })
        //
        //
        //
        //
        //         var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //         judgeLight(data, {
        //             type:"ambient",
        //             lightColor: createColor([0, 0.1, 0.2])
        //         })
        //     });
        //     it("parse direction light", function(){
        //         setJson({
        //             "extensions": {
        //                 "KHR_materials_common": {
        //                     "lights": {
        //                         "light1": {
        //                             "directional": {
        //                                 "color": [
        //                                     0,
        //                                     0.1,
        //                                     0.2
        //                                 ]
        //                             },
        //                             "name": "light1",
        //                             "type": "directional"
        //                         },
        //                     }
        //                 }
        //             },
        //             "extensionsUsed": [
        //                 "KHR_materials_common"
        //             ],
        //             "nodes": {
        //                 "node_1": {
        //                     "children": [
        //                     ],
        //                     "name": "1",
        // "mesh": "geometry1"
        //                     "extensions": {
        //                         "KHR_materials_common": {
        //                             "light": "light1"
        //                         }
        //                     },
        //                 }
        //             }
        //         })
        //
        //
        //
        //
        //         var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //         judgeLight(data, {
        //             type:"directional",
        //             lightColor: createColor([0, 0.1, 0.2])
        //         })
        //     });
        //     describe("parse point light", function(){
        //         it("test without distance", function(){
        //             setJson({
        //                 "extensions": {
        //                     "KHR_materials_common": {
        //                         "lights": {
        //                             "light1": {
        //                                 "name": "light1",
        //                                 "point": {
        //                                     "color": [
        //                                         0,
        //                                         0.1,
        //                                         0.2
        //                                     ],
        //                                     "constantAttenuation": 1,
        //                                     "linearAttenuation": 0.1,
        //                                     "quadraticAttenuation": 0.2
        //                                 },
        //                                 "type": "point"
        //                             }
        //                         }
        //                     }
        //                 },
        //                 "extensionsUsed": [
        //                     "KHR_materials_common"
        //                 ],
        //                 "nodes": {
        //                     "node_1": {
        //                         "children": [
        //                         ],
        //                         "name": "1",
        //                         "extensions": {
        //                             "KHR_materials_common": {
        //                                 "light": "light1"
        //                             }
        //                         },
        //                     }
        //                 }
        //             })
        //
        //
        //
        //
        //             var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //             judgeLight(data, {
        //                 type:"point",
        //                 lightColor: createColor([0, 0.1, 0.2]),
        //                 constantAttenuation:1,
        //                 linearAttenuation:0.1,
        //                 quadraticAttenuation:0.2
        //             })
        //         });
        //         it("test with distance", function(){
        //             setJson({
        //                 "extensions": {
        //                     "KHR_materials_common": {
        //                         "lights": {
        //                             "light1": {
        //                                 "name": "light1",
        //                                 "point": {
        //                                     "color": [
        //                                         0,
        //                                         0.1,
        //                                         0.2
        //                                     ],
        //                                     "constantAttenuation": 1,
        //                                     "linearAttenuation": 0.1,
        //                                     "quadraticAttenuation": 0.2,
        //                                     "distance": 10
        //                                 },
        //                                 "type": "point"
        //                             }
        //                         }
        //                     }
        //                 },
        //                 "extensionsUsed": [
        //                     "KHR_materials_common"
        //                 ],
        //                 "nodes": {
        //                     "node_1": {
        //                         "children": [
        //                         ],
        //                         "name": "1",
        //                         "extensions": {
        //                             "KHR_materials_common": {
        //                                 "light": "light1"
        //                             }
        //                         },
        //                     }
        //                 }
        //             })
        //
        //
        //
        //
        //             var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //             judgeLight(data, {
        //                 type:"point",
        //                 lightColor: createColor([0, 0.1, 0.2]),
        //                 constantAttenuation:1,
        //                 linearAttenuation:0.1,
        //                 quadraticAttenuation:0.2,
        //                 distance:10
        //             })
        //         });
        //     });
        // });
        //
        // describe("parse camera", function(){
        //     function getCamera(data) {
        //         return data.objects.getChild(0).components.getChild(0);
        //     }
        //
        //     beforeEach(function(){
        //
        //     });
        //
        //     describe("parse perspective camera", function(){
        //         it("test", function() {
        //             setJson({
        //                 "cameras": {
        //                     "Camera01-camera": {
        //                         "name": "Camera01",
        //                         "perspective": {
        //                             "yfov": 10,
        //                             "zfar": 255,
        //                             "aspectRatio": 1,
        //                             "znear": 0.1
        //                         },
        //                         "type": "perspective"
        //                     }
        //                 },
        //                 "nodes": {
        //                     "node_1": {
        //                         "children": [],
        //                         "name": "1",
        //                         "camera": "Camera01-camera",
        //                     }
        //                 }
        //             })
        //
        //
        //             var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //             var camera = getCamera(data).camera;
        //             expect(camera.near).toEqual(0.1);
        //             expect(camera.far).toEqual(255);
        //             expect(camera.fovy).toEqual(10);
        //             expect(camera.aspect).toEqual(1);
        //         });
        //         it("if no aspectRatio, compute it:canvas.width / canvas.height", function(){
        //             sandbox.stub(wd.DeviceManager.getInstance(), "view", {
        //                 width:100,
        //                 height:50
        //             });
        //             setJson({
        //                 "cameras": {
        //                     "Camera01-camera": {
        //                         "name": "Camera01",
        //                         "perspective": {
        //                             "yfov": 10,
        //                             "zfar": 255,
        //                             "znear": 0.1
        //                         },
        //                         "type": "perspective"
        //                     }
        //                 },
        //                 "nodes": {
        //                     "node_1": {
        //                         "children": [],
        //                         "name": "1",
        //                         "camera": "Camera01-camera",
        //                     }
        //                 }
        //             })
        //
        //
        //             var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //             var camera = getCamera(data).camera;
        //             expect(camera.aspect).toEqual(100/50);
        //         });
        //     });
        //
        //     it("parse orthographic camera", function() {
        //         setJson({
        //             "cameras": {
        //                 "Camera01-camera": {
        //                     "name": "Camera01",
        //                     "orthographic": {
        //                         "xmag": 10,
        //                         "ymag": 20,
        //                         "zfar": 255,
        //                         "znear": 0.1
        //                     },
        //                     "type": "orthographic"
        //                 }
        //             },
        //             "nodes": {
        //                 "node_1": {
        //                     "children": [],
        //                     "name": "1",
        //                     "camera": "Camera01-camera",
        //                 }
        //             }
        //         })
        //
        //
        //         var data = parser.parse(json, arrayBufferMap, imageMap);
        //
        //
        //         var camera = getCamera(data).camera;
        //         expect(camera.near).toEqual(0.1);
        //         expect(camera.far).toEqual(255);
        //         expect(camera.left).toEqual(-10);
        //         expect(camera.right).toEqual(10);
        //         expect(camera.top).toEqual(20);
        //         expect(camera.bottom).toEqual(-20);
        //     });
        // });

        describe("parse transform", function(){
            function getTransform(data){
                return data.objects.getChild(0).components.getChild(0);
            }

            beforeEach(function(){
            });

            it("if node define matrix", function(){
                var matrix = [
                                -3.17587e-008,
                                0.0739029,
                                5.45614e-009,
                                0,
                                -8.90597e-009,
                                4.72178e-009,
                                -0.0739029,
                                0,
                                -0.0739029,
                                1.14182e-008,
                                1.27195e-009,
                                0,
                                -0.0259341,
                                -0.0210049,
                                0.136316,
                                1
                            ];

                setJson({
                    "nodes": {
                        "node_1": {
                            "children": [],
                            "name": "1",
                            "matrix": matrix
                        }
                    }
                })


                var data = parser.parse(json, arrayBufferMap, imageMap);

                expect(testTool.getValues(
                    getTransform(data).matrix.values
                )).toEqual(testTool.getValues(matrix));
            });
            it("if node define translation,rotation,scale", function(){
                var translation = [
                        18.9199,
                        22.7283,
                        0.484955
                    ],
                    rotation = [
                        -0.253652,
                        0.642284,
                        0.343852,
                        0.636316
                    ],
                    scale = [
                        1,
                        1,
                        1
                    ];

                setJson({
                    "nodes": {
                        "node_1": {
                            "children": [],
                            "name": "1",
                            "rotation": rotation,
                            "scale": scale,
                            "translation": translation
                        }
                    }
                })


                var data = parser.parse(json, arrayBufferMap, imageMap);


                var tran = getTransform(data);
                expect(testTool.getValues(
                    tran.position, 1
                )).toEqual(
                    testTool.getValues(
                        translation, 1
                    )
                )
                expect(testTool.getValues(
                    [tran.rotation.x,tran.rotation.y,tran.rotation.z,tran.rotation.w], 1
                )).toEqual(
                    testTool.getValues(
                        rotation, 1
                    )
                )
                expect(testTool.getValues(
                    tran.scale, 1
                )).toEqual(
                    testTool.getValues(
                        scale, 1
                    )
                )
            });
        });

        it("parse children", function(){
            setJson({
                "materials": {
                    "mat1": {
                        "name": "Red",
                        "technique": "PHONG"
                    },
                    "mat2": {
                        "name": "Blue",
                        "technique": "PHONG"
                    }
                },
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            {
                                "attributes": getAttributeData(),
                                "material": "mat1",
                                "mode": 0
                            }
                        ]
                    },
                    "geometry2": {
                        "primitives": [
                            {
                                "attributes": getAttributeData(),
                                "indices": getIndiceData(),
                                "material": "mat2",
                                "mode": 4
                            }
                        ]
                    }
                },
                "nodes": {
                    "node_1": {
                        "children": [
                            "node_11"
                        ],
                        "name": "1",
                        "mesh": "geometry1"
                    },
                    "node_11": {
                        "children": [
                        ],
                        "name": "11",
                        "mesh": "geometry2"
                    }
                }
            })


            var data = parser.parse(json, arrayBufferMap, imageMap);





            expect(data.objects.getCount()).toEqual(1);
            var object1 = data.objects.getChild(0);
            var object2 = object1.children.getChild(0);

            var geo1 = object1.components.getChild(0);
            var geo2 = object2.components.getChild(0);

            expect(object1.name).toEqual("1");
            expect(object2.name).toEqual("11");

            expect(geo1).toBeDefined();
            expect(geo2).toBeDefined();
        });
    });
});

