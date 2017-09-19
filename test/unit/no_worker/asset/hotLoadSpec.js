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

        describe("test load texture for basic material", function () {
            it("should bind,update,send loaded texture", function (done) {
                var material1 = basicMaterialTool.create();
                var texture1 = textureTool.create();
                var source1 = {s:1};

                textureTool.setSource(texture1, source1);

                basicMaterialTool.addMap(material1, texture1);

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
                        var source2 = wd.getAsset("jpg").source;
                        var texture2 = wd.getAsset("jpg").toTexture();

                        var data = sceneSystemTool.createGameObject(null, null);

                        var newGameObject = data.gameObject,
                            newMaterial = data.material;

                        basicMaterialTool.addMap(newMaterial, texture2);



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
});