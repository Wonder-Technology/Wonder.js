describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = dy.render.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function(){
        it("clearColor to #000000", function(){
            var gl = {
                clearColor:sandbox.stub()
            };
            sandbox.stub(dy.Director.getInstance(), "gl", gl);

            renderer.init();

            expect(gl.clearColor).toCalledWith( 0, 0, 0, 1 );
        });
    });

    describe("render", function(){
        var gl, program,
            quadCmd,shader,material,geometry,mvpMatrix;

        function renderCommand(isNoIndexBuffer){
            quadCmd = renderer.createQuadCommand();
            var vsSource = "",
                fsSource = "";
            shader = dy.render.Shader.create( vsSource, fsSource );


            material = dy.Material.create();
            material.color= dy.Color.create("#FFCDff");
            material.shader = shader;


            geometry = dy.BoxGeometry.create();
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;
            geometry.material = material;
            geometry.init();

            mvpMatrix = dy.Matrix.create();

            quadCmd.buffers = {
                vertexBuffer: geometry.vertices,
                indexBuffer: geometry.indices,
                colorBuffer: geometry.colors
            };

            if(isNoIndexBuffer){
                quadCmd.buffers.setValue("indexBuffer", null);
            }

            quadCmd.shader = geometry.material.shader;
            quadCmd.mvpMatrix = mvpMatrix;

            renderer.addCommand(quadCmd);

            renderer.render();
        }

        beforeEach(function(){
            gl = {
                TRIANGLES:"TRIANGLES",
                ARRAY_BUFFER:"ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER: "ELEMENT_ARRAY_BUFFER",
                UNSIGNED_SHORT: "UNSIGNED_SHORT",

                bindBuffer:sandbox.stub(),
                bufferData:sandbox.stub(),
                drawElements:sandbox.stub(),
                drawArrays:sandbox.stub(),
                createBuffer:sandbox.stub().returns({})
            };
            sandbox.stub(dy.Director.getInstance(), "gl", gl);
            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
            sandbox.stub(dy.Director.getInstance().stage, "program", program);
        });

        it("set quadCommand's shader", function(){
            program.isChangeShader.returns(false);

            renderCommand();

            expect(program.initWithShader).not.toCalled();

            program.isChangeShader.returns(true);

            renderCommand();

            expect(program.initWithShader).toCalledWith(shader);
            expect(program.use).toCalledOnce();
        });
        it("send vertex,color,mvpMatrix to program", function(){
            renderCommand();

            expect(program.setAttributeData.firstCall).toCalledWith("a_position", dy.render.AttributeDataType.BUFFER, geometry.vertices);
            expect(program.setAttributeData.secondCall).toCalledWith("a_color", dy.render.AttributeDataType.BUFFER, geometry.colors);
            expect(program.setUniformData).toCalledWith("u_mvpMatrix", dy.render.UniformDataType.FLOAT_MAT4, mvpMatrix);
        });
        describe("draw", function(){
            it("if geometry has no index buffer, then drawArray", function(){
                renderCommand(true);

                expect(gl.drawArrays).toCalledWith(gl.TRIANGLES, 0, quadCmd.buffers.getChild("vertexBuffer").num);
            });
            it("else, drawElements", function(){
                renderCommand();

                var indexBuffer = quadCmd.buffers.getChild("indexBuffer");

                expect(gl.bindBuffer.args.slice(-2)).toEqual([[gl.ARRAY_BUFFER, quadCmd.buffers.getChild("vertexBuffer").buffer], [gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.num, indexBuffer.type, indexBuffer.typeSize * 0);
            });
        });
        it("clear command", function(){
            renderCommand();

            expect(renderer._commandQueue.getCount()).toEqual(0);
        });
    });
});
