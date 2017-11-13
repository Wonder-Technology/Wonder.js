let getRenderArray = (state: StateDataType.state) => MeshRendererSystem.getRenderArray(state);

let isMeshRenderer = (meshRenderer) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0
};