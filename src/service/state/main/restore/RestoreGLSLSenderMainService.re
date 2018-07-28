open StateDataMainType;

let restore = (currentState, targetState) => {
  ...targetState,
  glslSenderRecord: {
    ...targetState.glslSenderRecord,
    vertexAttribHistoryArray: WonderCommonlib.ArrayService.createEmpty(),
    lastSendMaterialData: None,
    lastSendGeometryData: None,
  },
};