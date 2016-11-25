describe("parse wd morph targets", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    var vertices,texCoords,indices;

    var morphTargets;

    function judgeMorphDataEqual(animName, sourceMorphVertices, targetMorphVertices, targetMorphNormals){
        sourceMorphVertices.forEach(function(sourceFrame, index){
            var targetFrameVertices = targetMorphVertices.getChild(animName).getChild(index),
                targetFrameNormals = null;

            expect(sourceFrame.vertices).toEqual(targetFrameVertices);


            if(!!sourceFrame.normals && !!targetFrameNormals){
                targetFrameNormals = targetMorphNormals.getChild(animName).getChild(index);

                expect(sourceFrame.normals).toEqual(targetFrameNormals);
            }
        });
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


        wdTool.setJson(json, {
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
                            "attributes": wdTool.getAttributeData(),
                            "morphTargets": [
                                {name:"frame0", vertices:"accessor_3", normals:"accessor_4"}
                            ],
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
    afterEach(function () {
        sandbox.restore();
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

        sandbox.stub(arrayBufferMap, "getChild").returns(wdTool.buildArrayBuffer(vertices, texCoords, indices, morphTargets));

        wdTool.setJson(json, {
            "meshes": {
                "geometry1": {
                    "primitives": [
                        {
                            "attributes": wdTool.getAttributeData(),
                            "morphTargets": [
                                {name:"anim0", vertices:"accessor_3"},

                                {name:"anim1", vertices:"accessor_4"}
                            ],
                            "indices": wdTool.getIndiceData(),
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

        judgeMorphDataEqual("anim", morphTargets, geo.morphVertices, geo.morphNormals);

        wdTool.judgeGeometryDataEqual(vertices, geo.vertices, 3);

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

        sandbox.stub(arrayBufferMap, "getChild").returns(wdTool.buildArrayBuffer(vertices, texCoords, indices, morphTargets));



        wdTool.setJson(json, {
            "meshes": {
                "geometry1": {
                    "primitives": [
                        {
                            "attributes": wdTool.getAttributeData(),
                            "morphTargets": [
                                {name:"anim0", vertices:"accessor_3", normals:"accessor_4"}
                            ],
                            "indices": wdTool.getIndiceData(),
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

        judgeMorphDataEqual("anim", morphTargets, geo.morphVertices, geo.morphNormals);

        wdTool.judgeGeometryDataEqual(vertices, geo.vertices, 3);

        expect(geo.colors).toBeUndefined();
        geometryTool.judgeFaceIndices(geo.faces, indices);
    });
});

