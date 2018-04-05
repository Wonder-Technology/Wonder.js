open StateInitMaterialType;

let createInitMaterialState =
    (
      (index, disposedIndexArray, shaderIndices),
      {
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      } as state: StateDataMainType.state
    ) => {
  materialRecord: {index, disposedIndexArray, shaderIndices},
  directionLightRecord: {index: directionLightRecord.index},
  pointLightRecord: {index: pointLightRecord.index},
  renderConfigRecord: RecordRenderConfigMainService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};