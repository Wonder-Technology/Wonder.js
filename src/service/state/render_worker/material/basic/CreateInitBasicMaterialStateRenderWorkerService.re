open StateInitBasicMaterialType;

open RenderWorkerBasicMaterialType;

let createInitMaterialState =
    (
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state: StateDataRenderWorkerType.renderWorkerState,
    ) => {
  let {index, disposedIndexArray} =
    RecordBasicMaterialRenderWorkerService.getRecord(state);
  {
    materialRecord: {
      index,
      disposedIndexArray,
      shaderIndices:
        RecordBasicMaterialRenderWorkerService.unsafeGetShaderIndices(state),
    },
    renderConfigRecord:
      RecordRenderConfigRenderWorkerService.getRecord(state),
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord,
  };
};