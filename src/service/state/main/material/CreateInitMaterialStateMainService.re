open StateInitMaterialType;

open BasicMaterialType;

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
  /* let {index, disposedIndexArray, shaderIndices} = RecordBasicMaterialMainService.getRecord(state); */
  {
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
  }
};