open StateDataType;

let restore = (gl, currentState, targetState) => {
  let newState = {
    ...targetState,
    basicMaterialRecord: {...targetState.basicMaterialRecord, shaderIndexMap: [||]}
  };
  newState
  |> InitBasicMaterialMainService.initMaterials(
       AliveMaterialService.getAllAliveMaterials(newState.basicMaterialRecord.gameObjectMap),
       gl
     )
};