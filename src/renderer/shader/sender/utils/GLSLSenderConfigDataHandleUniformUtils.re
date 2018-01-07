open Contract;

let getUniformSendData = (shaderIndex: int, map) =>
  map
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "uniform send data should exist",
             () => map |> WonderCommonlib.SparseMapSystem.get(shaderIndex) |> assertExist
           )
         )
     );