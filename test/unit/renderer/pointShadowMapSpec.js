describe("point shadow map", function() {
    var sandbox = null;
    var shadow = null;

    var deviceManager;

    var director;
    var sphere;
    var light;

    var renderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        testTool.clearInstance();
        director = wd.Director.getInstance();

        deviceManager = wd.DeviceManager.getInstance();

        sandbox.stub(deviceManager, "gl", testTool.buildFakeGl(sandbox));

        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("integrate test", function () {
        function createSphere() {
            return shadowTool.createSphere();
        }

        beforeEach(function () {
            sphere = createSphere();
            sphere.name = "sphere";
            light = shadowTool.createPointLight();

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


            describe("if cast shadow", function(){
                beforeEach(function(){
                    sphere.getComponent(wd.Shadow).cast = true;
                });

                it("send u_lightPos,u_farPlane, u_mMatrix,u_vMatrix,u_pMatrix,a_position", function () {
                    setBuildShadowMapShaderAndProgram(sphere, function (program) {
                        sandbox.stub(program, "sendAttributeData");
                        sandbox.stub(program, "sendUniformData");
                    });


                    director._init();

                    director.scene.gameObjectScene.render(renderer);


                    expect(program.sendUniformData.withArgs("u_lightPos")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_lightPos").firstCall.args[2]).toEqual(light.position);

                    expect(program.sendUniformData.withArgs("u_farPlane")).toCalledOnce();
                    expect(program.sendUniformData.withArgs("u_farPlane").firstCall.args[2]).toEqual(light.shadowCameraFar);

                    expect(program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_lightPos"));
                    expect(program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_lightPos"));
                    expect(program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(program.sendUniformData.withArgs("u_lightPos"));
                    expect(program.sendAttributeData.withArgs("a_position")).toCalledBefore(program.sendUniformData.withArgs("u_lightPos"));
                });
                //it("only bind shadow map, not send shadow map unit(because glsl only bind one texture, and its unit is 0 defaultly)", function () {
                //    director._init();
                //
                //    var material = sphere.getComponent(wd.Geometry).material;
                //    var shadowMap = shadowTool.getBuildShadowMapMapManager().getTwoDShadowMapList().getChild(0);
                //
                //    sandbox.stub(shadowMap, "bindToUnit");
                //
                //    sandbox.stub(shadowMap, "sendData");
                //
                //
                //    director.scene.gameObjectScene.render(renderer);
                //
                //
                //    expect(shadowMap.bindToUnit).toCalledOnce();
                //    expect(shadowMap.sendData).not.toCalled();
                //});
                //
                //it("not bind or send other map", function () {
                //    director._init();
                //
                //    var material = sphere.getComponent(wd.Geometry).material;
                //    var diffuseMap = material.diffuseMap;
                //
                //    sandbox.stub(diffuseMap, "bindToUnit");
                //
                //    sandbox.stub(diffuseMap, "sendData");
                //
                //
                //    director.scene.gameObjectScene.render(renderer);
                //
                //
                //    expect(diffuseMap.bindToUnit).not.toCalled();
                //    expect(diffuseMap.sendData).not.toCalled();
                //});
                //
                //
                //describe("set webgl state", function(){
                //    var gl;
                //
                //    beforeEach(function(){
                //        gl = deviceManager.gl;
                //    });
                //
                //    it("set side by each object's material", function () {
                //        gl.CULL_FACE = "CULL_FACE";
                //        gl.FRONT_AND_BACK = "FRONT_AND_BACK";
                //
                //        director._init();
                //
                //        var material = sphere.getComponent(wd.Geometry).material;
                //        material.side = wd.ESide.NONE;
                //
                //
                //
                //        director.scene.gameObjectScene.render(renderer);
                //
                //
                //        expect(gl.enable).toCalledWith("CULL_FACE");
                //        expect(gl.cullFace).toCalledWith("FRONT_AND_BACK");
                //    });
                //    it("set blend to be false", function () {
                //        gl.BLEND = "BLEND";
                //
                //        director._init();
                //
                //        var material = sphere.getComponent(wd.Geometry).material;
                //
                //        material.blend = true;
                //
                //        deviceManager.blend = true;
                //
                //
                //        director.scene.gameObjectScene.render(renderer);
                //
                //
                //        expect(gl.disable.withArgs("BLEND")).toCalledTwice();
                //        expect(gl.enable.withArgs("BLEND")).not.toCalledTwice();
                //    });
                //    it("not set other webgl effect", function () {
                //        director._init();
                //
                //        var material = sphere.getComponent(wd.Geometry).material;
                //
                //        material.redWrite = false;
                //
                //
                //        director.scene.gameObjectScene.render(renderer);
                //
                //        expect(gl.colorMask.withArgs(false, true, true, true)).not.toCalled();
                //    });
                //});
            });

            //it("if not cast shadow, not render to build shadow map", function () {
            //    sphere.getComponent(wd.Shadow).cast = false;
            //    sandbox.spy(sphere, "render");
            //
            //
            //    director._init();
            //
            //    director.scene.gameObjectScene.render(renderer);
            //
            //
            //    expect(sphere.render).not.toCalledTwice();
            //});
        });
    });
});

//describe("point shadow map", function(){
//    var director;
//    var boxArr,groundArr;
//    var light;
//
//    function createBoxes() {
//        return [
//            createBox(wd.Vector3.create(20, 0, 0)),
//            createBox(wd.Vector3.create(-20, 0, 0)),
//            createBox(wd.Vector3.create(0, 20, 0)),
//            createBox(wd.Vector3.create(0, -20, 0)),
//            createBox(wd.Vector3.create(10, 0, 25)),
//            createBox(wd.Vector3.create(0, 0, -20))
//        ];
//    }
//
//    function createBox(position) {
//        var material = wd.LightMaterial.create();
//        material.specularColor = wd.Color.create("#ffdd99");
//        material.color = wd.Color.create("#666666");
//        material.shininess = 16;
//
//
//        var geometry = wd.BoxGeometry.create();
//        geometry.material = material;
//        geometry.width = 5;
//        geometry.height = 5;
//        geometry.depth = 5;
//
//
//        var gameObject = wd.GameObject.create();
//        gameObject.addComponent(wd.MeshRenderer.create());
//        gameObject.addComponent(geometry);
//
//        gameObject.transform.translate(position);
//
//        return gameObject;
//    }
//
//    function createGrounds() {
//        var xzEu = wd.Vector3.create(0, 0, 0);
//        var xzNeEu = wd.Vector3.create(0, 0, 180);
//        var xyEu = wd.Vector3.create(90, 0, 0);
//        var xyNeEu = wd.Vector3.create(-90, 0, 0);
//        var yzEu = wd.Vector3.create(0, 0, 90);
//        var yzNeEu = wd.Vector3.create(0, 0, -90);
//
//        return [
//            createGround(wd.Vector3.create(30, 0, 0), yzEu),
//            createGround(wd.Vector3.create(-30, 0, 0), yzNeEu),
//            createGround(wd.Vector3.create(0, 30, 0), xzNeEu),
//            createGround(wd.Vector3.create(0, -30, 0), xzEu),
//            createGround(wd.Vector3.create(0, 0, 30), xyNeEu),
//            createGround(wd.Vector3.create(0, 0, -30), xyEu)
//        ];
//    }
//
//    function createGround(position, eulerAngles) {
//        var map = wd.ImageTexture.create();
//        map.wrapS = wd.ETextureWrapMode.REPEAT;
//        map.wrapT = wd.ETextureWrapMode.REPEAT;
//        map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);
//
//
//        var material = wd.LightMaterial.create();
//        material.specularColor = wd.Color.create("#ffdd99");
//        material.shininess = 32;
//        material.side = wd.ESide.BOTH;
//        material.diffuseMap = map;
//
//
//        var plane = wd.PlaneGeometry.create();
//        plane.width = 100;
//        plane.height = 100;
//        plane.material = material;
//
//
//        var ground = wd.GameObject.create();
//        ground.addComponent(wd.MeshRenderer.create());
//        ground.addComponent(plane);
//
//        ground.transform.eulerAngles = eulerAngles;
//        ground.transform.translate(position);
//
//        return ground;
//    }
//
//    beforeEach(function(){
//        director = wd.Director.getInstance();
//
//        boxArr = createBoxes();
//        groundArr = createGrounds();
//        light = shadowTool.createPointLight(boxArr.concat(groundArr));
//
//        director.scene.addChildren(boxArr);
//        director.scene.addChildren(groundArr);
//        director.scene.addChild(light);
//
//
//        director.scene.addChild(testTool.createCamera());
//
//        prepareTool.prepareForMap(sandbox);
//    });
//
//    it("add shadowMapRenderer to scene before init", function(){
//        sandbox.stub(director.scene, "addRenderTargetRenderer");
//        sandbox.stub(director.scene.gameObjectScene, "init");
//
//        director._init();
//
//        expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.gameObjectScene.init);
//    });
//
//    describe("test compound gameObject", function(){
//        var box1;
//        var part1,part2;
//
//        beforeEach(function(){
//            box1 = boxArr[0];
//
//            part1 = prepareTool.createBox();
//            part2 = prepareTool.createBox();
//
//            part1.addChild(part2);
//
//            box1.addChild(part1);
//        });
//
//        it("test container", function(){
//            box1.removeComponent(wd.Geometry);
//
//            director._init();
//
//            var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
//            expect(shadowRenderList.getChild("px").getCount()).toEqual(13);
//            expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
//            expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
//            expect(shadowRenderList.getChild("px").hasChild(box1)).toBeFalsy();
//        });
//        it("test parent-child gameObject", function () {
//            director._init();
//
//            var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
//            expect(shadowRenderList.getChild("px").getCount()).toEqual(14);
//            expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
//            expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
//            expect(shadowRenderList.getChild("px").hasChild(box1)).toBeTruthy();
//        });
//    });
//});

