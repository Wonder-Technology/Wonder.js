open RenderWorkerStateDataType;

open InitMaterialStateType;

/* let createInitMaterialState =
       (
         (
           index,
           disposedIndexArray,
           shaderIndices,
           directionLightIndex,
           pointLightIndex,
           renderConfigRecord,
           shaderRecord,
           programRecord,
           glslRecord,
           glslSenderRecord,
           glslLocationRecord,
           glslChunkRecord
         )
         state
       ) => {
     materialRecord: {index, disposedIndexArray, shaderIndices},
     directionLightIndex,
     pointLightIndex,
     renderConfigRecord,
     shaderRecord,
     programRecord,
     glslRecord,
     glslSenderRecord,
     glslLocationRecord,
     glslChunkRecord
   }; */
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
      } as state
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