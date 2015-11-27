describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new dy.BasicMaterial();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
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

        model = dy.GameObject.create();
        geo = dy.ModelGeometry.create();

        geo.vertices = vertice;
        geo.faces = testTool.createFaces([0,1,2]);


        material = dy.BasicMaterial.create();

        materialTool.prepareMap(sandbox, model, geo, material);


        director = dy.Director.getInstance();


        prepareTool.prepareForMap(sandbox);


        director._init();
        director._run(1);


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

            model = dy.GameObject.create();
            geo = dy.ModelGeometry.create();

            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);
            geo.texCoords = texCoords;


            material = dy.BasicMaterial.create();

            materialTool.prepareMap(sandbox, model, geo, material);



            director = dy.Director.getInstance();


            program = material.shader.program;


            prepareTool.prepareForMap(sandbox);
        });

        it("if only has mirrorMap, not add map shader lib", function () {
            material.mirrorMap = dy.MirrorTexture.create();

            director._init();

            expect(material.shader.hasLib(dy.BasicMapShaderLib)).toBeFalsy();
        });
        it("if add one map, add BasicMapShaderLib", function () {
            var map = dy.ImageTexture.create();
            map.width = 100;
            map.height = 100;
            map.sourceRegion = dy.RectRegion.create(0, 0, 64, 64);
            map.repeatRegion = dy.RectRegion.create(0.2, 0.1, 0.5,0.5);
            material.map = map;

            director._init();

            expect(material.shader.hasLib(dy.BasicMapShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_sourceRegion")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_repeatRegion")).toCalledOnce();
        });
        it("if add two maps, add MultiMapShaderLib", function () {
            material.map = [dy.ImageTexture.create(), dy.ImageTexture.create()];


            director._init();

            expect(material.shader.hasLib(dy.MultiMapShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendAttributeData.withArgs("a_texCoord")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_sourceRegion")).toCalledTwice();
            expect(program.sendUniformData.withArgs("u_repeatRegion")).toCalledTwice();



            expect(program.getUniformLocation.withArgs("u_sampler2D1")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_combineMode").firstCall.args[2]).toEqual(dy.TextureCombineMode.MIX);
            expect(program.sendUniformData.withArgs("u_mixRatio").firstCall.args[2]).toEqual(0.5);
        });
        it("not support more than 2 maps", function () {
            expect(function () {
                material.map = [dy.ImageTexture.create(), dy.ImageTexture.create(), dy.ImageTexture.create()];
            }).toThrow();
        });
    });

    describe("set mirror map shader lib", function () {
        var model, geo, material, director, program;
        var vertice, normals;

        beforeEach(function () {
            vertice = [1, -1, 0, 0, 1, 0, 0, 0, 1];
            normals = [];

            model = dy.GameObject.create();
            geo = dy.PlaneGeometry.create();


            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);

            material = dy.BasicMaterial.create();

            materialTool.prepareMap(sandbox, model, geo, material);


            director = dy.Director.getInstance();


            program = material.shader.program;


            prepareTool.prepareForMap(sandbox);
        });

        it("if only has mirrorMap, add MirrorForBasicShaderLib", function () {
            var texture = dy.MirrorTexture.create();
            texture.width = 256;
            texture.height = 256;
            texture.renderList = [];

            material.mirrorMap = texture;


            director._init();

            expect(material.shader.hasLib(dy.MirrorForBasicShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.getUniformLocation.withArgs("u_mirrorSampler")).toCalledOnce();
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

            model = dy.GameObject.create();
            geo = dy.ModelGeometry.create();
            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);

            material = dy.BasicMaterial.create();
            envMap = dy.DynamicCubemapTexture.create();

            materialTool.prepareEnvMap(sandbox, model, geo, material, envMap);


            director = dy.Director.getInstance();


            program = material.shader.program;
        });

        it("if no envMap, return", function () {
            material.envMap = null;
            envMap.mode = dy.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(dy.ReflectionForBasicShaderLib)).toBeFalsy();
        });
        it("add normal shader lib", function () {
            envMap.mode = dy.EnvMapMode.BASIC;

            director._init();
            director._run(1);

            expect(program.sendAttributeData.withArgs("a_normal")).toCalledOnce();
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_normal").getCall(0).args[2].data
            )).toEqual(
                normals
            )
        });
        it("if mode is BASIC, add BasicEnvMapForBasicShaderLib", function () {
            envMap.mode = dy.EnvMapMode.BASIC;

            director._init();

            expect(material.shader.hasLib(dy.BasicEnvMapForBasicShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function () {
            envMap.mode = dy.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(dy.ReflectionForBasicShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function () {
            material.refractionRatio = 0.5;
            envMap.mode = dy.EnvMapMode.REFRACTION;

            director._init();

            expect(material.shader.hasLib(dy.RefractionForBasicShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });

        describe("if mode is FRESNEL, add FresnelForBasicShaderLib", function () {
            it("if reflectivity is setted, send it", function () {
                material.reflectivity = 0.5;
                envMap.mode = dy.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(dy.FresnelForBasicShaderLib)).toBeTruthy();

                director._run(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function () {
                material.refractionRatio = 0.5;
                envMap.mode = dy.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(dy.FresnelForBasicShaderLib)).toBeTruthy();

                director._run(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(dy.ShaderChunk.NULL);
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });
});
