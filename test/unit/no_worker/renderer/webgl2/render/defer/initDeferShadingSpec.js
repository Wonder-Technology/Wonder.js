describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GBufferData = wd.GBufferData;
    var ShaderData = wd.ShaderData;
    var ProgramData = wd.WebGL2ProgramData;
    var DeferLightPassData = wd.DeferLightPassData;
    var Log = wd.Log;

    function buildGLSL(sandbox, state) {
        return glslWebGL2Tool.buildGLSL(sandbox, state);
    }

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    function getDeferLightPassProgram() {
        var shaderIndex = ShaderData.shaderIndexByMaterialIndexAndShaderNameMap["DeferLightPass"];

        return ProgramData.programMap[shaderIndex];
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL2Tool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        enableDeferShading(sandbox);
    });
    afterEach(function () {
        testWebGL2Tool.clear(sandbox);
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

                expect(ShaderData.shaderIndexByMaterialIndexAndShaderNameMap["DeferLightPass"]).toBeNumber();
            });
            
            // describe("test glsl", function() {
            //     beforeEach(function(){
            //         directorTool.init(state);
            //     });
            //
            //     it("test vs source", function () {
            //         var vs = materialTool.getVsSource(gl);
            //
            //         expect(glslTool.contain(vs, "mat3 normalMatrix = u_normalMatrix;\n")).toBeTruthy();
            //     });
            // });
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
                var vao;

                beforeEach(function(){
                    vao = {};

                    gl.createVertexArray.returns(vao);
                });

                it("create vao", function () {
                    directorTool.init(state);

                    expect(gl.createVertexArray).toCalledOnce();
                    expect(DeferLightPassData.fullScreenQuadVertexArray).toEqual(vao);
                });
                it("bind vao", function () {
                    directorTool.init(state);

                    expect(gl.bindVertexArray).toCalledWith(vao);
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

                        expect(gl.createBuffer.callCount).toEqual(2 + 3);
                    });

                    describe("create and set position buffer", function() {
                        judge(0, 0, 3, new Float32Array([-1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0]));
                    });

                    describe("create and set texCoord buffer", function() {
                        judge(1, 1, 2, new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]));
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

                    expect(gl.bindVertexArray).toCalledWith(null);
                });
                it("save vao", function () {
                    directorTool.init(state);

                    expect(DeferLightPassData.fullScreenQuadVertexArray).toEqual(vao);
                });
                it("save indices count", function () {
                    directorTool.init(state);

                    expect(DeferLightPassData.fullScreenQuadIndicesCount).toEqual(6);
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

                expect(gl.useProgram).toCalledWith(getDeferLightPassProgram());
            });
            it("send position target data after use DeferLightPass program", function () {
                var positionBufferLocation = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_positionBuffer").returns(positionBufferLocation);

                directorTool.init(state);

                expect(gl.uniform1i.withArgs(positionBufferLocation)).toCalledAfter(gl.useProgram.withArgs(getDeferLightPassProgram()));
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
    });
});

