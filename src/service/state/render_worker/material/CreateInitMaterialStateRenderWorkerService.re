open StateInitMaterialType;

/* TODO refactor: extract:
   createInitBasicMaterialState(no light data)
   createInitLightMaterialState */
let createInitMaterialState =
    (
      (index, disposedIndexArray, shaderIndices),
      (directionLightData, pointLightData),
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      } as state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  materialRecord: {index, disposedIndexArray, shaderIndices},
  directionLightRecord: {index: directionLightData##index},
  pointLightRecord: {index: pointLightData##index},
  renderConfigRecord: RecordRenderConfigRenderWorkerService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};