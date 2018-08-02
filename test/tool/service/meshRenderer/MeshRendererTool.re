open StateDataMainType;

let getBasicMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getBasicMaterialRenderArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let getLightMaterialRenderArray = (state: StateDataMainType.state) =>
  RenderArrayMeshRendererService.getLightMaterialRenderArray(
    RecordMeshRendererMainService.getRecord(state),
  );

let isMeshRenderer = meshRenderer => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(meshRenderer) >= 0;
};

let createBasicMaterialGameObject = state => {
  open MeshRendererAPI;
  open GameObjectAPI;
  open BasicMaterialAPI;
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let (state, material) = createBasicMaterial(state);
  let state =
    state |> addGameObjectBasicMaterialComponent(gameObject, material);
  let state =
    state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, meshRenderer);
};

let createLightMaterialGameObject = state => {
  open MeshRendererAPI;
  open GameObjectAPI;
  open LightMaterialAPI;
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let (state, material) = createLightMaterial(state);
  let state =
    state |> addGameObjectLightMaterialComponent(gameObject, material);
  let state =
    state |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, meshRenderer);
};

let getRecord = state => RecordMeshRendererMainService.getRecord(state);

let getLines = () => DrawModeType.Lines |> DrawModeType.drawModeToUint8;

let getPoints = () => DrawModeType.Points |> DrawModeType.drawModeToUint8;

let getTriangles = () =>
  DrawModeType.Triangles |> DrawModeType.drawModeToUint8;

let getDefaultDrawMode = () =>
  BufferMeshRendererService.getDefaultDrawMode()
  |> DrawModeType.drawModeToUint8;