let getRenderList = (state: StateDataType.state) => MeshRendererSystem.getRenderList(state);

let isMeshRenderer = (meshRenderer) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0
};