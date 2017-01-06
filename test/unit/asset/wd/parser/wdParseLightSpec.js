describe("parse wd light", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var arrayBufferMap;
    var imageMap;

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

        // vertices = data[0];
        // texCoords = data[1];
        // indices = data[2];
    });
    afterEach(function () {
        sandbox.restore();
    });


    it("parse ambient light", function(){
        wdTool.setJson(json, {
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
                }
            },
            "nodes": {
                "node_1": {
                    "children": [
                    ],
                    "name": "1",
                    "light": "EnvironmentAmbientLight"
                    // "mesh": "geometry1"
                }
            }
        })




        var data = parser.parse(json, arrayBufferMap, imageMap);


        judgeLight(data, {
            type:"ambient",
            color: wdTool.createColor([0, 0.1, 0.2])
        })
    });
    it("parse direction light", function(){
        wdTool.setJson(json, {
            "lights": {
                "light1": {
                    "directional": {
                        "intensity": 0.5,
                        "color": [
                            0,
                            0.1,
                            0.2
                        ]
                    },
                    "name": "light1",
                    "type": "directional"
                }
            },
            "nodes": {
                "node_1": {
                    "children": [
                    ],
                    "name": "1",
                    "light": "light1"
                }
            }
        })




        var data = parser.parse(json, arrayBufferMap, imageMap);


        judgeLight(data, {
            type:"directional",
            intensity:0.5,
            color: wdTool.createColor([0, 0.1, 0.2])
        })
    });

    describe("parse point light", function(){
        it("test without range", function(){
            wdTool.setJson(json, {
                "lights": {
                    "light1": {
                        "name": "light1",
                        "point": {
                            "intensity": 0.5,
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
                },
                "nodes": {
                    "node_1": {
                        "children": [
                        ],
                        "name": "1",
                        "light": "light1"
                    }
                }
            })




            var data = parser.parse(json, arrayBufferMap, imageMap);


            judgeLight(data, {
                type:"point",
                intensity:0.5,
                color: wdTool.createColor([0, 0.1, 0.2]),
                constantAttenuation:1,
                linearAttenuation:0.1,
                quadraticAttenuation:0.2
            })
        });
        it("test with range", function(){
            wdTool.setJson(json, {
                "lights": {
                    "light1": {
                        "name": "light1",
                        "point": {
                            "intensity": 0.5,
                            "color": [
                                0,
                                0.1,
                                0.2
                            ],
                            "constantAttenuation": 1,
                            "linearAttenuation": 0.1,
                            "quadraticAttenuation": 0.2,
                            "range":10
                        },
                        "type": "point"
                    }
                },
                "nodes": {
                    "node_1": {
                        "children": [
                        ],
                        "name": "1",
                        "light": "light1"
                    }
                }
            })




            var data = parser.parse(json, arrayBufferMap, imageMap);


            judgeLight(data, {
                type:"point",
                intensity:0.5,
                color: wdTool.createColor([0, 0.1, 0.2]),
                constantAttenuation:1,
                linearAttenuation:0.1,
                quadraticAttenuation:0.2,
                range:10
            })
        });
    });
});
