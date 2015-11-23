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


            model.addComponent(dy.MeshRenderer.create());

            var director = dy.Director.getInstance();

            director.scene.addChild(model);

            director.scene.addChild(testTool.createCamera());


            program = material.shader.program;
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
            sandbox.stub(program, "getUniformLocation");
        },
        prepareForMap:function(sandbox){
            sandbox.stub(dy.DeviceManager.getInstance(), "view", {
                width:100,
                height:100
            });

            var gl = dy.DeviceManager.getInstance().gl;
            gl.createTexture.returns({});
            gl.createRenderbuffer.returns({});
        }
    }
})();
