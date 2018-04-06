open ShaderChunkType;

let execHandle = ((directionLightRecord, pointLightRecord)) => {
  let directionLightCount = CountInitMaterialDirectionLightService.getLightCount(directionLightRecord);
  let pointLightCount = CountInitMaterialPointLightService.getLightCount(pointLightRecord);
  {
    top: "",
    define: {j|#define DIRECTION_LIGHTS_COUNT $directionLightCount
#define POINT_LIGHTS_COUNT $pointLightCount|j},
    varDeclare: "",
    funcDeclare: "",
    funcDefine: "",
    body: ""
  }
};