var shaderWebGL2Tool = (function () {
    return {
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.ProgramData);
            wd.initLocationData(wd.LocationData);
            wd.initWebGL2GLSLSenderData(wd.WebGL2GLSLSenderData);
        },

        clearShader: function () {
            wd.ProgramData.programMap = {};
            wd.LocationData.attributeLocationMap = {};
            wd.LocationData.uniformLocationMap = {};

            wd.WebGL2GLSLSenderData.sendAttributeConfigMap = {};
            wd.WebGL2GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();
