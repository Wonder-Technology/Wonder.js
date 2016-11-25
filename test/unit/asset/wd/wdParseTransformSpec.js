describe("parse wd transform", function(){
    var sandbox = null;
    var parser = null;
    var json = null;
    var Utils = wd.WDUtils;
    var arrayBufferMap;
    var imageMap;

    function getTransform(data){
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

        // vertices = data[0];
        // texCoords = data[1];
        // indices = data[2];
    });
    afterEach(function () {
        sandbox.restore();
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

        wdTool.setJson(json, {
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

        wdTool.setJson(json, {
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


