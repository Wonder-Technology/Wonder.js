var directorTool = (function(){
    return {
        getDirector: function(){
            return wd.Director.getInstance();
        },
        updateGameObjectScene: function (elapsedTime){
            this.getDirector().scene.gameObjectScene.update(elapsedTime || 1);
        }
    }
})();
