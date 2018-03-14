open MainStateDataType;

let restore = (gl, currentState, targetState) => {
  let newState = {
    ...targetState,
    lightMaterialRecord: {...targetState.lightMaterialRecord, shaderIndexMap: [||]}
  };
  newState
  |> InitLightMaterialMainService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(newState.lightMaterialRecord.gameObjectMap),
       gl
     )
};