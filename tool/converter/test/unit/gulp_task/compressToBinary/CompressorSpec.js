var CompressorManager = require("../../../../dist/converter/gulp_task/compressToBinary/CompressorManager").CompressorManager,
    tool = require("./tool"),
    sinon = require("sinon");

describe("compressToBinary->CompressorManager", function () {
    var sandbox = null;
    var compressorManager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        compressorManager = CompressorManager.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("compress", function () {
        var fileJson = null;

        beforeEach(function () {
            fileJson = {};
        });

        describe("generate one binary buffer", function () {
            it("buffer should be Buffer type", function () {
                var primitiveData = tool.getPrimitiveData();
                tool.setFileJson(fileJson, {
                    "meshes": {
                        "geometry1": {
                            "primitives": [
                                primitiveData
                            ]
                        }
                    }
                });

                var data = compressorManager.compress("", "", fileJson);

                expect(data.buffer instanceof Buffer).toBeTruthy();
            });
        });

        it("return the buffer's uri(the path related to .wd file)", function () {
            var primitiveData = tool.getPrimitiveData();

            tool.setFileJson(fileJson, {
                "meshes": {
                    "geometry1": {
                        "primitives": [
                            primitiveData
                        ]
                    }
                }
            });

            var data = compressorManager.compress("wdFileName", "../", fileJson);

            var buffers = data.json.buffers;


            expect(data.json.buffers.wdFileName.uri).toEqual("../wdFileName.bin");
        });
    });
});
