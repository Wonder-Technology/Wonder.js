describe("parse wd Geometry", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    var vertices,texCoords,indices;

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

    it("if mesh->primitives has multi ones, the primitives should be children of the node(one primitive is one child)", function(){
        wdTool.setJson(json, {
            "meshes": {
                "geometry1": {
                    //"name": "geo1",
                    "primitives": [
                        {
                            "attributes": wdTool.getAttributeData(),
                            "indices": wdTool.getIndiceData(),
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

        wdTool.judgeGeometryDataEqual(vertices, geo.vertices, 3);
        expect(geo.vertices).toEqual(
           vertices
        );
        expect(geo.texCoords).toEqual(
           texCoords
        );
        expect(geo.colors).toBeUndefined();
        geometryTool.judgeFaceIndices(geo.faces, indices);
        // expect(geo.drawMode).toEqual(wd.EDrawMode.TRIANGLES);


        //expect(object1.children.getChild(0).name).toEqual("mat1");
        //expect(object1.children.getChild(1).name).toEqual("mat2");
    });
    it("test without indices", function(){
        wdTool.setJson(json, {
            "meshes": {
                "geometry1": {
                    "primitives": [
                        {
                            "attributes": wdTool.getAttributeData(),
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

    describe("test special cases", function(){
        beforeEach(function(){

        });

        describe("if .wd file is generated by gltf converter", function(){
            function normalizeTexCoords(texCoords){
                if (!texCoords) {
                    return;
                }

                for (var i = 0, len = texCoords.length / 2; i < len; i++) {
                    texCoords[i * 2 + 1] = 1.0 - texCoords[i * 2 + 1];
                }

                return texCoords;
            }

            beforeEach(function(){
            });

            it("normalize texCoord data", function(){
                wdTool.setJson(json, {
                    "asset": {
                        "generator": "WonderJsGLTFToWDConverter"
                    },
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                {
                                    "attributes": wdTool.getAttributeData(),
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





                var object = data.objects.getChild(0);

                var geo = object.components.getChild(0);

                expect(geo.texCoords).toEqual(
                    normalizeTexCoords(texCoords)
                );
            });
        });
    });
});
