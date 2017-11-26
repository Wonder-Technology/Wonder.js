let getData = (state: StateDataType.state) => MaterialStateUtils.getMaterialData(state);

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.unsafeGetShaderIndex(Js.Int.toString(materialIndex), state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  MaterialSystem.setShaderIndex(Js.Int.toString(materialIndex), shaderIndex, state);

let isMaterial = (material) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material) >= 0
};

let dispose = MaterialDisposeComponentUtils.handleDisposeComponent;