open StateDataMainType;

let getIndexType = (state: StateRenderType.renderState) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  |> GeometryRenderService.getIndexType;

let getIndexTypeSize = (state: StateRenderType.renderState) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  |> GeometryRenderService.getIndexTypeSize;

/* let hasIndices = (index: int, state: StateDataMainType.state) =>
   IndicesService.hasIndices(index, state.boxGeometryRecord.indicesMap); */
let isGeometry = (geometry) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry) >= 0
};

let batchDisposeGeometryByCloseContractCheck = (gameObjectArr, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObjectTool.batchDisposeGameObject(gameObjectArr);
  TestTool.openContractCheck();
  state
};