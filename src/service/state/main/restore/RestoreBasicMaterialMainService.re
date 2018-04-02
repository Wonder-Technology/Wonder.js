open MainStateDataType;

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
  let newState = _resetShaderIndices(targetState);
  newState
  |> InitBasicMaterialMainService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(
         RecordBasicMaterialMainService.getRecord(newState).gameObjectMap
       ),
       gl
     )
};