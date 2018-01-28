let unsafeGetShaderIndex = LightMaterialSystem.unsafeGetShaderIndex;

let initMaterials = (materialIndexArr, gl, state: StateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs]
       ((state, materialIndex: int) => LightMaterialSystem.initMaterial(materialIndex, gl, state)),
       state
     );

let init = (gl, state: StateDataType.state) => LightMaterialSystem.init(gl, state);

let deepCopyStateForRestore = LightMaterialSystem.deepCopyStateForRestore;

let restore = (gl, currentState, targetState) => {
  let newState = LightMaterialSystem.restore(currentState, targetState);
  newState
  |> initMaterials(
       MaterialAdmin.getAllAliveMaterials(
         LightMaterialSystem.getMaterialData(newState).gameObjectMap
       ),
       gl
     )
};