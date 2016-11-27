describe("WDParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;
    // var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

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
    //             wdTool.setJson(json, {
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
        // var vertices,texCoords,indices;

        beforeEach(function(){
            var data = wdTool.prepare(sandbox, json, arrayBufferMap);

            // vertices = data[0];
            // texCoords = data[1];
            // indices = data[2];
        });

        it("parse current scene->nodes", function(){
            wdTool.setJson(json, {
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
            wdTool.setJson(json, {
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
                wdTool.setJson(json, {
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
                wdTool.setJson(json, {
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

        it("parse children", function(){
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
                },
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            {
                                "attributes": wdTool.getAttributeData(),
                                "material": "mat1",
                                "mode": 0
                            }
                        ]
                    },
                    "geometry2": {
                        "primitives": [
                            {
                                "attributes": wdTool.getAttributeData(),
                                "indices": wdTool.getIndiceData(),
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

