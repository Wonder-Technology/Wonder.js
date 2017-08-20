var shaderTool = (function () {
    return {
        // disableVertexAttribArray: function (gl) {
        //   wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        // },
        resetData: function(){
            wd.initProgramWorkerData(wdrd.WebGL1ProgramWorkerData);
            wd.initWebGL1LocationWorkerData(wdrd.WebGL1LocationWorkerData);
            wd.initWebGL1GLSLSenderWorkerData(wdrd.WebGL1GLSLSenderWorkerData);
            wd.initWebGL1ShaderWorkerData(wdrd.WebGL1ShaderWorkerData);
        },
        // clearShader: function () {
        //     wd.ProgramData.programMap = {};
        //     wd.LocationData.attributeLocationMap = {};
        //     wd.LocationData.uniformLocationMap = {};
        //
        //     wd.WebGL1GLSLSenderWorkerData.sendAttributeConfigMap = {};
        //     wd.WebGL1GLSLSenderWorkerData.sendUniformConfigMap = {};
        // },
        getDirectionLightPositionForSend: function(index){
            return wd.getDirectionLightPositionInShaderWorker(index, wdrd.DirectionLightWorkerData);
        },
        getPointLightPositionForSend: function(index){
            return wd.getPointLightPositionInShaderWorker(index, wdrd.WebGL1PointLightWorkerData);
        }
    }
})();

