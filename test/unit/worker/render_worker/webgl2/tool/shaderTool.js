var shaderTool = (function () {
    return {
        // disableVertexAttribArray: function (gl) {
        //   wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        // },
        resetData: function(){
            wd.initProgramWorkerData(wdrd.WebGL2ProgramWorkerData);
            wd.initWebGL2LocationWorkerData(wdrd.WebGL2LocationWorkerData);
            wd.initWebGL2GLSLSenderWorkerData(wdrd.WebGL2GLSLSenderWorkerData);
            wd.initWebGL2ShaderWorkerData(wdrd.WebGL2ShaderWorkerData);
        },
        // clearShader: function () {
        //     wd.ProgramData.programMap = {};
        //     wd.LocationData.attributeLocationMap = {};
        //     wd.LocationData.uniformLocationMap = {};
        //
        //     wd.GLSLSenderData.sendAttributeConfigMap = {};
        //     wd.GLSLSenderData.sendUniformConfigMap = {};
        // },
        getDirectionLightPositionForSend: function(index){
            return wd.getDirectionLightPositionInShaderWorker(index, {
                DirectionLightDataFromSystem:wdrd.DirectionLightWorkerData
            });
        },
        getPointLightPositionForSend: function(index){
            return wd.getPointLightPositionInShaderWorker(index, {
                PointLightDataFromSystem:wdrd.WebGL2PointLightWorkerData
            });
        }
    }
})();

