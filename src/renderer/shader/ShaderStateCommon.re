open ShaderType;

open Contract;

let getShaderData = (state: StateDataType.state) => state.shaderData;

let getGLSLData = (state: StateDataType.state) => getShaderData(state).glslData;

let deepCopyState = (state: StateDataType.state) =>
  /* let {index, shaderIndexMap} = state |> getShaderData;
     let {precision} = state |> getGLSLData;
     {...state, shaderData: {index, shaderIndexMap, glslData: {precision: precision}}} */
  state;

let getIntersectShaderIndexDataArray = (currentState, targetState) => {
  let {shaderIndexMap: currentShaderIndexMap} = getShaderData(currentState);
  let {shaderIndexMap: targetShaderIndexMap} = getShaderData(targetState);
  targetShaderIndexMap
  |> HashMapSystem.entries
  |> Js.Array.filter(
       ((key, _)) => currentShaderIndexMap |> WonderCommonlib.HashMapSystem.has(key)
     )
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (dataArr, (key, shaderIndex)) => {
           dataArr
           |> Js.Array.push((
                currentShaderIndexMap |> WonderCommonlib.HashMapSystem.unsafeGet(key),
                shaderIndex
              ))
           |> ignore;
           dataArr
         }
       ),
       [||]
     )
};

let _getIntersectShaderIndexMap = (currentShaderIndexMap, targetShaderIndexMap) =>
  targetShaderIndexMap
  |> HashMapSystem.entries
  |> Js.Array.filter(((key, _)) => WonderCommonlib.HashMapSystem.has(key, currentShaderIndexMap))
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (shaderMap, (key, shaderIndex)) =>
           shaderMap |> WonderCommonlib.HashMapSystem.set(key, shaderIndex)
       ),
       WonderCommonlib.HashMapSystem.createEmpty()
     );

let restoreFromState = (currentState, targetState) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "currentState and targetState ->shaderData->glslData->precision should be the same",
          () =>
            switch (getGLSLData(currentState).precision, getGLSLData(targetState).precision) {
            | (Some(currentPrecision), Some(targetPrecision)) =>
              currentPrecision ==^ targetPrecision
            | (Some(_), None)
            | (None, Some(_)) => assertFail()
            | _ => assertPass()
            }
        )
      )
  );
  let {shaderIndexMap: currentShaderIndexMap} = getShaderData(currentState);
  let {shaderIndexMap: targetShaderIndexMap} as targetShaderData = getShaderData(targetState);
  {
    ...targetState,
    shaderData: {
      ...targetShaderData,
      shaderIndexMap: _getIntersectShaderIndexMap(currentShaderIndexMap, targetShaderIndexMap)
    }
  }
};