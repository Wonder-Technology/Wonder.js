open StateInitBasicMaterialType;

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
  materialRecord: {index, disposedIndexArray, shaderIndices},
  renderConfigRecord: RecordRenderConfigRenderWorkerService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};