open MainStateDataType;

let getRecord = (state) => state.vboBufferRecord;

let getOrCreateBoxGeometryVertexArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryVertexBufferMap),
    ([@bs] ArrayBufferMainService.createBuffer, [@bs] VerticesBoxGeometryMainService.getVertices),
    state
  );

let getOrCreateBoxGeometryNormalArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryNormalBufferMap),
    ([@bs] ArrayBufferMainService.createBuffer, [@bs] NormalsBoxGeometryMainService.getNormals),
    state
  );

let getOrCreateBoxGeometryElementArrayBuffer = (geometryIndex: int, state: MainStateDataType.state) =>
  GetVboBufferMainService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryElementArrayBufferMap),
    (
      [@bs] ElementArrayBufferMainService.createBuffer,
      [@bs] IndicesBoxGeometryMainService.getIndices
    ),
    state
  );

let getOrCreateInstanceBuffer =
    (sourceInstanceIndex: int, defaultCapacity, state: MainStateDataType.state) =>
  InstanceBufferMainService.getOrCreateBuffer(
    (
      [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
      sourceInstanceIndex,
      defaultCapacity
    ),
    (
      state.sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      state.vboBufferRecord.matrixInstanceBufferMap
    ),
    state
  );

let passBufferShouldExistCheckWhenDisposeBoxGeometry =
    (geometryIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap} =
    state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), boxGeometryVertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(1), boxGeometryNormalBufferMap);
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    boxGeometryElementArrayBufferMap
  );
  state
};

let passBufferShouldExistCheckWhenDisposeCustomGeometry =
    (geometryIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {
    customGeometryVertexBufferMap,
    customGeometryNormalBufferMap,
    customGeometryElementArrayBufferMap
  } =
    state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), customGeometryVertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(1), customGeometryNormalBufferMap);
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    customGeometryElementArrayBufferMap
  );
  state
};

let passBufferShouldExistCheckWhenDisposeSourceInstance =
    (sourceInstanceIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(sourceInstanceIndex, Obj.magic(0), matrixInstanceBufferMap);
  state
};

let getVboBufferRecord = (state) => state.vboBufferRecord;

let prepareCreatedBuffer = (sandbox, state) => {
  open Sinon;
  let arrayBuffer1 = Obj.magic(20);
  let arrayBuffer2 = Obj.magic(21);
  let arrayBuffer3 = Obj.magic(22);
  let arrayBuffer4 = Obj.magic(23);
  let elementArrayBuffer1 = Obj.magic(12);
  let elementArrayBuffer2 = Obj.magic(13);
  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
  createBuffer |> onCall(0) |> returns(arrayBuffer1);
  createBuffer |> onCall(1) |> returns(arrayBuffer2);
  createBuffer |> onCall(2) |> returns(elementArrayBuffer1);
  createBuffer |> onCall(3) |> returns(arrayBuffer3);
  createBuffer |> onCall(4) |> returns(arrayBuffer4);
  createBuffer |> onCall(5) |> returns(elementArrayBuffer2);
  let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
  (
    state,
    (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
    (elementArrayBuffer1, elementArrayBuffer2),
    createBuffer
  )
};

let getOrCreateAllBoxGeometryBuffers = (geometry, state) => (
  getOrCreateBoxGeometryVertexArrayBuffer(geometry, state),
  getOrCreateBoxGeometryNormalArrayBuffer(geometry, state),
  getOrCreateBoxGeometryElementArrayBuffer(geometry, state)
);