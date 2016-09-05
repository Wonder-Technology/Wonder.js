describe("terrain mix", function() {
    var sandbox = null;

    var material;
    var mixMap, diffuseMap1, diffuseMap2, diffuseMap3,
        bumpMap1, bumpMap2, bumpMap3;
    var mix;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.TerrainMaterial.create();
        material.geometry = {
            entityObject: wd.GameObject.create()
        };

        mix = wd.TerrainMix.create();


        mixMap = wd.ImageTexture.create({});
        diffuseMap1 = wd.ImageTexture.create({});
        diffuseMap2 = wd.ImageTexture.create({});
        diffuseMap3 = wd.ImageTexture.create({});
        bumpMap1 = wd.ImageTexture.create({});
        bumpMap2 = wd.ImageTexture.create({});
        bumpMap3 = wd.ImageTexture.create({});
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    it("test default values", function () {
    });

    describe("mapData(setter)", function () {
        beforeEach(function () {
            testTool.openContractCheck(sandbox);
        });

        it("mapData should be Object type", function () {
            expect(function () {
                material.mix.mapData = wdCb.Hash.create(
                    {
                        mixMap: mixMap,
                        diffuseMap1: diffuseMap1,
                        diffuseMap2: diffuseMap2,
                        diffuseMap3: diffuseMap3,
                        bumpMap1: bumpMap1,
                        bumpMap2: bumpMap2,
                        bumpMap3: bumpMap3
                    }
                );
            }).toThrow();

            expect(function () {
                material.mix.mapData = {
                    mixMap: mixMap,
                    diffuseMap1: diffuseMap1,
                    diffuseMap2: diffuseMap2,
                    diffuseMap3: diffuseMap3,
                    bumpMap1: bumpMap1,
                    bumpMap2: bumpMap2,
                    bumpMap3: bumpMap3
                };
            }).not.toThrow();
        });
    });

    describe("clone", function () {
        it("clone data", function () {
            mix.alphaTest = 0.8;


            cloneTool.extend(material, {
                mix: mix
            });


            var result = material.clone();

            expect(result.mix.alphaTest).toEqual(mix.alphaTest);
        });
        it("deep clone mapData", function () {
            var cloneMixMap = {};
            var cloneDiffuseMap1 = {};
            var cloneDiffuseMap2 = {};
            var cloneDiffuseMap3 = {};
            var cloneBumpMap1 = {};
            var cloneBumpMap2 = {};
            var cloneBumpMap3 = {};


            sandbox.stub(mixMap, "clone").returns(cloneMixMap);
            sandbox.stub(diffuseMap1, "clone").returns(cloneDiffuseMap1);
            sandbox.stub(diffuseMap2, "clone").returns(cloneDiffuseMap2);
            sandbox.stub(diffuseMap3, "clone").returns(cloneDiffuseMap3);
            sandbox.stub(bumpMap1, "clone").returns(cloneBumpMap1);
            sandbox.stub(bumpMap2, "clone").returns(cloneBumpMap2);
            sandbox.stub(bumpMap3, "clone").returns(cloneBumpMap3);

            mix.mapData = {
                mixMap: mixMap,
                diffuseMap1: diffuseMap1,
                diffuseMap2: diffuseMap2,
                diffuseMap3: diffuseMap3,
                bumpMap1: bumpMap1,
                bumpMap2: bumpMap2,
                bumpMap3: bumpMap3
            };


            cloneTool.extend(material, {
                mix: mix
            });


            var result = material.clone();

            expect(result.mix.mapData === material.mix.mapData).toBeFalsy();

            var mapData = result.mix.mapData;
            expect(mapData.mixMap).toEqual(cloneMixMap);
            expect(mapData.diffuseMap1).toEqual(cloneDiffuseMap1);
            expect(mapData.diffuseMap2).toEqual(cloneDiffuseMap2);
            expect(mapData.diffuseMap3).toEqual(cloneDiffuseMap3);
        });
    });

    describe("addMap", function () {
        beforeEach(function () {

        });

        describe("contract check", function () {
            var mapManager;

            beforeEach(function () {
                testTool.openContractCheck(sandbox);

                mapManager = wd.MapManager.create();
            });

            it("mapData at least should has mixMap and 3 diffuseMaps", function () {
                expect(function () {
                    mix.mapData = {
                        mixMap: mixMap,
                        diffuseMap1: diffuseMap1,
                        diffuseMap2: diffuseMap2
                    };

                    mix.addMap(mapManager);
                }).toThrow("mapData at least should has mixMap and 3 diffuseMaps");

                expect(function () {
                    mix.mapData = {
                        mixMap: mixMap,
                        diffuseMap1: diffuseMap1,
                        diffuseMap2: diffuseMap2,
                        diffuseMap3: diffuseMap3
                    };

                    mix.addMap(mapManager);
                }).not.toThrow();
            });

            describe("if has bump map", function () {
                beforeEach(function () {
                });

                it("should has 3 bump maps", function () {
                    expect(function () {
                        mix.mapData = {
                            mixMap: mixMap,
                            diffuseMap1: diffuseMap1,
                            diffuseMap2: diffuseMap2,
                            diffuseMap3: diffuseMap3,
                            bumpMap1: bumpMap1,
                            bumpMap2: bumpMap2
                            //bumpMap3:bumpMap3
                        };

                        mix.addMap(mapManager);
                    }).toThrow("should has 3 bump maps");

                    expect(function () {
                        mix.mapData = {
                            mixMap: mixMap,
                            diffuseMap1: diffuseMap1,
                            diffuseMap2: diffuseMap2,
                            diffuseMap3: diffuseMap3,
                            bumpMap1: bumpMap1,
                            bumpMap2: bumpMap2,
                            bumpMap3: bumpMap3
                        };

                        mix.addMap(mapManager);
                    }).not.toThrow();
                });
                it("bump map should be ImageTexture", function () {
                    expect(function () {
                        mix.mapData = {
                            mixMap: mixMap,
                            diffuseMap1: diffuseMap1,
                            diffuseMap2: diffuseMap2,
                            diffuseMap3: diffuseMap3,
                            bumpMap1: bumpMap1,
                            bumpMap2: bumpMap2,
                            bumpMap3: wd.MarbleProceduralTexture.create()
                        };

                        mix.addMap(mapManager);
                    }).toThrow("bump map should be ImageTexture");
                });
            });
        });
    });

    describe("integration test", function () {
        var cmd;

        beforeEach(function () {
            wd.Director.getInstance().scene = wd.SceneDispatcher.create();

            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            cmd = rendererTool.createSingleDrawCommand(sandbox);

            cmd.material = material;
        });

        describe("test with no bump maps", function () {
            describe("test map", function () {
                beforeEach(function () {
                });

                it("test bind and send mix and diffuse map data", function () {
                    var mapArr = [mixMap, diffuseMap1, diffuseMap2, diffuseMap3];

                    mapArr.forEach(function (map) {
                        sandbox.stub(map, "bindToUnit");
                        sandbox.stub(map, "update");
                    });


                    material.mix.mapData = {
                        mixMap: mixMap,
                        diffuseMap1: diffuseMap1,
                        diffuseMap2: diffuseMap2,
                        diffuseMap3: diffuseMap3,
                        bumpMap1: bumpMap1,
                        bumpMap2: bumpMap2,
                        bumpMap3: bumpMap3
                    };


                    material.init();
                    shaderTool.spyProgram(sandbox, material);


                    material.updateShader(cmd);


                    mapArr.forEach(function (map) {
                        expect(map.bindToUnit).toCalledOnce();
                        expect(map.update).toCalledOnce();
                    });

                    expect(mixMap.update).toCalledBefore(diffuseMap1.update);
                    expect(diffuseMap1.update).toCalledBefore(diffuseMap2.update);
                    expect(diffuseMap2.update).toCalledBefore(diffuseMap3.update);


                    expect(material.program.sendUniformData).toCalledWith("u_mixMapSampler", wd.EVariableType.SAMPLER_2D, 0);
                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap1Sampler", wd.EVariableType.SAMPLER_2D, 1);
                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap2Sampler", wd.EVariableType.SAMPLER_2D, 2);
                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap3Sampler", wd.EVariableType.SAMPLER_2D, 3);
                });

                describe("test set procedural map to be mix and diffuse map", function () {
                    beforeEach(function () {
                        mixMap = wd.FireProceduralTexture.create({});
                        diffuseMap1 = wd.ImageTexture.create({});
                        diffuseMap2 = wd.GrassProceduralTexture.create({});
                        diffuseMap3 = wd.ImageTexture.create({});


                        sandbox.stub(mixMap, "init");
                        sandbox.stub(diffuseMap1, "init");
                        sandbox.stub(diffuseMap2, "init");
                        sandbox.stub(diffuseMap3, "init");


                        material.mix.mapData = {
                            mixMap: mixMap,
                            diffuseMap1: diffuseMap1,
                            diffuseMap2: diffuseMap2,
                            diffuseMap3: diffuseMap3
                        };
                    });

                    it("init procedural map", function () {
                        material.init();

                        expect(mixMap.init).toCalledOnce();
                        expect(diffuseMap1.init).toCalledOnce();
                        expect(diffuseMap2.init).toCalledOnce();
                        expect(diffuseMap3.init).toCalledOnce();
                    });
                });
            });

            describe("send glsl data", function () {
                beforeEach(function () {
                });

                describe("test glsl source", function () {
                    beforeEach(function () {
                    });

                    it("alpha test", function () {
                        material.mix.mapData = {
                            mixMap: mixMap,
                            diffuseMap1: diffuseMap1,
                            diffuseMap2: diffuseMap2,
                            diffuseMap3: diffuseMap3
                        }

                        material.mix.alphaTest = 0.5;


                        material.init();

                        material.updateShader(cmd);


                        expect(glslTool.contain(material.shader.fsSource, "if (baseColor.a < 0.5){"));
                    });
                });
            });

            describe("support set diffuseMap's repeatRegion", function () {
                beforeEach(function () {
                    diffuseMap2.repeatRegion = wd.RectRegion.create(0.1, 0.2, 2, 3);

                    material.mix.mapData = {
                        mixMap: mixMap,
                        diffuseMap1: diffuseMap1,
                        diffuseMap2: diffuseMap2,
                        diffuseMap3: diffuseMap3
                    }
                });

                it("send u_mixHeightDatas->repeatRegion data", function () {
                    material.init();
                    shaderTool.spyProgram(sandbox, material);

                    material.updateShader(cmd);

                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap1RepeatRegion", wd.EVariableType.VECTOR_4, diffuseMap1.repeatRegion);
                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap2RepeatRegion", wd.EVariableType.VECTOR_4, diffuseMap2.repeatRegion);
                    expect(material.program.sendUniformData).toCalledWith("u_diffuseMap3RepeatRegion", wd.EVariableType.VECTOR_4, diffuseMap3.repeatRegion);
                });

                it("vs glsl source set repeatRegion", function () {
                    material.init();

                    material.updateShader(cmd);

                    expect(glslTool.contain(material.shader.vsSource, "v_diffuseMap1TexCoord = a_texCoord * u_diffuseMap1RepeatRegion.zw + u_diffuseMap1RepeatRegion.xy;"));
                    expect(glslTool.contain(material.shader.vsSource, "v_diffuseMap2TexCoord = a_texCoord * u_diffuseMap1RepeatRegion.zw + u_diffuseMap2RepeatRegion.xy;"));
                    expect(glslTool.contain(material.shader.vsSource, "v_diffuseMap3TexCoord = a_texCoord * u_diffuseMap1RepeatRegion.zw + u_diffuseMap3RepeatRegion.xy;"));
                });
            });
        });

        describe("test with bump maps", function () {
            beforeEach(function () {

            });

            it("test bind and send bump map data", function () {
                var mapArr = [mixMap, diffuseMap1, diffuseMap2, diffuseMap3, bumpMap1, bumpMap2, bumpMap3];

                mapArr.forEach(function (map) {
                    sandbox.stub(map, "bindToUnit");
                    sandbox.stub(map, "update");
                });


                material.mix.mapData = {
                    mixMap: mixMap,
                    diffuseMap1: diffuseMap1,
                    diffuseMap2: diffuseMap2,
                    diffuseMap3: diffuseMap3,
                    bumpMap1: bumpMap1,
                    bumpMap2: bumpMap2,
                    bumpMap3: bumpMap3
                };


                material.init();
                shaderTool.spyProgram(sandbox, material);


                material.updateShader(cmd);


                mapArr.forEach(function (map) {
                    expect(map.bindToUnit).toCalledOnce();
                    expect(map.update).toCalledOnce();
                });

                expect(diffuseMap3.update).toCalledBefore(bumpMap1.update);
                expect(bumpMap1.update).toCalledBefore(bumpMap2.update);
                expect(bumpMap2.update).toCalledBefore(bumpMap3.update);


                expect(material.program.sendUniformData).toCalledWith("u_bumpMap1Sampler", wd.EVariableType.SAMPLER_2D, 4);
                expect(material.program.sendUniformData).toCalledWith("u_bumpMap2Sampler", wd.EVariableType.SAMPLER_2D, 5);
                expect(material.program.sendUniformData).toCalledWith("u_bumpMap3Sampler", wd.EVariableType.SAMPLER_2D, 6);
            });

            describe("send glsl data", function () {
                beforeEach(function () {
                });

                describe("test glsl source", function () {
                    beforeEach(function () {
                    });

                    describe("test fs glsl", function () {
                        var source;

                        beforeEach(function () {
                            material.mix.mapData = {
                                mixMap: mixMap,
                                diffuseMap1: diffuseMap1,
                                diffuseMap2: diffuseMap2,
                                diffuseMap3: diffuseMap3,
                                bumpMap1: bumpMap1,
                                bumpMap2: bumpMap2,
                                bumpMap3: bumpMap3
                            }
                        });

                        it("mix bump maps", function () {
                            material.init();
                            material.updateShader(cmd);
                            source = material.shader.fsSource;

                            expect(glslTool.contain(source, "vec3 bump1Color=texture2D(u_bumpMap1Sampler,v_diffuseMap1TexCoord).xyz;"));
                            expect(glslTool.contain(source, "vec3 bump2Color=texture2D(u_bumpMap2Sampler,v_diffuseMap2TexCoord).xyz;"));
                            expect(glslTool.contain(source, "vec3 bump3Color=texture2D(u_bumpMap3Sampler,v_diffuseMap3TexCoord).xyz;"));
                            expect(glslTool.contain(source, "bump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);"));
                            expect(glslTool.contain(source, "vec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);"));
                        });
                        it("compute TBN", function () {
                            material.init();
                            material.updateShader(cmd);
                            source = material.shader.fsSource;

                            expect(glslTool.contain(source, "mat3 TBN=cotangentFrame(v_normal,-viewDir,v_mixMapTexCoord);"));
                        });

                        describe("if support GL_OES_standard_derivatives extension", function () {
                            beforeEach(function () {
                                wd.GPUDetector.getInstance().extensionStandardDerivatives = true;
                            });

                            it("enable the extension", function () {
                                material.init();
                                material.updateShader(cmd);
                                source = material.shader.fsSource;

                                shaderTool.judgeGLSLExtension(source, "GL_OES_standard_derivatives");
                            });
                            it("add corresonding glsl", function () {
                                material.init();
                                material.updateShader(cmd);
                                source = material.shader.fsSource;

                                expect(glslTool.contain(source, "vec3 dp1=dFdx(p);"));
                            });
                        });
                        it("else, add fallback glsl", function () {
                            wd.GPUDetector.getInstance().extensionStandardDerivatives = false;

                            material.init();
                            material.updateShader(cmd);
                            source = material.shader.fsSource;

                            expect(glslTool.contain(source, "vec3 dp1=p;")).toBeTruthy();
                        });
                    });
                });
            });
        });
    });
});

