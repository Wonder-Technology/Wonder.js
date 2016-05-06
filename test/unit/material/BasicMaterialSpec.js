describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = wd.BasicMaterial.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("opacity attri", function(){
        it("set opacity", function(){
            materialTool.testOpacity(material);
        });
    });

    it("glsl only set glPosition,glFragColor once", function () {
        var model, geo, material, director, program;
        var vertice, normals;

        vertice = [1, -1, 0, 0, 1, 0, 0, 0, 1];
        //normals = [];

        model = wd.GameObject.create();
        geo = wd.ModelGeometry.create();

        geo.vertices = vertice;
        geo.faces = testTool.createFaces([0,1,2]);


        material = wd.BasicMaterial.create();

        materialTool.prepareMap(sandbox, model, geo, material);


        director = wd.Director.getInstance();


        prepareTool.prepareForMap(sandbox);


        director._init();
        director._loopBody(1);


        expect(searchTool.searchString(/gl_Position\s=/g, material.shader.vsSource).count).toEqual(1);
        expect(searchTool.searchString(/gl_FragColor\s=/g, material.shader.fsSource).count).toEqual(1);
    });

    describe("set map shader lib", function () {
        var model, geo, material, director, program;
        var vertice, normals,texCoords;

        beforeEach(function () {
            vertice = [1, -1, 0, 0, 1, 0, 0, 0, 1];
            normals = [];
            texCoords = [1.0,0.0,1.0,0.5,1.0,1.0];

            model = wd.GameObject.create();
            geo = wd.ModelGeometry.create();

            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);
            geo.texCoords = texCoords;


            material = wd.BasicMaterial.create();

            materialTool.prepareMap(sandbox, model, geo, material);



            director = wd.Director.getInstance();




            prepareTool.prepareForMap(sandbox);
        });

        it("if only has reflectionMap, not add map shader lib", function () {
            material.reflectionMap = wd.MirrorTexture.create();

            director._init();

            expect(material.shader.hasLib(wd.BasicMapShaderLib)).toBeFalsy();
        });
        it("if add one map, add BasicMapShaderLib", function () {
            var map = wd.ImageTexture.create();
            map.width = 100;
            map.height = 100;
            map.sourceRegion = wd.RectRegion.create(0, 0, 64, 64);
            map.repeatRegion = wd.RectRegion.create(0.2, 0.1, 0.5,0.5);
            material.map = map;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.BasicMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0RepeatRegion")).toCalledOnce();
        });
        it("if add two maps, add MultiMapShaderLib", function () {
            material.map = [wd.ImageTexture.create(), wd.ImageTexture.create()];


            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.MultiMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0RepeatRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map1SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map1RepeatRegion")).toCalledOnce();



            //expect(program.getUniformLocation.withArgs("u_sampler2D1")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_combineMode").firstCall.args[2]).toEqual(wd.ETextureCombineMode.MIX);
            expect(program.sendUniformData.withArgs("u_mixRatio").firstCall.args[2]).toEqual(0.5);
        });
        it("not support more than 2 maps", function () {
            testTool.openContractCheck(sandbox);

            expect(function () {
                material.map = [wd.ImageTexture.create(), wd.ImageTexture.create(), wd.ImageTexture.create()];
            }).toThrow();
        });
    });

    describe("set envMap shader lib", function () {
        var model, geo, material, director, program;
        var envMap;
        var vertice, normals;

        beforeEach(function () {
            vertice = [1, -1, 0, 0, 1, 0, 0, 0, 1];
            normals = [
                0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483
            ];

            model = wd.GameObject.create();
            geo = wd.ModelGeometry.create();
            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);

            material = wd.BasicMaterial.create();
            envMap = wd.DynamicCubemapTexture.create();

            materialTool.prepareEnvMap(sandbox, model, geo, material, envMap);


            director = wd.Director.getInstance();
        });

        it("if no envMap, return", function () {
            material.envMap = null;
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForBasicEnvMapShaderLib)).toBeFalsy();
        });
        it("add normal shader lib", function () {
            envMap.mode = wd.EEnvMapMode.BASIC;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_normal")).toCalledOnce();
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_normal").getCall(0).args[2].data
            )).toEqual(
                normals
            )
        });
        it("if mode is BASIC, add BasicForBasicEnvMapShaderLib", function () {
            envMap.mode = wd.EEnvMapMode.BASIC;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);


            expect(material.shader.hasLib(wd.BasicForBasicEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function () {
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.ReflectionForBasicEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function () {
            material.refractionRatio = 0.5;
            envMap.mode = wd.EEnvMapMode.REFRACTION;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.RefractionForBasicEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });

        describe("if mode is FRESNEL, add FresnelForBasicShaderLib", function () {
            it("if reflectivity is setted, send it", function () {
                material.reflectivity = 0.5;
                envMap.mode = wd.EEnvMapMode.FRESNEL;

                director._init();
                program = shaderTool.getAndStubProgram(sandbox, material);

                expect(material.shader.hasLib(wd.FresnelForBasicEnvMapShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function () {
                material.refractionRatio = 0.5;
                envMap.mode = wd.EEnvMapMode.FRESNEL;

                director._init();
                program = shaderTool.getAndStubProgram(sandbox, material);

                expect(material.shader.hasLib(wd.FresnelForBasicEnvMapShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toBeNull();
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });

    describe("getTextureForRenderSort", function(){
        it("return first map", function () {
            var texture1 = wd.ImageTexture.create({});
            var texture2 = wd.ImageTexture.create({});
            material.map = [texture1, texture2];

            expect(material.getTextureForRenderSort()).toEqual(texture1);
        });
    });

    describe("clone", function(){
        beforeEach(function(){
            material = wd.BasicMaterial.create();
        });

        describe("clone Material data", function(){
            describe("clone blend data", function(){
                it("if set blendType, related blend data should be affected by it", function () {
                    var blendType = wd.EBlendType.ADDITIVEALPHA,
                        blendSrc = wd.EBlendFunc.DST_COLOR,
                        blendDst = wd.EBlendFunc.ONE_MINUS_DST_ALPH,
                        blend = false,
                        blendEquation = wd.EBlendEquation.SUBTRACT;


                    material.blendType = blendType;

                    cloneTool.extend(material, {
                        blendSrc: blendSrc,
                        blendDst: blendDst,
                        blend: blend,
                        blendEquation: blendEquation
                    });


                    var result = material.clone();

                    expect(result.blendType).toEqual(blendType);
                    expect(result.blendSrc).toEqual(wd.EBlendFunc.SRC_ALPHA);
                    expect(result.blendDst).toEqual(wd.EBlendFunc.ONE);
                    expect(result.blendEquation).toEqual(wd.EBlendEquation.ADD);
                });
                it("if set blendSrc/blendDst/blendEquation, the blendFuncSeparate should be affected", function () {
                    var blendFuncSeparate = [wd.EBlendFunc.DST_ALPHA, wd.EBlendFunc.DST_ALPHA],
                        blendSrc = wd.EBlendFunc.DST_COLOR,
                        blendDst = wd.EBlendFunc.DST_COLOR,
                        blendEquation = wd.EBlendEquation.REVERSE_SUBTRAC;



                    cloneTool.extend(material, {
                        blendFuncSeparate: blendFuncSeparate
                    });


                    var result = material.clone();

                    expect(result.blendFuncSeparate).toEqual(blendFuncSeparate);








                    material.blendSrc = blendSrc;

                    cloneTool.extend(material, {
                        blendFuncSeparate: blendFuncSeparate
                    });


                    var result = material.clone();

                    expect(result.blendFuncSeparate).toBeNull();






                    material.blendDst = blendDst;

                    cloneTool.extend(material, {
                        blendFuncSeparate: blendFuncSeparate
                    });


                    var result = material.clone();

                    expect(result.blendFuncSeparate).toBeNull();





                    material.blendEquation = blendEquation;

                    cloneTool.extend(material, {
                        blendFuncSeparate: blendFuncSeparate
                    });


                    var result = material.clone();

                    expect(result.blendFuncSeparate).toBeNull();
                });
            });

            describe("clone map", function(){
                beforeEach(function(){
                });

                it("clone envMap", function(){
                    var resultEnvMap = {};
                    var envMap = {clone:sandbox.stub().returns(resultEnvMap)};

                    cloneTool.extend(material, {
                        envMap:envMap
                    });


                    var result = material.clone();

                    expect(result.envMap).toEqual(resultEnvMap);
                    expect(result.envMap.material).toEqual(result);
                });
            });

            it("share geometry", function () {
                var geometry = {};

                cloneTool.extend(material, {
                    geometry: geometry
                });

                var result = material.clone();

                expect(result.geometry).toEqual(material.geometry);
            });


            it("clone data", function () {
                var color = wd.Color.create("#123456"),
                    redWrite = false,
                    greenWrite = false,
                    blueWrite = false,
                    alphaWrite = false,
                    polygonOffsetMode = wd.EPolygonOffsetMode.IN,
                    side = wd.ESide.BOTH,
                    shading = wd.EShading.SMOOTH;

                cloneTool.extend(material, {
                    color: color,
                    redWrite: redWrite,
                    greenWrite: greenWrite,
                    blueWrite: blueWrite,
                    alphaWrite: alphaWrite,
                    polygonOffsetMode: polygonOffsetMode,
                    side: side,
                    shading: shading
                });


                var result = material.clone();

                expect(result.color).toEqual(color);
                expect(result.redWrite).toEqual(redWrite);
                expect(result.greenWrite).toEqual(greenWrite);
                expect(result.blueWrite).toEqual(blueWrite);
                expect(result.alphaWrite).toEqual(alphaWrite);
                expect(result.polygonOffsetMode).toEqual(polygonOffsetMode);
                expect(result.side).toEqual(side);
                expect(result.shading).toEqual(shading);
            });
        });

        describe("clone EngineMaterial data", function(){
            it("clone data", function () {
                var refractionRatio = 0.2,
                    reflectivity = 0.4,
                    mapCombineMode = wd.ETextureCombineMode.MULTIPLY,
                    mapMixRatio = 0.2;

                cloneTool.extend(material, {

                    refractionRatio: refractionRatio,
                    reflectivity: reflectivity,
                    mapCombineMode: mapCombineMode,
                    mapMixRatio: mapMixRatio

                });


                var result = material.clone();

                expect(result.refractionRatio).toEqual(refractionRatio);
                expect(result.reflectivity).toEqual(reflectivity);
                expect(result.mapCombineMode).toEqual(mapCombineMode);
                expect(result.mapMixRatio).toEqual(mapMixRatio);
            });
        });

        describe("clone StandardBasicMaterial data", function(){
            beforeEach(function(){
            });

            it("clone map", function(){
                var imageTexture = wd.ImageTexture.create({});
                var resultImageTexture = wd.ImageTexture.create({a:1});

                sandbox.stub(imageTexture, "clone").returns(resultImageTexture);

                var proceduralTexture = wd.MarbleProceduralTexture.create();
                var resultProceduralTexture = wd.MarbleProceduralTexture.create();
                sandbox.stub(proceduralTexture, "clone").returns(resultProceduralTexture);

                var map = [imageTexture, proceduralTexture];


                cloneTool.extend(material, {
                    map: map
                });


                var result = material.clone();

                expect(result.mapManager === material.mapManager).toBeFalsy();
                expect(result.mapList.getChildren()).toEqual([resultImageTexture, resultProceduralTexture]);
            });
            it("clone opacity after blend", function () {
                var opacity = 0.5,
                    blend = false;

                material.opacity = opacity;
                material.blend = blend;


                var result = material.clone();

                expect(result.opacity).toEqual(opacity);
                expect(result.blend).toBeTruthy();
            });
        });

        describe("clone BasicMaterial data", function(){
        });
    });
});
