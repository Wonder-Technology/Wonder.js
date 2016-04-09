describe("QuadCommand", function() {
    var sandbox = null;
    var deviceManager = null;
    var cmd;

    function createQuadCommand(){
        var cmd = new wd.QuadCommand();
        cmd.draw = sandbox.stub();

        return cmd;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        cmd = createQuadCommand();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("execute", function(){
        var gl, mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var cmd,shader,material,geometry;

            cmd = createQuadCommand();
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

        //it("bind and update texture", function(){
        //    var result = addCommand();
        //
        //    result.cmd.execute();
        //
        //    expect(result.material.bindAndUpdateTexture).toCalledOnce();
        //});
        it("update shader", function(){
            var result = addCommand();

            result.cmd.execute();

            expect(result.material.updateShader).toCalledWith(result.cmd);
        });

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
                result.cmd.webglState.setState(material);

                expect(deviceManager.setColorWrite).toCalledWith(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
                expect(deviceManager.polygonOffsetMode).toEqual(material.polygonOffsetMode);
            });
            it("set side:if set SceneDispatcher->side, use it", function(){
                wd.Director.getInstance().scene.side = wd.ESide.BACK;

                result.cmd.webglState.setState(material);

                expect(deviceManager.side).toEqual(wd.ESide.BACK);
            });
            it("else, use material->side", function () {
                material.side = wd.ESide.BOTH;

                result.cmd.webglState.setState(material);

                expect(deviceManager.side).toEqual(wd.ESide.BOTH);
            });
            it("if set material->blendSrc/Dst,blendEquation, use it", function () {
                material.blend = true;
                material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];
                material.blendSrc = wd.EBlendFunc.SRC_ALPHA;
                material.blendDst = wd.EBlendFunc.ONE;

                result.cmd.webglState.setState(material);

                expect(deviceManager.blend).toBeTruthy();
                expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                expect(deviceManager.setBlendFuncSeparate).not.toCalled();
            });
            it("if set material->blendFuncSeparate && blendEquationSeparate, use it", function(){
                material.blend = true;
                material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                material.blendEquationSeparate = [wd.EBlendEquation.ADD, wd.EBlendEquation.ADD];

                result.cmd.webglState.setState(material);

                expect(deviceManager.blend).toBeTruthy();
                expect(deviceManager.setBlendFuncSeparate).toCalledWith(material.blendFuncSeparate);
                expect(deviceManager.setBlendEquationSeparate).toCalledWith(material.blendEquationSeparate);
            });
            it("else use material->default blendSrc/Dst,blendEquation", function(){
                material.blend = true;

                result.cmd.webglState.setState(material);

                expect(deviceManager.blend).toBeTruthy();
                expect(deviceManager.setBlendFunc).toCalledWith(material.blendSrc, material.blendDst);
                expect(deviceManager.setBlendEquation).toCalledWith(material.blendEquation);
                expect(deviceManager.setBlendFuncSeparate).not.toCalled();
            });
        });
    });
});

