open StateInitBasicMaterialType;

open BasicMaterialType;

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
      } as state: StateDataMainType.state
    ) => {
  materialRecord: {index, disposedIndexArray, shaderIndices},
  renderConfigRecord: RecordRenderConfigMainService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
};