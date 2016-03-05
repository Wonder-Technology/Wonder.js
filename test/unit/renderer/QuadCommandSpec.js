describe("QuadCommand", function() {
    var sandbox = null;
    var deviceManager = null;
    var cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        cmd = wd.QuadCommand.create();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("normalMatrix(getter)", function(){
        beforeEach(function(){
        });

        it("get normal matrix", function(){
            var mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            cmd.mMatrix = mMatrix.copy();

            expect(cmd.normalMatrix.values).toEqual(
                cmd.mMatrix.invertTo3x3().transpose().values
            );
            expect(
                testTool.getValues(
                    cmd.mMatrix.values
                )
            ).toEqual(
                testTool.getValues(
                    mMatrix.values
                )
            );
        });

        describe("test cache", function(){
            var changedMatrix;

            beforeEach(function(){
                cmd.mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);

                changedMatrix = wd.Matrix4.create([ 100, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            });

            it("if cached, return cached data", function(){
                sandbox.spy(cmd.mMatrix, "invertTo3x3");

                var m1 = cmd.normalMatrix;
                expect(cmd.mMatrix.invertTo3x3).toCalledOnce();

                var m2 = cmd.normalMatrix;


                expect(m1.values).toEqual(m2.values);
                expect(cmd.mMatrix.invertTo3x3).not.toCalledTwice();
            });
            it("if change mMatrix, clear cache", function () {
                var m1 = cmd.normalMatrix;

                cmd.mMatrix = changedMatrix;

                var m2 = cmd.normalMatrix;

                expect(m1.values).not.toEqual(m2.values);
            });
        });
    });

    describe("mvpMatrix(getter)", function(){
        beforeEach(function(){
        });

        it("get mvp matrix", function(){
            var mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            cmd.mMatrix = mMatrix.copy();
            cmd.vMatrix = wd.Matrix4.create([ 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            cmd.pMatrix = wd.Matrix4.create([ 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);

            expect(cmd.mvpMatrix.values).toEqual(
                cmd.mMatrix.applyMatrix(cmd.vMatrix, true).applyMatrix(cmd.pMatrix, false).values
            );

            expect(
                testTool.getValues(
                    cmd.mMatrix.values
                )
            ).toEqual(
                testTool.getValues(
                    mMatrix.values
                )
            );
        });

        describe("test cache", function(){
            var changedMatrix;

            beforeEach(function(){
                cmd.mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
                cmd.vMatrix = wd.Matrix4.create([ 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
                cmd.pMatrix = wd.Matrix4.create([ 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);

                changedMatrix = wd.Matrix4.create([ 100, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            });

            it("if cached, return cached data", function(){
                sandbox.spy(cmd.mMatrix, "applyMatrix");

                var m1 = cmd.mvpMatrix;
                expect(cmd.mMatrix.applyMatrix).toCalledOnce();

                var m2 = cmd.mvpMatrix;


                expect(m1.values).toEqual(m2.values);
                expect(cmd.mMatrix.applyMatrix).not.toCalledTwice();
            });
            it("if change mMatrix, clear cache", function () {
                var m1 = cmd.mvpMatrix;

                cmd.mMatrix = changedMatrix;

                var m2 = cmd.mvpMatrix;

                expect(m1.values).not.toEqual(m2.values);
            });
            it("if change vMatrix, clear cache", function () {
                var m1 = cmd.mvpMatrix;

                cmd.vMatrix = changedMatrix;

                var m2 = cmd.mvpMatrix;

                expect(m1.values).not.toEqual(m2.values);
            });
            it("if change pMatrix, clear cache", function () {
                var m1 = cmd.mvpMatrix;

                cmd.pMatrix = changedMatrix;

                var m2 = cmd.mvpMatrix;

                expect(m1.values).not.toEqual(m2.values);
            });
        });
    });

    describe("execute", function(){
        var gl, mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var quadCmd,shader,material,geometry;

            quadCmd = wd.QuadCommand.create();
            var vsSource = "",
                fsSource = "";
            shader = wd.CommonShader.create( vsSource, fsSource );


            material = wd.BasicMaterial.create();
            material.color= wd.Color.create("#FFCDff");
            material.shader = shader;


            geometry = wd.BoxGeometry.create();
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

            quadCmd.blend = material.blend;

            //renderer.addCommand(quadCmd);

            sandbox.stub(material.mapManager, "update");
            sandbox.stub(material.mapManager, "sendData");
            sandbox.stub(material, "updateTexture");
            sandbox.stub(material, "updateShader");

            return {
                quadCmd:quadCmd,
                material:material,
                shader:shader,
                geometry:geometry
            }
        }

        beforeEach(function(){
            mMatrix = wd.Matrix4.create();
            vMatrix = wd.Matrix4.create();
            pMatrix = wd.Matrix4.create();

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
            testTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;
        });

        it("update texture", function(){
            var result = addCommand();

            result.quadCmd.execute();

            expect(result.material.updateTexture).toCalledOnce();
        });
        it("update shader", function(){
            var result = addCommand();

            result.quadCmd.execute();

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

                    sandbox.stub(wd.Director.getInstance().scene, "currentCamera", testTool.createCamera());
                });

                it("set colorWrite,polygonOffsetMode", function(){
                    result.quadCmd.execute();

                    expect(deviceManager.setColorWrite).toCalledWith(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
                    expect(deviceManager.polygonOffsetMode).toEqual(material.polygonOffsetMode);
                });
                it("set side:if set SceneDispatcher->side, use it", function(){
                    wd.Director.getInstance().scene.side = wd.ESide.BACK;

                    result.quadCmd.execute();

                    expect(deviceManager.side).toEqual(wd.ESide.BACK);
                });
                it("else, use material->side", function () {
                    material.side = wd.ESide.BOTH;

                    result.quadCmd.execute();

                    expect(deviceManager.side).toEqual(wd.ESide.BOTH);
                });
                it("if set material->blendSrc/Dst,blendEquation, use it", function () {
                    material.blend = true;
                    material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                    material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];
                    material.blendSrc = wd.EBlendFunc.SRC_ALPHA;
                    material.blendDst = wd.EBlendFunc.ONE;

                    result.quadCmd.execute();

                    expect(deviceManager.blend).toBeTruthy();
                    expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                    expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                    expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                });
                it("if set material->blendFuncSeparate && blendEquationSeparate, use it", function(){
                    material.blend = true;
                    material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                    material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];

                    result.quadCmd.execute();

                    expect(deviceManager.blend).toBeTruthy();
                    expect(deviceManager.setBlendFuncSeparate).toCalledWith(material.blendFuncSeparate);
                    expect(deviceManager.setBlendEquationSeparate).toCalledWith(material.blendEquationSeparate);
                });
                it("else use material->default blendSrc/Dst,blendEquation", function(){
                    material.blend = true;

                    result.quadCmd.execute();

                    expect(deviceManager.blend).toBeTruthy();
                    expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                    expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                    expect(deviceManager.setBlendFuncSeparate).not.toCalled();
                });
            });
            it("if geometry has no index buffer, then drawArray", function(){
                var result = addCommand(true);

                result.quadCmd.execute();

                expect(gl.drawArrays).toCalledWith("TRIANGLES",0,24);
            });
            it("else, drawElements", function(){
                var result = addCommand();
                var quadCmd = result.quadCmd;

                result.quadCmd.execute();

                var indexBuffer = quadCmd.buffers.getChild(wd.EBufferDataType.INDICE);

                expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * 0);
            });
        });
    });
});

