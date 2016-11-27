describe("parse camera", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    function getCamera(data) {
        return data.objects.getChild(0).components.getChild(0);
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
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse perspective camera", function(){
        it("test", function() {
            wdTool.setJson(json, {
                "cameras": {
                    "Camera01-camera": {
                        "name": "Camera01",
                        "perspective": {
                            "yfov": wd.AngleUtils.convertDegreeToRadians(10),
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
            wdTool.setJson(json, {
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
        wdTool.setJson(json, {
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


