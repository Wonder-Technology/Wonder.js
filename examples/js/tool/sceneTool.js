var sceneTool = (function () {
    var _getScene = function (){
        return wd.Director.getInstance().scene;
    }

    return {
        getScene: function (){
            return _getScene();
        },
        addGameObject: function(gameObj){
            wd.addSceneChild(_getScene(), gameObj);
        },
        removeGameObject: function(gameObj){
            wd.removeSceneChild(_getScene(), gameObj);
        }
    }
})()

