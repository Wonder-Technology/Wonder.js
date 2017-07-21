describe("LightMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

    var gl;
    var state;

    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;
    var Color = wd.Color;
    var MaterialData = wd.MaterialData;
    var LightMaterialData = wd.LightMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;
    var EShading = wd.EShading;
    var ELightModel = wd.ELightModel;
    var PointLight = wd.PointLight;

    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("only test light material", function () {
        beforeEach(function () {
            sandbox = sinon.sandbox.create();

            testTool.clearAndOpenContractCheck(sandbox);

            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;

            state = stateTool.createAndSetFakeGLState(sandbox);

            gl = stateTool.getGLFromFakeGLState(state);
        });

        it("glsl only set glPosition,glFragColor once", function () {
            gl = directorTool.init(sandbox);

            var vs = materialTool.getVsSource(gl);
            var fs = materialTool.getFsSource(gl);
            expect(glslTool.containSpecifyCount(vs, "gl_Position =", 1)).toBeTruthy();
            expect(glslTool.containSpecifyCount(fs, "gl_FragColor =", 1)).toBeTruthy();
        });

        describe("test default value", function () {
            describe("getSpecularColor", function () {
                beforeEach(function () {
                });

                it("default color is #ffffff", function () {
                    colorTool.judgeIsEqual(lightMaterialTool.getSpecularColor(material), Color.create("#ffffff"), expect);
                });
            });

            describe("setSpecularColor", function () {
                beforeEach(function () {

                });

                it("set color", function () {
                    var color = Color.create("#123456");

                    lightMaterialTool.setSpecularColor(material, color);

                    colorTool.judgeIsEqual(lightMaterialTool.getSpecularColor(material), color, expect);
                });
            });

            describe("getEmissionColor", function () {
                beforeEach(function () {
                });

                it("default color is #000000", function () {
                    colorTool.judgeIsEqual(lightMaterialTool.getEmissionColor(material), Color.create("#000000"), expect);
                });
            });

            describe("setEmissionColor", function () {
                beforeEach(function () {

                });

                it("set color", function () {
                    var color = Color.create("#123456");

                    lightMaterialTool.setEmissionColor(material, color);

                    colorTool.judgeIsEqual(lightMaterialTool.getEmissionColor(material), color, expect);
                });
            });

            describe("getShininess", function () {
                beforeEach(function () {

                });

                it("default is 32", function () {
                    expect(lightMaterialTool.getShininess(material)).toEqual(32);
                });
            });

            describe("getShading", function () {
                beforeEach(function () {

                });

                it("default is EShading.FLAT", function () {
                    expect(lightMaterialTool.getShading(material)).toEqual(EShading.FLAT);
                });
            });

            describe("getLightModel", function () {
                beforeEach(function () {

                });

                it("default is ELightModel.PHONG", function () {
                    expect(lightMaterialTool.getLightModel(material)).toEqual(ELightModel.PHONG);
                });
            });
        });

        describe("initData", function () {
            beforeEach(function () {
            });

            describe("separate buffer index into segements of corresponding material type", function () {
                beforeEach(function () {

                });

                it("make LightMaterialData.index after BasicMaterialData", function () {

                    sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 20);
                    sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 100);

                    materialTool.resetData();

                    expect(LightMaterialData.index).toEqual(20);
                });
            });
        });

        describe("disposeComponent", function () {
            beforeEach(function () {
            });

            describe("remove by swap with last one", function () {
                var obj2, mat2;

                beforeEach(function () {
                    mat2 = lightMaterialTool.create();
                    obj2 = gameObjectTool.create();
                    gameObjectTool.addComponent(obj2, mat2);
                    sceneTool.addGameObject(obj2);
                });

                it("index -= 1", function () {
                    var index = LightMaterialData.index;

                    gameObjectTool.disposeComponent(obj, material);

                    expect(LightMaterialData.index).toEqual(index - 1);
                });

                describe("reset removed one's value", function () {
                    function judgeColor(getMethodName, setMethodName, defaultColor) {
                        var color1 = Color.create("rgb(0.1,0.2,0.3)");
                        var color2 = Color.create("rgb(0.4,0.2,0.3)");
                        lightMaterialTool[setMethodName](material, color1);
                        lightMaterialTool[setMethodName](mat2, color2);

                        var materialIndex = material.index;
                        var mat2Index = mat2.index;
                        gameObjectTool.disposeComponent(obj, material);

                        colorTool.judgeIsEqual(lightMaterialTool[getMethodName](componentTool.createComponent(materialIndex)), color2, expect);
                        colorTool.judgeIsEqual(lightMaterialTool[getMethodName](componentTool.createComponent(mat2Index)), defaultColor, expect);
                    }

                    function judgeSingleValue(getMethodName, setMethodName, defaultValue) {
                        disposeTool.judgeSingleValue(lightMaterialTool, getMethodName, setMethodName, defaultValue, material, mat2, function(material){
                            gameObjectTool.disposeComponent(obj, material);
                        })
                    }

                    it("remove from specularColors", function () {
                        judgeColor("getSpecularColor", "setSpecularColor", colorTool.createDefaultColor(MaterialData));
                    });
                    it("remove from emissionColors", function () {
                        judgeColor("getEmissionColor", "setEmissionColor", Color.create("#000000"));
                    });
                    it("remove from shadings", function () {
                        judgeSingleValue("getShading", "setShading", LightMaterialData.defaultShading);
                    });
                    it("remove from shininess", function () {
                        judgeSingleValue("getShininess", "setShininess", LightMaterialData.defaultShininess);
                    });
                    it("remove from lightModels", function () {
                        judgeSingleValue("getLightModel", "setLightModel", LightMaterialData.defaultLightModel);
                    });
                });
            });
        });

        describe("add shader libs", function () {
            beforeEach(function () {
            });

            describe("add NormalMatrixNoInstanceShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_normalMatrix", function () {
                    var transform = gameObjectTool.getComponent(cameraGameObject, wd.ThreeDTransform),
                        mat = Matrix4.create().setTranslate(1, 2, 3),
                        position = mat.getTranslation(),
                        pos = 0;

                    threeDTransformTool.setPosition(transform, position);
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_normalMatrix").returns(pos);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    var normalMatrix = mat.invertTo3x3().transpose();
                    expect(gl.uniformMatrix3fv).toCalledWith(pos, false, normalMatrix.values);
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        directorTool.init(state);
                    });

                    it("test vs source", function () {
                        var vs = materialTool.getVsSource(gl);


                        expect(glslTool.contain(vs, "mat3 normalMatrix = u_normalMatrix;\n")).toBeTruthy();
                    });
                });
            });

            describe("add NormalCommonShaderLib", function () {
                beforeEach(function () {
                });

                describe("send a_normal", function () {
                    var buffer;

                    beforeEach(function () {
                        buffer = { b: 1 };

                        gl.createBuffer.onCall(1).returns(buffer);
                    });

                    it("create buffer and init it when first get", function () {
                        directorTool.init(state);

                        var data = geometryTool.getNormals(geo);


                        directorTool.loopBody(state);

                        expect(gl.createBuffer.callCount).toEqual(3);
                        expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer).callCount).toEqual(1);
                        expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                    });
                    it("not create buffer after first get", function () {
                        directorTool.init(state);

                        directorTool.loopBody(state);
                        directorTool.loopBody(state);

                        expect(gl.createBuffer.callCount).toEqual(3);
                    });
                });
            });

            describe("add LightCommonShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_specular", function () {
                    var color = Color.create("rgb(0.1,0.2,0.3)"),
                        colorVec3 = color.toVector3(),
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_specular").returns(pos);
                    lightMaterialTool.setSpecularColor(material, color);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform3f).toCalledWith(pos, colorVec3.x, colorVec3.y, colorVec3.z);
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        directorTool.init(state);
                    });

                    it("test vs source", function () {
                        var vs = materialTool.getVsSource(gl);

                        expect(glslTool.contain(vs, "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\n    struct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n    struct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n")).toBeTruthy();

                        expect(glslTool.contain(vs, "vec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n")).toBeTruthy();
                        expect(glslTool.contain(vs, "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n    //return vec3(0.0) - lightPos;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n")).toBeTruthy();
                    });
                    it("test fs source", function () {
                        var fs = materialTool.getFsSource(gl);

                        expect(glslTool.contain(fs, "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n")).toBeTruthy();
                        expect(glslTool.contain(fs, "vec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n")).toBeTruthy();
                        expect(glslTool.contain(fs, "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n    //return vec3(0.0) - lightPos;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n")).toBeTruthy();
                    });
                });
            });

            describe("add LightSetWorldPositionShaderLib", function () {
                beforeEach(function () {
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        directorTool.init(state);
                    });

                    it("test vs source", function () {
                        var vs = materialTool.getVsSource(gl);

                        expect(glslTool.contain(vs, "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n")).toBeTruthy();
                    });
                });
            });


            describe("add map shader lib", function () {
                function judgeSendUniformSampler(name) {
                    var pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, name).returns(pos);

                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1i).toCalledWith(pos, 0);
                }

                beforeEach(function () {
                });

                describe("if has map, add CommonLightMapShaderLib", function(){
                    beforeEach(function () {
                        var texture = textureTool.create();
                        textureTool.setSource(texture, null);

                        lightMaterialTool.setSpecularMap(material, texture);
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

                            var data = geometryTool.getTexCoords(geo);


                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(4);
                            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
                            expect(gl.vertexAttribPointer.withArgs(pos,size,"FLOAT",false,0,0)).toCalledOnce();
                        });
                        it("not create buffer after first get", function () {
                            directorTool.init(state);

                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(4);



                            directorTool.loopBody(state);

                            expect(gl.createBuffer.callCount).toEqual(4);
                        });
                    })

                    // it("send u_sampler2D0", function () {
                    //     var pos = 0;
                    //     gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D0").returns(pos);
                    //
                    //     directorTool.init(state);
                    //     directorTool.loopBody(state);
                    //
                    //     expect(gl.uniform1i).toCalledWith(pos, 0);
                    // });
                    //
                    // describe("test glsl", function () {
                    //     beforeEach(function () {
                    //         directorTool.init(state);
                    //     });
                    //
                    //     it("test vs source", function () {
                    //         var vs = materialTool.getVsSource(gl);
                    //
                    //         expect(glslTool.contain(vs, "varying vec2 v_mapCoord0;\n")).toBeTruthy();
                    //         expect(glslTool.contain(vs, "v_mapCoord0 = a_texCoord;")).toBeTruthy();
                    //     });
                    //     it("test fs source", function () {
                    //         var fs = materialTool.getFsSource(gl);
                    //
                    //         expect(glslTool.contain(fs, "varying vec2 v_mapCoord0;\n")).toBeTruthy();
                    //         expect(glslTool.contain(fs, "uniform sampler2D u_sampler2D0;\n")).toBeTruthy();
                    //         expect(glslTool.contain(fs, "totalColor *= texture2D(u_sampler2D0, v_mapCoord0);\n")).toBeTruthy();
                    //     });
                    // });
                });

                describe("if has diffuse map, add DiffuseMapShaderLib", function(){
                    beforeEach(function () {
                        var texture = textureTool.create();
                        textureTool.setSource(texture, null);

                        lightMaterialTool.setDiffuseMap(material, texture);
                    });

                    it("send u_diffuseMapSampler", function () {
                        judgeSendUniformSampler("u_diffuseMapSampler");
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test vs source", function () {
                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "varying vec2 v_diffuseMapTexCoord;")).toBeTruthy();
                            expect(glslTool.contain(vs, "v_diffuseMapTexCoord = a_texCoord;")).toBeTruthy();
                        });
                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "varying vec2 v_diffuseMapTexCoord;")).toBeTruthy();
                            expect(glslTool.contain(fs, "uniform sampler2D u_diffuseMapSampler;\n")).toBeTruthy();
                            expect(glslTool.containMultiLine(fs, [
                                "vec4 getMaterialDiffuse() {",
                                "return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);",
                                "}"
                            ])).toBeTruthy();
                        });
                    });
                });
                describe("else, add NoDiffuseMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    it("send u_diffuse", function () {
                        var color = Color.create("rgb(0.1,0.2,0.3)"),
                            colorVec3 = color.toVector3(),
                            pos = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_diffuse").returns(pos);
                        lightMaterialTool.setColor(material, color);


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

                            expect(glslTool.contain(fs, "vec4 getMaterialDiffuse() {\n        return vec4(u_diffuse, 1.0);\n    }\n")).toBeTruthy();
                        });
                    });
                });

                describe("if has specular map, add SpecularMapShaderLib", function(){
                    beforeEach(function () {
                        var texture = textureTool.create();
                        textureTool.setSource(texture, null);

                        lightMaterialTool.setSpecularMap(material, texture);
                    });

                    it("send u_specularMapSampler", function () {
                        judgeSendUniformSampler("u_specularMapSampler");
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test vs source", function () {
                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "varying vec2 v_specularMapTexCoord;")).toBeTruthy();
                            expect(glslTool.contain(vs, "v_specularMapTexCoord = a_texCoord;")).toBeTruthy();
                        });
                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "varying vec2 v_specularMapTexCoord;")).toBeTruthy();
                            expect(glslTool.contain(fs, "uniform sampler2D u_specularMapSampler;\n")).toBeTruthy();
                            expect(glslTool.containMultiLine(fs, [
                                "float getSpecularStrength() {",
                                "return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;",
                                "}"
                            ])).toBeTruthy();
                        });
                    });
                });
                describe("else, add NoSpecularMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "float getSpecularStrength() {\n        return 1.0;\n    }\n")).toBeTruthy();
                        });
                    });
                });

                describe("add NoLightMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n")).toBeTruthy();
                        });
                    });
                });

                describe("add NoEmissionMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    it("send u_emission", function () {
                        var color = Color.create("rgb(0.1,0.2,0.3)"),
                            colorVec3 = color.toVector3(),
                            pos = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_emission").returns(pos);
                        lightMaterialTool.setEmissionColor(material, color);


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

                            expect(glslTool.contain(fs, "vec3 getMaterialEmission() {\n        return u_emission;\n    }\n")).toBeTruthy();
                        });
                    });
                });

                describe("add NoNormalMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test vs source", function () {
                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "varying vec3 v_normal;\n")).toBeTruthy();
                            expect(glslTool.contain(vs, "v_normal = normalize(normalMatrix * a_normal);\n")).toBeTruthy();
                        });
                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "varying vec3 v_normal;\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "vec3 getNormal(){\n    return v_normal;\n}\n\n")).toBeTruthy();
                            expect(glslTool.contain(fs, "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDirByLightPos(u_directionLights[x].position);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n")).toBeTruthy();
                        });
                    });
                });

                describe("add NoShadowMapShaderLib", function () {
                    beforeEach(function () {
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                            directorTool.init(state);
                        });

                        it("test fs source", function () {
                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n")).toBeTruthy();
                        });
                    });
                });

            });


            describe("add LightShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_shininess", function () {
                    var shininess = 64,
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_shininess").returns(pos);
                    lightMaterialTool.setShininess(material, shininess);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1f).toCalledWith(pos, shininess);
                });
                it("send u_opacity", function () {
                    var opacity = 0.2,
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_opacity").returns(pos);
                    lightMaterialTool.setOpacity(material, opacity);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    var args = gl.uniform1f.firstCall.args;
                    expect(args[0]).toEqual(pos);
                    expect(testTool.getValues(args[1])).toEqual(opacity);
                });
                it("send u_lightModel", function () {
                    var lightModel = ELightModel.CONSTANT,
                        pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_lightModel").returns(pos);
                    lightMaterialTool.setLightModel(material, lightModel);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1i).toCalledWith(pos, lightModel);
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

                describe("test glsl", function () {
                    beforeEach(function () {
                    });

                    describe("test vs source", function () {
                        it("test gl_Position", function () {
                            directorTool.init(state);

                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n")).toBeTruthy();
                        });
                        it("test define DIRECTION_LIGHTS_COUNT", function () {
                            sceneTool.addDirectionLight(null, null, null);
                            sceneTool.addDirectionLight(null, null, null);

                            directorTool.init(state);

                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "#define DIRECTION_LIGHTS_COUNT 2")).toBeTruthy();
                        });
                        it("test define POINT_LIGHTS_COUNT", function () {
                            sceneTool.addPointLight(null, null, null);
                            sceneTool.addPointLight(null, null, null);

                            directorTool.init(state);

                            var vs = materialTool.getVsSource(gl);

                            expect(glslTool.contain(vs, "#define POINT_LIGHTS_COUNT 2")).toBeTruthy();
                        });
                    });

                    describe("test fs source", function () {
                        it("test function define", function () {
                            directorTool.init(state);

                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\nfloat getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 reflectDir = reflect(-lightDir, normal);\n        float phongTerm = dot(viewDir, reflectDir);\n\n        phongTerm = clamp(phongTerm, 0.0, 1.0);\n        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n        phongTerm = pow(phongTerm, shininess);\n\n        return phongTerm;\n}\n\nvec4 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n        vec3 materialLight = getMaterialLight();\n        vec4 materialDiffuse = getMaterialDiffuse();\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse.rgb;\n\n\n        if(u_lightModel == 3){\n            return vec4(emissionColor + ambientColor, 1.0);\n        }\n\n        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);\n\n        float spec = 0.0;\n\n        if(u_lightModel == 2){\n                spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n        else if(u_lightModel == 1){\n                spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);\n//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), 1.0);\n}\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\n        vec4 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec4 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n        float attenuation = 1.0;\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0);\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);\n        }\n    #endif\n\n        return totalLight;\n}\n")).toBeTruthy();
                        });
                        it("test define DIRECTION_LIGHTS_COUNT", function () {
                            sceneTool.addDirectionLight(null, null, null);
                            sceneTool.addDirectionLight(null, null, null);

                            directorTool.init(state);

                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "#define DIRECTION_LIGHTS_COUNT 2")).toBeTruthy();
                        });
                        it("test define POINT_LIGHTS_COUNT", function () {
                            sceneTool.addPointLight(null, null, null);
                            sceneTool.addPointLight(null, null, null);

                            directorTool.init(state);

                            var fs = materialTool.getFsSource(gl);

                            expect(glslTool.contain(fs, "#define POINT_LIGHTS_COUNT 2")).toBeTruthy();
                        });
                    });
                });
            });

            describe("add AmbientLightShaderLib", function () {
                beforeEach(function () {
                });

                it("send u_ambient", function () {
                    var color = Color.create("#123456")
                    pos = 0;
                    gl.getUniformLocation.withArgs(sinon.match.any, "u_ambient").returns(pos);


                    sceneTool.addAmbientLight(null, color);


                    directorTool.init(state);
                    directorTool.loopBody(state);

                    expect(testTool.getValues(gl.uniform3f.withArgs(pos).args[0].slice(1, 4))).toEqual(testTool.getValues(color.toArray3()));
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                        directorTool.init(state);
                    });

                    it("test fs source", function () {
                        var fs = materialTool.getFsSource(gl);

                        expect(glslTool.contain(fs, "uniform vec3 u_ambient;")).toBeTruthy();
                    });
                });
            });

            describe("add DirectionLightShaderLib", function () {
                beforeEach(function () {
                });

                describe("send structure data", function () {
                    var position1, color1, intensity1;
                    var position2, color2, intensity2;

                    beforeEach(function () {
                        position1 = Vector3.create(1, 1, 2);
                        position2 = Vector3.create(2, 1, 2);
                        color1 = Color.create("#111111");
                        color2 = Color.create("#211111");
                        intensity1 = 1;
                        intensity2 = 2;

                        sceneTool.addDirectionLight(position1, color1, intensity1);
                        sceneTool.addDirectionLight(position2, color2, intensity2);
                    });

                    it("send light position", function () {
                        var pos1 = 0,
                            pos2 = 1;

                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[0].position").returns(pos1);
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[1].position").returns(pos2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform3f.withArgs(pos1)).toCalledWith(pos1, position1.x, position1.y, position1.z);
                        expect(gl.uniform3f.withArgs(pos2)).toCalledWith(pos2, position2.x, position2.y, position2.z);
                    });

                    it("send light color", function () {
                        var pos1 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[0].color").returns(pos1),
                            pos2 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[1].color").returns(pos2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(testTool.getValues(gl.uniform3f.withArgs(pos1).args[0].slice(1, 4))).toEqual(testTool.getValues(color1.toArray3()));
                        expect(testTool.getValues(gl.uniform3f.withArgs(pos2).args[0].slice(1, 4))).toEqual(testTool.getValues(color2.toArray3()));
                    });
                    it("send light intensity", function () {
                        var pos1 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[0].intensity").returns(pos1),
                            pos2 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[1].intensity").returns(pos2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform1f.withArgs(pos1)).toCalledWith(pos1, intensity1);
                        expect(gl.uniform1f.withArgs(pos2)).toCalledWith(pos2, intensity2);
                    });

                    it("at most support 4 direction lights", function () {
                        var position3 = Vector3.create(3, 3, 4),
                            position4 = Vector3.create(4, 3, 4),
                            color3 = Color.create("#333333"),
                            color4 = Color.create("#433333"),
                            intensity3 = 3,
                            intensity4 = 4;

                        sceneTool.addDirectionLight(position3, color3, intensity3);
                        sceneTool.addDirectionLight(position4, color4, intensity4);


                        var pos3 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[2].position").returns(pos3),
                            pos4 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_directionLights[3].position").returns(pos4);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform3f.withArgs(pos3)).toCalledWith(pos3, position3.x, position3.y, position3.z);
                        expect(gl.uniform3f.withArgs(pos4)).toCalledWith(pos4, position4.x, position4.y, position4.z);
                    });
                });
            });

            describe("add PointLightShaderLib", function () {
                beforeEach(function () {
                });

                describe("send structure data", function () {
                    var light1, position1, color1, intensity1;
                    var light2, position2, color2, intensity2;

                    function judgeSendSingleValue(name, setMethodName, value1, value2){
                        var pos1 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[0]." + name).returns(pos1),
                            pos2 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[1]." + name).returns(pos2);

                        pointLightTool[setMethodName](light1, value1);
                        pointLightTool[setMethodName](light2, value2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform1f.withArgs(pos1)).toCalledWith(pos1, value1);
                        expect(gl.uniform1f.withArgs(pos2)).toCalledWith(pos2, value2);
                    }

                    beforeEach(function () {
                        position1 = Vector3.create(1, 1, 2);
                        position2 = Vector3.create(2, 1, 2);
                        color1 = Color.create("#111111");
                        color2 = Color.create("#211111");

                        var obj1 = sceneTool.addPointLight(position1, color1);
                        light1 = gameObjectTool.getComponent(obj1, PointLight);


                        var obj2 = sceneTool.addPointLight(position2, color2);
                        light2 = gameObjectTool.getComponent(obj2, PointLight);
                    });

                    it("send light position", function () {
                        var pos1 = 0,
                            pos2 = 1;

                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[0].position").returns(pos1);
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[1].position").returns(pos2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform3f.withArgs(pos1)).toCalledWith(pos1, position1.x, position1.y, position1.z);
                        expect(gl.uniform3f.withArgs(pos2)).toCalledWith(pos2, position2.x, position2.y, position2.z);
                    });

                    it("send light color", function () {
                        var pos1 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[0].color").returns(pos1),
                            pos2 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[1].color").returns(pos2);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(testTool.getValues(gl.uniform3f.withArgs(pos1).args[0].slice(1, 4))).toEqual(testTool.getValues(color1.toArray3()));
                        expect(testTool.getValues(gl.uniform3f.withArgs(pos2).args[0].slice(1, 4))).toEqual(testTool.getValues(color2.toArray3()));
                    });
                    it("send light intensity", function () {
                        judgeSendSingleValue("intensity", "setIntensity", 1, 2);
                    });
                    it("send light constant", function () {
                        judgeSendSingleValue("constant", "setConstant", 1, 2);
                    });
                    it("send light linear", function () {
                        judgeSendSingleValue("linear", "setLinear", 1, 2);
                    });
                    it("send light quadratic", function () {
                        judgeSendSingleValue("quadratic", "setQuadratic", 1, 2);
                    });
                    it("send light range", function () {
                        judgeSendSingleValue("range", "setRange", 1, 2);
                    });

                    it("at most support 4 point lights", function () {
                        var position3 = Vector3.create(3, 3, 4),
                            position4 = Vector3.create(4, 3, 4),
                            color3 = Color.create("#333333"),
                            color4 = Color.create("#433333"),
                            intensity3 = 3,
                            intensity4 = 4;

                        sceneTool.addPointLight(position3, color3, intensity3);
                        sceneTool.addPointLight(position4, color4, intensity4);


                        var pos3 = 0;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[2].position").returns(pos3),
                            pos4 = 1;
                        gl.getUniformLocation.withArgs(sinon.match.any, "u_pointLights[3].position").returns(pos4);


                        directorTool.init(state);
                        directorTool.loopBody(state);

                        expect(gl.uniform3f.withArgs(pos3)).toCalledWith(pos3, position3.x, position3.y, position3.z);
                        expect(gl.uniform3f.withArgs(pos4)).toCalledWith(pos4, position4.x, position4.y, position4.z);
                    });
                });
            });

            describe("add LightEndShaderLib", function () {
                beforeEach(function () {
                });

                describe("test glsl", function () {
                    beforeEach(function () {
                    });

                    describe("test fs source", function () {
                        it("test if set material->alphaTest === true", function () {
                            var alphaTest = 0.2;
                            lightMaterialTool.setAlphaTest(material, alphaTest);

                            directorTool.init(state);

                            var fs = materialTool.getFsSource(gl);
                            expect(glslTool.containMultiLine(fs, [
                                "if (gl_FragColor.a < 0.20000",
                                "discard;"
                            ])).toBeTruthy();
                        });
                    });
                    it("test set gl_FragColor", function () {

                        directorTool.init(state);

                        var fs = materialTool.getFsSource(gl);

                        expect(glslTool.contain(fs, "gl_FragColor = totalColor;\n")).toBeTruthy();
                    });
                });
            });
        });
    });

    describe("test light material and light material together", function () {
        var basicMaterial;
        var basicObj;
        var basicGeo;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();

            testTool.clearAndOpenContractCheck(sandbox);

            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;

            basicMaterial = basicMaterialTool.create();
            basicGeo = boxGeometryTool.create();

            basicObj = sceneTool.createGameObject(basicGeo, basicMaterial);
            sceneTool.addGameObject(basicObj);


            state = stateTool.createAndSetFakeGLState(sandbox);

            gl = stateTool.getGLFromFakeGLState(state);
        });

        it("switch program between different shader", function () {
            var program1 = {};
            var program2 = { a: 1 };
            gl.createProgram.onCall(0).returns(program1);
            gl.createProgram.onCall(1).returns(program2);

            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.createProgram).toCalledTwice();
            expect(gl.useProgram).toCalledTwice();
        });
    });
});
