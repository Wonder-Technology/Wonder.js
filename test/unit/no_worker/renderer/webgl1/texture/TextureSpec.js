describe("Texture", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var texture;

    var gl;
    var state;

    var DataBufferConfig = wd.DataBufferConfig;
    var TextureData = wd.TextureData;
    var ETextureWrapMode = wd.ETextureWrapMode;
    var ETextureFilterMode = wd.ETextureFilterMode;
    var ETextureFormat = wd.ETextureFormat;
    var ETextureType = wd.ETextureType;
    var ETextureTarget = wd.ETextureTarget;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        texture = textureSystemTool.create();

        basicMaterialTool.setMap(material, texture);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("init glTextures", function () {
        beforeEach(function () {
        });

        describe("create webgl texture", function () {
            it("if already created, not create again", function () {
                directorTool.init(state);
                directorTool.init(state);

                expect(gl.createTexture).toCalledOnce();
            });
            it("else, create", function () {
                directorTool.init(state);

                expect(gl.createTexture).toCalledOnce();
            });
        });
    });

    describe("bindToUnit", function () {
        beforeEach(function () {
            testTool.closeContractCheck();
        });

        it("if texture of the specific unit is cached, not bind and active it again", function () {
            directorTool.init(state);

            directorTool.loopBody(state);


            expect(gl.activeTexture).toCalledOnce();
            expect(gl.bindTexture).toCalledOnce();


            directorTool.loopBody(state);


            expect(gl.activeTexture).toCalledOnce();
            expect(gl.bindTexture).toCalledOnce();
        });

        describe("else", function () {
            var texture2;
            var glUnit0 = "TEXTURE0";
            var glUnit1 = "TEXTURE1";

            beforeEach(function () {
                testTool.closeContractCheck();

                texture2 = textureSystemTool.create();
                lightMaterialTool.setDiffuseMap(material, texture2);

                glUnit0 = "TEXTURE0";
                glUnit1 = "TEXTURE1";
                gl["TEXTURE0"] = glUnit0;
                gl["TEXTURE1"] = glUnit1;
            });

            it("active texture unit", function () {
                directorTool.init(state);

                directorTool.loopBody(state);


                expect(gl.activeTexture.withArgs(glUnit0)).toCalledOnce();
                expect(gl.activeTexture.withArgs(glUnit1)).toCalledOnce();

                expect(gl.activeTexture.withArgs(glUnit1)).toCalledAfter(gl.activeTexture.withArgs(glUnit0));
            });
            it("bind gl texture", function () {
                var glTarget = 0;
                gl[ETextureTarget.TEXTURE_2D] = glTarget;

                var glTextureObj1 = { obj: 1 };
                var glTextureObj2 = { obj: 2 };

                gl.createTexture.onCall(0).returns(glTextureObj1);
                gl.createTexture.onCall(1).returns(glTextureObj2);

                directorTool.init(state);

                directorTool.loopBody(state);


                expect(gl.bindTexture.withArgs(glTarget, glTextureObj1)).toCalledOnce();
                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledOnce();

                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledAfter(gl.bindTexture.withArgs(glTarget, glTextureObj1));

                expect(gl.bindTexture.withArgs(glTarget, glTextureObj1)).toCalledAfter(gl.activeTexture.withArgs(glUnit0));
                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledAfter(gl.activeTexture.withArgs(glUnit1));
            });
        });
    });

    describe("sendData", function () {
        beforeEach(function(){
            testTool.closeContractCheck();
        });
        
        it("send unit index", function () {
            var pos1 = 0;
            var pos2 = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D").returns(pos1);
            gl.getUniformLocation.withArgs(sinon.match.any, "u_diffuseMapSampler").returns(pos2);


            var texture2 = textureSystemTool.create();

            lightMaterialTool.setDiffuseMap(material, texture2);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniform1i.getCall(0)).toCalledWith(pos1, 0);
            expect(gl.uniform1i.getCall(1)).toCalledWith(pos2, 1);
        });
    })
});
