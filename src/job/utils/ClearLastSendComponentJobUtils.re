open StateRenderType;

let execJob = (glslSenderRecord) => {
  ...glslSenderRecord,
  lastSendMaterialData: None,
  /* lastSendGeometryData: None */
};