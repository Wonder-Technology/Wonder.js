var shaderTool = (function () {
    return {
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.WebGL2ProgramData);
            wd.initWebGL2LocationData(wd.WebGL2LocationData);
            wd.initWebGL2GLSLSenderData(wd.WebGL2GLSLSenderData);
        },

        clearShader: function () {
            wd.WebGL2ProgramData.programMap = {};
            wd.WebGL2LocationData.uniformLocationMap = {};

            wd.WebGL2GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();
