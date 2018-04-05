open StateDataMainType;

let execJob = (_, _, state) => {
  ...state,
  glslSenderRecord: {...state.glslSenderRecord, lastSendMaterial: None, lastSendGeometry: None}
};