let getRenderArray = (state: StateDataType.state) => MeshRendererSystem.getRenderArray(state);

let isMeshRenderer = (meshRenderer) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0
};