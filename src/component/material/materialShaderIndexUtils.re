open MaterialStateUtils;

open Contract;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap
  |> SparseMapSystem.unsafeGet(materialIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "shaderIndex should exist",
             () =>
               getMaterialData(state).shaderIndexMap
               |> SparseMapSystem.get(materialIndex)
               |> assertExist
           )
         )
     );

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  getMaterialData(state).shaderIndexMap |> SparseMapSystem.has(materialIndex);

let setShaderIndex = (materialIndex: int, shaderIndex: int, state: StateDataType.state) => {
  getMaterialData(state).shaderIndexMap
  |> SparseMapSystem.set(materialIndex, shaderIndex)
  |> ignore;
  state
};