open StateDataType;

let getRenderArray = (state: StateDataType.state) =>
  RenderArrayMeshRendererService.getRenderArray(state.meshRendererRecord);

let isMeshRenderer = (meshRenderer) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0
};

let createGameObject = (state) => {
  open MeshRendererAPI;
  open GameObjectAPI;
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, meshRenderer)
};

let getMeshRendererRecord = (state) => state.meshRendererRecord;
let getMeshRendererRecord = (state) => state.meshRendererRecord;