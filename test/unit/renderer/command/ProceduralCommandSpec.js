describe("ProceduralCommand", function() {
    var sandbox = null;
    var deviceManager = null;
    var cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        cmd = wd.ProceduralCommand.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("init", function(){
        it("set blend = false", function () {
            cmd.init();

            expect(cmd.blend).toBeFalsy();
        });
        it("set drawMode = EDrawMode.TRIANGLES", function () {
            cmd.init();

            expect(cmd.drawMode).toEqual(wd.EDrawMode.TRIANGLES);
        });
    });

    describe("execute", function(){
        var gl;

        beforeEach(function(){
            gl = wd.DeviceManager.getInstance().gl;

            cmd.shader = {
                update:sandbox.stub()
            };

            cmd.indexBuffer = wd.ElementBuffer.create(new Uint16Array([
                0, 1, 2,
                0, 2, 3
            ]), wd.EBufferType.UNSIGNED_SHORT);
        });

        it("update procedural shader", function(){
            cmd.execute();

            expect(cmd.shader.update).toCalledWith(cmd);
        });

        it("drawElements", function(){
            cmd.execute();

            var indexBuffer = cmd.indexBuffer;

            expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
            expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * 0);
        });
    });
});

