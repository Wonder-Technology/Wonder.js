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

        function judgeEvent(eventName){
            geometryData.colorDirty = false;
            geometryData.init();

            expect(geometryData.colorDirty).toBeFalsy();

            wd.EventManager.trigger(object, wd.CustomEvent.create(eventName));

            expect(geometryData.colorDirty).toBeTruthy();



            geometryData.colorDirty = false;
            geometryData.dispose();

            wd.EventManager.trigger(object, wd.CustomEvent.create(eventName));

            expect(geometryData.colorDirty).toBeFalsy();
        }

        beforeEach(function(){
            object = wd.GameObject.create();
            geometryData.geometry = {
                entityObject: object
            }
        });

        it("unbind material_color_change event", function(){
            judgeEvent(wd.EEngineEvent.MATERIAL_COLOR_CHANGE);
        });
        it("unbind material_change event", function(){
            judgeEvent(wd.EEngineEvent.MATERIAL_CHANGE);
        });
    });
});
