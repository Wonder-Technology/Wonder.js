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
  let newState = _resetShaderIndices(targetState);
  newState
  |> InitLightMaterialMainService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(
         RecordLightMaterialMainService.getRecord(newState).gameObjectMap
       ),
       gl
     )
};