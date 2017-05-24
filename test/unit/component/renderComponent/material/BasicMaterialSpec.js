describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var director;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;
    var Color = wd.Color;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("glsl only set glPosition,glFragColor once", function () {
        gl = directorTool.init(sandbox);

        var vs = materialTool.getVsSource(gl);
        var fs = materialTool.getFsSource(gl);
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

            var data = geometryTool.getIndices(geo);


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

    describe("add shader libs", function () {
        beforeEach(function () {
        });

        describe("add CommonShaderLib", function () {
            beforeEach(function () {
            });

            it("send u_mMatrix", function () {
                var transform = gameObjectTool.getComponent(obj, wd.ThreeDTransform),
                    mat = Matrix4.create().setTranslate(1,2,3),
                    position = mat.getTranslation(),
                    pos = 0;

                threeDTransformTool.setPosition(transform, position);
                gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(pos);


                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.values);
            });
            //todo send u_vMatrix, u_pMatrix

            describe("test glsl", function () {
                beforeEach(function () {
                    directorTool.init(state);
                });

                it("test vs source", function () {
                    var vs = materialTool.getVsSource(gl);
                    expect(glslTool.containSpecifyCount(vs, /mat2\stranspose\(mat2\sm\)/g, 1)).toBeTruthy();
                    expect(glslTool.containSpecifyCount(vs, /mat3\stranspose\(mat3\sm\)/g, 1)).toBeTruthy();
                });
                it("test fs source", function () {
                    var fs = materialTool.getFsSource(gl);
                    expect(glslTool.containSpecifyCount(fs, /mat2\stranspose\(mat2\sm\)/g, 1)).toBeTruthy();
                    expect(glslTool.containSpecifyCount(fs, /mat3\stranspose\(mat3\sm\)/g, 1)).toBeTruthy();
                });
            });
        });

        describe("add VerticeCommonShaderLib", function () {
            beforeEach(function () {
            });

            describe("send a_position", function () {
                var name,size,pos;
                var buffer;

                beforeEach(function () {
                    name = "a_position";
                    size = 3;

                    pos = 10;

                    gl.getAttribLocation.withArgs(sinon.match.any, name).returns(pos);

                    buffer = {a:1};

                    gl.createBuffer.onCall(0).returns(buffer);
                });

                it("create buffer and init it when first get", function () {
                    directorTool.init(state);

                    var data = geometryTool.getVertices(geo);


                    directorTool.loopBody(state);

                    expect(gl.createBuffer).toCalledTwice();
                    expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer).callCount).toEqual(2);
                    expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                    expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, null)).toCalledOnce();
                    expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledOnce();
                });
                it("not create buffer after first get", function () {
                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.createBuffer).toCalledTwice();
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
                materialTool.setColor(material, color);


                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.uniform3f).toCalledWith(pos, colorVec3.x, colorVec3.y, colorVec3.z);
            });

            describe("test glsl", function () {
                beforeEach(function () {
                    directorTool.init(state);
                });

                it("test fs source", function () {
                    var fs = materialTool.getFsSource(gl);
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
                materialTool.setOpacity(material, opacity);


                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.uniform1f).toCalledWith(pos, opacity);
            });

            describe("test glsl", function () {
                beforeEach(function () {
                    directorTool.init(state);
                });

                it("test vs source", function () {
                    var vs = materialTool.getVsSource(gl);
                    expect(glslTool.contain(vs, "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n")).toBeTruthy();
                });
            });
        });

        describe("add EndBasicShaderLib", function () {
            beforeEach(function () {
            });

            describe("test glsl", function () {
                beforeEach(function () {
                });

                describe("test fs source", function () {
                    it("test if set material->alphaTest === true", function () {
                        var alphaTest = 0.2;
                        materialTool.setAlphaTest(material, alphaTest);

                        directorTool.init(state);

                        var fs = materialTool.getFsSource(gl);
                        expect(glslTool.containMultiLine(fs, [
                            "if (gl_FragColor.a < " + alphaTest + "){",
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
                    directorTool.init(state);
                });

                it("test fs source", function () {
                    var fs = materialTool.getFsSource(gl);
                    expect(glslTool.contain(fs, "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n")).toBeTruthy();
                });
            });
        });
    });
});
