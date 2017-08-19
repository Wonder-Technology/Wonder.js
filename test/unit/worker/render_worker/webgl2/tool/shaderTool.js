var shaderTool = (function () {
    return {
        // disableVertexAttribArray: function (gl) {
        //   wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        // },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramWorkerData(wdrd.WebGL2ProgramWorkerData);
            wd.initLocationWorkerData(wdrd.LocationWorkerData);
            wd.initWebGL2GLSLSenderWorkerData(wdrd.WebGL2GLSLSenderWorkerData);
            wd.initShaderWorkerData(wdrd.ShaderWorkerData);
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

