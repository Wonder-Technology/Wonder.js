describe("GeometryData", function() {
    var sandbox = null;
    var geometryData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geometryData = new wd.GeometryData();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        var object;

        beforeEach(function(){
            object = wd.GameObject.create();
            geometryData.geometry = {
                entity: object
            }
        });

        it("unbind material_color_change event", function(){
            geometryData.colorDirty = false;
            geometryData.init();

            wd.EventManager.trigger(object, wd.CustomEvent.create(wd.EEngineEvent.MATERIAL_COLOR_CHANGE));

            expect(geometryData.colorDirty).toBeTruthy();



            geometryData.colorDirty = false;
            geometryData.dispose();

            wd.EventManager.trigger(object, wd.CustomEvent.create(wd.EEngineEvent.MATERIAL_COLOR_CHANGE));

            expect(geometryData.colorDirty).toBeFalsy();
        });
    });
});
