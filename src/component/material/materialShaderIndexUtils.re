open MaterialStateUtils;

open Contract;

let getShaderIndex = (materialIndexStr: string, state: StateDataType.state) =>
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

let setShaderIndex = (materialIndex: int, shaderIndex: int, state: StateDataType.state) => {
  getMaterialData(state).shaderIndexMap
  |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(materialIndex), shaderIndex)
  |> ignore;
  state
};