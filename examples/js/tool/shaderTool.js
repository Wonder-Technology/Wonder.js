var shaderTool = (function () {
    return {
        use: wd.useProgram,
        sendAttributeData: wd.sendAttributeData,
        sendUniformData: wd.sendUniformData,
        disableVertexAttribArray: wd.disableVertexAttribArray,

        setSendAttributeConfig: function (index, data) {
          wd.ShaderData.sendAttributeConfigMap[index] = data;
        },
        setAttributeLocation: function (index, data) {
            wd.ShaderData.attributeLocationMap[index] = data;
        },
        setSendUniformConfig: function (index, data) {
            wd.ShaderData.sendUniformConfigMap[index] = data;
        },
        setUniformLocation: function (index, data) {
            wd.ShaderData.uniformLocationMap[index] = data;
        },
        setUniformCache: function (index, data) {
            wd.ShaderData.uniformCacheMap[index] = data;
        },
        setProgram: function (index, data) {
            wd.ShaderData.programMap[index] = data;
        },
        resetData: function(){
            wd.initShaderData(wd.ShaderData);
        }
    }
})()

