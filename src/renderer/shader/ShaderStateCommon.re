open ShaderType;

open Contract;

let getShaderData = (state: StateDataType.state) => state.shaderData;

let getGLSLData = (state: StateDataType.state) => getShaderData(state).glslData;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  let {index, shaderIndexMap} = state |> getShaderData;
  let {precision} = state |> getGLSLData;
  {
    ...state,
    shaderData: {
      index,
      /* shaderIndexMap: shaderIndexMap |> HashMapSystem.copy, */
      shaderIndexMap,
      glslData: {precision: precision}
    }
  }
};


 let getIntersectShaderIndexDataArray = (currentState, targetState) => {
   let {shaderIndexMap: currentShaderIndexMap} = getShaderData(currentState);
   let {shaderIndexMap: targetShaderIndexMap} = getShaderData(targetState);
   targetShaderIndexMap
   |> HashMapSystem.entries
   |> Js.Array.filter(
        ((key, _)) => currentShaderIndexMap |> WonderCommonlib.HashMapSystem.has(key)
      )
   |> WonderCommonlib.ArraySystem.reduceOneParam(
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

 let _getIntersectShaderIndexMap = (currentShaderIndexMap, targetShaderIndexMap) => {
   let intersectShaderIndexDataArr =
     targetShaderIndexMap
     |> HashMapSystem.entries
     |> Js.Array.filter(((key, _)) => WonderCommonlib.HashMapSystem.has(key, currentShaderIndexMap));
   (
     intersectShaderIndexDataArr |> Js.Array.length,
     intersectShaderIndexDataArr
     |> WonderCommonlib.ArraySystem.reduceOneParam(
          [@bs]
          (
            (shaderMap, (key, shaderIndex)) =>
              shaderMap |> WonderCommonlib.HashMapSystem.set(key, shaderIndex)
          ),
          WonderCommonlib.HashMapSystem.createEmpty()
        )
   )
 };
let restore = (currentState, targetState) => {
  /* TODO optimize: collect currentState-> no used shader/program to pool */
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
  /* ////TODO ensure check: shaderIndexMap should has 0-index-1 key, no undefined! */
  let (index, intersectShaderIndexMap) =
     _getIntersectShaderIndexMap(currentShaderIndexMap, targetShaderIndexMap);
  /* let targetShaderData = getShaderData(targetState); */
  {
    ...targetState,
    shaderData: {...targetShaderData, index, shaderIndexMap: intersectShaderIndexMap}
    /* shaderData: {
      ...targetShaderData,
      index: 0,
      shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty()
    } */
  }
};