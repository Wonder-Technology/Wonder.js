open StateDataMainType;

open LightMaterialType;

let _resetShaderIndices = (state) => {
  let {index, shaderIndices, defaultShaderIndex} as record =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        shaderIndices:
          RestoreMaterialService.resetShaderIndices(index, defaultShaderIndex, shaderIndices)
      })
  }
};

let restore = (gl, currentState, targetState) => {
  let targetState = _resetShaderIndices(targetState);
  let targetState =
    targetState
    |> InitLightMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(
           RecordLightMaterialMainService.getRecord(targetState).gameObjectMap
         ),
         gl
       );
  let currentLightMaterialRecord = RecordLightMaterialMainService.getRecord(currentState);
  let targetLightMaterialRecord = RecordLightMaterialMainService.getRecord(targetState);
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetLightMaterialRecord.buffer,
      currentLightMaterialRecord.buffer
    );
  {...targetState, lightMaterialRecord: Some({...targetLightMaterialRecord, buffer: newBuffer})}
};