let getData = (state: StateDataType.state) => MaterialStateUtils.getMaterialData(state);

let getShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.getShaderIndex(Js.Int.toString(materialIndex), state);

let isMaterial = (material) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material) >= 0
};