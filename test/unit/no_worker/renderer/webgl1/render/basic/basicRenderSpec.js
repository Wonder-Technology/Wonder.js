describe("basic render", function () {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;

    function buildGLSL(state) {
        var gl = directorTool.init(state);

        directorTool.loopBody(state);

        return gl;
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
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
            return gl.shaderSource.getCall(0).args[1];
        }

        function getFsSource(gl) {
            return gl.shaderSource.getCall(1).args[1];
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
            expect(glslTool.containSpecifyCount(fs, "gl_FragColor =", 1)).toBeTruthy();
        });

        describe("test send indices buffer data", function () {
            var buffer;

            beforeEach(function () {
                buffer = {b:1};

                gl.createBuffer.onCall(1).returns(buffer);
            });

            it("create buffer and init it when first get", function () {
                directorTool.init(state);

                var data = geometrySystemTool.getIndices(geo);


                directorTool.loopBody(state);

                expect(gl.createBuffer).toCalledTwice();
                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, buffer).callCount).toEqual(2);
                expect(gl.bufferData.withArgs(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, null)).toCalledOnce();
            });
            it("not create buffer after first get", function () {
                directorTool.init(state);

                directorTool.loopBody(state);
                directorTool.loopBody(state);

                expect(gl.createBuffer).toCalledTwice();
            });
        });

        describe("test glsl and send attribute,uniform data", function () {
            beforeEach(function () {
            });

            /*!
            already test in defer shading
             */

            describe("add CommonShaderLib", function () {
            });

            describe("add ModelMatrixNoInstanceShaderLib", function () {
            });

            describe("add VerticeCommonShaderLib", function () {
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

                    it("test vs source", function () {
                        var vs = getVsSource(gl);
                        expect(glslTool.contain(vs, "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n")).toBeTruthy();
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

                        basicMaterialTool.addMap(material, texture);
                    });

                    describe("send a_texCoord", function () {
                        var name,size,pos;
                        var buffer;

                        beforeEach(function () {
                            name = "a_texCoord";
                            size = 2;

                            pos = 10;

                            gl.getAttribLocation.withArgs(sinon.match.any, name).returns(pos);
                        });

                        it("create buffer and init it when first get", function () {
                            directorTool.init(state);

                            var data = geometrySystemTool.getTexCoords(geo);


                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(3);
                            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                            expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledOnce();
                        });
                        it("not create buffer after first get", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(3);



                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(3);
                        });
                    })

                    it("send u_sampler2D0", function () {
                        var pos = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D0").returns(pos);

                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform1i).toCalledWith(pos, 0);
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            buildGLSL(state);
                        });

                        it("test vs source", function () {
                            var vs = getVsSource(gl);

                            expect(glslTool.contain(vs, "attribute vec2 a_texCoord;")).toBeTruthy();
                            expect(glslTool.contain(vs, "varying vec2 v_mapCoord0;\n")).toBeTruthy();
                            expect(glslTool.contain(vs, "v_mapCoord0 = a_texCoord;")).toBeTruthy();
                        });
                        it("test fs source", function () {
                            var fs = getFsSource(gl);

                            expect(glslTool.contain(fs, "varying vec2 v_mapCoord0;\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "uniform sampler2D u_sampler2D0;\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "totalColor *= texture2D(u_sampler2D0, v_mapCoord0);\n")).toBeTruthy();
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
                        expect(glslTool.containSpecifyCount(fs, "gl_FragColor = vec4\\(totalColor.rgb, totalColor.a \\* u_opacity\\);\n", 1)).toBeTruthy();
                    });
                });
            });
        });
    });

    describe("test basic render and front render together", function() {
        beforeEach(function(){
            sceneSystemTool.prepareGameObjectAndAddToScene(false, null, basicMaterialTool.create());

            sceneSystemTool.addGameObject(sceneSystemTool.createGameObject(null, lightMaterialTool.create()));
            sceneSystemTool.addPointLight();
            sceneSystemTool.addDirectionLight();
        });

        it("clear main framebuffer only once in one frame", function(){
            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.clear).toCalledOnce();
        });
        it("render basic first, then render front", function () {
            var pos1 = 0;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_color").returns(pos1);
            var pos2 = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_lightModel").returns(pos2);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniform3f.withArgs(pos1)).toCalledBefore(gl.uniform1i.withArgs(pos2));
        });
    });
});
