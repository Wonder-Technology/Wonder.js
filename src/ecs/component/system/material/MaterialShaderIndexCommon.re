open MaterialStateCommon;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap
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

let getShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap |> WonderCommonlib.SparseMapSystem.get(materialIndex);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap |> WonderCommonlib.SparseMapSystem.has(materialIndex);

let setShaderIndex = (materialIndex: int, shaderIndex: int, state: StateDataType.state) => {
  getMaterialData(state).shaderIndexMap
  |> WonderCommonlib.SparseMapSystem.set(materialIndex, shaderIndex)
  |> ignore;
  state
};