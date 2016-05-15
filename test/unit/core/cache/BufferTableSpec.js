describe("BufferTable", function () {
    var sandbox = null;
    var Table = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        Table = wd.BufferTable;

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        it("dispose all added buffers", function () {
            var buffer1 = {dispose:sandbox.stub()};
            var buffer2 = {dispose:sandbox.stub()};
            Table.addBuffer("a", buffer1);
            Table.addBuffer("b", buffer2);

            Table.dispose();

            expect(buffer1.dispose).toCalledOnce();
            expect(buffer2.dispose).toCalledOnce();
        });
        it("clear last binded array buffer arr", function () {
            Table.lastBindedArrayBufferArr = [{}];

            Table.dispose();

            expect(Table.lastBindedArrayBufferArr).toBeNull();
        });
        it("clear last binded element buffer", function () {
            var buffer1 = {dispose:sandbox.stub()};
            Table.bindIndexBuffer(buffer1);

            Table.dispose();

            expect(Table.lastBindedElementBuffer).toBeNull();
        });
    });
});
