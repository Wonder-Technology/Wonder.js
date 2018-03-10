let unsafeGetShaderIndex = BasicMaterialSystem.unsafeGetShaderIndex;

let initMaterials = (materialIndexArr, gl, state: StateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs]
       ((state, materialIndex: int) => BasicMaterialSystem.initMaterial(materialIndex, gl, state)),
       state
     );

let init = (gl, state: StateDataType.state) => BasicMaterialSystem.init(gl, state);

let deepCopyForRestore = BasicMaterialSystem.deepCopyForRestore;

let restore = (gl, currentState, targetState) => {
  let newState = BasicMaterialSystem.restore(currentState, targetState);
  newState
  |> initMaterials(
       MaterialAdmin.getAllAliveMaterials(
         BasicMaterialSystem.getMaterialData(newState).gameObjectMap
       ),
       gl
     )
};