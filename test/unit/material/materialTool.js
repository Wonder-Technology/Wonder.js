var materialTool = (function () {

    return {
        prepareMap: function(sandbox, model,geo,material) {
            prepareTool.prepareGeo(sandbox, model,geo,material,function(material){
            });
        },
        prepareEnvMap: function(sandbox, model,geo,material,envMap) {
            prepareTool.prepareGeo(sandbox, model,geo,material,function(material){
                envMap.near = 0.1;
                envMap.far = 1000;
                envMap.size = 256;

                material.envMap = envMap;

                sandbox.stub(envMap, "init");
            });
            }
    }
})();

