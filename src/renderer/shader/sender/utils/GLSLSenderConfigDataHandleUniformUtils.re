open Contract;

let getUniformSendData = (shaderIndex: int, map) =>
  map
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (sendData) =>
         Contract.Operators.(
           test("uniform send data should exist", () => sendData |> assertNullableExist)
         )
     );