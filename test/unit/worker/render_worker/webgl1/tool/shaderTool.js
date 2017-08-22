var shaderTool = (function () {
    return {
        resetData: function(){
            wd.initProgramWorkerData(wdrd.WebGL1ProgramWorkerData);
            wd.initWebGL1LocationWorkerData(wdrd.WebGL1LocationWorkerData);
            wd.initWebGL1GLSLSenderWorkerData(wdrd.WebGL1GLSLSenderWorkerData);
            wd.initWebGL1ShaderWorkerData(wdrd.WebGL1ShaderWorkerData);
        },
        getDirectionLightPositionForSend: function(index){
            return wd.getDirectionLightPositionInShaderWorker(index, wdrd.WebGL1DirectionLightWorkerData);
        },
        getPointLightPositionForSend: function(index){
            return wd.getPointLightPositionInShaderWorker(index, wdrd.WebGL1PointLightWorkerData);
        }
    }
})();

