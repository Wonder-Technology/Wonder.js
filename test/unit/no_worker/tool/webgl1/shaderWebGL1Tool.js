var shaderWebGL1Tool = (function () {
    return {
        sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
          wd.sendWebGL1AttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.ProgramData, wd.LocationData, wd.GLSLSenderData, wd.GeometryData, wd.ArrayBufferData);
        },
        setProgram: function (index, data) {
            wd.ProgramData.programMap[index] = data;
        },
        setSendAttributeConfig: function (index, data) {
            wd.GLSLSenderData.sendAttributeConfigMap[index] = data;
        },
        setAttributeLocation: function (index, data) {
            wd.LocationData.attributeLocationMap[index] = data;
        },
        use: function(gl, index){
            wd.useProgram(gl, index, wd.ProgramData, wd.LocationData, wd.GLSLSenderData);
        },
        disableVertexAttribArray: function (gl) {
            wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.ProgramData);
            wd.initLocationData(wd.LocationData);
            // wd.initWebGL1GLSLSenderData(wd.WebGL1GLSLSenderData);
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

