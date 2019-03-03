open GLSLSenderType;

let execJob = (glslSenderRecord) => {
  ...glslSenderRecord,
  lastSendMaterialData: None,
  lastSendGeometryData: None
};