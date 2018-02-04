open ShaderChunkType;

let execHandle = (state: StateDataType.state) => {
  let directionLightCount = DirectionLightAdmin.getLightCount(state);
  let pointLightCount = PointLightAdmin.getLightCount(state);
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