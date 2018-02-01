open StateDataType;

let getJob = (_, _, state) => {
  ...state,
  glslSenderData: {...state.glslSenderData, lastSendMaterial: None, lastSendGeometry: None}
};