describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GBufferData = wd.GBufferData;
    var ShaderData = wd.WebGL2ShaderData;
    var ProgramData = wd.WebGL2ProgramData;
    var DeferDirectionLightPassData = wd.DeferDirectionLightPassData;
    var DeferPointLightPassData = wd.DeferPointLightPassData;
    var Log = wd.Log;

    function buildGLSL(state) {
        directorTool.init(state);
    }

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    function getDeferPointLightPassProgram() {
        var shaderIndex = ShaderData.shaderIndexByShaderNameMap["DeferPointLightPass"];

        return ProgramData.programMap[shaderIndex];
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        enableDeferShading(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("init defer shading", function () {
        var positionTarget, normalTarget, colorTarget, depthTexture;

        function stubCreateGbufferTarget() {
            positionTarget = {a:0};
            normalTarget = {a:1};
            colorTarget = {a:2};
            depthTexture = {a:3};

            gl.createTexture.onCall(0).returns(positionTarget);
            gl.createTexture.onCall(1).returns(normalTarget);
            gl.createTexture.onCall(2).returns(colorTarget);
            gl.createTexture.onCall(3).returns(depthTexture);
        }

        it("if not support extensionColorBufferFloat, warn", function () {
            gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", false)
            sandbox.stub(Log, "warn");

            directorTool.init(state);

            expect(Log.warn).toCalledWith("defer shading need support extensionColorBufferFloat extension");
        });

        describe("init DeferLightPass shader", function () {
            it("set shader index to map", function () {
                directorTool.init(state);

                expect(ShaderData.shaderIndexByShaderNameMap["DeferDirectionLightPass"]).toBeNumber();
                expect(ShaderData.shaderIndexByShaderNameMap["DeferPointLightPass"]).toBeNumber();
            });
        });

        describe("init gBuffer", function () {
            var gBuffer;

            beforeEach(function () {
                gBuffer = {a:1};
                gl.createFramebuffer.returns(gBuffer);
            });

            it("create gBuffer", function () {
                directorTool.init(state);

                expect(gl.createFramebuffer).toCalledOnce();
            });
            it("bind gBuffer", function () {
                directorTool.init(state);

                expect(gl.bindFramebuffer).toCalledWith(gl.FRAMEBUFFER, gBuffer);
            });

            describe("init gBuffer target", function() {
                function judge(index, format, attach) {
                    var target;

                    beforeEach(function(){
                        target = {};

                        gl.createTexture.onCall(index).returns(target);
                    });

                    it("create texture after bind gBuffer", function () {
                        directorTool.init(state);

                        expect(gl.createTexture.getCall(index)).toCalledAfter(gl.bindFramebuffer.getCall(0));
                    });
                    it("init texture", function () {
                        directorTool.init(state);

                        expect(gl.bindTexture).toCalledWith(gl.TEXTURE_2D, target);
                        expect(gl.pixelStorei).toCalledWith(gl.UNPACK_FLIP_Y_WEBGL, false);


                        var paramIndex = index * 4;
                        expect(gl.texParameteri.getCall(paramIndex)).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                        expect(gl.texParameteri.getCall(paramIndex + 1)).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        expect(gl.texParameteri.getCall(paramIndex + 2)).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        expect(gl.texParameteri.getCall(paramIndex + 3)).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                        expect(gl.texStorage2D.getCall(index)).toCalledWith(gl.TEXTURE_2D, 1, gl[format], gl.drawingBufferWidth, gl.drawingBufferHeight);
                    });
                    it("attach texture to framebuffer", function () {
                        directorTool.init(state);

                        expect(gl.framebufferTexture2D.getCall(index)).toCalledWith(gl.FRAMEBUFFER, gl[attach], gl.TEXTURE_2D, target, 0);
                    });
                }

                beforeEach(function(){
                });

                it("create texture before unbind gBuffer", function () {
                    directorTool.init(state);

                    expect(gl.createTexture.getCall(0)).toCalledBefore(gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER, null).getCall(0));
                });
                describe("init position target", function () {
                    judge(0, "RGBA16F", "COLOR_ATTACHMENT0");
                });

                describe("init normal target", function () {
                    judge(1, "RGBA16F", "COLOR_ATTACHMENT1");
                });

                describe("init color target", function () {
                    judge(2, "RGBA16F", "COLOR_ATTACHMENT2");
                });

                describe("init depth texture", function () {
                    judge(3, "DEPTH_COMPONENT16", "DEPTH_ATTACHMENT");
                });

                it("draw buffers", function () {
                    directorTool.init(state);

                    expect(gl.drawBuffers).toCalledWith([
                        gl.COLOR_ATTACHMENT0,
                        gl.COLOR_ATTACHMENT1,
                        gl.COLOR_ATTACHMENT2
                    ]);
                });
                it("unbind framebuffer", function () {
                    directorTool.init(state);

                    expect(gl.bindFramebuffer.getCall(1)).toCalledWith(gl.FRAMEBUFFER, null);
                });
                it("save gBuffer", function () {
                    directorTool.init(state);

                    expect(GBufferData.gBuffer).toEqual(gBuffer);
                });
                it("save target and depth texture", function () {
                    stubCreateGbufferTarget();

                    directorTool.init(state);

                    expect(GBufferData.positionTarget).toEqual(positionTarget);
                    expect(GBufferData.normalTarget).toEqual(normalTarget);
                    expect(GBufferData.colorTarget).toEqual(colorTarget);
                    expect(GBufferData.depthTexture).toEqual(depthTexture);
                });
            });
        });

        describe("init defer light pass", function () {
            beforeEach(function () {
            });

            describe("set full screen quad vao data", function () {
                var vao1,
                    vao2;

                beforeEach(function(){
                    vao1 = {a:1};
                    vao2 = {a:2};

                    gl.createVertexArray.onCall(0).returns(vao1);
                    gl.createVertexArray.onCall(1).returns(vao2);
                });

                it("create vao", function () {
                    directorTool.init(state);

                    expect(gl.createVertexArray).toCalledTwice();
                    expect(DeferDirectionLightPassData.fullScreenQuadVertexArray).toEqual(vao1);
                    expect(DeferPointLightPassData.fullScreenQuadVertexArray).toEqual(vao2);
                });
                it("bind vao", function () {
                    directorTool.init(state);

                    expect(gl.bindVertexArray.getCall(0)).toCalledWith(vao1);
                    expect(gl.bindVertexArray.getCall(2)).toCalledWith(vao2);
                });

                describe("create and set buffer", function() {
                    function judge(index, location, size, data) {
                        var buffer;

                        beforeEach(function(){
                            buffer = {b:1};

                            gl.createBuffer.onCall(index + 2).returns(buffer);
                        });

                        it("bind buffer", function () {
                            directorTool.init(state);

                            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer);
                        });
                        it("buffer data", function () {
                            directorTool.init(state);

                            expect(gl.bufferData).toCalledWith(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
                        });
                        it("vertexAttribPointer", function () {
                            directorTool.init(state);

                            expect(gl.vertexAttribPointer).toCalledWith(location, size, gl.FLOAT, false, 0, 0);
                        });
                        it("enableVertexAttribArray", function () {
                            directorTool.init(state);

                            expect(gl.enableVertexAttribArray).toCalledWith(location);
                        });
                    }


                    it("create buffers", function () {
                        directorTool.init(state);

                        expect(gl.createBuffer.callCount).toEqual(2 + 3 + 3);
                    });

                    describe("create and set position buffer", function() {
                        judge(0, 0, 3, new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]));
                        judge(2, 0, 3, new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]));
                    });

                    describe("create and set texCoord buffer", function() {
                        judge(1, 1, 2, new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]));
                        judge(3, 1, 2, new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]));
                    });

                    describe("create and set index buffer", function() {
                        var buffer;

                        beforeEach(function(){
                            buffer = {b:1};

                            gl.createBuffer.onCall(2 + 2).returns(buffer);
                        });

                        it("bind buffer", function () {
                            directorTool.init(state);

                            expect(gl.bindBuffer).toCalledWith(gl.ELEMENT_ARRAY_BUFFER, buffer);
                        });
                        it("buffer data", function () {
                            directorTool.init(state);

                            expect(gl.bufferData).toCalledWith(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
                        });
                    });
                });

                it("unbind vao", function () {
                    directorTool.init(state);

                    expect(gl.bindVertexArray.getCall(1)).toCalledWith(null);
                    expect(gl.bindVertexArray.getCall(3)).toCalledWith(null);
                });
                it("save vao", function () {
                    directorTool.init(state);

                    expect(DeferDirectionLightPassData.fullScreenQuadVertexArray).toEqual(vao1);
                    expect(DeferPointLightPassData.fullScreenQuadVertexArray).toEqual(vao2);
                });
                it("save indices count", function () {
                    directorTool.init(state);

                    expect(DeferDirectionLightPassData.fullScreenQuadIndicesCount).toEqual(6);
                    expect(DeferPointLightPassData.fullScreenQuadIndicesCount).toEqual(6);
                });
            });
        });

        describe("bind gBuffer targets", function () {
            beforeEach(function () {
            });

            it("bind position,normal,color targets", function () {
                stubCreateGbufferTarget();

                directorTool.init(state);




                expect(gl.activeTexture.getCall(0)).toCalledWith(gl.TEXTURE0);
                expect(gl.bindTexture.withArgs(gl.TEXTURE_2D, positionTarget).getCall(1)).toCalledAfter(gl.activeTexture.getCall(0));



                expect(gl.activeTexture.getCall(1)).toCalledWith(gl.TEXTURE1);
                expect(gl.bindTexture.withArgs(gl.TEXTURE_2D, normalTarget).getCall(1)).toCalledAfter(gl.activeTexture.getCall(1));



                expect(gl.activeTexture.getCall(2)).toCalledWith(gl.TEXTURE2);
                expect(gl.bindTexture.withArgs(gl.TEXTURE_2D, colorTarget).getCall(1)).toCalledAfter(gl.activeTexture.getCall(2));
            });
        });

        describe("send gBuffer target data", function () {
            var program;

            beforeEach(function () {
            });

            it("use DeferLightPass program", function () {
                directorTool.init(state);

                expect(gl.useProgram).toCalledWith(getDeferPointLightPassProgram());
            });
            it("send position target data after use DeferLightPass program", function () {
                var positionBufferLocation = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_positionBuffer").returns(positionBufferLocation);

                directorTool.init(state);

                expect(gl.uniform1i.withArgs(positionBufferLocation)).toCalledAfter(gl.useProgram.withArgs(getDeferPointLightPassProgram()));
            });
            it("send position,normal,color target datas", function () {
                var positionBufferLocation = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_positionBuffer").returns(positionBufferLocation);

                var normalBufferLocation = 2;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_normalBuffer").returns(normalBufferLocation);

                var colorBufferLocation = 3;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_colorBuffer").returns(colorBufferLocation);

                directorTool.init(state);

                expect(gl.uniform1i).toCalledWith(positionBufferLocation, 0);
                expect(gl.uniform1i).toCalledWith(normalBufferLocation, 1);
                expect(gl.uniform1i).toCalledWith(colorBufferLocation, 2);
            });
        });

        describe("test DeferLightPass shader's glsl", function () {
            function getDeferDirectionLightPassVsSource(gl) {
                return gl.shaderSource.getCall(0).args[1];
            }

            function getDeferDirectionLightPassFsSource(gl) {
                return gl.shaderSource.getCall(1).args[1];
            }

            function getDeferPointLightPassVsSource(gl) {
                return gl.shaderSource.getCall(2).args[1];
            }

            function getDeferPointLightPassFsSource(gl) {
                return gl.shaderSource.getCall(3).args[1];
            }

            beforeEach(function(){
                sceneTool.addCameraObject();
            });

            describe("add CameraUboShaderLib", function () {
                it("bind ubo", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("CameraUbo"))).toCalledOnce();
                });
            });

            describe("add DeferDirectionLightPassCommonShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs = getDeferDirectionLightPassFsSource(gl);

                        expect(glslTool.contain(fs, "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n}\n")).toBeTruthy();
                    });
                });
            });

            describe("add DeferPointLightPassCommonShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs = getDeferPointLightPassFsSource(gl);
                        expect(glslTool.contain(fs, "vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n")).toBeTruthy();
                    });
                });
            });

            describe("add DeferDirectionLightPassNoNormalMapShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    describe("test fs source", function () {
                        it("define getDirectionLightDir func by get directionLightUbo data", function () {
                            var fs = getDeferDirectionLightPassFsSource(gl);

                            expect(glslTool.containMultiLine(fs, [
                                "vec3 getDirectionLightDir(){",
                                "return getDirectionLightDirByLightPos(directionLightUbo.lightPosition.xyz);",
                                "}"
                            ])).toBeTruthy();
                        });
                        it("define getViewDir func by get cameraUbo data", function () {
                            var fs = getDeferDirectionLightPassFsSource(gl);

                            expect(glslTool.containMultiLine(fs, [
                                "vec3 getViewDir(vec3 worldPosition){",
                                "return normalize(cameraUbo.cameraPos.xyz - worldPosition);",
                                "}"
                            ])).toBeTruthy();
                        });
                    });
                });
            });

            describe("add DeferPointLightPassNoNormalMapShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    describe("test fs source", function () {
                        it("define getPointLightDir func by get pointLightUbo data", function () {
                            var fs = getDeferPointLightPassFsSource(gl);

                            expect(glslTool.containMultiLine(fs, [
                                "vec3 getPointLightDir(vec3 worldPosition){",
                                "return getPointLightDirByLightPos(pointLightUbo.lightPosition.xyz, worldPosition);",
                                "}"
                            ])).toBeTruthy();
                        });
                        it("define getViewDir func by get cameraUbo data", function () {
                            var fs = getDeferPointLightPassFsSource(gl);

                            expect(glslTool.containMultiLine(fs, [
                                "vec3 getViewDir(vec3 worldPosition){",
                                "return normalize(cameraUbo.cameraPos.xyz - worldPosition);",
                                "}"
                            ])).toBeTruthy();
                        });
                    });
                });
            });

            describe("add NoLightMapShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs1 = getDeferDirectionLightPassFsSource(gl);
                        var fs2 = getDeferPointLightPassFsSource(gl);
                        expect(glslTool.contain(fs1, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                        expect(glslTool.contain(fs2, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                    });
                });
            });

            describe("add NoEmissionMapShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs1 = getDeferDirectionLightPassFsSource(gl);
                        var fs2 = getDeferPointLightPassFsSource(gl);
                        expect(glslTool.contain(fs1, "vec3 getMaterialEmission() {\n    //todo support emission color\n//        return u_emission;\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                        expect(glslTool.contain(fs2, "vec3 getMaterialEmission() {\n    //todo support emission color\n//        return u_emission;\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                    });
                });
            });

            describe("add NoShadowMapShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs1 = getDeferDirectionLightPassFsSource(gl);
                        var fs2 = getDeferPointLightPassFsSource(gl);
                        expect(glslTool.contain(fs1, "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n")).toBeTruthy();
                        expect(glslTool.contain(fs2, "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n")).toBeTruthy();
                    });
                });
            });

            describe("add DeferDirectionLightPassShaderLib", function () {
                var material;
                var cameraGameObject;
                var geo;

                beforeEach(function(){
                    var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

                    material = data.material;
                    cameraGameObject = data.cameraGameObject;
                    geo = data.geometry;
                });

                describe("set full screen quad vertex vao data", function() {
                    var vao1,
                        vao2;

                    beforeEach(function(){
                        vao1 = {a:1};
                        vao2 = {a:2};

                        gl.createVertexArray.onCall(0).returns(vao1);
                        gl.createVertexArray.onCall(1).returns(vao2);
                    });

                    describe("set a_position array buffer", function () {
                        var size,pos;

                        beforeEach(function () {
                            size = 3;

                            pos = 0;
                        });

                        it("create buffer and init it when set vao", function () {

                            directorTool.init(state);

                            var data = new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]);


                            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledTwice();
                            expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledTwice();
                        });
                    });

                    describe("set a_texCoord array buffer", function () {
                        var size,pos;

                        beforeEach(function () {
                            size = 2;

                            pos = 1;
                        });

                        it("create buffer and init it when set vao", function () {

                            directorTool.init(state);

                            var data = new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]);


                            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledTwice();
                            expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledTwice();
                        });

                        describe("set indices index buffer", function () {
                            beforeEach(function () {
                            });

                            it("create buffer and init it when set vao", function () {

                                directorTool.init(state);

                                var data = new Uint16Array([0, 1, 2, 0, 2, 3]);


                                expect(gl.bufferData.withArgs(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledTwice();
                            });
                        });
                    });

                    it("unbind vao", function () {
                        directorTool.init(state);

                        expect(gl.bindVertexArray.withArgs(null)).toCalledTwice();
                    });
                });


                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state)
                    });

                    describe("test vs source", function () {
                        var vs;

                        beforeEach(function(){
                            vs = getDeferDirectionLightPassVsSource(gl);
                        });

                        it("define attribute", function () {
                            expect(glslTool.contain(vs, "layout(location=0) in vec3 a_position;"));

                        });
                        it("set v_texcoord", function () {
                            expect(glslTool.contain(vs, "out vec2 v_texcoord;"));

                        });
                        it("set gl_Position with full screen", function () {
                            expect(glslTool.contain(vs, "gl_Position = vec4(a_position, 1.0);"));
                        });
                    });

                    describe("test fs source", function () {
                        var fs;

                        beforeEach(function(){
                            fs = getDeferDirectionLightPassFsSource(gl);
                        });

                        it("in v_texCoord", function () {
                            expect(glslTool.contain(fs, "in vec2 v_texcoord;")).toBeTruthy();
                        });
                        it("use diffuse color as specular color", function () {
                            expect(glslTool.contain(fs, "vec3 getSpecularColor(vec3 diffuseColor)\n{\n    return diffuseColor;\n}")).toBeTruthy();
                        });
                    });
                });
            });

            describe("add DeferPointLightPassShaderLib", function () {
                var material;
                var cameraGameObject;
                var geo;

                beforeEach(function(){
                    var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

                    material = data.material;
                    cameraGameObject = data.cameraGameObject;
                    geo = data.geometry;
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state)
                    });

                    describe("test vs source", function () {
                        var vs;

                        beforeEach(function(){
                            vs = getDeferPointLightPassVsSource(gl);
                        });

                        it("define attribute", function () {
                            expect(glslTool.contain(vs, "layout(location=1) in vec2 a_texCoord;"));

                            expect(glslTool.contain(vs, "layout(location=1) in vec2 a_texCoord;"));
                        });
                        it("set v_texcoord", function () {
                            expect(glslTool.contain(vs, "out vec2 v_texcoord;"));
                            expect(glslTool.contain(vs, "v_texcoord = a_texCoord * 0.5 + vec2(0.5);"));
                        });
                        it("set gl_Position with full screen", function () {
                            expect(glslTool.contain(vs, "gl_Position = vec4(a_position, 1.0);"));
                        });
                    });

                    describe("test fs source", function () {
                        var fs;

                        beforeEach(function(){
                            fs = getDeferPointLightPassFsSource(gl);
                        });

                        it("in v_texCoord", function () {
                            expect(glslTool.contain(fs, "in vec2 v_texcoord;")).toBeTruthy();
                        });
                        it("optimize point light: if distance >= radius, set fragment color to be 0.0", function () {
                            expect(glslTool.contain(fs, "if(distance >= lightData.w){\n            return vec3(0.0);\n        }")).toBeTruthy();
                        });
                        it("use diffuse color as specular color", function () {
                            expect(glslTool.contain(fs, "vec3 getSpecularColor(vec3 diffuseColor)\n{\n    return diffuseColor;\n}")).toBeTruthy();
                        });
                    });
                });
            });

            describe("add DeferLightPassEndShaderLib", function () {
                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs1 = getDeferDirectionLightPassFsSource(gl);
                        var fs2 = getDeferPointLightPassFsSource(gl);
                        expect(glslTool.containMultiLine(fs1, [
                            "out vec4 fragColor;\n",
                            "fragColor = totalColor;\n"
                        ])).toBeTruthy();
                        expect(glslTool.containMultiLine(fs2, [
                            "out vec4 fragColor;\n",
                            "fragColor = totalColor;\n"
                        ])).toBeTruthy();
                    });
                });
            });
        });
    });
});

