describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GPUDetector = wd.GPUDetector;
    var GBufferData = wd.GBufferData;
    var ShaderData = wd.ShaderData;
    var ProgramData = wd.ProgramData;
    var DeferLightPassData = wd.DeferLightPassData;

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    function getDeferLightPassProgram() {
        var shaderIndex = ShaderData.shaderIndexByMaterialIndexAndShaderNameMap["DeferLightPass"];

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

        it("if not support extensionColorBufferFloat, error", function () {
            sandbox.stub(GPUDetector.getInstance(), "extensionColorBufferFloat", false);

            expect(function () {
                directorTool.init(state);
            }).toThrow("defer shading need support extensionColorBufferFloat extension");
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

                            gl.createBuffer.onCall(index).returns(buffer);
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

                        expect(gl.createBuffer.callCount).toEqual(3);
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

                            gl.createBuffer.onCall(2).returns(buffer);
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
    
    describe("draw defer shading", function() {
        var render_config = wd.render_config;
        var Color = wd.Color;
        var ELightModel = wd.ELightModel;
        var Vector3 = wd.Vector3;
        var Light = wd.Light;

        var material;
        var cameraGameObject;

        beforeEach(function(){
            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            material = data.material;
            cameraGameObject = data.cameraGameObject;
        });

        it("set clear color", function(){
            color = Color.create("#000000");

            sandbox.stub(render_config, "clearColor", color);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.clearColor).toCalledOnce();
            expect(gl.clearColor).toCalledWith(color.r, color.g, color.b, color.a);
        });

        describe("draw gBuffer pass", function() {
            beforeEach(function(){

            });

            it("enable depth write before clear", function(){
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.depthMask).toCalledWith(true);
                expect(gl.depthMask.withArgs(true)).toCalledBefore(gl.clear.getCall(0));
            });
            it("clear color buffer and depth buffer" +
                "(An important point we must be careful about is to enable writing into the depth buffer before clearing it. gl.clear() does not touch the depth buffer if the depth mask is set to FALSE.)", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.clear.getCall(0)).toCalledWith(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            });
            it("enable depth test", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.enable).toCalledWith(gl.DEPTH_TEST);
            });
            it("disable blend", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.disable).toCalledWith(gl.BLEND);
            });

            it("bind gBuffer", function () {
                directorTool.init(state);

                GBufferData.gBuffer = {};

                var callCount = gl.bindFramebuffer.callCount;

                directorTool.loopBody(state);

                expect(gl.bindFramebuffer.getCall(callCount)).toCalledWith(gl.FRAMEBUFFER, GBufferData.gBuffer);
            });

            describe("draw", function() {
                function getProgram() {
                    var shaderIndex = 1;

                    return ProgramData.programMap[shaderIndex];
                }

                beforeEach(function(){

                });

                // describe("use GBuffer shader", function () {
                //     describe("init GBuffer shader", function () {
                //         it("test glsl", function () {
                //             // directorTool.init(state);
                //             // directorTool.loopBody(state);
                //             //
                //             // expect(ShaderData.shaderIndexByMaterialIndexAndShaderNameMap["GBuffer"]).toBeNumber();
                //         });
                //     });
                //     it("set generated shader index", function () {
                //
                //     });
                // });

                it("use GBuffer program", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.useProgram).toCalledWith(getProgram());
                });

                describe("test GBuffer shader's glsl and send data", function () {
                    function getVsSource(gl) {
                        return gl.shaderSource.getCall(2).args[1];
                    }

                    function getFsSource(gl) {
                        return gl.shaderSource.getCall(3).args[1];
                    }

                    describe("add CommonShaderLib", function () {
                        beforeEach(function () {
                        });

                        //todo test use ubo
                        it("send u_vMatrix", function () {
                        });
                        it("send u_pMatrix", function () {
                        });

                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test vs source", function () {
                                var vs = getVsSource(gl);
                                expect(glslTool.notContain(vs, /mat2\stranspose\(mat2\sm\)/g)).toBeTruthy();
                                expect(glslTool.notContain(vs, /mat3\stranspose\(mat3\sm\)/g)).toBeTruthy();
                            });
                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.notContain(fs, /mat2\stranspose\(mat2\sm\)/g)).toBeTruthy();
                                expect(glslTool.notContain(fs, /mat3\stranspose\(mat3\sm\)/g)).toBeTruthy();
                            });
                        });
                    });

                    describe("add ModelMatrixNoInstanceShaderLib", function () {
                        beforeEach(function () {
                        });

                        //todo test use ubo
                        it("send u_mMatrix", function () {
                        });

                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test vs source", function () {
                                var vs = getVsSource(gl);
                                expect(glslTool.containMultiLine(vs, [
                                    "mat4 getModelMatrix(){",
                                    "return u_mMatrix;\n}\n",
                                    "}",
                                    "mat4 mMatrix = getModelMatrix();"
                                ])).toBeTruthy();
                            });
                        });
                    });

                    //todo finish test after use ubo,vao

                    describe("add VerticeCommonShaderLib", function () {
                    });

                    describe("add NormalMatrixNoInstanceShaderLib", function () {
                    });

                    describe("add NormalCommonShaderLib", function () {
                    });

                    describe("add GBufferCommonShaderLib", function () {

                    });

                    describe("add GBufferSetWorldPositionShaderLib", function () {
                    });

                    describe("add map shader lib", function () {
                    });


                    describe("add GBufferShaderLib", function () {
                    });

                    describe("add GBufferEndShaderLib", function () {
                    });

                    describe("add EndShaderLib", function () {
                    });
                });

                // describe("commit to gpu", function() {
                //     beforeEach(function(){
                //
                //     });
                //
                //     it("if geometry has no index buffer, then drawArray", function(){
                //         // directorTool.init(state);
                //         //
                //         // geometryTool.setIndices(0, []);
                //         //
                //         // directorTool.loopBody(state);
                //         //
                //         // expect(gl.drawArrays).toCalledWith("TRIANGLES",0,72);
                //     });
                //     it("else, bind index buffer and drawElements", function(){
                //         // directorTool.init(state);
                //         //
                //         // var indexBuffer = {a:1};
                //         // indexBufferTool.setBuffers([indexBuffer]);
                //         //
                //         // // geometryTool.setDrawMode({index:0}, "TRIANGLES");
                //         //
                //         // var indices = [1,2,3];
                //         // geometryTool.setIndices(0, indices);
                //         // geometryTool.setIndexType(EBufferType.UNSIGNED_SHORT);
                //         // geometryTool.setIndexTypeSize(Uint16Array.BYTES_PER_ELEMENT);
                //         //
                //         // directorTool.loopBody(state);
                //         //
                //         //
                //         // expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)).toCalledOnce();
                //         // expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indices.length, GeometryData.indexType, GeometryData.indexTypeSize * 0);
                //     });
                // });
            });

            // it("test draw two gameObjects' gbuffer pass", function () {
            //
            // });
        });

        describe("draw light pass", function() {
            function unbindGBufferCall(gl) {
                return gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER, null).getCall(1)
            }

            function judgeAfterUnBindGBuffer(expectVal, gl) {
                expect(expectVal).toCalledAfter(unbindGBufferCall(gl));
            }

            beforeEach(function(){

            });

            describe("prepare", function() {
                beforeEach(function(){
                    directorTool.init(state);
                    directorTool.loopBody(state);
                });


                it("unbind gBuffer after finish gBuffer pass", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(unbindGBufferCall(gl)).toCalledAfter(gl.drawElements.getCall(0));
                });
                it("clear color buffer", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.clear.withArgs(gl.COLOR_BUFFER_BIT).getCall(0)).toCalledAfter(unbindGBufferCall(gl));
                });

                describe("set state", function() {
                    beforeEach(function(){
                    });

                    it("disable depth write", function(){
                        judgeAfterUnBindGBuffer(gl.depthMask.withArgs(false).getCall(0), gl);
                    });
                    it("disable depth test", function () {
                        judgeAfterUnBindGBuffer(gl.disable.withArgs(gl.DEPTH_TEST).getCall(0), gl);
                    });
                    it("enable blend", function () {
                        judgeAfterUnBindGBuffer(gl.enable.withArgs(gl.BLEND).getCall(0), gl);
                    });
                });
            });

            describe("draw", function() {
                var vao;

                function judgeAfterUseDeferLightPassProgram(expectVal, gl) {
                    expect(expectVal).toCalledAfter(gl.useProgram.withArgs(getDeferLightPassProgram()).getCall(1), gl)
                }

                beforeEach(function(){
                    vao = {v:1};

                    gl.createProgram.onCall(0).returns({});
                    gl.createProgram.onCall(1).returns({a:1});
                });

                it("use DeferLightPass program", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    judgeAfterUnBindGBuffer(gl.useProgram.withArgs(getDeferLightPassProgram()).getCall(1), gl);
                });
                it("bind full screen quad vao", function () {
                    directorTool.init(state);
                    DeferLightPassData.fullScreenQuadVertexArray = vao;

                    directorTool.loopBody(state);

                    judgeAfterUseDeferLightPassProgram(gl.bindVertexArray.withArgs(vao).getCall(0), gl);
                });

                describe("test DeferLightPass shader's glsl", function () {
                    function getVsSource(gl) {
                        return gl.shaderSource.getCall(0).args[1];
                    }

                    function getFsSource(gl) {
                        return gl.shaderSource.getCall(1).args[1];
                    }

                    //todo test after vao

                    describe("add VerticeCommonShaderLib", function () {
                    });

                    describe("add DeferLightPassCommonShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            // it("test vs source", function () {
                            //     var vs = getVsSource(gl);
                            //     expect(glslTool.notContain(vs, /mat2\stranspose\(mat2\sm\)/g)).toBeTruthy();
                            //     expect(glslTool.notContain(vs, /mat3\stranspose\(mat3\sm\)/g)).toBeTruthy();
                            // });
                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.contain(fs, "vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n")).toBeTruthy();
                            });
                        });
                    });

                    describe("add DeferLightPassNoNormalMapShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            // it("test vs source", function () {
                            //     var vs = getVsSource(gl);
                            //     expect(glslTool.notContain(vs, /mat2\stranspose\(mat2\sm\)/g)).toBeTruthy();
                            //     expect(glslTool.notContain(vs, /mat3\stranspose\(mat3\sm\)/g)).toBeTruthy();
                            // });
                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.containMultiLine(fs, [
                                    "vec3 getPointLightDir(vec3 worldPosition){",
                                    "return getPointLightDirByLightPos(u_lightPosition, worldPosition);",
                                    "}",

                                    "vec3 getViewDir(vec3 worldPosition){",
                                    "return normalize(u_cameraPos - worldPosition);",
                                    "}"
                                ])).toBeTruthy();
                            });
                        });
                    });

                    describe("add NoLightMapShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.contain(fs, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                            });
                        });
                    });

                    describe("add NoEmissionMapShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.contain(fs, "vec3 getMaterialEmission() {\n    //todo support emission color\n//        return u_emission;\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                            });
                        });
                    });

                    describe("add NoShadowMapShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.contain(fs, "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n")).toBeTruthy();
                            });
                        });
                    });

                    describe("add DeferLightPassShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            //todo test after refactor and ubo

                            // it("test vs source", function () {
                            //     var vs = getVsSource(gl);
                            //     // expect(glslTool.contain(fs, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                            // });
                            // it("test fs source", function () {
                            //     var fs = getFsSource(gl);
                            //     // expect(glslTool.contain(fs, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                            // });
                        });
                    });

                    describe("add DeferLightPassEndShaderLib", function () {
                        describe("test glsl", function () {
                            beforeEach(function () {
                                directorTool.init(state);
                                directorTool.loopBody(state);
                            });

                            it("test fs source", function () {
                                var fs = getFsSource(gl);
                                expect(glslTool.containMultiLine(fs, [
                                    "out vec4 fragColor;\n",
                                    "fragColor = totalColor;\n"
                                ])).toBeTruthy();
                            });
                        });
                    });
                });

                describe("send u_lightModel", function () {
                    it("defined in render_config", function () {
                        var lightModel = ELightModel.CONSTANT;
                        sandbox.stub(render_config.defer, "lightModel", lightModel);
                        var pos = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_lightModel").returns(pos);
                        lightMaterialTool.setLightModel(material, lightModel);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform1i).toCalledWith(pos, lightModel);
                    });
                });

                it("send u_cameraPos", function () {
                    var cameraPos = Vector3.create(1, 10, 2),
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_cameraPos").returns(pos);


                    var transform = gameObjectTool.getComponent(cameraGameObject, wd.ThreeDTransform);

                    threeDTransformTool.setPosition(transform, cameraPos);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform3f).toCalledWith(pos, cameraPos.x, cameraPos.y, cameraPos.z);
                });

                describe("send light data", function() {
                    //todo test after ubo

                    describe("send point light data", function(){
                        var lightObj,
                            lightComponent;

                        beforeEach(function(){
                            lightObj = sceneTool.addPointLight();
                            lightComponent = gameObjectTool.getComponent(lightObj, Light);
                        });

                        it("send u_lightPosition", function () {
                            var pos = 0;
                            gl.getUniformLocation.withArgs(sinon.match.any, "u_lightPosition").returns(pos);

                            var position = Vector3.create(1,2,3);
                            var transform = gameObjectTool.getTransform(lightObj);
                            threeDTransformTool.setPosition(transform, position);

                            directorTool.init(state);
                            directorTool.loopBody(state);

                            expect(gl.uniform3f).toCalledWith(pos, position.x, position.y, position.z);
                        });

                        //todo more test after ubo
                    });

                    describe("test two point light", function () {
                        it("send u_lightModel,u_cameraPos only one time", function () {
                            //todo test after ubo
                        });
                    });

                    describe("commit to gpu", function () {
                        it("draw full screen quad", function () {
                            sceneTool.addPointLight();

                            directorTool.init(state);
                            directorTool.loopBody(state);

                            expect(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)).toCalledOnce();
                        });
                    });
                });

                it("unbind vao after commit to gpu", function () {
                    sceneTool.addPointLight();


                    directorTool.init(state);

                    var callCount = gl.bindVertexArray.withArgs(null).callCount;

                    directorTool.loopBody(state);

                    expect(gl.bindVertexArray.withArgs(null).getCall(callCount)).toCalledAfter(gl.drawElements.withArgs(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0).getCall(0));
                });
            });
        });
    });
    
    describe("fix bug", function() {
        var DataBufferConfig = wd.DataBufferConfig;

        beforeEach(function(){
        });
        
        it("expand max light count to be bigger than the one defined in front render", function(){
            testTool.openContractCheck();

            DataBufferConfig.pointLightDataBufferCount = 1;

            sceneTool.addPointLight();
            sceneTool.addPointLight();

            expect(function () {
                directorTool.init(state);
            }).not.toThrow();

            expect(DataBufferConfig.pointLightDataBufferCount).toEqual(1000);

            //todo test direction, ambient
        });
    });
});

