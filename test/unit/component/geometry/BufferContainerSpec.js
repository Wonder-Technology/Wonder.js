describe("BufferContainer", function() {
    var sandbox = null;
    var container;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container = new wd.BufferContainer();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("dispose", function(){
        beforeEach(function(){
            container.geometryData = new wd.GeometryData();
            sandbox.stub(container.geometryData, "dispose");
        });

        it("dispose all buffers", function(){
            var buffer = new wd.ArrayBuffer();
            sandbox.stub(buffer, "dispose");
            container.container.addChild(wd.EBufferDataType.COLOR, buffer);

            container.dispose();

            expect(buffer.dispose).toCalledOnce();
        });
        it("dispose geometryData", function () {
            container.dispose();

            expect(container.geometryData.dispose).toCalledOnce();
        });
    });
});

