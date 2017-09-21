describe("hot load", function () {
    var sandbox = null;
    var state,
        gl;

    var material1,
        activeTextureCallCount,
        bindTextureCallCount,
        texImage2DCallCount;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        material1 = basicMaterialTool.create();

        basicMaterialTool.setMap(material1, textureSystemTool.createTexture());

        sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material1);

        directorTool.init(state);
        directorTool.loopBody(state);


        activeTextureCallCount = gl.activeTexture.callCount;
        bindTextureCallCount = gl.bindTexture.callCount;
        texImage2DCallCount = gl.texImage2D.callCount;

    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test load texture for new added gameObject at runtime", function () {
        describe("test load texture for basic material", function () {
            it("should bind,update,send loaded texture", function (done) {
                assetSystemTool.load({ url: resUtils.getRes("1.jpg"), id: "jpg" })
                    .subscribe(function (data) {
                    }, function (err) {
                        expect().toFail(err);
                        done();
                    }, function () {
                        var source2 = wd.getAsset("jpg").source;
                        var texture2 = wd.getAsset("jpg").toTexture();

                        var data = sceneSystemTool.createGameObject(null, null);

                        var newGameObject = data.gameObject,
                            newMaterial = data.material;

                        basicMaterialTool.setMap(newMaterial, texture2);



                        var glTexture2 = {a:2};

                        gl.createTexture.returns(glTexture2);



                        gameObjectTool.init(newGameObject);

                        sceneTool.addGameObject(newGameObject);






                        directorTool.loopBody(state);



                        expect(gl.activeTexture.getCall(activeTextureCallCount)).toCalledWith(gl.TEXTURE0);
                        expect(gl.bindTexture.getCall(bindTextureCallCount)).toCalledWith(gl.TEXTURE_2D, glTexture2);
                        expect(gl.texImage2D.getCall(texImage2DCallCount)).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source2);


                        done();
                    });
            });
        });
    });

    describe("test change texture at runtime", function () {
        it("should bind,update,send new texture", function (done) {
            assetSystemTool.load({ url: resUtils.getRes("1.jpg"), id: "jpg" })
                .subscribe(function (data) {
                }, function (err) {
                    expect().toFail(err);
                    done();
                }, function () {
                    var glTexture2 = {a:2};

                    gl.createTexture.returns(glTexture2);


                    var source2 = wd.getAsset("jpg").source;
                    var texture2 = wd.getAsset("jpg").toTexture();


                    basicMaterialTool.setMap(material1, texture2);

                    textureSystemTool.init(texture2);




                    directorTool.loopBody(state);



                    expect(gl.activeTexture.getCall(activeTextureCallCount)).toCalledWith(gl.TEXTURE0);
                    expect(gl.bindTexture.getCall(bindTextureCallCount)).toCalledWith(gl.TEXTURE_2D, glTexture2);
                    expect(gl.texImage2D.getCall(texImage2DCallCount)).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source2);


                    done();
                });
        });
    });
});