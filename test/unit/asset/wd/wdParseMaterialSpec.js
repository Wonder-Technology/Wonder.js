describe("parse wd material", function() {
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    var vertices, texCoords, indices;

    function getMaterial(data) {
        var geo = data.objects.getChild(0).components.getChild(0);

        return geo.material;
    }

    function judgeMaterial(data, value) {
        var i = null,
            mat = getMaterial(data);

        for (i in value) {
            if (value.hasOwnProperty(i)) {
                expect(mat[i]).toEqual(value[i]);
            }
        }
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new wd.WDParser();


        arrayBufferMap = wdCb.Hash.create();
        imageMap = wdCb.Hash.create();

        json = {
            scenes: {}
        }

        testTool.openContractCheck(sandbox);


        var data = wdTool.prepare(sandbox, json, arrayBufferMap);

        vertices = data[0];
        texCoords = data[1];
        indices = data[2];


        wdTool.setJson(json, {
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
    afterEach(function () {
        sandbox.restore();
    });

    it("if no material data, get default material data", function () {
        wdTool.setJson(json, {
            "meshes": {
                "geometry1": {
                    "primitives": [
                        {
                            "attributes": wdTool.getAttributeData(),
                            "indices": wdTool.getIndiceData(),
                            // "material": "mat1",
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
        })


        var data = parser.parse(json, arrayBufferMap, imageMap);


        var material = getMaterial(data);

        expect(material.type).toEqual("LightMaterial");
        expect(material.lightModel).toEqual(wd.ELightModel.PHONG);
    });

    // it("if no KHR_materials_common extension found, will use default material instead and log info", function(){
    //     sandbox.stub(wd.Log, "log");
    //     wdTool.setJson(json, {
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
    //         wdTool.setJson(json, {
    //             "extensionsUsed": [
    //                 "KHR_materials_common"
    //             ]
    //         })
    //     });

    describe("else", function () {
        beforeEach(function () {
            wdTool.setJson(json, {
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            {
                                "attributes": wdTool.getAttributeData(),
                                "indices": wdTool.getIndiceData(),
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

        describe("parse technique", function () {
            function judge(dataFunc) {
                wdTool.setJson(json, {
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


                wdTool.setJson(json, {
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


                wdTool.setJson(json, {
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


                wdTool.setJson(json, {
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

            beforeEach(function () {
            });

            it("material type should always be LightMaterial", function () {
                judge(function () {
                    return {
                        type: "LightMaterial"
                    }
                });
            });
            it("get lightModel", function () {
                judge(function (technique) {
                    return {
                        lightModel: technique
                    }
                });
            });
        });
        it("parse doubledSided,transparent,transparency", function () {

            wdTool.setJson(json, {
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
                doubleSided: false,
                transparent: true,
                opacity: 0.2
            });
        });

        describe("parse values", function () {
            var image;

            function judgeLightColor(name) {
                it("if " + name + " is array, parse " + name + " color", function () {
                    wdTool.setJson(json, {
                        "materials": {
                            "mat1": {
                                "name": "Red",
                                "technique": "PHONG",
                                values: {}
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
                    judgeData[name + "Color"] = wdTool.createColor([0, 0, 0, 1]);
                    judgeMaterial(data, judgeData);
                });

                judgeLightMap(name);
            }

            function judgeLightMap(name, valueName) {
                if (!valueName) {
                    valueName = name;
                }

                it("parse " + name + " map", function () {
                    wdTool.setJson(json, {
                        "materials": {
                            "mat1": {
                                "name": "Red",
                                "technique": "PHONG",
                                values: {}
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
                                "isPremultipliedAlpha": true,
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
                    expect(map.isPremultipliedAlpha).toBeTruthy();
                });
            }

            beforeEach(function () {
                image = {};
                sandbox.stub(imageMap, "getChild").returns(image);
                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
            });

            describe("parse diffuse", function () {
                judgeLightColor("diffuse");
            });

            describe("parse specular", function () {
                judgeLightColor("specular");
            });

            describe("parse emission", function () {
                judgeLightColor("emission");
            });

            describe("parse lightMap", function () {
                judgeLightMap("light", "lightMap");
            });

            describe("parse normalMap", function () {
                judgeLightMap("normal", "normalMap");
            });


            it("parse shininess", function () {
                wdTool.setJson(json, {
                    "materials": {
                        "mat1": {
                            "name": "Red",
                            "technique": "BLINN",
                            values: {
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

