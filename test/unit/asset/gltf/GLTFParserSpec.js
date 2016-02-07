describe("GLTFParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.GLTFUtils;
    var arrayBufferMap;
    var imageMap;

    function setJson(data) {
        testTool.extend(json, data);
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
        parser = new wd.GLTFParser();



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
    
    describe("parse metadata", function(){
        beforeEach(function(){
            
        });
        
        it("if json.asset not exist, not parse", function(){
            var data = parser.parse(json, arrayBufferMap, imageMap);

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

                var data = parser.parse(json, arrayBufferMap, imageMap);

                expect(data.metadata).toEqual(json.asset);
            });
        });
    });

    describe("parse objects", function(){
        var vertices,texCoords,indices;

        function judgeGeometryDataEqual(source, target, size){
            var sourceData = [];

            for(var i = 0, len = source.length; i < len; i++){
                sourceData.push(source[i]);
            }

            expect(sourceData).toEqual(target);
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
                    }
                }
            })

            sandbox.stub(arrayBufferMap, "getChild").returns(Utils.decodeArrayBuffer(json.buffers.box.uri));

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

            var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());

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




                var data = parser.parse(json, arrayBufferMap, wdCb.Hash.create());




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
                expect(geo.drawMode).toEqual(wd.DrawMode.LINE_STRIP);
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
                });

                it("if no KHR_materials_common extension found, will use default material instead and log info", function(){
                    sandbox.stub(wd.Log, "log");
                    setJson({
                        "materials": {
                            "Effect-Red": {
                                "name": "Red"
                            }
                        }
                    })


                    var data = parser.parse(json, arrayBufferMap, imageMap);

                    expect(wd.Log.log).toCalledOnce();
                    judgeMaterial(data, {
                        type:"BasicMaterial",

                        doubleSided:false
                    });
                });

                describe("else, parse KHR_materials_common extension", function(){
                    beforeEach(function(){
                        setJson({
                            "extensionsUsed": [
                                "KHR_materials_common"
                            ]
                        })
                    });

                    describe("parse technique", function(){
                        function judge(dataFunc){
                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "extensions": {
                                            "KHR_materials_common": {
                                                "technique": "PHONG"
                                            }
                                        }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("PHONG"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "extensions": {
                                            "KHR_materials_common": {
                                                "technique": "BLINN"
                                            }
                                        }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("BLINN"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "extensions": {
                                            "KHR_materials_common": {
                                                "technique": "LAMBERT"
                                            }
                                        }
                                    }
                                }
                            })


                            judgeMaterial(parser.parse(json, arrayBufferMap, imageMap), dataFunc("LAMBERT"));




                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "extensions": {
                                            "KHR_materials_common": {
                                                "technique": "CONSTANT"
                                            }
                                        }
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
                                    "extensions": {
                                        "KHR_materials_common": {
                                            "doubleSided": false,
                                            "transparent": true,
                                            "transparency": 0.2,
                                            "technique": "PHONG"
                                        }
                                    }
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
                                            "extensions": {
                                                "KHR_materials_common": {
                                                    "technique": "PHONG",
                                                    values:{}
                                                }
                                            }
                                        }
                                    }
                                })

                                var colorData = [
                                        0,
                                        0,
                                        0,
                                        1
                                    ];

                                json.materials.mat1.extensions.KHR_materials_common.values[name] = colorData;


                                var data = parser.parse(json, arrayBufferMap, imageMap);

                                var judgeData = {};
                                judgeData[name + "Color"] = createColor([0,0,0,1]);
                                judgeMaterial(data, judgeData);
                            });

                            describe("else", function(){
                                it("if " + name + " type is 35666, parse " + name + " color", function(){
                                    setJson({
                                        "materials": {
                                            "mat1": {
                                                "name": "Red",
                                                "extensions": {
                                                    "KHR_materials_common": {
                                                        "technique": "PHONG",
                                                        values:{

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    })

                                    var colorData = {
                                        "type": 35666,
                                        "value": [
                                            0,
                                            0,
                                            0,
                                            1
                                        ]
                                    };

                                    json.materials.mat1.extensions.KHR_materials_common.values[name] = colorData;


                                    var data = parser.parse(json, arrayBufferMap, imageMap);

                                    var judgeData = {};
                                    judgeData[name + "Color"] = createColor([0,0,0,1]);
                                    judgeMaterial(data, judgeData);
                                });


                                describe("else if " + name + " type is 35678, parse " + name + " map", function(){
                                    it("", function () {
                                        setJson({
                                            "materials": {
                                                "mat1": {
                                                    "name": "Red",
                                                    "extensions": {
                                                        "KHR_materials_common": {
                                                            "technique": "PHONG",
                                                            values:{
                                                            }
                                                        }
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
                                                    "magFilter": 9729,
                                                    "minFilter": 9987,
                                                    "wrapS": 10497,
                                                    "wrapT": 10497
                                                }
                                            }
                                        })


                                        var colorData = {
                                            "type": 35678,
                                            "value": "texture_Image0001"
                                        };
                                        json.materials.mat1.extensions.KHR_materials_common.values[name] = colorData;






                                        var data = parser.parse(json, arrayBufferMap, imageMap);

                                        var mat = getMaterial(data);
                                        var map = mat[name + "Map"];

                                        expect(map).toBeInstanceOf(wd.ImageTexture);
                                        expect(map.source).toEqual(image);
                                        expect(map.format).toEqual(wd.TextureFormat.RGBA);
                                        expect(map.type).toEqual(wd.TextureType.UNSIGNED_BYTE);
                                        expect(map.minFilter).toEqual(wd.TextureFilterMode.LINEAR_MIPMAP_LINEAR);
                                        expect(map.magFilter).toEqual(wd.TextureFilterMode.LINEAR);
                                        expect(map.wrapS).toEqual(wd.TextureWrapMode.REPEAT);
                                        expect(map.wrapT).toEqual(wd.TextureWrapMode.REPEAT);
                                    });
                                });
                            });
                        };

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

                        it("parse shininess", function(){
                            setJson({
                                "materials": {
                                    "mat1": {
                                        "name": "Red",
                                        "extensions": {
                                            "KHR_materials_common": {
                                                "technique": "BLINN",
                                                values:{
                                                    "shininess": {
                                                        "type": 5126,
                                                        "value": 256
                                                    }
                                                }
                                            }
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
        });

        describe("parse light", function(){
            function getLight(data){
                return data.objects.getChild(0).components.getChild(0);
            }

            function judgeLight(data, value){
                var i = null,
                    light = getLight(data);

                for(i in value){
                    if(value.hasOwnProperty(i)){
                        expect(light[i]).toEqual(value[i]);
                    }
                }
            }
            beforeEach(function(){

            });

            it("parse ambient light", function(){
                setJson({
                    "extensions": {
                        "KHR_materials_common": {
                            "lights": {
                                "EnvironmentAmbientLight": {
                                    "ambient": {
                                        "color": [
                                            0,
                                            0.1,
                                            0.2
                                        ]
                                    },
                                    "name": "EnvironmentAmbientLight",
                                    "type": "ambient"
                                },
                            }
                        }
                    },
                    "extensionsUsed": [
                        "KHR_materials_common"
                    ],
                    "nodes": {
                        "node_1": {
                            "children": [
                            ],
                            "name": "1",
                            //"meshes": [
                            //    "geometry1"
                            //]
                            "extensions": {
                                "KHR_materials_common": {
                                    "light": "EnvironmentAmbientLight"
                                }
                            },
                        }
                    }
                })




                var data = parser.parse(json, arrayBufferMap, imageMap);


                judgeLight(data, {
                    type:"ambient",
                    lightColor: createColor([0, 0.1, 0.2])
                })
            });
            it("parse direction light", function(){
                setJson({
                    "extensions": {
                        "KHR_materials_common": {
                            "lights": {
                                "light1": {
                                    "directional": {
                                        "color": [
                                            0,
                                            0.1,
                                            0.2
                                        ]
                                    },
                                    "name": "light1",
                                    "type": "directional"
                                },
                            }
                        }
                    },
                    "extensionsUsed": [
                        "KHR_materials_common"
                    ],
                    "nodes": {
                        "node_1": {
                            "children": [
                            ],
                            "name": "1",
                            //"meshes": [
                            //    "geometry1"
                            //]
                            "extensions": {
                                "KHR_materials_common": {
                                    "light": "light1"
                                }
                            },
                        }
                    }
                })




                var data = parser.parse(json, arrayBufferMap, imageMap);


                judgeLight(data, {
                    type:"directional",
                    lightColor: createColor([0, 0.1, 0.2])
                })
            });
            describe("parse point light", function(){
                it("test without distance", function(){
                    setJson({
                        "extensions": {
                            "KHR_materials_common": {
                                "lights": {
                                    "light1": {
                                        "name": "light1",
                                        "point": {
                                            "color": [
                                                0,
                                                0.1,
                                                0.2
                                            ],
                                            "constantAttenuation": 1,
                                            "linearAttenuation": 0.1,
                                            "quadraticAttenuation": 0.2
                                        },
                                        "type": "point"
                                    }
                                }
                            }
                        },
                        "extensionsUsed": [
                            "KHR_materials_common"
                        ],
                        "nodes": {
                            "node_1": {
                                "children": [
                                ],
                                "name": "1",
                                "extensions": {
                                    "KHR_materials_common": {
                                        "light": "light1"
                                    }
                                },
                            }
                        }
                    })




                    var data = parser.parse(json, arrayBufferMap, imageMap);


                    judgeLight(data, {
                        type:"point",
                        lightColor: createColor([0, 0.1, 0.2]),
                        constantAttenuation:1,
                        linearAttenuation:0.1,
                        quadraticAttenuation:0.2
                    })
                });
                it("test with distance", function(){
                    setJson({
                        "extensions": {
                            "KHR_materials_common": {
                                "lights": {
                                    "light1": {
                                        "name": "light1",
                                        "point": {
                                            "color": [
                                                0,
                                                0.1,
                                                0.2
                                            ],
                                            "constantAttenuation": 1,
                                            "linearAttenuation": 0.1,
                                            "quadraticAttenuation": 0.2,
                                            "distance": 10
                                        },
                                        "type": "point"
                                    }
                                }
                            }
                        },
                        "extensionsUsed": [
                            "KHR_materials_common"
                        ],
                        "nodes": {
                            "node_1": {
                                "children": [
                                ],
                                "name": "1",
                                "extensions": {
                                    "KHR_materials_common": {
                                        "light": "light1"
                                    }
                                },
                            }
                        }
                    })




                    var data = parser.parse(json, arrayBufferMap, imageMap);


                    judgeLight(data, {
                        type:"point",
                        lightColor: createColor([0, 0.1, 0.2]),
                        constantAttenuation:1,
                        linearAttenuation:0.1,
                        quadraticAttenuation:0.2,
                        distance:10
                    })
                });
            });
        });

        describe("parse camera", function(){
            function getCamera(data) {
                return data.objects.getChild(0).components.getChild(0);
            }

            beforeEach(function(){

            });

            describe("parse perspective camera", function(){
                it("test", function() {
                    setJson({
                        "cameras": {
                            "Camera01-camera": {
                                "name": "Camera01",
                                "perspective": {
                                    "yfov": 10,
                                    "zfar": 255,
                                    "aspectRatio": 1,
                                    "znear": 0.1
                                },
                                "type": "perspective"
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [],
                                "name": "1",
                                "camera": "Camera01-camera",
                            }
                        }
                    })


                    var data = parser.parse(json, arrayBufferMap, imageMap);


                    var camera = getCamera(data).camera;
                    expect(camera.near).toEqual(0.1);
                    expect(camera.far).toEqual(255);
                    expect(camera.fovy).toEqual(10);
                    expect(camera.aspect).toEqual(1);
                });
                it("if no aspectRatio, compute it:canvas.width / canvas.height", function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        width:100,
                        height:50
                    });
                    setJson({
                        "cameras": {
                            "Camera01-camera": {
                                "name": "Camera01",
                                "perspective": {
                                    "yfov": 10,
                                    "zfar": 255,
                                    "znear": 0.1
                                },
                                "type": "perspective"
                            }
                        },
                        "nodes": {
                            "node_1": {
                                "children": [],
                                "name": "1",
                                "camera": "Camera01-camera",
                            }
                        }
                    })


                    var data = parser.parse(json, arrayBufferMap, imageMap);


                    var camera = getCamera(data).camera;
                    expect(camera.aspect).toEqual(100/50);
                });
            });

            it("parse orthographic camera", function() {
                setJson({
                    "cameras": {
                        "Camera01-camera": {
                            "name": "Camera01",
                            "orthographic": {
                                "xmag": 10,
                                "ymag": 20,
                                "zfar": 255,
                                "znear": 0.1
                            },
                            "type": "orthographic"
                        }
                    },
                    "nodes": {
                        "node_1": {
                            "children": [],
                            "name": "1",
                            "camera": "Camera01-camera",
                        }
                    }
                })


                var data = parser.parse(json, arrayBufferMap, imageMap);


                var camera = getCamera(data).camera;
                expect(camera.near).toEqual(0.1);
                expect(camera.far).toEqual(255);
                expect(camera.left).toEqual(-10);
                expect(camera.right).toEqual(10);
                expect(camera.top).toEqual(20);
                expect(camera.bottom).toEqual(-20);
            });
        });

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

