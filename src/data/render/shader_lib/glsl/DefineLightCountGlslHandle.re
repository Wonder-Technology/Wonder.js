open ShaderChunkType;

let execHandle = (state: StateDataType.state) => {
  let maxCount = DirectionLightHelper.getBufferMaxCount();
  {
    top: "",
    define: {j|#define DIRECTION_LIGHTS_COUNT $maxCount|j},
    varDeclare: "",
    funcDeclare: "",
    funcDefine: "",
    body: ""
  }
};