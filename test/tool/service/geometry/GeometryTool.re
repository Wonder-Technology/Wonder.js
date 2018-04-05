open StateDataMainType;

let buildInfo = ReallocatedPointsGeometryService.buildInfo;

let getIndexType = (state: StateDataMainType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  |> RenderGeometryService.getIndexType;

let getIndexTypeSize = (state: StateDataMainType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  |> RenderGeometryService.getIndexTypeSize;

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
  let state = state |> GameObjectAPI.batchDisposeGameObject(gameObjectArr);
  TestTool.openContractCheck();
  state
};