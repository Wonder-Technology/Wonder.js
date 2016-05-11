describe("SingleDrawCommand", function() {
    var sandbox = null;
    var deviceManager = null;
    var cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        cmd = wd.SingleDrawCommand.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    //describe("normalMatrix(getter)", function(){
    //    beforeEach(function(){
    //    });
    //
    //    it("get normal matrix", function(){
    //        var mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
    //        cmd.mMatrix = mMatrix.clone();
    //
    //        expect(cmd.normalMatrix.values).toEqual(
    //            cmd.mMatrix.invertTo3x3().transpose().values
    //        );
    //        expect(
    //            testTool.getValues(
    //                cmd.mMatrix.values
    //            )
    //        ).toEqual(
    //            testTool.getValues(
    //                mMatrix.values
    //            )
    //        );
    //    });
    //
    //    //describe("test cache", function(){
    //    //    var changedMatrix;
    //    //
    //    //    beforeEach(function(){
    //    //        cmd.mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
    //    //
    //    //        changedMatrix = wd.Matrix4.create([ 100, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
    //    //    });
    //    //
    //    //    it("if cached, return cached data", function(){
    //    //        sandbox.spy(cmd.mMatrix, "invertTo3x3");
    //    //
    //    //        var m1 = cmd.normalMatrix;
    //    //        expect(cmd.mMatrix.invertTo3x3).toCalledOnce();
    //    //
    //    //        var m2 = cmd.normalMatrix;
    //    //
    //    //
    //    //        expect(m1.values).toEqual(m2.values);
    //    //        expect(cmd.mMatrix.invertTo3x3).not.toCalledTwice();
    //    //    });
    //    //    it("if change mMatrix, clear cache", function () {
    //    //        var m1 = cmd.normalMatrix;
    //    //
    //    //        cmd.mMatrix = changedMatrix;
    //    //
    //    //        var m2 = cmd.normalMatrix;
    //    //
    //    //        expect(m1.values).not.toEqual(m2.values);
    //    //    });
    //    //});
    //});

    describe("mvpMatrix(getter)", function(){
        beforeEach(function(){
        });

        it("get mvp matrix", function(){
            var mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
            cmd.mMatrix = mMatrix.clone();
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

        //describe("test cache", function(){
        //    var changedMatrix;
        //
        //    beforeEach(function(){
        //        cmd.mMatrix = wd.Matrix4.create([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
        //        cmd.vMatrix = wd.Matrix4.create([ 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
        //        cmd.pMatrix = wd.Matrix4.create([ 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
        //
        //        changedMatrix = wd.Matrix4.create([ 100, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1 ]);
        //    });
        //
        //    it("if cached, return cached data", function(){
        //        sandbox.spy(cmd.mMatrix, "applyMatrix");
        //
        //        var m1 = cmd.mvpMatrix;
        //        expect(cmd.mMatrix.applyMatrix).toCalledOnce();
        //
        //        var m2 = cmd.mvpMatrix;
        //
        //
        //        expect(m1.values).toEqual(m2.values);
        //        expect(cmd.mMatrix.applyMatrix).not.toCalledTwice();
        //    });
        //    it("if change mMatrix, clear cache", function () {
        //        var m1 = cmd.mvpMatrix;
        //
        //        cmd.mMatrix = changedMatrix;
        //
        //        var m2 = cmd.mvpMatrix;
        //
        //        expect(m1.values).not.toEqual(m2.values);
        //    });
        //    it("if change vMatrix, clear cache", function () {
        //        var m1 = cmd.mvpMatrix;
        //
        //        cmd.vMatrix = changedMatrix;
        //
        //        var m2 = cmd.mvpMatrix;
        //
        //        expect(m1.values).not.toEqual(m2.values);
        //    });
        //    it("if change pMatrix, clear cache", function () {
        //        var m1 = cmd.mvpMatrix;
        //
        //        cmd.pMatrix = changedMatrix;
        //
        //        var m2 = cmd.mvpMatrix;
        //
        //        expect(m1.values).not.toEqual(m2.values);
        //    });
        //});
    });

    describe("execute", function(){
        var gl, mMatrix,vMatrix,pMatrix;

        function addCommand(isNoIndexBuffer){
            var cmd,shader,material,geometry;

            cmd = wd.SingleDrawCommand.create();
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
            cloneTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;
        });

        describe("draw", function(){
                it("if geometry has no index buffer, then drawArray", function(){
                    var result = addCommand(true);

                    result.cmd.execute();

                    expect(gl.drawArrays).toCalledWith("TRIANGLES",0,24);
                });
                it("else, drawElements", function(){
                    var result = addCommand();
                    var cmd = result.cmd;

                    result.cmd.execute();

                    var indexBuffer = cmd.buffers.getChild(wd.EBufferDataType.INDICE);

                    expect(gl.bindBuffer.args.slice(-1)).toEqual([[gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer]]);
                    expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * 0);
                });
        });
    });
});

