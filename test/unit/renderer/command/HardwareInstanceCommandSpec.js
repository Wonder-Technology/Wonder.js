describe("InstanceCommand", function() {
    var sandbox = null;
    var deviceManager = null;
    var cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        cmd = wd.HardwareInstanceCommand.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("execute", function(){
        var gl, mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var cmd,shader,material,geometry;

            cmd = wd.HardwareInstanceCommand.create();
            var vsSource = "",
                fsSource = "";
            shader = wd.CommonShader.create( vsSource, fsSource );


            material = wd.BasicMaterial.create();
            material.color= wd.Color.create("#FFCDff");
            material.shader = shader;



            sandbox.stub(material, "init");


            geometry = wd.BoxGeometry.create();
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;
            geometry.material = material;
            geometry.init();


            cmd.buffers = geometry.buffers;

            if(isNoIndexBuffer){
                cmd.buffers.geometryData.faces = [];
            }

            cmd.mMatrix = mMatrix;
            cmd.vMatrix = vMatrix;
            cmd.pMatrix = pMatrix;


            cmd.material = material;

            cmd.blend = material.blend;


            //sandbox.stub(material, "bindAndUpdateTexture");
            sandbox.stub(material, "updateShader");

            return {
                cmd:cmd,
                material:material,
                shader:shader,
                geometry:geometry
            }
        }

        beforeEach(function(){
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
            cloneTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;
        });

        describe("draw", function(){
            var result;

            it("if not has instance to draw, return", function () {
                result = addCommand();
                result.cmd.instanceList = wdCb.Collection.create();

                result.cmd.webglState = wd.BasicState.create();
                sandbox.stub(result.cmd.webglState, "setState");

                result.cmd.execute();

                expect(result.cmd.webglState.setState).not.toCalled();
            });

            describe("if has instance to draw", function(){
                var extensionInstancedArrays;
                var data;
                var sourceInstance;
                var cmd;

                beforeEach(function(){
                    extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);

                    result = addCommand();

                    data = instanceTool.createInstance();

                    sourceInstance = data.source.getComponent(wd.SourceInstance);

                    sourceInstance.init();

                    cmd = result.cmd;

                    cmd.instanceList = sourceInstance.toRenderInstanceListForDraw;
                    cmd.instanceBuffer = sourceInstance.instanceBuffer;

                    sandbox.stub(cmd.program, "getAttribLocation");
                });

                it("instance array size should be instance buffer->float32InstanceArraySize", function () {
                    sandbox.stub(cmd.instanceBuffer, "resetData");

                    var float32InstanceArraySize = 10;
                    testTool.stubGetter(sinon, cmd.instanceBuffer, "float32InstanceArraySize", function(){
                        return float32InstanceArraySize;
                    });


                    cmd.execute();


                    expect(cmd.instanceBuffer.resetData.firstCall.args[0].length).toEqual(float32InstanceArraySize);
                });

                describe("if use modelMatrix drawer", function(){
                    it("capacity should be instanceCount * 4(float size) * 4(vec count) * 4(component count)", function () {
                    sandbox.stub(cmd.instanceBuffer, "setCapacity");

                    cmd.execute();

                    expect(cmd.instanceBuffer.setCapacity).toCalledWith(2 * 64);
                    });
                });

                describe("if use normalMatrix-modelMatrix drawer", function(){
                    beforeEach(function(){
                        cmd.glslData = wd.EInstanceGLSLData.NORMALMATRIX_MODELMATRIX;
                    });

                    it("capacity should be instanceCount * (modelMatrixSize:4(float size) * 4(vec count) * 4(component count) + normalMatrixSize: 4 * 3 * 3)", function () {
                        sandbox.stub(cmd.instanceBuffer, "setCapacity");

                        cmd.execute();

                        expect(cmd.instanceBuffer.setCapacity).toCalledWith(2 * (64 + 48));
                    });
                });
            });
        });
    });
});

