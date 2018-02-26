open StateDataType;

let execJob = (_, _, state) => {
  ...state,
  glslSenderData: {...state.glslSenderData, lastSendMaterial: None, lastSendGeometry: None}
};