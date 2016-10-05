describe("test grass instance", function() {
    var sandbox = null;

    var grassMap;
    var material;

    var director;

    var extensionInstancedArrays;

    var cmd;
    var gameObject;

    function prepareCmd(){
        cmd = rendererTool.createQuadCommand(sandbox);
        cmd.material = material;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        gameObject = grassInstanceTool.createGrass();
        material = gameObject.getComponent(wd.Geometry).material;

        director.scene.addChild(gameObject);

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("test animation", function(){
        beforeEach(function(){
            material = wd.GrassInstanceMaterial.create();

            grassMap = wd.ImageTexture.create();

            material.map = grassMap;


            prepareCmd();

            grassInstanceTool.setFakeGeoemtry(material);

            material.terrainGeometry = {};
        });

        it("test time increase at each frame", function(){
            material.speed = 0.1;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);
            material.updateShader(cmd);

            expect(material.program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, 0.1);
            expect(material.program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, 0.2);
        });

        describe("test fs glsl source", function () {
            var vsSource;

            beforeEach(function(){
                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);

                vsSource = material.shader.vsSource;
            });

            it("use sin function to generate animation effect", function () {
                expect(glslTool.contain(vsSource, "float curve = a_shape.w + 0.4 * (sin(u_time * 4.0 + a_offset.x * 0.8) + cos(u_time * 4.0 + a_offset.y * 0.8));"));
            });
        });
    });

    describe("support height map", function(){
        var program;

        beforeEach(function(){
            director._init();
            program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");
        });

        describe("test send uniform data", function () {
            it("send range data", function () {
                material.terrainGeometry = {
                    rangeWidth: 10,
                    rangeHeight: 20
                }

                rendererTool.renderGameObjectScene();

                expect(program.sendUniformData).toCalledWith("u_terrainRangeWidth", wd.EVariableType.FLOAT_1, material.terrainGeometry.rangeWidth);
                expect(program.sendUniformData).toCalledWith("u_terrainRangeHeight", wd.EVariableType.FLOAT_1, material.terrainGeometry.rangeHeight);
            });
            it("send min and max height", function () {
                material.terrainGeometry = {
                    minHeight: 10,
                    maxHeight: 20
                }

                rendererTool.renderGameObjectScene();

                expect(program.sendUniformData).toCalledWith("u_terrainMinHeight", wd.EVariableType.FLOAT_1, material.terrainGeometry.minHeight);
                expect(program.sendUniformData).toCalledWith("u_terrainMaxHeight", wd.EVariableType.FLOAT_1, material.terrainGeometry.maxHeight);
            });
        });

        describe("test glsl source", function(){
            beforeEach(function(){
            });

            describe("should contain uniform variables", function(){
                it("test vs source", function () {
                    var source = material.shader.vsSource;

                    expect(glslTool.containMultiLine(
                        source,
                        [
                            "uniform float u_terrainRangeWidth;",
                            "uniform float u_terrainRangeHeight;",
                            "uniform float u_terrainMinHeight;",
                            "uniform float u_terrainMaxHeight;",
                            "uniform sampler2D u_heightMapSampler;"
                        ]
                    )).toBeTruthy();
                });
            });
        });
    });

    describe("send light data", function(){
        beforeEach(function(){
            material.terrainGeometry = {};
        });

        describe("if direction lights exist", function(){
            beforeEach(function(){
            });

            it("send first light data", function(){
                var color1 = wd.Color.create("#123456");
                var color2 = wd.Color.create("#fff111");
                var light1 = lightTool.createDirectionLight(color1);
                var light2 = lightTool.createDirectionLight(color2);

                light2.transform.position = wd.Vector3.create(10,10,20);

                director.scene.addChild(light2);
                director.scene.addChild(light1);

                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");


                rendererTool.renderGameObjectScene();

                expect(program.sendUniformData).toCalledWith("u_lightPos", wd.EVariableType.VECTOR_3, light2.transform.position);
                expect(program.sendUniformData).toCalledWith("u_lightColor", wd.EVariableType.VECTOR_3, color2.toVector3());
            });
        });

        describe("else if point lights exist", function(){
            beforeEach(function(){
            });

            it("send first light data", function(){
                var color1 = wd.Color.create("#123456");
                var color2 = wd.Color.create("#fff111");
                var light1 = lightTool.createPointLight(color1);
                var light2 = lightTool.createPointLight(color2);

                light2.transform.position = wd.Vector3.create(10,10,20);

                director.scene.addChild(light2);
                director.scene.addChild(light1);

                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");


                rendererTool.renderGameObjectScene();

                expect(program.sendUniformData).toCalledWith("u_lightPos", wd.EVariableType.VECTOR_3, light2.transform.position);
                expect(program.sendUniformData).toCalledWith("u_lightColor", wd.EVariableType.VECTOR_3, color2.toVector3());
            });
        });

        it("else, contract error", function () {
            testTool.openContractCheck(sandbox);

            director._init();
            program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");


            expect(function () {
                rendererTool.renderGameObjectScene();
            }).toThrow("should exist light");
        });

        describe("test glsl source", function(){
            beforeEach(function(){
            });

            describe("should contain uniform variables", function(){
                it("test vs source", function () {
                    materialTool.init(material);

                    var source = material.shader.vsSource;

                    expect(glslTool.containMultiLine(
                        source,
                        [

                            "uniform vec3 u_lightPos;",
                            "uniform vec3 u_lightColor;"

                        ]
                    )).toBeTruthy();
                });
            });
        });
    });
});

