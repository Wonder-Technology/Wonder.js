open ShaderChunkType;

let execHandle = (state: StateDataType.state) => {
  let count = DirectionLightAdmin.getLightCount(state);
  {
    top: "",
    define: {j|#define DIRECTION_LIGHTS_COUNT $count|j},
    varDeclare: "",
    funcDeclare: "",
    funcDefine: "",
    body: ""
  }
};