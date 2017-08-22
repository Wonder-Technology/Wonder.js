var shaderTool = (function () {
    return {
        resetData: function(){
            wd.initProgramWorkerData(wdrd.WebGL2ProgramWorkerData);
            wd.initWebGL2LocationWorkerData(wdrd.WebGL2LocationWorkerData);
            wd.initWebGL2GLSLSenderWorkerData(wdrd.WebGL2GLSLSenderWorkerData);
            wd.initWebGL2ShaderWorkerData(wdrd.WebGL2ShaderWorkerData);
        },
        getDirectionLightPositionForSend: function(index){
            return wd.getDirectionLightPositionInShaderWorker(index, wdrd.WebGL2DirectionLightWorkerData);
        },
        getPointLightPositionForSend: function(index){
            return wd.getPointLightPositionInShaderWorker(index, wdrd.WebGL2PointLightWorkerData);
        }
    }
})();

