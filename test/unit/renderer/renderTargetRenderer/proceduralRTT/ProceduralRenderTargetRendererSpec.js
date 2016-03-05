describe("ProceduralRenderTargetRenderer", function () {
    var gl = null;
    var sandbox = null;
    var renderTargetRenderer;

    var frameBufferOperator,frameBuffer,glTexture, texture;

    var shader;

    function prepareForInit(){
        frameBuffer = {};

        frameBufferOperator = {
            createFrameBuffer: sandbox.stub().returns(frameBuffer),
            bindFrameBuffer: sandbox.stub(),
            attachTexture: sandbox.stub(),
            check: sandbox.stub(),
            unBind: sandbox.stub()
        };

        glTexture = {};

        renderTargetRenderer.frameBufferOperator = frameBufferOperator;

        texture = {
            createEmptyTexture: sandbox.stub(),
            glTexture:glTexture
        };
        renderTargetRenderer.texture = texture;

        shader = {
            init:sandbox.stub(),
            dispose:sandbox.stub()
        }

        wd.ProceduralRenderTargetRenderer.prototype.createShader = sandbox.stub().returns(shader);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderTargetRenderer = new  wd.ProceduralRenderTargetRenderer();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        //wd.EventManager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){
            prepareForInit();
        });

        it("create empty texture", function(){
            renderTargetRenderer.init();

            expect(texture.createEmptyTexture).toCalledOnce();
        });

        it("attach texture", function(){
            renderTargetRenderer.init();

            expect(frameBufferOperator.attachTexture).toCalledWith(gl.TEXTURE_2D, glTexture);
        });
        it("check frame buffer", function(){
            renderTargetRenderer.init();

            expect(frameBufferOperator.check).toCalledOnce();
        });
        it("unBind frame buffer", function(){
            renderTargetRenderer.init();

            expect(frameBufferOperator.unBind).toCalledOnce();
        });
        it("init vertexBuffer,indexBuffer", function () {
            renderTargetRenderer.init();

            expect(renderTargetRenderer._vertexBuffer).toEqual(wd.ArrayBuffer.create(new Float32Array([
                1, 1,
                -1, 1,
                -1, -1,
                1, -1
            ]), 2, wd.EBufferType.FLOAT));
            expect(renderTargetRenderer._indexBuffer).toEqual(wd.ElementBuffer.create(new Uint16Array([
                0, 1, 2,
                0, 2, 3
            ]), wd.EBufferType.UNSIGNED_SHORT));
        });
        it("create shader", function () {
            renderTargetRenderer.init();

            expect(renderTargetRenderer.createShader).toCalledOnce();
        });
        it("init shader", function () {
            renderTargetRenderer.init();

            expect(shader.init).toCalledOnce();
        });
    });

    describe("render", function(){
        var renderer,frameBufferOperator,texture;

        beforeEach(function(){
            frameBufferOperator = {
                createFrameBuffer: sandbox.stub().returns({}),
                attachTexture: sandbox.stub(),
                check: sandbox.stub(),
                bindFrameBuffer: sandbox.stub(),
                setViewport: sandbox.stub(),
                unBind: sandbox.stub(),
                restoreViewport: sandbox.stub()
            };


            renderTargetRenderer.frameBufferOperator = frameBufferOperator;


            texture = {
                createEmptyTexture: sandbox.stub(),
                bindToUnit: sandbox.stub()
            };

            renderTargetRenderer.texture = texture;


            renderer = {
                addCommand:sandbox.stub(),
                render: sandbox.stub(),
                clear: sandbox.stub()
            };
        });

        it("bind texture", function(){
            renderTargetRenderer.render(renderer);

            expect(texture.bindToUnit).toCalledWith(0);
        });
        it("bind frameBuffer and set viewport", function(){
            renderTargetRenderer.init();

            renderTargetRenderer.render(renderer);

            expect(frameBufferOperator.bindFrameBuffer).toCalledBefore(frameBufferOperator.setViewport);
            expect(frameBufferOperator.bindFrameBuffer).toCalledWith(renderTargetRenderer.frameBuffer);
        });

        describe("add render command", function () {
            it("create ProceduralCommand", function () {
                renderTargetRenderer.render(renderer);

                expect(renderer.addCommand).toCalledOnce();
                expect(renderer.addCommand.firstCall.args[0]).toEqual(jasmine.any(wd.ProceduralCommand));
            });
            it("pass vertexBuffer,indexBuffer,shader to command", function () {
                var material = wd.BasicMaterial.create();
                texture.material = material;
                renderTargetRenderer.init();

                renderTargetRenderer.render(renderer);


                var command = renderer.addCommand.firstCall.args[0];
                expect(command.vertexBuffer).toEqual(renderTargetRenderer._vertexBuffer);
                expect(command.indexBuffer).toEqual(renderTargetRenderer._indexBuffer);
                expect(command.shader).toEqual(shader);
            });
        });

        it("clear renderer, then render renderer", function(){
            renderTargetRenderer.render(renderer);

            expect(renderer.clear).toCalledBefore(renderer.render);
        });
        it("unbind frameBuffer and restore viewport", function(){
            renderTargetRenderer.render(renderer);

            expect(frameBufferOperator.unBind).toCalledBefore(frameBufferOperator.restoreViewport);
        });
    });

    describe("dispose", function(){
        beforeEach(function(){
            prepareForInit();

            frameBufferOperator.dispose = sandbox.stub();
            gl.deleteFramebuffer = sandbox.stub();
            texture.dispose = sandbox.stub();



            renderTargetRenderer.init();

            sandbox.stub(renderTargetRenderer._vertexBuffer, "dispose");
            sandbox.stub(renderTargetRenderer._indexBuffer, "dispose");

            //renderTargetRenderer.init();

            renderTargetRenderer.dispose();
        });

        it("dispose frameBufferOperator", function () {
            expect(frameBufferOperator.dispose).toCalledOnce();
        });
        it("delete frameBuffer", function () {
            expect(gl.deleteFramebuffer).toCalledWith(renderTargetRenderer.frameBuffer);
        });
        it("dispose texture", function () {
            expect(texture.dispose).toCalledOnce();
        });
        it("dispose vertexBuffer,indexBuffer", function () {
            expect(renderTargetRenderer._vertexBuffer.dispose).toCalledOnce();
            expect(renderTargetRenderer._indexBuffer.dispose).toCalledOnce();
        });
        it("dispose shader", function () {
            expect(renderTargetRenderer._shader.dispose).toCalledOnce();
        });
    });
});

