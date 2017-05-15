var tagTool = (function () {
    return {
        create: wd.createTag,
        addTag : wd.addTag,
        removeTag : wd.removeTag,
        findGameObjectsByTag: wd.findGameObjectsByTag,

        resetData: function(){
            // var TagData = wd.TagData;
            //
            // // TagData.freeIndiceQueue = [];
            // // TagData.generationArr = [];
            //
            // TagData.uid = 0;
            //
            // TagData.isAliveMap = {};
            //
            // TagData.componentMap = {};
            // TagData.parentMap = {};
            // TagData.childrenMap = {};

            wd.initTagData(wd.TagData);
        }
    }
})()
