describe("parse wd optimize", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    // var vertices,texCoords,indices;

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
        //
        // vertices = data[0];
        // texCoords = data[1];
        // indices = data[2];
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("the texture which has the same image source+same filter+same wrap share the same webglTexture", function(){
        var gl;

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;


            gl.createTexture.onCall(0).returns({})
            gl.createTexture.onCall(1).returns({a:1})

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
                }
            })
        });

        it("if only repeatRegion is different, share", function(){
            wdTool.setJson(json, {
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
        it("if isPremultipliedAlpha is different, not share", function(){
            wdTool.setJson(json, {
                "samplers": {
                    "sampler_0": {
                        "magFilter": 9729,
                        "minFilter": 9987,
                        "wrapS": 10497,
                        "wrapT": 10497,
                        "isPremultipliedAlpha": true,

                        "repeatRegion": [0, 0, 1, 1]
                    },
                    "sampler_1": {
                        "magFilter": 9729,
                        "minFilter": 9987,
                        "wrapS": 10497,
                        "wrapT": 10497,
                        "repeatRegion": [0, 0, 1, 1]

                    }
                }
            })


            var data = parser.parse(json, arrayBufferMap, imageMap);


            var map1 = data.objects.getChild(0).components.getChild(0).material.diffuseMap;
            var map2 = data.objects.getChild(0).children.getChild(0).components.getChild(0).material.diffuseMap;


            expect(map1.glTexture !== map2.glTexture).toBeTruthy();
        });
    });
});

