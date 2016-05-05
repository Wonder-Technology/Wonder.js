describe("ArrayBuffer", function() {
    var sandbox = null;
    var buffer = null;
    var device = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));

        gl = device.gl;

        buffer = new wd.ArrayBuffer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("resetData", function(){
        beforeEach(function(){
        });
        
        it("if last binded array buffer is this, not bind", function(){
            buffer.resetData([]);
            expect(gl.bindBuffer).toCalledOnce();

            buffer.resetData([]);

            expect(gl.bindBuffer).not.toCalledTwice();
        });
        it("else, bind this", function () {
            buffer.resetData([]);

            expect(gl.bindBuffer).toCalledOnce();
        });
    });
});
