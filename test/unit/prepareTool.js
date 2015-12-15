var prepareTool = (function () {
    return {
        createBox: function(size){
            var size = size || 5;

            var material = wd.BasicMaterial.create();

            var geo = wd.BoxGeometry.create();
            geo.width = size;
            geo.height = size;
            geo.depth = size;

            geo.material = material;

            var box = wd.GameObject.create();

            box.addComponent(geo);
            box.addComponent(wd.MeshRenderer.create());

            return box;
        },
        addScript:function(gameObject, script, scriptName){
            gameObject._scripts.addChild(scriptName || "scriptName", script);
        },
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
