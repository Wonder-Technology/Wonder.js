var gameObjectTool = (function () {
    return {
        create: wd.createGameObject,
        hasComponent : wd.hasGameObjectComponent,
        getComponent : wd.getGameObjectComponent,
        getTransform : wd.getGameObjectTransform,
        getChildren : wd.getGameObjectChildren,
        isAlive : wd.isGameObjectAlive,
        dispose: wd.disposeGameObject,
        // disposeBatchChildren: wd.disposeBatchGameObjectChildren,
        disposeComponent: wd.disposeGameObjectComponent,
        addComponent : wd.addGameObjectComponent,
        has: wd.hasGameObject,
        add: wd.addGameObject,
        init: wd.initGameObject,
        remove: wd.removeGameObject,

        resetData: function(){
            wd.initGameObjectData(wd.GameObjectData);
        }
    }
})()
