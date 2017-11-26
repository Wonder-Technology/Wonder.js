open MaterialStateUtils;

open Contract;

let unsafeGetShaderIndex = (materialIndexStr: string, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap
  |> WonderCommonlib.HashMapSystem.unsafeGet(materialIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "shaderIndex should exist",
             () =>
               getMaterialData(state).shaderIndexMap
               |> WonderCommonlib.HashMapSystem.get(materialIndexStr)
               |> assertExist
           )
         )
     );

let hasShaderIndex = (materialIndexStr: string, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap |> HashMapSystem.has(materialIndexStr);

let setShaderIndex = (materialIndexStr: string, shaderIndex: int, state: StateDataType.state) => {
  getMaterialData(state).shaderIndexMap
  |> WonderCommonlib.HashMapSystem.set(materialIndexStr, shaderIndex)
  |> ignore;
  state
};