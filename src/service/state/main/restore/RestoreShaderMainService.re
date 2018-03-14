open MainStateDataType;

open ShaderType;

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
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let currentPrecision = currentState.glslRecord.precision;
      let targetPrecision = targetState.glslRecord.precision;
      test(
        Log.buildAssertMessage(
          ~expect={j|currentState->shaderRecord->glslRecord->precision and targetState ->shaderRecord->glslRecord->precision be the same|j},
          ~actual={j|not|j}
        ),
        () =>
          switch (currentPrecision, targetPrecision) {
          | (Some(currentPrecision), Some(targetPrecision)) => currentPrecision ==^ targetPrecision
          | (Some(_), None)
          | (None, Some(_)) => assertFail()
          | _ => assertPass()
          }
      )
    },
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let {shaderIndexMap: currentShaderIndexMap} = currentState.shaderRecord;
  let {shaderIndexMap: targetShaderIndexMap} as targetShaderData = targetState.shaderRecord;
  let (index, intersectShaderIndexMap) =
    _getIntersectShaderIndexMap(currentShaderIndexMap, targetShaderIndexMap);
  {
    ...targetState,
    shaderRecord: {...targetShaderData, index, shaderIndexMap: intersectShaderIndexMap}
  }
};