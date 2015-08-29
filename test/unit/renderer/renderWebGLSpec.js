describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;
    var deviceManager = null;

    function getGL(){
        return dy.Director.getInstance().gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = dy.render.WebGLRenderer.create();
        deviceManager = dy.DeviceManager.getInstance();
        sandbox.stub(dy.Director.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        dy.DeviceManager._instance = null;
        dy.Director._instance = null;
        sandbox.restore();
    });

    describe("init", function(){
        it("set clearColorOptions to color:#000000, alpha:1", function(){
            renderer.init();

            expect(renderer._clearOptions.color).toEqual(
                dy.Color.create("#000000")
            );
        });
        it("init depthTest, blend, colorWrite, cullMode, depthWrite, scissorTest", function(){
            var gl = getGL();

            renderer.init();

            expect(deviceManager.depthTest).toBeTruthy();
            expect(deviceManager.blend).toBeFalsy();
            expect(gl.blendFunc).not.toCalled();
            expect(gl.blendEquation).not.toCalled();
            expect(gl.colorMask).toCalledOnce();
            expect(deviceManager.cullMode).toEqual(dy.CullMode.BACK);
            expect(gl.cullFace).toCalledWith(gl.BACK);
            expect(deviceManager.depthWrite).toBeTruthy();
            expect(deviceManager.scissorTest).toBeTruthy();
        });
    });

    describe("render", function(){
        var gl, program;

        function addCommand(isNoIndexBuffer){
            var quadCmd,shader,material,geometry;

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


            quadCmd.material = material;

            renderer.addCommand(quadCmd);

            sandbox.stub(material.textureManager, "update");
            sandbox.stub(material.textureManager, "sendData");

            return {
                quadCmd:quadCmd,
                material:material,
                shader:shader,
                geometry:geometry
            }
        }

        beforeEach(function(){
            mvpMatrix = dy.Matrix.create();
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
            testTool.extend(dy.Director.getInstance().gl, gl);
            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
            sandbox.stub(dy.Director.getInstance().stage, "program", program);
        });

        it("clear by clearOptions", function(){
            sandbox.stub(deviceManager, "clear");
            var result = addCommand();
            sandbox.stub(result.quadCmd, "execute");

            renderer.render();

            expect(deviceManager.clear).toCalledWith(renderer._clearOptions);
        });
        it("fist, render opaque commands;then lock depth buffer and render sorted transparent commands; then unlock depth buffer", function(){
            var result1 = addCommand();
            var result2 = addCommand();
            var result3 = addCommand();
            var result4 = addCommand();
            var quad1 = result1.quadCmd,
                quad2 = result2.quadCmd,
                quad3 = result3.quadCmd,
                quad4 = result4.quadCmd;
            var material1 = result1.material,
                material2 = result2.material,
                material3 = result3.material,
                material4 = result4.material;

            sandbox.stub(quad1, "execute");
            sandbox.stub(quad2, "execute");
            sandbox.stub(quad3, "execute");
            sandbox.stub(quad4, "execute");

            material1.blend = true;
            material2.blend = true;
            material3.blend = false;
            material4.blend = false;

            sandbox.stub(dy.Director.getInstance().stage, "camera", {
                    transform:{
                        position:{
                            z: 10
                        }
                    }
            });
            quad1.z = 8;
            quad2.z = 7;
            quad3.z = 2;
            quad4.z = -1;

            renderer.render();

            expect(quad3.execute).toCalledBefore(quad4.execute);
            expect(quad4.execute).toCalledBefore(quad2.execute);
            expect(quad2.execute).toCalledBefore(quad1.execute);
        });

        describe("execute quadCommand test", function(){
            it("set quadCommand's shader", function(){
                program.isChangeShader.returns(false);
                addCommand();

                renderer.render();

                expect(program.initWithShader).not.toCalled();

                program.isChangeShader.returns(true);
                var result = addCommand();

                renderer.render();

                expect(program.initWithShader).toCalledWith(result.shader);
                expect(program.use).toCalledOnce();
            });
            it("update texture", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.textureManager.update).toCalledOnce();
            });
            it("send vertex,color,mvpMatrix to program", function(){
                var result = addCommand();
                var geometry = result.geometry;

                renderer.render();

                expect(program.setAttributeData.firstCall).toCalledWith("a_position", dy.render.AttributeDataType.BUFFER, geometry.vertices);
                expect(program.setAttributeData.secondCall).toCalledWith("a_color", dy.render.AttributeDataType.BUFFER, geometry.colors);
                expect(program.setUniformData).toCalledWith("u_mvpMatrix", dy.render.UniformDataType.FLOAT_MAT4, mvpMatrix);
            });
            it("send texture data", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.textureManager.sendData).toCalledOnce();
            });

            describe("draw", function(){
                it("set effects", function(){
                    sandbox.stub(deviceManager, "setColorWrite");
                    sandbox.stub(deviceManager, "setBlendFunction");
                    sandbox.stub(deviceManager, "setBlendEquation");
                    var result = addCommand();
                    var material = result.material;

                    renderer.render();

                    expect(deviceManager.setColorWrite).toCalledWith(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
                    expect(deviceManager.polygonOffsetMode).toEqual(material.polygonOffsetMode);
                    expect(deviceManager.cullMode).toEqual(material.cullMode);
                    expect(deviceManager.blend).toEqual(material.blend);
                    expect(deviceManager.setBlendFunction).toCalledWith(material.blendSrc, material.blendDst);
                    expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                });
                it("if geometry has no index buffer, then drawArray", function(){
                    var result = addCommand(true);
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    expect(gl.drawArrays).toCalledWith(gl.TRIANGLES, 0, quadCmd.buffers.getChild("vertexBuffer").num);
                });
                it("else, drawElements", function(){
                    var result = addCommand();
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    var indexBuffer = quadCmd.buffers.getChild("indexBuffer");

                    expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                    expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.num, indexBuffer.type, indexBuffer.typeSize * 0);
                });
            });
        });

        it("clear command", function(){
            var result = addCommand();
            sandbox.stub(result.quadCmd, "execute");

            renderer.render();

            expect(renderer._commandQueue.getCount()).toEqual(0);
        });
    });
});
