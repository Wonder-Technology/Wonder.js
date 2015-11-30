var prepareTool = (function () {
    return {
        prepareGeo: function(sandbox, model,geo,material,setMaterialFunc) {
            setMaterialFunc = setMaterialFunc || function(){};

            setMaterialFunc(material);


            geo.material = material;


            model.addComponent(geo);


            //anim = createAnimation("play");
            //model.addComponent(anim);


            //fps = 10;


            model.addComponent(wd.MeshRenderer.create());

            var director = wd.Director.getInstance();

            director.scene.addChild(model);

            director.scene.addChild(testTool.createCamera());


            program = material.shader.program;
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
            sandbox.stub(program, "getUniformLocation");
        },
        prepareForMap:function(sandbox){
            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                width:100,
                height:100
            });

            var gl = wd.DeviceManager.getInstance().gl;
            gl.createTexture.returns({});
            gl.createRenderbuffer.returns({});
        }
    }
})();
