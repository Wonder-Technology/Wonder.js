open StateDataMainType;

open BasicMaterialType;

let _resetShaderIndices = (state) => {
  let {index, shaderIndices, defaultShaderIndex} as record =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
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
    |> InitBasicMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(
           RecordBasicMaterialMainService.getRecord(targetState).gameObjectMap
         ),
         gl
       );
  let currentBasicMaterialRecord = RecordBasicMaterialMainService.getRecord(currentState);
  let targetBasicMaterialRecord = RecordBasicMaterialMainService.getRecord(targetState);
  let newBuffer =
    CopyArrayBufferService.copyArrayBufferData(
      targetBasicMaterialRecord.buffer,
      currentBasicMaterialRecord.buffer
    );
  {...targetState, basicMaterialRecord: Some({...targetBasicMaterialRecord, buffer: newBuffer})}
};