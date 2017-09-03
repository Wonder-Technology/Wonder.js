var GameObjectSystemTool = YYC.Class({
    Public: {
        resetData: function(){
            wd.initGameObjectData(wd.GameObjectData);
        }
    }
});

var gameObjectSystemTool = new GameObjectSystemTool();

YYC.Tool.extend.extend(gameObjectSystemTool, gameObjectTool);
