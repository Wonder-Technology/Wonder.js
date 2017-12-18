let pregetGLSLData = (gl, state: StateDataType.state) => {
  let glslData = ShaderStateCommon.getGLSLData(state);
  glslData.precision = Some(ShaderSystem.getPrecisionSource(state));
  state
};

let initData = (state: StateDataType.state) => MaterialHelper.initData(state);

let unsafeGetShaderIndex = MaterialSystem.unsafeGetShaderIndex;

let initMaterials = (materialIndexArr, gl, state: StateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, materialIndex: int) =>
           MaterialInitComponentCommon.initMaterial(gl, materialIndex, state)
       ),
       state
     );

let _getAllAliveMaterials = (state: StateDataType.state) =>
  MaterialSystem.getMaterialData(state).gameObjectMap |> SparseMapSystem.getValidKeys;

let deepCopyState = MaterialSystem.deepCopyState;

let restore = (gl, currentState, targetState) => {
  let newState = MaterialSystem.restore(currentState, targetState);
  newState |> initMaterials(_getAllAliveMaterials(newState), gl)
};