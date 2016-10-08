var grassInstanceTool = (function(){
    return {
        createGrass: function (name){
            var material = wd.GrassInstanceMaterial.create();

            material.map = wd.ImageTexture.create({});
            material.terrainGeometry = {};



            var geometry = wd.GrassInstanceGeometry.create();
            geometry.material = material;
            geometry.bladeCount = 10;
            geometry.offsetRadius = 3;



            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            var sourceInstanceComponent = wd.OneToManySourceInstance.create();
            gameObject.addComponent(sourceInstanceComponent);

            if(name){
                gameObject.name = name;
            }
            else{
                gameObject.name = "grass";
            }

            return gameObject;
        },
        setFakeGeoemtry:function(material){
            material.geometry = {
                vertexIndexBuffer:wd.ArrayBuffer.create()
            }
        }
    }
})();
