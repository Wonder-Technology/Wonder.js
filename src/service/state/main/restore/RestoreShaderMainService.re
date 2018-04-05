open StateDataMainType;

open ShaderType;

let _getIntersectShaderIndexMap = (currentShaderIndexMap, targetShaderIndexMap) => {
  let intersectShaderIndexDataArr =
    targetShaderIndexMap
    |> HashMapService.entries
    |> Js.Array.filter(((key, _)) => WonderCommonlib.HashMapService.has(key, currentShaderIndexMap));
  (
    intersectShaderIndexDataArr |> Js.Array.length,
    intersectShaderIndexDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (shaderMap, (key, shaderIndex)) =>
             shaderMap |> WonderCommonlib.HashMapService.set(key, shaderIndex)
         ),
         WonderCommonlib.HashMapService.createEmpty()
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
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