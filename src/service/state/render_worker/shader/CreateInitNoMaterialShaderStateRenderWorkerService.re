open StateInitNoMaterialShaderType;

let createInitNoMaterialShaderState =
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
  renderConfigRecord: RecordRenderConfigRenderWorkerService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord,
};