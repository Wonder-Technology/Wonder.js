open MaterialStateCommon;

open Contract;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(materialIndex)
  |> ensureCheck(
       (shaderIndex) =>
         Contract.Operators.(
           test("shaderIndex should exist", () => shaderIndex |> assertNullableExist)
         )
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