var gameObjectLODTool = (function(){
    return {
        prepareLod: function (sandbox, defaultSwitchHandler, switchHandlerLevel1, switchHandlerLevel2){
        var model = grassInstanceTool.createGrass("instance");


        var gameObjectLevel1 = this.createGrassMap();

        var gameObjectLevel2 = this.createBillboard();

        var lod = wd.GameObjectLOD.create();

        if(defaultSwitchHandler){
            lod.defaultGameObjectSwitchHandler = defaultSwitchHandler;
        }

        if(switchHandlerLevel1){
            lod.addLevel(15, gameObjectLevel1, switchHandlerLevel1);
        }
        else{
            lod.addLevel(15, gameObjectLevel1);
        }

        if(switchHandlerLevel1){
            lod.addLevel(30, gameObjectLevel2, switchHandlerLevel2);
        }
        else{
            lod.addLevel(30, gameObjectLevel2);
        }

        lod.addLevel(40, wd.ELODState.INVISIBLE);

        model.addComponent(lod);



        sandbox.spy(model, "render");
        sandbox.spy(gameObjectLevel1, "render");
        sandbox.spy(gameObjectLevel2, "render");

        return {
            lod:lod,
            model:model,
            gameObjectLevel1:gameObjectLevel1,
            gameObjectLevel2:gameObjectLevel2
        }
    },
        createGrassMap: function () {
        var grassMap = wd.ImageTexture.create({});
        var width = grassMap.width / 4,
            height = grassMap.height;
        var mapData = [
            {
                sourceRegion:wd.RectRegion.create(0, 0, width, height)
            },
            {
                sourceRegion:wd.RectRegion.create(width, 0, width, height)
            },
            {
                sourceRegion:wd.RectRegion.create(width * 2, 0, width, height)
            }
        ];



        var material = wd.GrassMapMaterial.create();

        material.grassMap = grassMap;
        material.mapData = mapData;






        var gameObjectmetry = wd.GrassMapGeometry.create();
        gameObjectmetry.material = material;



        var gameObject = wd.GameObject.create();
        gameObject.addComponent(gameObjectmetry);

        gameObject.addComponent(wd.MeshRenderer.create());


            gameObject.name = "grassMap";


        return gameObject;
    },
    createBillboard: function () {
        var material = wd.LightMaterial.create();
        material.diffuseMap = wd.GrassProceduralTexture.create();


        var gameObjectmetry = wd.RectGeometry.create();
        gameObjectmetry.material = material;
        // gameObjectmetry.width = 5;
        // gameObjectmetry.height = 5;


        var billboard = wd.Billboard.create();
        billboard.mode = wd.EBillboardMode.Y;


        var gameObject = wd.GameObject.create();
        gameObject.addComponent(gameObjectmetry);
        gameObject.addComponent(billboard);

        gameObject.addComponent(wd.MeshRenderer.create());


        gameObject.name = "billboard";

        return gameObject;
    }
    }
})();

