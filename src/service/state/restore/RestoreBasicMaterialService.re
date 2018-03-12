open StateDataType;

let restore = (gl, currentState, targetState) => {
  let newState = {
    ...targetState,
    basicMaterialRecord: {...targetState.basicMaterialRecord, shaderIndexMap: [||]}
  };
  newState
  |> InitBasicMaterialService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(newState.basicMaterialRecord.gameObjectMap),
       gl
     )
};