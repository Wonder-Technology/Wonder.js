let unsafeGetShaderIndex = (materialIndex: int, shaderIndexMap) =>
  shaderIndexMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(materialIndex)
  |> WonderLog.Contract.ensureCheck(
       (shaderIndex) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|shaderIndex exist|j}, ~actual={j|not|j}),
                 () => shaderIndex |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let hasShaderIndex = (materialIndex: int, shaderIndexMap) =>
  shaderIndexMap |> WonderCommonlib.SparseMapSystem.has(materialIndex);

let setShaderIndex = (materialIndex: int, shaderIndex: int, shaderIndexMap) =>
  shaderIndexMap |> WonderCommonlib.SparseMapSystem.set(materialIndex, shaderIndex);