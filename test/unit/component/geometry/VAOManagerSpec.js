describe("VAOManager", function() {
    var sandbox = null;
    var manager;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        manager = wd.VAOManager.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        beforeEach(function(){

        });

        it("remove all vao map's children", function(){
            sandbox.stub(manager._vaoMap, "removeAllChildren");

            manager.dispose();

            expect(manager._vaoMap.removeAllChildren).toCalledOnce();
        });
    });
});
