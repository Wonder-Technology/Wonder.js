let getData = (state: StateDataType.state) => MaterialStateSystem.getMaterialData(state);

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialSystem.unsafeGetShaderIndex(materialIndex, state);

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialShaderIndexSystem.hasShaderIndex(materialIndex, state);

let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataType.state) =>
  MaterialSystem.setShaderIndex(materialIndex, shaderIndex, state);

let isMaterial = (material) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(material) >= 0
};

let dispose = MaterialDisposeComponentSystem.handleDisposeComponent;

let prepareForInit = (state) =>
  state |> MaterialAdmin.pregetGLSLData([@bs] DeviceManagerSystem.getGl(state));