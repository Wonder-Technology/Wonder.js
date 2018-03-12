open StateDataType;

let restore = (gl, currentState, targetState) => {
  let newState = {
    ...targetState,
    lightMaterialRecord: {...targetState.lightMaterialRecord, shaderIndexMap: [||]}
  };
  newState
  |> InitLightMaterialService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(newState.lightMaterialRecord.gameObjectMap),
       gl
     )
};