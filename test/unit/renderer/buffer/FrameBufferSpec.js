describe("FrameBuffer", function() {
    var sandbox = null;
    var buffer = null;
    var device = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));

        buffer = new wd.FrameBuffer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("setViewport", function(){
        beforeEach(function(){
            sandbox.stub(device, "setViewport");
        });

        it("set view port", function(){
            buffer.width = 100;
            buffer.height = 200;

            buffer.setViewport();

            expect(device.setViewport).toCalledWith(0, 0, 100, 200);
        });
        it("disable scissor test to solve 'if frameBuffer's width and height > canvas's width/height, then its texture will be clip' problem", function(){
            buffer.setViewport();

            expect(device.scissorTest).toBeFalsy();
        });
    });

    describe("restoreViewport", function(){
        beforeEach(function(){
            sandbox.stub(device, "setViewport");
            sandbox.stub(device, "view", {
                width:50,
                height:51
            })
        });

        it("restore view port", function(){
            buffer.restoreViewport();

            expect(device.setViewport).toCalledWith(0, 0, 50, 51);
        });
        describe("restore scissor test to the one before setViewport", function(){
            it("test origin value is true", function(){
                device.scissorTest = true;

                buffer.setViewport();
                buffer.restoreViewport();

                expect(device.scissorTest).toBeTruthy();
            });
            it("test origin value is false", function(){
                device.scissorTest = false;

                buffer.setViewport();
                buffer.restoreViewport();

                expect(device.scissorTest).toBeFalsy();
            });
        });
    });

    describe("unBindAll", function(){
        var gl;

        beforeEach(function(){
            gl = device.gl;
        });

        it("unbind texture and clear texture unit cache", function(){
            var glTarget = "TEXTURE_2D";
            buffer.attachTexture(glTarget, {});
            sandbox.stub(wd.TextureCache, "clearAllBindTextureUnitCache");

            buffer.unBindAll();

            expect(gl.bindTexture).toCalledWith(glTarget, null);
            expect(wd.TextureCache.clearAllBindTextureUnitCache).toCalledOnce();
        });
        it("unbind frame buffer", function () {
            buffer.unBindAll();

            expect(gl.bindFramebuffer).toCalledWith(gl.FRAMEBUFFER, null);
        });
        it("unbind render buffer", function () {
            buffer.unBindAll();

            expect(gl.bindRenderbuffer).toCalledWith(gl.RENDERBUFFER, null);
        });
    });

    describe("unBindFrameBuffer", function(){
        var gl;

        beforeEach(function(){
            gl = device.gl;
        });

        it("unbind frame buffer", function () {
            buffer.unBindAll();

            expect(gl.bindFramebuffer).toCalledWith(gl.FRAMEBUFFER, null);
        });
    });
});
