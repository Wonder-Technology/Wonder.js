let getShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.getShaderIndex(Js.Int.toString(materialIndex), state);

let isMaterial = (material) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect(material) >= 0
};