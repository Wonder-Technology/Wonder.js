describe("Material", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        material = new dy.Material();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    //describe("useProgram", function(){
    //    var scene;
    //
    //    beforeEach(function(){
    //        scene = dy.Director.getInstance().scene;
    //        sandbox.stub(material.shader.program, "use");
    //    });
    //
    //    it("if Scene use program, return", function(){
    //        scene.useProgram(dy.Shader.create());
    //
    //        material.useProgram();
    //
    //        expect(material.shader.program.use).not.toCalled();
    //    });
    //    it("else, use material's shader's program", function () {
    //        material.useProgram();
    //
    //        expect(material.shader.program.use).toCalledOnce();
    //    });
    //
    //});

    describe("updateShader", function(){
        var scene;

        beforeEach(function(){
            scene = dy.Director.getInstance().scene;
            sandbox.stub(material.shader, "update");
        });

        it("if Scene use program, update Scene's shader", function(){
            scene.useProgram(dy.Shader.create());
            sandbox.stub(scene.shader, "update");
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(scene.shader.update).toCalledWith(quadCmd, material);
        });
        it("else, update material's shader", function () {
            var quadCmd = {};

            material.updateShader(quadCmd);

            expect(material.shader.update).toCalledWith(quadCmd, material);
        });
    });

    describe("add envMap shader lib", function(){
        var model,geo,material,director,program;
        var envMap;
        var vertice,normals;

        function prepare(){
            model = dy.GameObject.create();

            geo = dy.ModelGeometry.create();

            material = dy.BasicMaterial.create();

            envMap = dy.DynamicCubemapTexture.create();
//            var list = [skybox];
//            var list = [skybox, box, box2, box3, box4, box5, box6];
////            var list = [ box];
//            envMap.renderList = {
//                px:list,
//                nx:list,
//                py:list,
//                ny:list,
//                pz:list,
//                nz:list
//            };
//            envMap.renderList = {
//                px:list,
//                nx:list,
//                py:list,
//                ny:list,
//                pz:list,
//                nz:list
//            };
            envMap.near = 0.1;
            envMap.far = 1000;
            envMap.size = 256;

            envMap.mode = dy.EnvMapMode.REFLECTION;
            material.envMap = envMap;


            sandbox.stub(envMap, "init");
            //sandbox.stub(envMap, "update");



            geo.material = material;

            geo.vertices = vertice;
            //geo.morphTargets = dyCb.Hash.create({
            //    "play": dyCb.Collection.create(
            //        [
            //            frameVertice1,
            //            frameVertice2,
            //            frameVertice3
            //        ]
            //    )
            //})
            //todo not duplicate
            //geo.faces = testTool.createFaces([0,2,1, 2,3,1]);
            geo.faces = testTool.createFaces([0,1,2,3,4,5],
                normals
            );


            model.addComponent(geo);


            //anim = createAnimation("play");
            //model.addComponent(anim);


            //fps = 10;




            model.addComponent(dy.MeshRenderer.create());

            director = dy.Director.getInstance();

            director.scene.addChild(model);

            director.scene.addChild(testTool.createCamera());


            program = material.shader.program;
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        }

        beforeEach(function(){
            vertice = [1,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
            normals = [
                0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
            ];

            prepare();
        });

        it("add normal shader lib", function(){
            director._init();

            director._run(1);

            expect(program.sendAttributeData.withArgs("a_normal")).toCalledOnce();
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_normal").getCall(0).args[2].data
            )).toEqual(
                normals
            )
        });
        it("add ReflectionShaderLib", function(){
            director._init();

            expect(material.shader.hasLib(dy.ReflectionShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        })
    });
});
