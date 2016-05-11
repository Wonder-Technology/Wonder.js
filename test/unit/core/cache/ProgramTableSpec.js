describe("ProgramTable", function () {
    var sandbox = null;
    var Table = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        Table = wd.ProgramTable;

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("dispose", function(){
        it("dispose all added program", function () {
            var program1 = {dispose:sandbox.stub()};
            var program2 = {dispose:sandbox.stub()};
            Table.addProgram("a", program1);
            Table.addProgram("b", program2);

            Table.dispose();

            expect(program1.dispose).toCalledOnce();
            expect(program2.dispose).toCalledOnce();
        });
        it("clear last used program", function () {
            Table.lastUsedProgram = {};

            Table.dispose();

            expect(Table.lastUsedProgram).toBeNull();
        });
    });
});
