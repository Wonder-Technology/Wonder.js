describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;
    var deviceManager = null;

    function getGL(){
        return dy.DeviceManager.getInstance().gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = dy.WebGLRenderer.create();
        deviceManager = dy.DeviceManager.getInstance();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        it("set clearColorOptions to color:#000000, alpha:1", function(){
            renderer.init();

            expect(renderer._clearOptions.color).toEqual(
                dy.Color.create("#000000")
            );
        });
        it("init depthTest, blend, colorWrite, side, depthWrite, scissorTest", function(){
            var gl = getGL();

            renderer.init();

            expect(deviceManager.depthTest).toBeTruthy();
            expect(deviceManager.blend).toBeFalsy();
            expect(gl.blendFunc).not.toCalled();
            expect(gl.blendEquation).not.toCalled();
            expect(gl.colorMask).toCalledOnce();
            expect(deviceManager.side).toEqual(dy.Side.FRONT);
            expect(gl.cullFace).toCalledWith(gl.BACK);
            expect(deviceManager.depthWrite).toBeTruthy();
            expect(deviceManager.scissorTest).toBeFalsy();
        });
    });

    describe("render", function(){
        var gl, program,mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var quadCmd,shader,material,geometry;

            quadCmd = renderer.createQuadCommand();
            var vsSource = "",
                fsSource = "";
            shader = dy.Shader.create( vsSource, fsSource );


            material = dy.BasicMaterial.create();
            material.color= dy.Color.create("#FFCDff");
            material.shader = shader;


            geometry = dy.BoxGeometry.create();
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;
            geometry.material = material;
            geometry.init();


            //quadCmd.buffers = {
            //    vertexBuffer: geometry.verticeBuffer,
            //    texCoordBuffer: geometry.texCoordBuffer,
            //    indexBuffer: geometry.indiceBuffer,
            //    normalBuffer: geometry.normalBuffer,
            //    tangentBuffer:geometry.tangentBuffer,
            //    colorBuffer: geometry.colorBuffer
            //};
            quadCmd.buffers = geometry.buffers;

            if(isNoIndexBuffer){
                quadCmd.buffers.geometryData.faces = [];
            }

            quadCmd.shader = geometry.material.shader;
            quadCmd.mMatrix = mMatrix;
            quadCmd.vMatrix = vMatrix;
            quadCmd.pMatrix = pMatrix;


            quadCmd.material = material;

            renderer.addCommand(quadCmd);

            sandbox.stub(material.mapManager, "update");
            sandbox.stub(material.mapManager, "sendData");
            sandbox.stub(material, "updateTexture");
            //sandbox.stub(material, "useProgram");
            sandbox.stub(material, "updateShader");

            return {
                quadCmd:quadCmd,
                material:material,
                shader:shader,
                geometry:geometry
            }
        }

        beforeEach(function(){
            mMatrix = dy.Matrix4.create();
            vMatrix = dy.Matrix4.create();
            pMatrix = dy.Matrix4.create();

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
            testTool.extend(dy.DeviceManager.getInstance().gl, gl);
            gl = dy.DeviceManager.getInstance().gl;

            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
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

            sandbox.stub(dy.Director.getInstance().scene, "camera", {
                    transform:{
                        position:{
                            z: 10
                        }
                    }
            });

            var depthWriteArr = [];
            testTool.stubGetterSetter(sinon, dy.DeviceManager.prototype, "depthWrite", null, function(val){
                depthWriteArr.push(val);
            });

            quad1.z = 8;
            quad2.z = 7;
            quad3.z = 2;
            quad4.z = -1;

            renderer.render();

            expect(quad3.execute).toCalledBefore(quad4.execute);
            expect(quad4.execute).toCalledBefore(quad2.execute);
            expect(quad2.execute).toCalledBefore(quad1.execute);
            expect(depthWriteArr).toEqual([
                false, true
            ]);
        });

        describe("execute quadCommand", function(){
            //it("set quadCommand's shader", function(){
            //    program.isChangeShader.returns(false);
            //    addCommand();
            //
            //    renderer.render();
            //
            //    expect(program.initWithShader).not.toCalled();
            //
            //    program.isChangeShader.returns(true);
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(program.initWithShader).toCalledWith(result.shader);
            //    expect(program.use).toCalledOnce();
            //});
            it("update texture", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.updateTexture).toCalledOnce();
            });
            //it("use program", function(){
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(result.material.useProgram).toCalledOnce();
            //});


            //it("send vertex,color,mMatrix,vMatrix,pMatrix to program", function(){
            //    var result = addCommand();
            //    var geometry = result.geometry;
            //
            //    renderer.render();
            //
            //    expect(program.setAttributeData.firstCall).toCalledWith("a_position", dy.AttributeDataType.BUFFER, geometry.vertices);
            //    expect(program.setAttributeData.secondCall).toCalledWith("a_color", dy.AttributeDataType.BUFFER, geometry.colors);
            //    expect(program.setUniformData).toCalledWith("u_mMatrix", dy.UniformDataType.FLOAT_MAT4, mMatrix);
            //    expect(program.setUniformData).toCalledWith("u_vMatrix", dy.UniformDataType.FLOAT_MAT4, vMatrix);
            //    expect(program.setUniformData).toCalledWith("u_pMatrix", dy.UniformDataType.FLOAT_MAT4, pMatrix);
            //});
            //it("send texture data", function(){
            //    var result = addCommand();
            //
            //    renderer.render();
            //
            //    expect(result.material.mapManager.sendData).toCalledOnce();
            //});
            it("update shader", function(){
                var result = addCommand();

                renderer.render();

                expect(result.material.updateShader).toCalledWith(result.quadCmd);
            });

            describe("draw", function(){
                describe("set effects", function(){
                    var material,result;

                    beforeEach(function(){
                        sandbox.stub(deviceManager, "setColorWrite");
                        sandbox.stub(deviceManager, "setBlendFunc");
                        sandbox.stub(deviceManager, "setBlendEquation");
                        sandbox.stub(deviceManager, "setBlendFuncSeparate");
                        sandbox.stub(deviceManager, "setBlendEquationSeparate");

                        result = addCommand();
                        material = result.material;
                    });

                    it("set colorWrite,polygonOffsetMode", function(){
                        renderer.render();

                        expect(deviceManager.setColorWrite).toCalledWith(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
                        expect(deviceManager.polygonOffsetMode).toEqual(material.polygonOffsetMode);
                    });
                    it("set side:if set Scene->side, use it", function(){
                        dy.Director.getInstance().scene.side = dy.Side.BACK;

                        renderer.render();

                        expect(deviceManager.side).toEqual(dy.Side.BACK);
                    });
                    it("else, use material->side", function () {
                        material.side = dy.Side.BOTH;

                        renderer.render();

                        expect(deviceManager.side).toEqual(dy.Side.BOTH);
                    });
                    it("if set material->blendSrc/Dst,blendEquation, use it", function () {
                        material.blend = true;
                        material.blendFuncSeparate = [dy.BlendFunc.SRC_ALPHA, dy.BlendFunc.ONE_MINUS_SRC_ALPHA, dy.BlendFunc.ONE, dy.BlendFunc.ONE_MINUS_SRC_ALPHA];
                        material.blendEquationSeparate = [dy.BlendEquation.ADD, dy.BlendEquation.ADD];
                        material.blendSrc = dy.BlendFunc.SRC_ALPHA;
                        material.blendDst = dy.BlendFunc.ONE;

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                        expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                        expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                    });
                    it("if set material->blendFuncSeparate && blendEquationSeparate, use it", function(){
                        material.blend = true;
                        material.blendFuncSeparate = [dy.BlendFunc.SRC_ALPHA, dy.BlendFunc.ONE_MINUS_SRC_ALPHA, dy.BlendFunc.ONE, dy.BlendFunc.ONE_MINUS_SRC_ALPHA];
                        material.blendEquationSeparate = [dy.BlendEquation.ADD, dy.BlendEquation.ADD];

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFuncSeparate).toCalledWith(material.blendFuncSeparate);
                        expect(deviceManager.setBlendEquationSeparate).toCalledWith(material.blendEquationSeparate);
                    });
                    it("else use material->default blendSrc/Dst,blendEquation", function(){
                        material.blend = true;

                        renderer.render();

                        expect(deviceManager.blend).toBeTruthy();
                        expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                        expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                        expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                    });
                });
                it("if geometry has no index buffer, then drawArray", function(){
                    var result = addCommand(true);
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    expect(gl.drawArrays).toCalledWith("TRIANGLES",0,3);
                });
                it("else, drawElements", function(){
                    var result = addCommand();
                    var quadCmd = result.quadCmd;

                    renderer.render();

                    var indexBuffer = quadCmd.buffers.getChild(dy.BufferDataType.INDICE);

                    expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                    expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.num, indexBuffer.type, indexBuffer.typeSize * 0);
                });
            });
        });

        describe("if skyboxCommand exist, execute skyboxCommand", function(){
            it("set depthFunc to be LEQUAL, then execute skyboxCommand, then restore depthFunc to be LESS", function(){
                var depthFuncValArr = [];
                var stub = sandbox.stub();

                testTool.stubGetterSetter(sinon, dy.DeviceManager.prototype, "depthFunc", null, function(val){
                        depthFuncValArr.push(val);
                    });
                cmd = {
                    execute: sandbox.stub()
                };
                renderer.skyboxCommand = cmd;

                renderer.render();

                expect(depthFuncValArr).toEqual([
                    "LEQUAL", "LESS"
                ]);
                expect(cmd.execute).toCalledOnce();
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
