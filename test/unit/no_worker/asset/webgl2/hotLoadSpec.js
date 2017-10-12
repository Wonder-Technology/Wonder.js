describe("hot load", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test load texture for new added gameObject at runtime", function () {
        var state,
            gl;

        beforeEach(function () {
            state = stateTool.createAndSetFakeGLState(sandbox);

            gl = stateTool.getGLFromFakeGLState(state);
        });

        describe("test load texture for light material", function () {
            describe("should bind,update,send loaded texture", function () {
                var material1;

                beforeEach(function(){
                    var pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, sinon.match.any).returns(pos);

                    material1 = lightMaterialTool.create();
                    var texture1 = textureTool.create();
                    var source1 = { s: 1 };

                    textureTool.setSource(texture1, source1);

                    lightMaterialTool.setDiffuseMap(material1, texture1);

                    sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material1);
                });

                function judge(done, activeTextureCallCount, bindTextureCallCount, texImage2DCallCount) {
                    var source2 = wd.getAsset("jpg").source;
                    var texture2 = wd.getAsset("jpg").toTexture();


                    var newMaterial = lightMaterialTool.create();

                    var data = sceneSystemTool.createGameObject(null, newMaterial);

                    var newGameObject = data.gameObject;

                    lightMaterialTool.setDiffuseMap(newMaterial, texture2);




                    var glTexture2 = { a: 2 };

                    gl.createTexture.returns(glTexture2);


                    gameObjectTool.init(newGameObject);




                    sceneTool.addGameObject(newGameObject);


                    directorTool.loopBody(state);


                    expect(gl.activeTexture.getCall(activeTextureCallCount)).toCalledWith(gl.TEXTURE3);

                    expect(gl.bindTexture.getCall(bindTextureCallCount)).toCalledWith(gl.TEXTURE_2D, glTexture2);
                    expect(gl.texImage2D.getCall(texImage2DCallCount)).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source2);
                    expect(gl.uniform1i).toCalledWith(sinon.match.any, 3);


                    done();
                }

                it("test set diffuseMap", function (done) {
                    directorTool.init(state);
                    directorTool.loopBody(state);


                    var activeTextureCallCount = gl.activeTexture.callCount;
                    var bindTextureCallCount = gl.bindTexture.callCount;
                    var texImage2DCallCount = gl.texImage2D.callCount;

                    assetSystemTool.load({ url: resUtils.getRes("1.jpg"), id: "jpg" })
                        .subscribe(function (data) {
                        }, function (err) {
                            expect().toFail(err);
                            done();
                        }, function () {
                            judge(done, activeTextureCallCount, bindTextureCallCount, texImage2DCallCount);
                        });
                });

                describe("test set diffuseMap and specularMap", function () {
                    it("test old gameObject has diffuseMap and specularMap", function (done) {
                        var texture1 = textureTool.create();
                        var source1 = { s: 1 };

                        textureTool.setSource(texture1, source1);

                        lightMaterialTool.setSpecularMap(material1, texture1);


                        sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material1);

                        directorTool.init(state);
                        directorTool.loopBody(state);


                        var activeTextureCallCount = gl.activeTexture.callCount;
                        var bindTextureCallCount = gl.bindTexture.callCount;
                        var texImage2DCallCount = gl.texImage2D.callCount;

                        assetSystemTool.load({ url: resUtils.getRes("1.jpg"), id: "jpg" })
                            .subscribe(function (data) {
                            }, function (err) {
                                expect().toFail(err);
                                done();
                            }, function () {
                                judge(done, activeTextureCallCount, bindTextureCallCount, texImage2DCallCount);
                            });
                    });
                    it("test new gameObject has loaded diffuseMap and loaded specularMap", function () {
                        //todo finish

                        expect().toPass();
                    });
                });
            });
        });
    });
});