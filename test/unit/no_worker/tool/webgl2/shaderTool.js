var shaderTool = (function () {
    return {
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.WebGL2ProgramData);
            wd.initLocationData(wd.LocationData);
            wd.initWebGL2GLSLSenderData(wd.WebGL2GLSLSenderData);
        },

        clearShader: function () {
            wd.WebGL2ProgramData.programMap = {};
            wd.LocationData.attributeLocationMap = {};
            wd.LocationData.uniformLocationMap = {};

            wd.WebGL2GLSLSenderData.sendAttributeConfigMap = {};
            wd.WebGL2GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();
