var shaderWebGL1Tool = (function () {
    return {
        sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
          wd.sendWebGL1AttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.ProgramData, wd.LocationData, wd.WebGL1GLSLSenderData, wd.GeometryData, wd.ArrayBufferData);
        },
        setProgram: function (index, data) {
            wd.ProgramData.programMap[index] = data;
        },
        setSendAttributeConfig: function (index, data) {
            wd.WebGL1GLSLSenderData.sendAttributeConfigMap[index] = data;
        },
        setAttributeLocation: function (index, data) {
            wd.LocationData.attributeLocationMap[index] = data;
        },
        use: function(gl, index){
            wd.useProgram(gl, index, wd.ProgramData, wd.LocationData, wd.WebGL1GLSLSenderData);
        },
        disableVertexAttribArray: function (gl) {
            wd.disableVertexAttribArray(gl, wd.WebGL1GLSLSenderData);
        },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.ProgramData);
            wd.initLocationData(wd.LocationData);
            wd.initWebGL1GLSLSenderData(wd.WebGL1GLSLSenderData);
        },

        clearShader: function () {
            wd.ProgramData.programMap = {};
            wd.LocationData.attributeLocationMap = {};
            wd.LocationData.uniformLocationMap = {};

            wd.WebGL1GLSLSenderData.sendAttributeConfigMap = {};
            wd.WebGL1GLSLSenderData.sendUniformConfigMap = {};
        }
    }
})();

