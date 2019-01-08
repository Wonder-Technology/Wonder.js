open SubStateSendRenderDataType;

let createState =
    (
      {glslSenderRecord, sceneRecord, directionLightRecord, pointLightRecord} as state: StateRenderType.renderState,
    ) => {
  vertexAttribHistoryArray: glslSenderRecord.vertexAttribHistoryArray,
  sceneRecord,
  directionLightRecord,
  pointLightRecord,
};