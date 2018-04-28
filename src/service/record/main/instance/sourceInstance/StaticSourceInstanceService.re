/* TODO remove */
/* open InstanceType;

open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStatics} as record) => {
  ...record,
  isTransformStatics:
    isTransformStatics |> WonderCommonlib.SparseMapService.set(sourceInstance, isStatic)
}; */
/* 
let isTransformStatic = (sourceInstance: sourceInstance, isTransformStatics) =>
  isTransformStatics
  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
  |> WonderLog.Contract.ensureCheck(
       (isStatic) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|isStatic exist|j}, ~actual={j|not|j}),
                 () => isStatic |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */