describe("test vao", function () {
    var sandbox = null;
    var gl;
    var state;
    var material;
    var cameraGameObject;
    var geo;
    var vao;
    var gameObject;

    var Log = wd.Log;
    var ProgramData = wd.WebGL2ProgramData;

    function getCreateVaoMethod(gl) {
        return gl.createVertexArray;
    }

    function getBindVaoMethod(gl) {
        return gl.bindVertexArray;
    }

    function getDeleteVboMethod(gl) {
        return gl.deleteBuffer;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, basicMaterialTool.create());

        material = data.material;
        cameraGameObject = data.cameraGameObject;
        geo = data.geometry;
        gameObject = data.gameObject;


        deferShadingTool.disableDeferShading(sandbox);
        sandbox.stub(Log, "warn");

        vao = {a:1};

        getCreateVaoMethod(gl).returns(vao);
    });

    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("set vao data", function(){
        it("only set once when first loop", function () {
            directorTool.init(state);

            expect(getCreateVaoMethod(gl)).not.toCalled();

            directorTool.loopBody(state);

            expect(getCreateVaoMethod(gl)).toCalledOnce();

            directorTool.loopBody(state);

            expect(getCreateVaoMethod(gl)).toCalledOnce();
        });
        it("create vao", function () {
            directorTool.init(state);

            directorTool.loopBody(state);

            expect(getCreateVaoMethod(gl)).toCalledOnce();
        });
        it("bind vao", function () {
            directorTool.init(state);

            directorTool.loopBody(state);

            expect(getBindVaoMethod(gl).withArgs(vao)).toCalledTwice();
        });

        describe("test set vbo", function() {
            function judgeArrayBuffer(createBufferCallIndex, location, size, getGeometryDataMethodName) {
                var buffer = {a:0};
                gl.createBuffer.onCall(createBufferCallIndex).returns(buffer);

                var vertexAttribPointerCallCount = gl.vertexAttribPointer.withArgs(location, size, gl.FLOAT, false, 0, 0).callCount;
                var enableVertexAttribArrayCallCount = gl.enableVertexAttribArray.withArgs(location).callCount;

                directorTool.loopBody(state);

                var data = geometryTool[getGeometryDataMethodName](geo);



                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer)).toCalledOnce();
                expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                expect(gl.vertexAttribPointer.withArgs(location, size, gl.FLOAT, false, 0, 0).callCount).toEqual(vertexAttribPointerCallCount + 1);
                expect(gl.enableVertexAttribArray.withArgs(location).callCount).toEqual(enableVertexAttribArrayCallCount + 1);
            }

            function judgeIndexBuffer(createBufferCallIndex) {
                    var buffer = {a:1};
                    gl.createBuffer.onCall(createBufferCallIndex).returns(buffer);

                    directorTool.loopBody(state);

                    var data = geometryTool.getIndices(geo);



                    expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, buffer)).toCalledOnce();
                    expect(gl.bufferData.withArgs(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
            }

            describe("test basic material gameObject", function() {
                beforeEach(function(){
                    directorTool.init(state);
                });

                it("create and init position array buffer", function () {
                    judgeArrayBuffer(2, 0, 3, "getVertices");
                });

                it("create and init index element buffer", function () {
                    judgeIndexBuffer(3);
                });
            });

            describe("test light material gameObject", function() {
                beforeEach(function () {
                    deferShadingTool.enableDeferShading(sandbox);

                    directorTool.init(state);

                    sceneTool.removeGameObject(gameObject);

                    var data = sceneTool.prepareGameObjectAndAddToScene(true, null, lightMaterialTool.create());

                    material = data.material;
                    geo = data.geometry;
                    gameObject = data.gameObject;

                    var texture = textureTool.create();
                    textureTool.setSource(texture, {});

                    lightMaterialTool.setDiffuseMap(material, texture);


                    gameObjectTool.init(gameObject);
                });

                it("create and init position array buffer", function () {
                    judgeArrayBuffer(11, 0, 3, "getVertices");
                });
                it("create and init normal array buffer", function () {
                    judgeArrayBuffer(12, 1, 3, "getNormals");
                });
                it("create and init texCoord array buffer", function () {
                    judgeArrayBuffer(13, 2, 2, "getTexCoords");
                });
                it("create and init index buffer", function () {
                    judgeIndexBuffer(14);
                });
            });
        });

        it("unbind vao", function () {
            directorTool.init(state);

            directorTool.loopBody(state);

            expect(getBindVaoMethod(gl).withArgs(null)).toCalledOnce();
        });
    });

    describe("bind vao", function() {
        beforeEach(function(){
        });

        it("if last binded vao isn't the same one, bind it", function () {
            directorTool.init(state);

            directorTool.loopBody(state);

            var callCount = getBindVaoMethod(gl).withArgs(vao).callCount;



            ProgramData.lastBindedVao = null;

            directorTool.loopBody(state);

            expect(getBindVaoMethod(gl).withArgs(vao).callCount).toEqual(callCount + 1);
        });

        describe("else, not bind", function () {
            it("test one gameObject", function () {
                directorTool.init(state);

                directorTool.loopBody(state);


                var callCount = getBindVaoMethod(gl).withArgs(vao).callCount;

                directorTool.loopBody(state);

                expect(getBindVaoMethod(gl).withArgs(vao).callCount).toEqual(callCount);
            });
            it("test two gameObject with the same geometry component", function () {
                var gameObject2 = sceneTool.createGameObject(geo);

                sceneTool.addGameObject(gameObject2);



                directorTool.init(state);

                directorTool.loopBody(state);

                var callCount = getBindVaoMethod(gl).withArgs(vao).callCount;



                directorTool.loopBody(state);

                expect(getBindVaoMethod(gl).withArgs(vao).callCount).toEqual(callCount);
            });
        });
    });

    it("not bind index buffer if not set vao", function () {
        directorTool.init(state);

        directorTool.loopBody(state);

        expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER)).not.toCalledAfter(getBindVaoMethod(gl).withArgs(null));
    });
});
