describe("shadow map", function() {
    var sandbox = null;
    var shadow = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("direction shadow map", function(){
        var director;
        var sphere;
        var light;

        function createSphere() {
            var material = wd.LightMaterial.create();
            material.specular = wd.Color.create("#ffdd99");
            material.shininess = 16;
            material.diffuseMap = wd.ImageTexture.create(wd.TextureLoader.getInstance().get("texture"));
            material.shading = wd.Shading.SMOOTH;


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

        //function createBox(){
        //    var material = wd.LightMaterial.create();
        //    material.specular = wd.Color.create("#ffdd99");
        //    material.color = wd.Color.create("#666666");
        //    material.shininess = 16;
        //
        //
        //    var geometry = wd.BoxGeometry.create();
        //    geometry.material = material;
        //    geometry.width = 10;
        //    geometry.height = 10;
        //    geometry.depth = 10;
        //
        //
        //    var gameObject = wd.GameObject.create();
        //    gameObject.addComponent(wd.MeshRenderer.create());
        //    gameObject.addComponent(geometry);
        //
        //
        //    gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
        //    gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);
        //
        //
        //    var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
        //        gameObject.transform.rotate(0, 1, 0);
        //    }));
        //
        //    gameObject.addComponent(action);
        //
        //    return gameObject;
        //}
        //
        //function createGround(){
        //    //var map = wd.LoaderManager.getInstance().get("ground").toTexture();
        //    var map = wd.ImageTexture.create();
        //    map.wrapS = wd.TextureWrapMode.REPEAT;
        //    map.wrapT = wd.TextureWrapMode.REPEAT;
        //    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);
        //
        //
        //    var material = wd.LightMaterial.create();
        //    material.specular = wd.Color.create("#ffdd99");
        //    material.shininess = 32;
        //    material.diffuseMap = map;
        //
        //
        //    var plane = wd.PlaneGeometry.create();
        //    plane.width = 200;
        //    plane.height = 200;
        //    plane.material = material;
        //
        //
        //    var gameObject = wd.GameObject.create();
        //    gameObject.addComponent(wd.MeshRenderer.create());
        //    gameObject.addComponent(plane);
        //
        //    return gameObject;
        //}

        //function createAmbientLight() {
        //    var ambientLightComponent = wd.AmbientLight.create();
        //    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");
        //
        //    var ambientLight = wd.GameObject.create();
        //    ambientLight.addComponent(ambientLightComponent);
        //
        //    return ambientLight;
        //}

        beforeEach(function(){
            director = wd.Director.getInstance();

            sphere = createSphere();
            //var box = createBox();
            //var ground = createGround();
            light = shadowTool.createDirectionLight([sphere]);

            director.scene.addChild(sphere);
            //director.scene.addChild(box);
            //director.scene.addChild(ground);
            //director.scene.addChild(createAmbientLight());
            //director.scene.addChild(createDirectionLight([sphere, box, ground]));
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        describe("build twoD shadow map", function(){
            it("send u_mMatrix,u_vMatrix,u_pMatrix,a_position when build", function(){
                var sceneShader = null;

                var useProgram = director.scene.useProgram
                sandbox.stub(director.scene, "useProgram", function(shader){
                    useProgram.call(director.scene, shader);
                    sceneShader = shader;
                    sandbox.stub(sceneShader.program, "sendAttributeData");
                    sandbox.stub(sceneShader.program, "sendUniformData");
                });



                director._init();

                director._loopBody(1);



                expect(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledOnce();
                expect(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight").firstCall.args[2]).toEqual(jasmine.any(wd.Matrix4))
                expect(sceneShader.program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendAttributeData.withArgs("a_position")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
            });
        });

        it("add shadowMapRenderer to scene before init", function(){



            //var sphereProgram = sphereMaterial.shader.program;
            //sandbox.stub(sphereProgram, "sendAttributeData");
            //sandbox.stub(sphereProgram, "sendUniformData");
            //
            //
            //var groundProgram = groundMaterial.shader.program;
            //sandbox.stub(groundProgram, "sendAttributeData");
            //sandbox.stub(groundProgram, "sendUniformData");

            sandbox.stub(director.scene, "addRenderTargetRenderer");
            sandbox.stub(director.scene, "init");

            director._init();

            expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.init);
        });

        describe("test compound gameObject", function(){
            var part1,part2;

            beforeEach(function(){
                part1 = prepareTool.createBox();
                part2 = prepareTool.createBox();

                part1.addChild(part2);

                sphere.addChild(part1);
            });

            it("test container", function(){
                sphere.removeComponent(wd.Geometry);

                director._init();

                var shadowRenderList = light.getComponent(wd.DirectionLight).shadowRenderList;
                expect(shadowRenderList.getChildren()).toEqual([part1, part2]);
            });
            it("test parent-child gameObject", function () {
                director._init();

                var shadowRenderList = light.getComponent(wd.DirectionLight).shadowRenderList;
                expect(shadowRenderList.getChildren()).toEqual([sphere, part1, part2]);
            });
        });
    });

    describe("point shadow map", function(){
        var director;
        var boxArr,groundArr;
        var light;

        function createBoxes() {
            return [
                createBox(wd.Vector3.create(20, 0, 0)),
                createBox(wd.Vector3.create(-20, 0, 0)),
                createBox(wd.Vector3.create(0, 20, 0)),
                createBox(wd.Vector3.create(0, -20, 0)),
                createBox(wd.Vector3.create(10, 0, 25)),
                createBox(wd.Vector3.create(0, 0, -20))
            ];
        }

        function createBox(position) {
            var material = wd.LightMaterial.create();
            material.specular = wd.Color.create("#ffdd99");
            material.color = wd.Color.create("#666666");
            material.shininess = 16;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);

            gameObject.transform.translate(position);

            return gameObject;
        }

        function createGrounds() {
            var xzEu = wd.Vector3.create(0, 0, 0);
            var xzNeEu = wd.Vector3.create(0, 0, 180);
            var xyEu = wd.Vector3.create(90, 0, 0);
            var xyNeEu = wd.Vector3.create(-90, 0, 0);
            var yzEu = wd.Vector3.create(0, 0, 90);
            var yzNeEu = wd.Vector3.create(0, 0, -90);

            return [
                createGround(wd.Vector3.create(30, 0, 0), yzEu),
                createGround(wd.Vector3.create(-30, 0, 0), yzNeEu),
                createGround(wd.Vector3.create(0, 30, 0), xzNeEu),
                createGround(wd.Vector3.create(0, -30, 0), xzEu),
                createGround(wd.Vector3.create(0, 0, 30), xyNeEu),
                createGround(wd.Vector3.create(0, 0, -30), xyEu)
            ];
        }

        function createGround(position, eulerAngles) {
            var map = wd.ImageTexture.create();
            map.wrapS = wd.TextureWrapMode.REPEAT;
            map.wrapT = wd.TextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specular = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.side = wd.Side.BOTH;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 100;
            plane.height = 100;
            plane.material = material;


            var ground = wd.GameObject.create();
            ground.addComponent(wd.MeshRenderer.create());
            ground.addComponent(plane);

            ground.transform.eulerAngles = eulerAngles;
            ground.transform.translate(position);

            return ground;
        }

        beforeEach(function(){
            director = wd.Director.getInstance();

            boxArr = createBoxes();
            groundArr = createGrounds();
            light = shadowTool.createPointLight(boxArr.concat(groundArr));

            director.scene.addChildren(boxArr);
            director.scene.addChildren(groundArr);
            director.scene.addChild(light);


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("add shadowMapRenderer to scene before init", function(){
            sandbox.stub(director.scene, "addRenderTargetRenderer");
            sandbox.stub(director.scene, "init");

            director._init();

            expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.init);
        });

        describe("test compound gameObject", function(){
            var box1;
            var part1,part2;

            beforeEach(function(){
                box1 = boxArr[0];

                part1 = prepareTool.createBox();
                part2 = prepareTool.createBox();

                part1.addChild(part2);

                box1.addChild(part1);
            });

            it("test container", function(){
                box1.removeComponent(wd.Geometry);

                director._init();

                var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
                expect(shadowRenderList.getChild("px").getCount()).toEqual(13);
                expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
                expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
                expect(shadowRenderList.getChild("px").hasChild(box1)).toBeFalsy();
            });
            it("test parent-child gameObject", function () {
                director._init();

                var shadowRenderList = light.getComponent(wd.PointLight).shadowRenderList;
                expect(shadowRenderList.getChild("px").getCount()).toEqual(14);
                expect(shadowRenderList.getChild("px").hasChild(part1)).toBeTruthy();
                expect(shadowRenderList.getChild("px").hasChild(part2)).toBeTruthy();
                expect(shadowRenderList.getChild("px").hasChild(box1)).toBeTruthy();
            });
        });
    });
});

