open GLSLLocationType;

open StateDataType;

let _getGLSLLocationData = (state: StateDataType.state) => state.glslLocationData;

let getAttribLocation = (program, name, attributeLocationMap, gl) =>
  switch (attributeLocationMap |> WonderCommonlib.HashMapSystem.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = Gl.getAttribLocation(program, name, gl);
    attributeLocationMap |> WonderCommonlib.HashMapSystem.set(name, pos) |> ignore;
    pos
  };

let getUniformLocation = (program, name, uniformLocationMap, gl) =>
  switch (uniformLocationMap |> WonderCommonlib.HashMapSystem.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = Gl.getUniformLocation(program, name, gl);
    uniformLocationMap |> WonderCommonlib.HashMapSystem.set(name, pos) |> ignore;
    pos
  };

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

let deepCopyState = (state: StateDataType.state) => {
  let {attributeLocationMap, uniformLocationMap} = state |> _getGLSLLocationData;
  {
    ...state,
    glslLocationData: {
      attributeLocationMap: attributeLocationMap |> SparseMapSystem.copy,
      uniformLocationMap: uniformLocationMap |> SparseMapSystem.copy
    }
  }
};

let restoreFromState = (intersectShaderIndexDataArray, currentState, targetState) => {
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
  }
};