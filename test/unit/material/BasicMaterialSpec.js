describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new wd.BasicMaterial();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
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


            program = material.shader.program;


            prepareTool.prepareForMap(sandbox);
        });

        it("if only has mirrorMap, not add map shader lib", function () {
            material.mirrorMap = wd.MirrorTexture.create();

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

            expect(material.shader.hasLib(wd.BasicMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0RepeatRegion")).toCalledOnce();
        });
        it("if add two maps, add MultiMapShaderLib", function () {
            material.map = [wd.ImageTexture.create(), wd.ImageTexture.create()];


            director._init();

            expect(material.shader.hasLib(wd.MultiMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map0RepeatRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map1SourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_map1RepeatRegion")).toCalledOnce();



            expect(program.getUniformLocation.withArgs("u_sampler2D1")).toCalledOnce();
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

    describe("set mirror map shader lib", function () {
        var model, geo, material, director, program;
        var vertice, normals;

        beforeEach(function () {
            vertice = [1, -1, 0, 0, 1, 0, 0, 0, 1];
            normals = [];

            model = wd.GameObject.create();
            geo = wd.PlaneGeometry.create();


            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);

            material = wd.BasicMaterial.create();

            materialTool.prepareMap(sandbox, model, geo, material);


            director = wd.Director.getInstance();


            program = material.shader.program;


            prepareTool.prepareForMap(sandbox);
        });

        it("if only has mirrorMap, add MirrorForBasicShaderLib", function () {
            var texture = wd.MirrorTexture.create();
            texture.width = 256;
            texture.height = 256;
            texture.renderList = [];
            sandbox.stub(texture, "bindToUnit");
            sandbox.stub(texture, "sendData");

            material.mirrorMap = texture;


            director._init();

            expect(material.shader.hasLib(wd.MirrorForBasicShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(texture.bindToUnit).toCalledWith(0);
            expect(texture.sendData).not.toCalled();
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


            program = material.shader.program;
        });

        it("if no envMap, return", function () {
            material.envMap = null;
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForBasicShaderLib)).toBeFalsy();
        });
        it("add normal shader lib", function () {
            envMap.mode = wd.EEnvMapMode.BASIC;

            director._init();
            director._loopBody(1);

            expect(program.sendAttributeData.withArgs("a_normal")).toCalledOnce();
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_normal").getCall(0).args[2].data
            )).toEqual(
                normals
            )
        });
        it("if mode is BASIC, add BasicEnvMapForBasicShaderLib", function () {
            envMap.mode = wd.EEnvMapMode.BASIC;

            director._init();

            expect(material.shader.hasLib(wd.BasicEnvMapForBasicShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function () {
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForBasicShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function () {
            material.refractionRatio = 0.5;
            envMap.mode = wd.EEnvMapMode.REFRACTION;

            director._init();

            expect(material.shader.hasLib(wd.RefractionForBasicShaderLib)).toBeTruthy();

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

                expect(material.shader.hasLib(wd.FresnelForBasicShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function () {
                material.refractionRatio = 0.5;
                envMap.mode = wd.EEnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(wd.FresnelForBasicShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toBeNull();
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });
});
