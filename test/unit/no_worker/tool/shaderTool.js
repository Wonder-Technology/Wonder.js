var shaderTool = (function () {
    return {
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.ProgramData);
            wd.initLocationData(wd.LocationData);
            wd.initWebGL1GLSLSenderData(wd.WebGL1GLSLSenderData);
            wd.initWebGL2GLSLSenderData(wd.WebGL2GLSLSenderData);
        }
    }
})();

