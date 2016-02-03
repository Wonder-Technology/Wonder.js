describe("GLTFParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;

    function setJson(data) {
        testTool.extend(json, data);
    }
    //
    //function setObject(data) {
    //    json.objects.push(data);
    //}

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new wd.GLTFParser();

        json = {
            scenes: {
            }
            //materials: {},
            //objects: []
        }

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("parse metadata", function(){
        beforeEach(function(){
            
        });
        
        it("if json.asset not exist, not parse", function(){
            var data = parser.parse(json);

            expect(data.metadata).toBeUndefined();
        });

        describe("else", function(){
            it("parse version,genertor,premultipliedAlpha, profile data", function(){
                setJson({
                    asset:{
                     "generator": "collada2gltf@ceec062e3d5793f2f249f53cbd843aee382ad40b",
                    "premultipliedAlpha": true,
                    "profile": {
                        "api": "WebGL",
                        "version": "1.0.2"
                    },
                    "version": 1
                    }
                })

                var data = parser.parse(json);

                expect(data.metadata).toEqual(json.asset);
            });
        });
    });

    describe("parse objects", function(){
        var vertices,texCoords,indices;

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
                        "byteLength": 840,
                        "type": "arraybuffer",
                        //"uri": "box.bin"
                        "uri": "data:application/octet-stream;base64,AAABAAIAAwACAAEABAAFAAYABwAGAAUACAAJAAoACwAKAAkADAANAA4ADwAOAA0AEAARABIAEwASABEAFAAVABYAFwAWABUAAAAAvwAAAL8AAAA/AAAAPwAAAL8AAAA/AAAAvwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAL8AAAA/AAAAvwAAAL8AAAA/AAAAPwAAAL8AAAC/AAAAvwAAAL8AAAC/AAAAPwAAAD8AAAA/AAAAPwAAAL8AAAA/AAAAPwAAAD8AAAC/AAAAPwAAAL8AAAC/AAAAvwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAvwAAAD8AAAC/AAAAPwAAAD8AAAC/AAAAvwAAAL8AAAA/AAAAvwAAAD8AAAA/AAAAvwAAAL8AAAC/AAAAvwAAAD8AAAC/AAAAvwAAAL8AAAC/AAAAvwAAAD8AAAC/AAAAPwAAAL8AAAC/AAAAPwAAAD8AAAC/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPgAAAAAAAIA+oKqqPgAAAD8AAAAAAAAAP6Cqqj4AAIA+oKqqPgAAAACgqqo+AACAPrCqKj8AAAAAsKoqPwAAAD+gqqo+AACAPqCqqj4AAAA/sKoqPwAAgD6wqio/AABAP6Cqqj4AAAA/oKqqPgAAQD+wqio/AAAAP7CqKj8AAIA/oKqqPgAAQD+gqqo+AACAP7CqKj8AAEA/sKoqPwAAgD4AAIA/AAAAPwAAgD8AAIA+sKoqPwAAAD+wqio/"
                    }
                },
                "bufferViews": {
                    "bufferView_1": {
                        "buffer": "box",
                        "byteLength": 72,
                        "byteOffset": 0,
                        "target": 34963
                    },
                    "bufferView_2": {
                        "buffer": "box",
                        "byteLength": 768,
                        "byteOffset": 72,
                        "target": 34962
                    }
                },
                "accessors": {
                    "accessor_1": {
                        "bufferView": "bufferView_1",
                        "byteOffset": 0,
                        "byteStride": 0,
                        "componentType": 5123,
                        "count": 36,
                        "type": "SCALAR"
                    },
                    "accessor_2": {
                        "bufferView": "bufferView_2",
                        "byteOffset": 0,
                        "byteStride": 12,
                        "componentType": 5126,
                        "count": 24,
                        "max": [
                            0.5,
                            0.5,
                            0.5
                        ],
                        "min": [
                            -0.5,
                            -0.5,
                            -0.5
                        ],
                        "type": "VEC3"
                    },
                    "accessor_3": {
                        "bufferView": "bufferView_2",
                        "byteOffset": 288,
                        "byteStride": 12,
                        "componentType": 5126,
                        "count": 24,
                        "max": [
                            1,
                            1,
                            1
                        ],
                        "min": [
                            -1,
                            -1,
                            -1
                        ],
                        "type": "VEC3"
                    },
                    "accessor_4": {
                        "bufferView": "bufferView_2",
                        "byteOffset": 576,
                        "byteStride": 8,
                        "componentType": 5126,
                        "count": 24,
                        "max": [
                            1,
                            1
                        ],
                        "min": [
                            0,
                            0
                        ],
                        "type": "VEC2"
                    }
                },
                "materials": {
                    "Effect-Red": {
                        "name": "Red"
                        //"technique": "technique0",
                        //"values": {
                        //    "diffuse": [
                        //        0.8,
                        //        0,
                        //        0,
                        //        1
                        //    ],
                        //    "shininess": 256,
                        //    "specular": [
                        //        0.2,
                        //        0.2,
                        //        0.2,
                        //        1
                        //    ]
                        //}
                    }
                }
            })

            sandbox.stub(parser._arrayBufferMap, "getChild").returns(parser._decodeArrayBuffer(json.buffers.box.uri));

            vertices =[ -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5 ];

            texCoords =[ 0.25, 1, 0.25, 0.6666669845581055, 0.5, 1, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0, 0.6666669845581055, 0.25, 0.33333301544189453, 0, 0.33333301544189453, 0.5, 0.6666669845581055, 0.25, 0.6666669845581055, 0.5, 0.33333301544189453, 0.25, 0.33333301544189453, 0.75, 0.6666669845581055, 0.5, 0.6666669845581055, 0.75, 0.33333301544189453, 0.5, 0.33333301544189453, 1, 0.6666669845581055, 0.75, 0.6666669845581055, 1, 0.33333301544189453, 0.75, 0.33333301544189453, 0.25, 0, 0.5, 0, 0.25, 0.33333301544189453, 0.5, 0.33333301544189453 ];
            indices =[ 0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5, 8, 9, 10, 11, 10, 9, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23, 22, 21 ];
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

            var data = parser.parse(json);

            expect(data.objects.getCount()).toEqual(2);
            var object1 = data.objects.getChild(0);
            var object2 = data.objects.getChild(1);
            expect(object1.name).toEqual("2");
            expect(object2.name).toEqual("3");
        });

        describe("parse Geometry", function(){
            it("if node->meshes.length > 1, warn only use the first mesh", function(){
                function isGeometry1(geometryData){
                    return geometryData.faces.length > 0;
                }
                sandbox.stub(wd.Log, "warn");
                setJson({
                    "meshes": {
                        "geometry1": {
                            //"name": "geo1",
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_3",
                                        "POSITION": "accessor_2",
                                        "TEXCOORD_0": "accessor_4"
                                    },
                                    "indices": "accessor_1",
                                    "material": "Effect-Red",
                                    "mode": 4
                                }
                            ]
                        },
                        "geometry2": {
                            //"name": "geo2",
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_3",
                                        "POSITION": "accessor_2",
                                        "TEXCOORD_0": "accessor_4"
                                    },
                                    //"indices": "accessor_1",
                                    "material": "Effect-Red",
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
                            "meshes": [
                                "geometry1",
                                "geometry2"
                            ]
                        }
                    }
                })




                var data = parser.parse(json);




                expect(wd.Log.warn).toCalledOnce();

                expect(data.objects.getCount()).toEqual(1);
                var components = data.objects.getChild(0).components;
                expect(components.getCount()).toEqual(1);
                expect(isGeometry1(components.getChild(0))).toBeTruthy();
            });
            it("if mesh->primitives has multi ones, the primitives should be children of the node(one primitive is one child)", function(){
                setJson({
                    "meshes": {
                        "geometry1": {
                            //"name": "geo1",
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_3",
                                        "POSITION": "accessor_2",
                                        "TEXCOORD_0": "accessor_4"
                                    },
                                    "indices": "accessor_1",
                                    "material": "mat1",
                                    "mode": 4
                                },
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_4",
                                        "POSITION": "accessor_1",
                                        "TEXCOORD_0": "accessor_2"
                                    },
                                    "indices": "accessor_3",
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
                            "meshes": [
                                "geometry1"
                            ]
                        }
                    }
                })


                var data = parser.parse(json);





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
                                    "attributes": {
                                        "NORMAL": "accessor_3",
                                        "POSITION": "accessor_2",
                                        "TEXCOORD_0": "accessor_4"
                                    },
                                    "indices": "accessor_1",
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
                            "meshes": [
                                "geometry1"
                            ]
                        }
                    }
                })


                var data = parser.parse(json);





                expect(data.objects.getCount()).toEqual(1);
                var object = data.objects.getChild(0);

                var geo = object.components.getChild(0);
                expect(geo.vertices).toEqual(
                    vertices
                );
                expect(geo.texCoords).toEqual(
                    texCoords
                );
                expect(geo.colors).toBeUndefined();
                geometryTool.judgeFaceIndices(geo.faces, indices);
                expect(geo.drawMode).toEqual(wd.DrawMode.TRIANGLES);


                //expect(object1.children.getChild(0).name).toEqual("mat1");
                //expect(object1.children.getChild(1).name).toEqual("mat2");
            });
            it("test without indices", function(){
                setJson({
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_3",
                                        "POSITION": "accessor_2",
                                        "TEXCOORD_0": "accessor_4"
                                    },
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
                            "meshes": [
                                "geometry1"
                            ]
                        }
                    }
                })


                var data = parser.parse(json);





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
                expect(geo.drawMode).toEqual(wd.DrawMode.LINE_STRIP);
            });

            //todo
            describe("parse material", function(){
                beforeEach(function(){

                });

                it("", function(){

                });
            });
        });

        it("parse children", function(){
            setJson({
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            {
                                "attributes": {
                                    "NORMAL": "accessor_3",
                                    "POSITION": "accessor_2",
                                    "TEXCOORD_0": "accessor_4"
                                },
                                "material": "mat1",
                                "mode": 0
                            }
                        ]
                    },
                    "geometry2": {
                        "primitives": [
                            {
                                "attributes": {
                                    "NORMAL": "accessor_3",
                                    "POSITION": "accessor_2",
                                    "TEXCOORD_0": "accessor_4"
                                },
                                "indices": "accessor_1",
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
                        "meshes": [
                            "geometry1"
                        ]
                    },
                    "node_11": {
                        "children": [
                        ],
                        "name": "11",
                        "meshes": [
                            "geometry2"
                        ]
                    }
                }
            })


            var data = parser.parse(json);





            expect(data.objects.getCount()).toEqual(2);
            var object1 = data.objects.getChild(0);
            var object2 = data.objects.getChild(1);

            var geo1 = object1.components.getChild(0);
            var geo2 = object2.components.getChild(0);

            expect(object1.name).toEqual("1");
            expect(object2.name).toEqual("11");

            expect(geo1).toBeDefined();
            expect(geo2).toBeDefined();
        });
    });
});

