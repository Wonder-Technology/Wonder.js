open StateInitBasicMaterialType;

open BasicMaterialType;

let createInitMaterialState =
    (
      (index, disposedIndexArray),
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state: StateDataMainType.state,
    ) => {
  let {shaderIndices} = RecordBasicMaterialMainService.getRecord(state);
  {
    materialRecord: {
      index,
      disposedIndexArray,
      shaderIndices,
    },
    renderConfigRecord: RecordRenderConfigMainService.getRecord(state),
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord,
  };
};