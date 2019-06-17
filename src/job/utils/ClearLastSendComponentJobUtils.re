open AllGLSLSenderType;

let execJob = (glslSenderRecord) => {
  ...glslSenderRecord,
  lastSendMaterialData: None,
  lastSendGeometryData: None
};