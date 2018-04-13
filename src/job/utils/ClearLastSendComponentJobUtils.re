open StateRenderType;

let execJob = (glslSenderRecord) => {
  ...glslSenderRecord,
  lastSendMaterial: None,
  lastSendGeometry: None
};