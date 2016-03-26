describe("direction shadow map", function() {
    var sandbox = null;
    var shadow = null;

    var director;
    var sphere;
    var light;

    var renderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("integrate test", function(){
        function createSphere() {
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 16;
            material.diffuseMap = wd.ImageTexture.create(wd.TextureLoader.getInstance().get("texture"));
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 20;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


            gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));

            return gameObject;
        }

        beforeEach(function(){
            director = wd.Director.getInstance();

            sphere = createSphere();
            light = shadowTool.createDirectionLight([sphere]);

            director.scene.addChild(sphere);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("set shadow map->texParameteri", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MAG_FILTER, gl.LINEAR)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MIN_FILTER, gl.LINEAR)).toCalledOnce();
        });

        describe("build shadow map", function() {
            var shader, program;

            function setBuildShadowMapShaderAndProgram(obj, handleProgramFunc) {
                var useShader = director.scene.useShader;

                sandbox.stub(director.scene, "useShader", function (shaderKey) {
                    useShader.call(director.scene, shaderKey);

                    var material = obj.getComponent(wd.Geometry).material;

                    shader = material.shader;
                    program = shader.program;

                    if (handleProgramFunc) {
                        handleProgramFunc(program);
                    }
                });
            }

            it("send u_mMatrix,u_vMatrix,u_pMatrix,a_position when build", function () {
                setBuildShadowMapShaderAndProgram(sphere, function (program) {
                    sandbox.stub(program, "sendAttributeData");
                    sandbox.stub(program, "sendUniformData");
                });


                director._init();

                director.scene.gameObjectScene.render(renderer);


                expect(program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_vpMatrixFromLight").firstCall.args[2]).toEqual(jasmine.any(wd.Matrix4));
                expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(program.sendAttributeData.withArgs("a_position")).toCalledBefore(program.sendUniformData.withArgs("u_vpMatrixFromLight"));
            });
            it("only bind and send shadow map, not bind or send other map", function () {
                director._init();

                var material = sphere.getComponent(wd.Geometry).material;
                var diffuseMap = material.diffuseMap;
                var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);

                sandbox.stub(shadowMap, "bindToUnit");
                sandbox.stub(diffuseMap, "bindToUnit");

                sandbox.stub(shadowMap, "sendData");
                sandbox.stub(diffuseMap, "sendData");


                director.scene.gameObjectScene.render(renderer);


                expect(shadowMap.bindToUnit).toCalledOnce();
                expect(diffuseMap.bindToUnit).not.toCalled();
                expect(shadowMap.sendData).toCalledOnce();
                expect(diffuseMap.sendData).not.toCalled();
            });

            it("test send shadowMap data", function () {
                setBuildShadowMapShaderAndProgram(sphere, function (program) {
                    sandbox.stub(program, "sendAttributeData");
                    sandbox.stub(program, "sendUniformData");
                });


                director._init();

                director.scene.gameObjectScene.render(renderer);


                expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]")).toCalledOnce();
            });
        });

        describe("draw shadow map", function(){
            var shader, program;

            function setDrawShadowMapShaderAndProgram(){
                shader = sphere.getComponent(wd.Geometry).material.shader;

                program = shader.program;
                sandbox.stub(program, "sendUniformData");
            }

            beforeEach(function(){
                director._init();

                director.scene.gameObjectScene.render(renderer);

                setDrawShadowMapShaderAndProgram();


                renderer.render();
            });

            it("should send shadow map data", function () {
                expect(program.sendUniformData.withArgs("u_diffuseMapSampler", sinon.match.any, 0)).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_twoDShadowMapSampler[0]", sinon.match.any, 1)).toCalledOnce();
            });

            it("fs glsl should contain shadowMap glsl", function(){
                expect(glslTool.contain(shader.fsSource, "u_twoDShadowMapSampler")).toBeTruthy();
            });
        });

        it("the binded shadowMap when build shadow map and the binded shadowMap when draw shadow map are the same one", function () {
            director._init();

            var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);

            sandbox.stub(shadowMap, "bindToUnit");


            director.scene.gameObjectScene.render(renderer);


            expect(shadowMap.bindToUnit).toCalledOnce();

            renderer.render();

            expect(shadowMap.bindToUnit).toCalledTwice();
        });

        describe("test object with children", function() {
            var part1, part2;

            function judgeShadowMapCount(object, count){
                expect(shadowTool.getDefaultMapManager(object).getTwoDShadowMapList().getCount()).toEqual(count);
                expect(shadowTool.getBuildShadowMapMapManager(object).getTwoDShadowMapList().getCount()).toEqual(count);
            }

            beforeEach(function () {
                part1 = prepareTool.createBox();
                part2 = prepareTool.createBox();

                part1.addChild(part2);

                sphere.addChild(part1);
            });

            it("all objects should contain only one twoD shadow map", function () {
                director._init();

                judgeShadowMapCount(sphere, 1);
                judgeShadowMapCount(part1, 1);
                judgeShadowMapCount(part2, 1);
            });

            describe("container object(which has no geometry) shouldn't be involved in any thing about shadow so that it should not cause error", function(){
                it("test first level object has no geometry", function () {
                    sphere.removeComponent(wd.Geometry);

                    expect(function(){
                        director._init();
                    }).not.toThrow();
                });
                it("test children has no geometry", function () {
                    part1.removeComponent(wd.Geometry);

                    expect(function(){
                        director._init();
                    }).not.toThrow();
                });
                it("test first level object has no geometry but its children has geometry, its children should be involved in shadow", function () {
                    sphere.removeComponent(wd.Geometry);

                    director._init();

                    judgeShadowMapCount(part1, 1);
                    judgeShadowMapCount(part2, 1);
                });
            });

            it("all objects should share the one shadowMap", function () {
                director._init();
                var shadowMap = shadowTool.getBuildShadowMapMapManager(sphere).getTwoDShadowMapList().getChild(0);
                sandbox.stub(shadowMap, "bindToUnit");


                director.scene.gameObjectScene.render(renderer);

                expect(shadowMap.bindToUnit.callCount).toEqual(3);


                renderer.render();

                expect(shadowMap.bindToUnit.callCount).toEqual(6);
            });
        });
    });
});

