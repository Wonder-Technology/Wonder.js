var GameObjectSystemTool = YYC.Class({
    Public: {
        getAllComponents : wd.getGameObjectAllComponents,

        resetData: function(){
            wd.initGameObjectData(wd.GameObjectData);
        }
    }
});

var gameObjectSystemTool = new GameObjectSystemTool();

YYC.Tool.extend.extend(gameObjectSystemTool, gameObjectTool);
