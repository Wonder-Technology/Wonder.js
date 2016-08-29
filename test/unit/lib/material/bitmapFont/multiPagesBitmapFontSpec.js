describe("multi pages bitmapFont test", function () {
    var sandbox = null;
    var director;
    var material,cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.closeContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    beforeEach(function(){

        material = wd.BitmapFontMaterial.create();

        cmd = rendererTool.createSingleDrawCommand(sandbox);

        cmd.material = material;

        material.geometry = {
            entityObject:wd.GameObject.create(),
            hasMultiPages:sandbox.stub().returns(true)
        }

        material.pageMapData = [];
    });

    describe("test pageMapSampler array", function(){
        var map1,map2,map3;

        beforeEach(function(){
        });

        it("test bind and send map data", function(){
            map1 = wd.ImageTexture.create();
            map2 = wd.ImageTexture.create();
            map3 = wd.ImageTexture.create();


            sandbox.stub(map1, "bindToUnit");
            sandbox.stub(map2, "bindToUnit");
            sandbox.stub(map3, "bindToUnit");

            sandbox.stub(map1, "update");
            sandbox.stub(map2, "update");
            sandbox.stub(map3, "update");



            material.pageMapData = [
                map1, map2, map3
            ];






            material.init();
            shaderTool.spyProgram(sandbox, material);





            sandbox.stub(map1, "getSamplerName").returns("u_sampler1");
            sandbox.stub(map2, "getSamplerName").returns("u_sampler2");
            sandbox.stub(map3, "getSamplerName").returns("u_sampler3");



            material.updateShader(cmd);



            expect(map1.bindToUnit).toCalledWith(0);
            expect(map2.bindToUnit).toCalledWith(1);
            expect(map3.bindToUnit).toCalledWith(2);

            expect(map1.update).toCalledOnce();
            expect(map2.update).toCalledOnce();
            expect(map3.update).toCalledOnce();




            expect(material.program.sendUniformData).toCalledWith("u_pageSampler2Ds[0]", wd.EVariableType.SAMPLER_ARRAY, [0,1,2]);
        });
    });

    describe("send glsl data", function(){
        beforeEach(function(){
        });

        describe("test glsl source", function(){
            beforeEach(function(){
            });

            it("send page buffer", function () {
                var buffer = {};
                sandbox.stub(cmd.buffers, "getChild").withArgs(wd.EBufferDataType.CUSTOM, "pages").returns(buffer);
                material.init();
                shaderTool.getAndStubProgram(sandbox, material);


                material.updateShader(cmd);

                expect(material.program.sendAttributeBuffer.withArgs("a_page", wd.EVariableType.BUFFER, buffer)).toCalledOnce();
            });

            describe("test glsl source", function(){
                var map1,map2;

                beforeEach(function(){
                    map1 = wd.ImageTexture.create();
                    map2 = wd.ImageTexture.create();

                    material.pageMapData = [map1, map2];
                });

                it("sample the corresponding page's map", function () {
                    material.init();

                    material.updateShader(cmd);

                    expect(glslTool.contain(material.shader.fsSource, "if(v_page == 0.0)")).toBeTruthy();
                    expect(glslTool.contain(material.shader.fsSource, "else if(v_page == 1.0)")).toBeTruthy();

                    expect(glslTool.contain(material.shader.fsSource, "else if(v_page == 2.0)")).toBeFalsy();
                });
                it("not send bitmap", function () {
                    material.init();

                    material.updateShader(cmd);

                    expect(glslTool.contain(material.shader.fsSource, "u_bitmapSampler")).toBeFalsy();
                });
                it("define PAGE_COUNT", function(){
                    material.init();

                    material.updateShader(cmd);

                    expect(shaderTool.judgeGLSLDefine(material.shader.fsSource, "PAGE_COUNT", 2));
                });
            });
        });
    });
});


