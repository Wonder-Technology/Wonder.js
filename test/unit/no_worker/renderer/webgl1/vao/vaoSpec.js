describe("test vao", function () {
    var sandbox = null;
    var gl;
    var state;
    var material;
    var cameraGameObject;
    var geo;
    var gameObject;

    var Log = wd.Log;
    var ProgramData = wd.WebGL1ProgramData;
    var GLSLSenderData = wd.WebGL1GLSLSenderData;

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
    });

    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("if not support vao extension, not use vao", function () {
        gpuDetectTool.setGPUDetectData("extensionVao", null);


        directorTool.init(state);

        directorTool.loopBody(state);

        expect(gl.createVertexArray).not.toCalled();
    });

    describe("else", function() {
        var extension;
        var vao;

        function getCreateVaoMethod(extension) {
            return extension.createVertexArrayOES;
        }

        function getBindVaoMethod(extension) {
            return extension.bindVertexArrayOES;
        }

        beforeEach(function(){
            extension = {
                createVertexArrayOES:sandbox.stub(),
                bindVertexArrayOES:sandbox.stub()
            }

            gpuDetectTool.setGPUDetectData("extensionVao", extension);

            vao = {a:1};

            getCreateVaoMethod(extension).returns(vao);
        });

        describe("set vao data", function(){
            it("only set once when first loop", function () {
                directorTool.init(state);

                expect(getCreateVaoMethod(extension)).not.toCalled();

                directorTool.loopBody(state);

                expect(getCreateVaoMethod(extension)).toCalledOnce();

                directorTool.loopBody(state);

                expect(getCreateVaoMethod(extension)).toCalledOnce();
            });
            it("create vao", function () {
                directorTool.init(state);

                directorTool.loopBody(state);

                expect(getCreateVaoMethod(extension)).toCalledOnce();
            });
            it("bind vao", function () {
                directorTool.init(state);

                directorTool.loopBody(state);

                expect(getBindVaoMethod(extension).withArgs(vao)).toCalledTwice();
            });

            describe("test set vbo", function() {
                function judgeArrayBuffer(createBufferCallIndex, location, size, getGeometryDataMethodName, name) {
                    var buffer = {a:0};
                    gl.createBuffer.onCall(createBufferCallIndex).returns(buffer);


                    GLSLSenderData.attributeLocationMap[name] = location;


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
                        judgeArrayBuffer(0, 0, 3, "getVertices", "a_position");
                    });

                    it("create and init index element buffer", function () {
                        judgeIndexBuffer(1);
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
                        judgeArrayBuffer(0, 0, 3, "getVertices", "a_position");
                    });
                    it("create and init normal array buffer", function () {
                        judgeArrayBuffer(1, 1, 3, "getNormals", "a_normal");
                    });
                    it("create and init texCoord array buffer", function () {
                        judgeArrayBuffer(2, 2, 2, "getTexCoords", "a_texCoord");
                    });
                    it("create and init index buffer", function () {
                        judgeIndexBuffer(3);
                    });
                });
            });

            it("unbind vao", function () {
                directorTool.init(state);

                directorTool.loopBody(state);

                expect(getBindVaoMethod(extension).withArgs(null)).toCalledOnce();
            });
        });

        describe("bind vao", function() {
            beforeEach(function(){
            });

            it("if last binded vao isn't the same one, bind it", function () {
                directorTool.init(state);

                directorTool.loopBody(state);

                var callCount = getBindVaoMethod(extension).withArgs(vao).callCount;



                ProgramData.lastBindedVao = null;

                directorTool.loopBody(state);

                expect(getBindVaoMethod(extension).withArgs(vao).callCount).toEqual(callCount + 1);
            });
            it("else, not bind", function () {
                directorTool.init(state);

                directorTool.loopBody(state);


                var callCount = getBindVaoMethod(extension).withArgs(vao).callCount;

                directorTool.loopBody(state);

                expect(getBindVaoMethod(extension).withArgs(vao).callCount).toEqual(callCount);
            });
        });

        it("not bind index buffer if not set vao", function () {
            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER)).not.toCalledAfter(getBindVaoMethod(extension).withArgs(null));
        });
    });
});
