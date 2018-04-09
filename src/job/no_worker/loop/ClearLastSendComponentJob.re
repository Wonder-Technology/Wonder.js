open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  glslSenderRecord: {...state.glslSenderRecord, lastSendMaterial: None, lastSendGeometry: None}
};