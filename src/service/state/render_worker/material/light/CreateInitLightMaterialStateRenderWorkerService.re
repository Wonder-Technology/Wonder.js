open StateInitLightMaterialType;

let createInitMaterialState =
    (
      (index, disposedIndexArray, shaderIndices),
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      } as state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  let directionLightRecord = RecordDirectionLightRenderWorkerService.getRecord(state);
  let pointLightRecord = RecordPointLightRenderWorkerService.getRecord(state);
  {
    directionLightRecord: {index: directionLightRecord.index},
    pointLightRecord: {index: pointLightRecord.index},
    materialRecord: {index, disposedIndexArray, shaderIndices},
    renderConfigRecord: RecordRenderConfigRenderWorkerService.getRecord(state),
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord
  }
};