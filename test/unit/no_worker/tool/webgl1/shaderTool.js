var shaderTool = (function () {
    return {
        sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
          wd.sendWebGL1AttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.WebGL1ProgramData, wd.WebGL1LocationData, wd.WebGL1GLSLSenderData, wd.GeometryData, wd.ArrayBufferData, wd.GPUDetectData);
        },
        setProgram: function (index, data) {
            wd.WebGL1ProgramData.programMap[index] = data;
        },
        setSendAttributeConfig: function (index, data) {
            wd.WebGL1GLSLSenderData.sendAttributeConfigMap[index] = data;
        },
        setAttributeLocation: function (index, data) {
            wd.WebGL1LocationData.attributeLocationMap[index] = data;
        },
        use: function(gl, index){
            wd.useProgram(gl, index, wd.WebGL1ProgramData, wd.WebGL1LocationData, wd.WebGL1GLSLSenderData);
        },
        disableVertexAttribArray: function (gl) {
            wd.disableVertexAttribArray(gl, wd.WebGL1GLSLSenderData);
        },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.WebGL1ProgramData);
            wd.initLocationData(wd.WebGL1LocationData);
            wd.initWebGL1GLSLSenderData(wd.WebGL1GLSLSenderData);
        },

        clearShader: function () {
            wd.WebGL1ProgramData.programMap = {};
            wd.WebGL1LocationData.attributeLocationMap = {};
            wd.WebGL1LocationData.uniformLocationMap = {};

            wd.WebGL1GLSLSenderData.sendAttributeConfigMap = {};
            wd.WebGL1GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();

