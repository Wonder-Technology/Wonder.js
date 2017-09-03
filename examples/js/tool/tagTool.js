var tagTool = (function () {
    return {
        create: wd.createTag,
        addTag : wd.addTag,
        removeTag : wd.removeTag,
        findGameObjectsByTag: wd.findGameObjectsByTag,
        getGameObject:wd.getTagGameObject
    }
})()
