describe("LightMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

    var gl;
    var state;

    var Color = wd.Color;
    var MaterialData = wd.MaterialData;
    var LightMaterialData = wd.LightMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;
    var EShading = wd.EShading;
    var ELightModel = wd.ELightModel;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

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

    describe("only test light material", function () {
        beforeEach(function () {
            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;
        });

        // it("glsl only set glPosition,glFragColor once", function () {
        //     gl = directorTool.init(sandbox);
        //
        //     directorTool.loopBody(state);
        //
        //     var vs = materialTool.getVsSource(gl);
        //     var fs = materialTool.getFsSource(gl);
        //     expect(glslTool.containSpecifyCount(vs, "gl_Position =", 1)).toBeTruthy();
        //     expect(glslTool.containSpecifyCount(fs, "gl_FragColor =", 1)).toBeTruthy();
        // });

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
                    obj2 = gameObjectSystemTool.create();
                    gameObjectSystemTool.addComponent(obj2, mat2);
                    sceneSystemTool.addGameObject(obj2);
                });

                it("index -= 1", function () {
                    var index = LightMaterialData.index;

                    gameObjectSystemTool.disposeComponent(obj, material);

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
                        gameObjectSystemTool.disposeComponent(obj, material);

                        colorTool.judgeIsEqual(lightMaterialTool[getMethodName](componentTool.createComponent(materialIndex)), color2, expect);
                        colorTool.judgeIsEqual(lightMaterialTool[getMethodName](componentTool.createComponent(mat2Index)), defaultColor, expect);
                    }

                    function judgeSingleValue(getMethodName, setMethodName, defaultValue) {
                        disposeTool.judgeSingleValue(lightMaterialTool, getMethodName, setMethodName, defaultValue, material, mat2, function(material){
                            gameObjectSystemTool.disposeComponent(obj, material);
                        })
                    }

                    function judgeMap(setMapMethodName, hasMapMethodName) {
                        var texture = textureSystemTool.create();
                        textureSystemTool.setSource(texture, {});

                        lightMaterialTool[setMapMethodName](material, texture);

                        var texture2 = textureSystemTool.create();
                        textureSystemTool.setSource(texture2, {});

                        lightMaterialTool[setMapMethodName](mat2, texture2);

                        var matIndex1 = material.index;
                        var matIndex2 = mat2.index;

                        gameObjectSystemTool.disposeComponent(obj, material);


                        expect(LightMaterialData[hasMapMethodName][lightMaterialTool.computeLightBufferIndex(matIndex1)]).toEqual(1);
                        expect(LightMaterialData[hasMapMethodName][lightMaterialTool.computeLightBufferIndex(matIndex2)]).toEqual(0);
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
                    it("remove from diffuseMaps", function () {
                        judgeMap("setDiffuseMap", "hasDiffuseMaps");
                    });
                    it("remove from specularMaps", function () {
                        judgeMap("setSpecularMap", "hasSpecularMaps");
                    });
                });

                // describe("remove by swap the target one and the last one", function () {
                //     function judge(methodName, mapDataName) {
                //         var texture = textureSystemTool.create();
                //         textureSystemTool.setSource(texture, {});
                //
                //         lightMaterialTool[methodName](material, texture);
                //
                //         var texture2 = textureSystemTool.create();
                //         textureSystemTool.setSource(texture2, {});
                //
                //         lightMaterialTool[methodName](mat2, texture2);
                //
                //         var matIndex1 = material.index;
                //         var matIndex2 = mat2.index;
                //
                //         gameObjectSystemTool.disposeComponent(obj, material);
                //
                //
                //         expect(LightMaterialData[mapDataName][matIndex1]).toEqual(texture2.index);
                //         expect(LightMaterialData[mapDataName][matIndex2]).toBeUndefined();
                //     }
                //
                //     it("remove diffuseMapMap", function () {
                //         judge("setDiffuseMap", "diffuseMapMap");
                //     });
                //     it("remove diffuseMapMap", function () {
                //         judge("setSpecularMap", "specularMapMap");
                //     });
                // });
            });
        });
    });

    describe("test set map", function() {
        beforeEach(function(){

        });

        describe("setDiffuseMap", function() {
            var mat;
            var texture;

            beforeEach(function(){
                mat = lightMaterialTool.create();
                texture = textureSystemTool.createTexture();
            });

            describe("if not set before", function(){
                it("uniform sampler name is u_diffuseMapSampler", function () {
                    lightMaterialTool.setDiffuseMap(mat, texture);

                    expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_diffuseMapSampler");
                });
            });

            describe("else", function() {
                var texture2;


                beforeEach(function(){
                    lightMaterialTool.setDiffuseMap(mat, texture);

                    texture2 = textureSystemTool.createTexture();
                });

                it("replace old texture in matTextureList with new texture", function () {
                    lightMaterialTool.setDiffuseMap(mat, texture2);

                    expect(MapManagerData.materialTextureList[mat.index]).toEqual([texture2.index]);
                });
                it("uniform sampler name not change", function () {
                    lightMaterialTool.setDiffuseMap(mat, texture2);

                    expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_diffuseMapSampler");
                });
                it("texture offset not change", function () {
                    lightMaterialTool.setDiffuseMap(mat, texture2);

                    expect(MapManagerData.textureOffsetMap[mat.index]["u_diffuseMapSampler"]).toEqual(0);
                });
            });

            it("hasDiffuseMap should return true", function () {
                expect(lightMaterialTool.hasDiffuseMap(mat.index, LightMaterialData)).toBeFalsy();

                lightMaterialTool.setDiffuseMap(mat, texture);

                expect(lightMaterialTool.hasDiffuseMap(mat.index, LightMaterialData)).toBeTruthy();
            });
        });

        describe("setSpecularMap", function() {
            var mat;
            var texture;

            beforeEach(function(){
                mat = lightMaterialTool.create();
                texture = textureSystemTool.createTexture();
            });

            describe("if not set before", function(){
                it("uniform sampler name is u_specularMapSampler", function () {
                    lightMaterialTool.setSpecularMap(mat, texture);

                    expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_specularMapSampler");
                });
            });

            describe("else", function() {
                var texture2;


                beforeEach(function(){
                    lightMaterialTool.setSpecularMap(mat, texture);

                    texture2 = textureSystemTool.createTexture();
                });

                it("replace old texture in matTextureList with new texture", function () {
                    lightMaterialTool.setSpecularMap(mat, texture2);

                    expect(MapManagerData.materialTextureList[mat.index]).toEqual([texture2.index]);
                });
                it("uniform sampler name not change", function () {
                    lightMaterialTool.setSpecularMap(mat, texture2);

                    expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_specularMapSampler");
                });
            });

            it("hasSpecularMap should return true", function () {
                expect(lightMaterialTool.hasSpecularMap(mat.index, LightMaterialData)).toBeFalsy();

                lightMaterialTool.setSpecularMap(mat, texture);

                expect(lightMaterialTool.hasSpecularMap(mat.index, LightMaterialData)).toBeTruthy();
            });
        });

        describe("test set different maps", function () {
            var mat;
            var diffuseTexture;
            var specularTexture;

            beforeEach(function(){
                mat = lightMaterialTool.create();
                diffuseTexture = textureSystemTool.createTexture();
                specularTexture = textureSystemTool.createTexture();

                lightMaterialTool.setDiffuseMap(mat, diffuseTexture);
                lightMaterialTool.setSpecularMap(mat, specularTexture);
            });

            describe("if not set before", function(){
                it("texture count + 1", function () {
                    expect(MapManagerData.textureCounts[mat.index]).toEqual(2);
                });
                it("add texture to matTextureList", function () {
                    expect(MapManagerData.materialTextureList[mat.index]).toEqual([diffuseTexture.index, specularTexture.index]);
                });
                it("test set texture offset", function () {
                    expect(MapManagerData.textureOffsetMap[mat.index]["u_diffuseMapSampler"]).toEqual(0);
                    expect(MapManagerData.textureOffsetMap[mat.index]["u_specularMapSampler"]).toEqual(1);
                });
            });

            describe("else", function() {
                var diffuseTexture2;
                var specularTexture2;

                beforeEach(function(){
                    diffuseTexture2 = textureSystemTool.createTexture();
                    specularTexture2 = textureSystemTool.createTexture();

                    lightMaterialTool.setDiffuseMap(mat, diffuseTexture2);
                    lightMaterialTool.setSpecularMap(mat, specularTexture2);
                });

                it("texture count not change", function () {
                    expect(MapManagerData.textureCounts[mat.index]).toEqual(2);
                });
                it("replace old texture in matTextureList with new texture", function () {
                    expect(MapManagerData.materialTextureList[mat.index]).toEqual([diffuseTexture2.index, specularTexture2.index]);
                });
                it("texture offset not change", function () {
                    expect(MapManagerData.textureOffsetMap[mat.index]["u_diffuseMapSampler"]).toEqual(0);
                    expect(MapManagerData.textureOffsetMap[mat.index]["u_specularMapSampler"]).toEqual(1);
                });
            });
        });
    });
});
