var shaderTool = (function () {
    return {
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.WebGL2ProgramData);
            wd.initLocationData(wd.WebGL2LocationData);
            wd.initWebGL2GLSLSenderData(wd.WebGL2GLSLSenderData);
        },

        clearShader: function () {
            wd.WebGL2ProgramData.programMap = {};
            wd.WebGL2LocationData.uniformLocationMap = {};

            wd.WebGL2GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();
