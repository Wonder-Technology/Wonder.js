describe("mirror", function() {
    var sandbox = null;
    var shadow = null;

    var deviceManager;

    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();

        deviceManager = wd.DeviceManager.getInstance();

        sandbox.stub(deviceManager, "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("integrate test", function() {
        var sphere;
        var mirror;
        var light;

        var renderer;

        function createSphere() {
            return prepareTool.createSphere();
        }

        function createMirror(renderList){
            var texture = wd.MirrorTexture.create();
            texture.width = 1024;
            texture.height = 1024;
            texture.renderList = renderList;

            var material = wd.MirrorMaterial.create();
            //material.color = wd.Color.create("#aaaaaa");
            material.side = wd.ESide.BOTH;
            material.reflectionMap = texture;

            var plane = wd.PlaneGeometry.create();
            plane.width = 20;
            plane.height = 20;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);

            //gameObject.transform.translate(wd.Vector3.create(0, -10, 0));

            return gameObject;
        }

        beforeEach(function () {
            renderer = wd.WebGLRenderer.create();

            sphere = createSphere();
            sphere.name = "sphere";

            mirror = createMirror([sphere]);
            mirror.name = "mirror";

            light = shadowTool.createDirectionLight();

            director.scene.addChild(sphere);
            director.scene.addChild(mirror);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("create gl texture", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.createTexture).toCalledOnce();
        });
        it("set shadow map->texParameteri", function () {
            var gl = wd.DeviceManager.getInstance().gl;

            director._init();

            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MAG_FILTER, gl.LINEAR)).toCalledOnce();
            expect(gl.texParameteri.withArgs(sinon.match.any, gl.TEXTURE_MIN_FILTER, gl.LINEAR)).toCalledOnce();
        });

        describe("build map", function() {
            function getBuildMap(){
                return getBuildMapRenderer.apply(this, arguments).texture;
            }

            function getBuildMapRenderer(){
                if(arguments.length === 0){
                    return wd.Director.getInstance().scene.gameObjectScene.renderTargetRendererManager.getCommonRenderTargetRendererList().getChild(0);
                }
                else if(arguments.length === 1 && wd.JudgeUtils.isNumber(arguments[0])){
                    var rendererIndex = arguments[0];

                    return wd.Director.getInstance().scene.gameObjectScene.renderTargetRendererManager.getCommonRenderTargetRendererList().getChild(rendererIndex);
                }
            }

            it("only bind mirror map, not send map unit", function () {
                director._init();

                var mirrorMap = getBuildMap();

                sandbox.stub(mirrorMap, "bindToUnit");

                sandbox.stub(mirrorMap, "sendData");


                director.scene.gameObjectScene.render(renderer);


                expect(mirrorMap.bindToUnit).toCalledOnce();
                expect(mirrorMap.sendData).not.toCalled();
            });
        });

        describe("test draw map", function(){
            beforeEach(function(){
            });

            it("if renderList is empty, send u_isRenderListEmpty:1", function(){
                mirror.getComponent(wd.Geometry).material.reflectionMap.renderList = [];

                director._init();

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, mirror);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isRenderListEmpty", sinon.match.any, 1)).toCalledOnce();
            });
            it("else, not send", function(){
                mirror.getComponent(wd.Geometry).material.reflectionMap.renderList = [sphere];

                director._init();

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, mirror);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isRenderListEmpty")).not.toCalled();
            });
        });
    });
});

