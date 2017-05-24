var sceneTool = (function () {
    var _getScene = function (){
        return wd.Director.getInstance().scene;
    }

    return {
        addGameObject: function(gameObj){
            wd.addSceneChild(_getScene(), gameObj);
        },
        removeGameObject: function(gameObj){
            wd.removeSceneChild(_getScene(), gameObj);
        },
        prepareGameObjectAndAddToScene: function() {
            var material = basicMaterialTool.create();

            var obj = gameObjectTool.create();

            gameObjectTool.addComponent(obj, material);
            gameObjectTool.addComponent(obj, meshRendererTool.create());


            var geo = boxGeometryTool.create();
            gameObjectTool.addComponent(obj, geo);

            sceneTool.addGameObject(obj);

            return {
                gameObject:obj,
                geometry:geo,
                material:material
            }
        }
    }
})()

