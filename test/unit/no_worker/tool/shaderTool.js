var shaderTool = (function () {
    return {
        disableVertexAttribArray: function (gl) {
          wd.disableVertexAttribArray(gl, wd.GLSLSenderData);
        },
        // sendUniformData: function(gl, index, renderCommandUniformData, program){
        //     wd.sendUniformData(gl, index, program || {}, {
        //         MaterialDataFromSystem: wd.MaterialData,
        //         BasicMaterialDataFromSystem: wd.BasicMaterialData,
        //         ProgramDataFromSystem: wd.ProgramData,
        //        LocationDataFromSystem: wd.LocationData,
        //         GLSLSenderDataFromSystem:wd.GLSLSenderData,
        //         MapManagerDataFromSystem:wd.MapManagerData
        //     }, renderCommandUniformData, wd.buildSendUniformDataDataMap());
        // },
        sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
          wd.sendAttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.ProgramData, wd.LocationData, wd.GLSLSenderData, wd.GeometryData, wd.ArrayBufferData);
        },
        use: function(gl, index){
            wd.useProgram(gl, index, wd.ProgramData, wd.LocationData, wd.GLSLSenderData);
        },
        setSendAttributeConfig: function (index, data) {
            wd.GLSLSenderData.sendAttributeConfigMap[index] = data;
        },
        setAttributeLocation: function (index, data) {
            wd.LocationData.attributeLocationMap[index] = data;
        },
        // setSendUniformConfig: function (index, data) {
        //     wd.GLSLSenderData.sendUniformConfigMap[index] = data;
        // },
        // setSendUniformFuncConfig: function (index, data) {
        //     wd.GLSLSenderData.sendUniformFuncConfigMap[index] = data;
        // },
        // setUniformLocation: function (index, data) {
        //     wd.LocationData.uniformLocationMap[index] = data;
        // },
        // setUniformCache: function (index, data) {
        //     wd.GLSLSenderData.uniformCacheMap[index] = data;
        // },
        setProgram: function (index, data) {
            wd.ProgramData.programMap[index] = data;
        },
        resetData: function(){
            shaderUtils.resetData();

            wd.initProgramData(wd.ProgramData);
            wd.initLocationData(wd.LocationData);
            wd.initGLSLSenderData(wd.GLSLSenderData);
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

