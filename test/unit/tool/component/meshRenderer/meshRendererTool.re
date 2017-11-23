let getRenderArray = (state: StateDataType.state) => MeshRendererSystem.getRenderArray(state);

let isMeshRenderer = (meshRenderer) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0
};

let createGameObject = (state) => {
  open MeshRenderer;
  open GameObject;
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, meshRenderer)
};