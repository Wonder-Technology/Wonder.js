var shaderWebGL1Tool = (function () {
    return {
        sendAttributeData: function(gl, shaderIndex, geometryIndex, program){
          wd.sendWebGL1AttributeData(gl, shaderIndex, program || {}, geometryIndex, wd.ProgramData, wd.LocationData, wd.GLSLSenderData, wd.GeometryData, wd.ArrayBufferData);
        }
    }
})();

