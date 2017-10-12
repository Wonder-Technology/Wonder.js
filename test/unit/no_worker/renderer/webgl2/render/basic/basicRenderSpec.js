describe("basic render", function () {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var ThreeDTransform = wd.ThreeDTransform;

    function buildGLSL(state) {
        return glslTool.buildGLSL(null, state);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        deferShadingTool.disableDeferShading(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test basic render", function() {
        var material = null;
        var obj;
        var geo;
        var cameraGameObject;

        function getVsSource(gl) {
            return gl.shaderSource.getCall(6).args[1];
        }

        function getFsSource(gl) {
            return gl.shaderSource.getCall(7).args[1];
        }

        beforeEach(function(){
            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, basicMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;
        });

        it("glsl only set glPosition,glFragColor once", function () {
            gl = buildGLSL(state);

            var vs = getVsSource(gl);
            var fs = getFsSource(gl);
            expect(glslTool.containSpecifyCount(vs, "gl_Position =", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(fs, "out vec4 fragColor;", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(fs, "fragColor =", 1)).toBeTruthy();
        });

        describe("test glsl and send attribute,uniform data", function () {
            beforeEach(function () {
            });

            describe("add CommonShaderLib", function () {
                beforeEach(function () {
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

                it("send u_mMatrix", function () {
                    var transform = gameObjectSystemTool.getComponent(obj, ThreeDTransform),
                        mat = Matrix4.create().setTranslate(1, 2, 3),
                        position = mat.getTranslation(),
                        pos = 0;

                    threeDTransformSystemTool.setPosition(transform, position);
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(pos);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.values);
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

            describe("add VerticeCommonShaderLib", function () {
                describe("send a_position", function () {
                    var buffer;

                    beforeEach(function () {
                        buffer = { b: 1 };

                        gl.createBuffer.onCall(0).returns(buffer);
                    });

                    it("create buffer and init it when set vao", function () {
                        directorTool.init(state);

                        var data = geometrySystemTool.getVertices(geo);


                        directorTool.loopBody(state);

                        expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                        expect(gl.vertexAttribPointer.withArgs(0,3,"FLOAT",false,0,0)).toCalledOnce();
                    });
                });
            });

            describe("add CameraUboShaderLib", function () {
                beforeEach(function () {
                });

                describe("send CameraUbo", function () {
                    it("bind ubo", function () {
                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("CameraUbo"))).toCalledOnce();
                    });
                });
            });


            describe("add BasicMaterialColorShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_color", function () {
                    var color = Color.create("rgb(0.1,0.2,0.3)"),
                        colorVec3 = color.toVector3(),
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_color").returns(pos);
                    basicMaterialTool.setColor(material, color);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform3f).toCalledWith(pos, colorVec3.x, colorVec3.y, colorVec3.z);
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs = getFsSource(gl);
                        expect(glslTool.contain(fs, "vec4 totalColor = vec4(u_color, 1.0);")).toBeTruthy();
                    });
                });
            });

            describe("add BasicShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_opacity", function () {
                    var opacity = 0.6,
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_opacity").returns(pos);
                    basicMaterialTool.setOpacity(material, opacity);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    var args = gl.uniform1f.firstCall.args;
                    expect(args[0]).toEqual(pos);
                    expect(testTool.getValues(args[1])).toEqual(opacity);
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    describe("test vs source", function () {
                        it("set mvp by read cameraUbo data", function () {
                            var vs = getVsSource(gl);
                            expect(glslTool.contain(vs, "gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * mMatrix * vec4(a_position, 1.0);\n")).toBeTruthy();
                        });
                    });
                });
            });

            describe("add map shader lib", function () {
                beforeEach(function () {
                });

                describe("if has one map, add BasicMapShaderLib", function(){
                    beforeEach(function () {
                        var texture = textureSystemTool.create();
                        textureSystemTool.setSource(texture, {});

                        basicMaterialTool.setMap(material, texture);
                    });

                    describe("send a_texCoord", function () {
                        var name,size,pos;
                        var buffer;

                        beforeEach(function () {
                            name = "a_texCoord";
                            size = 2;

                            pos = 1;
                        });

                        it("create buffer and init it when first get", function () {
                            directorTool.init(state);

                            var data = geometrySystemTool.getTexCoords(geo);


                            directorTool.loopBody(state);

                            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                            expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledOnce();
                        });
                    })

                    it("send u_sampler2D", function () {
                        var pos = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D").returns(pos);

                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform1i).toCalledWith(pos, 0);
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            buildGLSL(state);
                        });

                        describe("test vs source", function () {
                            it("a_texCoord location = 1", function () {
                                var vs = getVsSource(gl);

                                expect(glslTool.contain(vs, "layout(location=1) in vec2 a_texCoord;")).toBeTruthy();
                            });
                            it("set out v_mapCoord0", function () {
                                var vs = getVsSource(gl);

                                expect(glslTool.contain(vs, "out vec2 v_mapCoord0;\n")).toBeTruthy();
                                expect(glslTool.contain(vs, "v_mapCoord0 = a_texCoord;")).toBeTruthy();
                            });
                        });

                        it("test fs source", function () {
                            var fs = getFsSource(gl);

                            expect(glslTool.contain(fs, "in vec2 v_mapCoord0;\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "uniform sampler2D u_sampler2D;\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "totalColor *= texture(u_sampler2D, v_mapCoord0);\n")).toBeTruthy();
                        });
                    });
                });
            });

            describe("add BasicEndShaderLib", function () {
                beforeEach(function () {
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                    });

                    describe("test fs source", function () {
                        it("test if set material->alphaTest === true", function () {
                            var alphaTest = 0.2;
                            basicMaterialTool.setAlphaTest(material, alphaTest);

                            buildGLSL(state);

                            var fs = getFsSource(gl);
                            expect(glslTool.containMultiLine(fs, [
                                "if (gl_FragColor.a < 0.20000",
                                "discard;"
                            ])).toBeTruthy();
                        });
                    });
                });
            });

            describe("add EndShaderLib", function () {
                beforeEach(function () {
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        buildGLSL(state);
                    });

                    it("test fs source", function () {
                        var fs = getFsSource(gl);
                        expect(glslTool.containSpecifyCount(fs, "fragColor = vec4\\(totalColor.rgb, totalColor.a \\* u_opacity\\);\n", 1)).toBeTruthy();
                    });
                });
            });
        });
    });

    describe("test basic render and defer render together", function() {
        beforeEach(function(){
            deferShadingTool.enableDeferShading(sandbox);

            sceneSystemTool.prepareGameObjectAndAddToScene(false, null, basicMaterialTool.create());

            sceneSystemTool.addGameObject(sceneSystemTool.createGameObject(null, lightMaterialTool.create()));
            sceneSystemTool.addPointLight();
        });

        it("clear main framebuffer only once in one frame", function(){
            gl.createFramebuffer.returns({});

            directorTool.init(state);

            var callCount = gl.bindFramebuffer.callCount;

            directorTool.loopBody(state);

            expect(gl.clear).toCalledTwice();

            /*!
            ensure that gl.bindFramebuffer.getCall(callCount) has binded gbuffer
             */
            expect(gl.bindFramebuffer.getCall(callCount)).toCalledWith(gl.FRAMEBUFFER, sinon.match.object);

            expect(gl.clear.getCall(0)).toCalledBefore(gl.bindFramebuffer.withArgs(gl.FRAMEBUFFER).getCall(callCount));
        });
        it("render basic first, then render defer", function () {
            var pos1 = 0;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_color").returns(pos1);
            var pos2 = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_shininess").returns(pos2);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniform3f.withArgs(pos1)).toCalledBefore(gl.uniform1f.withArgs(pos2));
        });
    });
});
