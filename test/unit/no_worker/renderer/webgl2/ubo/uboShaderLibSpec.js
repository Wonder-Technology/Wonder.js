describe("test ubo shader lib", function () {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var CameraData = wd.CameraData;
    var CameraControllerData = wd.CameraControllerData;
    var ThreeDTransform = wd.ThreeDTransform;
    var GlobalTempData = wd.GlobalTempData;
    var ThreeDTransformData = wd.ThreeDTransformData;
    var GameObjectData = wd.GameObjectData;
    var render_config = wd.render_config;
    var ELightModel = wd.ELightModel;
    var Vector3 = wd.Vector3;
    var Light = wd.Light;

    function buildGLSL(sandbox, state) {
        return glslWebGL2Tool.buildGLSL(sandbox, state);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL2Tool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testWebGL2Tool.clear(sandbox);
        sandbox.restore();
    });

    describe("test BasicRender Shader", function () {
        var material = null;
        var obj;
        var geo;
        var cameraGameObject;

        function getVsSource(gl) {
            return gl.shaderSource.getCall(2).args[1];
        }

        function getFsSource(gl) {
            return gl.shaderSource.getCall(3).args[1];
        }

        beforeEach(function () {
            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, basicMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;
        });

        describe("add CameraUboShaderLib", function () {
            describe("send CameraUbo", function () {
                it("bind ubo", function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("CameraUbo"))).toCalledOnce();
                });

                describe("set ubo data", function () {
                    it("set vMatrix, pMatrix, cameraPosition, normalMatrix", function () {
                        var transform = gameObjectTool.getComponent(cameraGameObject, ThreeDTransform),
                            mat = Matrix4.create().setTranslate(1, 2, 3),
                            position = mat.getTranslation();

                        threeDTransformTool.setPosition(transform, position);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        var cameraController = cameraControllerTool.getCameraController(cameraGameObject);
                        var vMat = cameraControllerTool.getWorldToCameraMatrix(cameraController.index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData);
                        var pMat = cameraControllerTool.getCameraPMatrix(cameraController, CameraData);

                        var normalMatrixValues = threeDTransformTool.getNormalMatrix(transform, GlobalTempData, ThreeDTransformData).values;


                        var typeArr = new Float32Array(16 * 2 + 4 + 16);
                        typeArrayTool.set(typeArr, vMat.values, 0);
                        typeArrayTool.set(typeArr, pMat.values, 16);
                        typeArrayTool.set(typeArr, position.values, 32);
                        typeArrayTool.set(typeArr, [normalMatrixValues[0], normalMatrixValues[1], normalMatrixValues[2], 0], 36);
                        typeArrayTool.set(typeArr, [normalMatrixValues[3], normalMatrixValues[4], normalMatrixValues[5], 0], 40);
                        typeArrayTool.set(typeArr, [normalMatrixValues[6], normalMatrixValues[7], normalMatrixValues[8], 0], 44);


                        expect(gl.bufferData.withArgs(gl.UNIFORM_BUFFER, typeArr, gl.DYNAMIC_DRAW)).toCalledOnce();
                    });
                });
            });

            describe("test glsl", function () {
                function getUboDeclareGLSL() {
                    return "layout(std140) uniform CameraUbo {\n    mat4 vMatrix;\n    mat4 pMatrix;\n    vec4 cameraPos;\n    vec4 normalMatrixCol1;\n    vec4 normalMatrixCol2;\n    vec4 normalMatrixCol3;\n} cameraUbo;\n";
                }

                beforeEach(function () {
                    gl = buildGLSL(sandbox, state);
                });

                it("test vs source", function () {
                    var vs = getVsSource(gl);

                    expect(glslTool.contain(vs, getUboDeclareGLSL())).toBeTruthy();
                });
                it("test fs source", function () {
                    var fs = getFsSource(gl);

                    expect(glslTool.contain(fs, getUboDeclareGLSL())).toBeTruthy();
                });
            });
        });
    });

    describe("test DeferLightPass shader", function () {
        var material;
        var cameraGameObject;
        var geo;

        function getVsSource(gl) {
            return gl.shaderSource.getCall(0).args[1];
        }

        function getFsSource(gl) {
            return gl.shaderSource.getCall(1).args[1];
        }

        beforeEach(function () {
            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            material = data.material;
            cameraGameObject = data.cameraGameObject;
            geo = data.geometry;
        });

        describe("add LightUboShaderLib", function () {
            it("bind ubo", function () {
                directorTool.init(state);

                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("LightUbo"))).toCalledOnce();
            });

            describe("set static ubo data only once when init", function () {
                describe("send u_lightModel", function () {
                    function judge() {
                        var lightModel = ELightModel.CONSTANT;
                        sandbox.stub(render_config.defer, "lightModel", lightModel);

                        directorTool.init(state);


                        var typeArr = new Float32Array(4);
                        typeArrayTool.set(typeArr, [lightModel]);

                        expect(gl.bufferData.withArgs(gl.UNIFORM_BUFFER, typeArr, gl.STATIC_DRAW)).toCalledOnce();
                    }

                    it("defined in render_config", function () {
                        judge();
                    });
                    it("test two point light", function () {
                        sceneTool.addPointLight();
                        sceneTool.addPointLight();

                        judge();
                    });
                });
            });

            describe("test glsl", function () {
                function getUboDeclareGLSL() {
                    return "layout(std140) uniform LightUbo {\n/*! vec4(lightModel, 0.0, 0.0, 0.0) */\n    vec4 lightModel;\n} lightUbo;\n";
                }

                beforeEach(function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);
                });

                it("test fs source", function () {
                    var fs = getFsSource(gl);

                    expect(glslTool.contain(fs, getUboDeclareGLSL())).toBeTruthy();
                });
            });
        });

        describe("add PointLightUboShaderLib", function () {
            var lightObj1,
                lightComponent1;
            var lightObj2,
                lightComponent2;

            function judgeIsBindAndSetUboDataOnce() {
                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("PointLightUbo"))).toCalledTwice();
            }

            function judgeIsSetUboDataOnce(typeArray) {
                expect(gl.bufferData.withArgs(gl.UNIFORM_BUFFER, typeArray, gl.DYNAMIC_DRAW)).toCalledTwice();
            }

            function judgeIsBindAndSetTwoPointLightsUboDataTwice() {
                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("PointLightUbo")).callCount).toEqual(2 + 2);
            }

            function judgeIsBindAndSetSinglePointLightUboDataTwice() {
                expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("PointLightUbo")).callCount).toEqual(2 + 1);
            }

            function getDefaultColorArr3() {
                return [1, 1, 1];
            }

            function getDefaultConstant() {
                return 1;
            }

            function getDefaultLinear() {
                return 0.07000000029802322;
            }

            function getDefaultQuadratic() {
                return 0.017000000923871994;
            }

            function getDefaultUboTypeArray() {
                return new Float32Array([
                    0, 0, 0, 0,
                    1, 1, 1, 1,
                    getDefaultConstant(), getDefaultLinear(), getDefaultQuadratic(), pointLightWebGL2SystemTool.computeRadius(getDefaultColorArr3(), getDefaultConstant(), getDefaultLinear(), getDefaultQuadratic())
                ]);
            }

            beforeEach(function () {
                lightObj1 = sceneTool.addPointLight();
                lightComponent1 = gameObjectTool.getComponent(lightObj1, Light);

                lightObj2 = sceneTool.addPointLight();
                lightComponent2 = gameObjectTool.getComponent(lightObj2, Light);
            });

            describe("set dyname ubo data before draw point light", function () {
                it("set ubo data because point light data is dirty in the first loop", function () {
                    directorTool.init(state);

                    directorTool.loopBody(state);

                    judgeIsBindAndSetUboDataOnce();
                });
                it("clean dirty after set ubo data, so the second loop will not set ubo data if not change point light data in the second loop", function () {
                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    judgeIsBindAndSetUboDataOnce();
                });
                it("test set data in the first loop", function () {
                    directorTool.init(state);

                    directorTool.loopBody(state);

                    judgeIsSetUboDataOnce(getDefaultUboTypeArray());
                });

                describe("test send position", function () {
                    describe("if position dirty, set position data", function () {

                        it("if point light gameObject's local position changed, position dirty", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);


                            var position = Vector3.create(1, 2, 3);
                            var transform = gameObjectTool.getTransform(lightObj1);
                            threeDTransformTool.setLocalPosition(transform, position);


                            directorTool.loopBody(state);


                            judgeIsBindAndSetTwoPointLightsUboDataTwice();
                        });
                        it("if point light gameObject's position changed, position dirty", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);


                            var position = Vector3.create(1, 2, 3);
                            var transform = gameObjectTool.getTransform(lightObj1);
                            threeDTransformTool.setPosition(transform, position);

                            directorTool.loopBody(state);


                            judgeIsBindAndSetTwoPointLightsUboDataTwice();
                        });
                    });

                    it("test send position data", function () {
                        directorTool.init(state);

                        directorTool.loopBody(state);


                        var position = Vector3.create(1, 2, 3);
                        var transform = gameObjectTool.getTransform(lightObj1);
                        threeDTransformTool.setPosition(transform, position);

                        directorTool.loopBody(state);


                        var typeArr = getDefaultUboTypeArray();

                        typeArrayTool.set(typeArr, position.values);

                        judgeIsSetUboDataOnce(typeArr);
                    });
                });

                describe("test send color", function () {
                    it("if point light color dirty, set its data", function () {

                        directorTool.init(state);

                        directorTool.loopBody(state);


                        var color = Color.create("#111222");

                        pointLightTool.setColor(lightComponent1, color);


                        directorTool.loopBody(state);


                        judgeIsBindAndSetSinglePointLightUboDataTwice();
                    });
                    it("test send color data", function () {
                        directorTool.init(state);

                        directorTool.loopBody(state);


                        var color = Color.create("rgb(1.0, 0.5, 1.0)");
                        var colorArr3 = color.toArray3();

                        pointLightTool.setColor(lightComponent1, color);


                        directorTool.loopBody(state);


                        var typeArr = getDefaultUboTypeArray();

                        typeArrayTool.set(typeArr, colorArr3, 4);

                        judgeIsSetUboDataOnce(typeArr);
                    });
                });

                describe("test send intensity", function () {
                    it("if point light intensity dirty, set its data", function () {

                        directorTool.init(state);

                        directorTool.loopBody(state);


                        var intensity = 2;
                        pointLightTool.setIntensity(lightComponent2, intensity);


                        directorTool.loopBody(state);


                        judgeIsBindAndSetSinglePointLightUboDataTwice();
                    });
                    it("test send intensity data", function () {
                        directorTool.init(state);

                        directorTool.loopBody(state);


                        var intensity = 2;
                        pointLightTool.setIntensity(lightComponent2, intensity);


                        directorTool.loopBody(state);


                        var typeArr = getDefaultUboTypeArray();

                        typeArrayTool.set(typeArr, [intensity], 4 + 3);

                        judgeIsSetUboDataOnce(typeArr);
                    });
                });

                describe("test send attenuation data", function () {
                    function judgeSetData(methodName) {
                        directorTool.init(state);

                        directorTool.loopBody(state);


                        pointLightTool[methodName](lightComponent2, 2);


                        directorTool.loopBody(state);


                        judgeIsBindAndSetSinglePointLightUboDataTwice();
                    }

                    it("if point light constant data dirty, set its data", function () {
                        judgeSetData("setConstant");
                    });
                    it("if point light linear data dirty, set its data", function () {
                        judgeSetData("setLinear");
                    });
                    it("if point light quadratic data dirty, set its data", function () {
                        judgeSetData("setQuadratic");
                    });
                    it("if point light range level dirty, set its data", function () {
                        judgeSetData("setRangeLevel");
                    });

                    describe("test send attenuation data", function () {
                        beforeEach(function () {
                        });

                        it("point light color will affect radius", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);


                            var color = Color.create("rgb(0.0, 0.5, 0.8)");
                            var colorArr3 = color.toArray3();

                            pointLightTool.setColor(lightComponent1, color);


                            directorTool.loopBody(state);


                            var typeArr = getDefaultUboTypeArray();

                            typeArrayTool.set(typeArr, colorArr3, 4);


                            typeArrayTool.set(typeArr, [pointLightWebGL2SystemTool.computeRadius(colorArr3, getDefaultConstant(), getDefaultLinear(), getDefaultQuadratic())], 8 + 3);

                            judgeIsSetUboDataOnce(typeArr);
                        });
                        it("test send data", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);


                            pointLightTool.setConstant(lightComponent2, 2);
                            pointLightTool.setLinear(lightComponent2, 0.1);


                            directorTool.loopBody(state);


                            var typeArr = getDefaultUboTypeArray();

                            typeArrayTool.set(typeArr, [2, 0.1, getDefaultQuadratic(), pointLightWebGL2SystemTool.computeRadius(getDefaultColorArr3(), 2, 0.1, getDefaultQuadratic())], 8);

                            judgeIsSetUboDataOnce(typeArr);
                        });
                    });
                });
            });

            describe("test glsl", function () {
                function getUboDeclareGLSL() {
                    return "layout(std140) uniform PointLightUbo {\nvec4 lightPosition;\n/*! vec4(colorVec3, intensity) */\nvec4 lightColorData;\n/*! vec4(constant, linear, quadratic, radius) */\nvec4 lightData;\n} pointLightUbo;\n";
                }

                beforeEach(function () {
                    directorTool.init(state);
                    directorTool.loopBody(state);
                });

                it("test fs source", function () {
                    var fs = getFsSource(gl);

                    expect(glslTool.contain(fs, getUboDeclareGLSL())).toBeTruthy();
                });
            });
        });
    });
});