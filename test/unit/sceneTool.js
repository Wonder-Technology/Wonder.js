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
        }
    }
})()

