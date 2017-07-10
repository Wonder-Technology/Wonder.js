var shaderTool = (function () {
    return {
        disableVertexAttribArray: function (gl) {
          wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        },
        // //todo use BasicMaterialData?
        // sendUniformData: function(gl, index, renderCommandUniformData){
        //     wd.sendUniformData(gl, index, wd.MaterialData, wd.ProgramData, wd.LocationData, wd.GLSLSenderData, renderCommandUniformData);
        // },
        // sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
        //   wd.sendAttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.ProgramData, wd.LocationData, wd.GLSLSenderData, wd.GeometryData, wd.ArrayBufferData);
        // },
        // use: function(gl, index){
        //     wd.useProgram(gl, index, wd.ProgramData, wd.LocationData, wd.GLSLSenderData);
        // },
        // setProgram: function (index, data) {
        //     wd.ProgramData.programMap[index] = data;
        // },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramWorkerData(wdrd.ProgramWorkerData);
            // wd.initLocationData(wd.LocationData);
            // wd.initGLSLSenderData(wd.GLSLSenderData);
        },

        clearShader: function () {
            wd.ProgramData.programMap = {};
            wd.LocationData.attributeLocationMap = {};
            wd.LocationData.uniformLocationMap = {};

            wd.GLSLSenderData.sendAttributeConfigMap = {};
            wd.GLSLSenderData.sendUniformConfigMap = {};
        }
        // clearProgramMap: function () {
        //     wd.ProgramData.programMap = {};
        // },
        // clearLocationMap: function () {
        //     wd.LocationData.attributeLocationMap = {};
        //     wd.LocationData.uniformLocationMap = {};
        // }
    }
})();

