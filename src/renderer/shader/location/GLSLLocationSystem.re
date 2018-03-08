open GLSLLocationType;

open StateDataType;

let _getGLSLLocationData = (state: StateDataType.state) => state.glslLocationData;

let _getLocation = ((program, name, locationMap), getGlLocationFunc, gl) =>
  switch (locationMap |> WonderCommonlib.HashMapSystem.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = [@bs] getGlLocationFunc(program, name, gl);
    locationMap |> WonderCommonlib.HashMapSystem.set(name, pos) |> ignore;
    pos
  };

let _getGlAttribLocation = [@bs] ((program, name, gl) => Gl.getAttribLocation(program, name, gl));

let _getGlUniformLocation =
  [@bs] ((program, name, gl) => Gl.getUniformLocation(program, name, gl));

let getAttribLocation = (program, name, attributeLocationMap, gl) =>
  _getLocation((program, name, attributeLocationMap), _getGlAttribLocation, gl);

let getUniformLocation = (program, name, uniformLocationMap, gl) =>
  _getLocation((program, name, uniformLocationMap), _getGlUniformLocation, gl);

let getAttributeLocationMap = (shaderIndex: int, state: StateDataType.state) =>
  _getGLSLLocationData(state).attributeLocationMap
  |> WonderCommonlib.SparseMapSystem.get(shaderIndex);

let setAttributeLocationMap = (shaderIndex: int, attributeLocationMap, state: StateDataType.state) => {
  _getGLSLLocationData(state).attributeLocationMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, attributeLocationMap)
  |> ignore;
  state
};

let getUniformLocationMap = (shaderIndex: int, state: StateDataType.state) =>
  _getGLSLLocationData(state).uniformLocationMap
  |> WonderCommonlib.SparseMapSystem.get(shaderIndex);

let setUniformLocationMap = (shaderIndex: int, uniformLocationMap, state: StateDataType.state) => {
  _getGLSLLocationData(state).uniformLocationMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, uniformLocationMap)
  |> ignore;
  state
};

let createLocationMap = () => WonderCommonlib.HashMapSystem.createEmpty();

let deepCopyStateForRestore = (state: StateDataType.state) =>
  /* let {attributeLocationMap, uniformLocationMap} = state |> _getGLSLLocationData;
     {
       ...state,
       glslLocationData: {
         attributeLocationMap: attributeLocationMap |> SparseMapSystem.copy,
         uniformLocationMap: uniformLocationMap |> SparseMapSystem.copy
       }
     } */
  state;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {attributeLocationMap, uniformLocationMap} = _getGLSLLocationData(currentState);
  {
    ...targetState,
    glslLocationData: {
      attributeLocationMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          attributeLocationMap
        ),
      uniformLocationMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformLocationMap
        )
    }
    /* glslLocationData: GLSLLocationHelper.create() */
  }
};