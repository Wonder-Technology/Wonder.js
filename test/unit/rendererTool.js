var rendererTool = {
    triggerMaterialAddShaderLib: function(material){
        material.init();

        wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.AFTER_INIT));
    },
    convertSource: function(source){
        return source.split("\n").join("")
    },
};
