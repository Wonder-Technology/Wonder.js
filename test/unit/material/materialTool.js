var materialTool = (function () {

    return {
        prepareMap: function(sandbox, vertice, normals, model,geo,material) {
            this._prepare(sandbox, vertice, normals, model,geo,material,function(material){
            });
        },
        prepareEnvMap: function(sandbox, vertice, normals, model,geo,material,envMap) {
            this._prepare(sandbox, vertice, normals, model,geo,material,function(material){
                envMap.near = 0.1;
                envMap.far = 1000;
                envMap.size = 256;

                material.envMap = envMap;

                sandbox.stub(envMap, "init");
            });
            },
        _prepare: function(sandbox, vertice, normals, model,geo,material,setMaterialFunc) {
            setMaterialFunc(material);


            geo.material = material;

            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0, 1, 2],
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
        }
    }
})();

