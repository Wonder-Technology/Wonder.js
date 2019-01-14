open StateInitNoMaterialShaderType;

let createInitNoMaterialShaderState =
    /* (index, disposedIndexArray), */
    (
      {
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord,
      } as state: StateDataMainType.state,
    ) =>
  /* state: StateDataMainType.state */
  {
    renderConfigRecord: RecordRenderConfigMainService.getRecord(state),
    /* let {shaderIndices, diffuseMapUnits, specularMapUnits} =
         RecordLightMaterialMainService.getRecord(state);

       let directionLightRecord = RecordDirectionLightMainService.getRecord(state);
       let pointLightRecord = RecordPointLightMainService.getRecord(state); */
    shaderRecord,
    programRecord,
    glslRecord,
    glslSenderRecord,
    glslLocationRecord,
    glslChunkRecord,
  };