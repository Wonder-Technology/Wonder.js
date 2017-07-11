describe("AmbientLight", function () {
    var sandbox = null;

    var AmbientLight = wd.AmbientLight;
    var AmbientLightData = wd.AmbientLightData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("create", function() {
        beforeEach(function(){

        });

        describe("contract check", function(){
            it("count should <= 1", function () {
                var msg = "count should <= 1";
                ambientLightTool.create();

                expect(function(){

                    ambientLightTool.create();
                }).toThrow(msg);
            });
        });

        describe("set default render data", function () {
            it("set colorArr to be [1,1,1]", function () {
                var light = ambientLightTool.create();

                expect(AmbientLightData.renderDataMap[light.index].colorArr).toEqual([1,1,1]);
            });
        });
    });
});

