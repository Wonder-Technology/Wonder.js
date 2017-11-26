let getData = (state: StateDataType.state) => MaterialStateUtils.getMaterialData(state);

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.unsafeGetShaderIndex((materialIndex), state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  MaterialSystem.setShaderIndex((materialIndex), shaderIndex, state);

let isMaterial = (material) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material) >= 0
};

let dispose = MaterialDisposeComponentUtils.handleDisposeComponent;