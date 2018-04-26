open StateDataMainType;

/* open VboBufferType; */
let getRecord = (state) => state.vboBufferRecord;

let getOrCreateBoxGeometryVertexArrayBuffer = (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryVertexBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetBoxGeometryVerticesRenderService.getVertices
    ),
    state
  )
};

let getOrCreateBoxGeometryNormalArrayBuffer = (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryNormalBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetBoxGeometryNormalsRenderService.getNormals
    ),
    state
  )
};

let getOrCreateBoxGeometryElementArrayBuffer = (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.boxGeometryElementArrayBufferMap),
    (
      [@bs] ElementArrayBufferRenderService.createBuffer,
      [@bs] GetBoxGeometryIndicesRenderService.getIndices
    ),
    state
  )
};

let getOrCreateInstanceBuffer =
    (sourceInstanceIndex: int, defaultCapacity, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  InstanceBufferRenderService.getOrCreateBuffer(
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
  )
};

let addVboBufferToBoxGeometryBufferMapByRecord =
    (
      geometryIndex,
      {boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap} as vboBufferRecord: VboBufferType.vboBufferRecord
    ) => {
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), boxGeometryVertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(1), boxGeometryNormalBufferMap);
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    boxGeometryElementArrayBufferMap
  );
  vboBufferRecord
};

let addVboBufferToCustomGeometryBufferMapByRecord =
    (
      geometryIndex,
      {
        customGeometryVertexBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap
      } as vboBufferRecord: VboBufferType.vboBufferRecord
    ) => {
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), customGeometryVertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(1), customGeometryNormalBufferMap);
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    customGeometryElementArrayBufferMap
  );
  vboBufferRecord
};

let addVboBufferToSourceInstanceBufferMapByRecord =
    (
      sourceInstanceIndex,
      {matrixInstanceBufferMap} as vboBufferRecord: VboBufferType.vboBufferRecord
    ) => {
  open VboBufferType;
  WonderCommonlib.SparseMapService.set(sourceInstanceIndex, Obj.magic(0), matrixInstanceBufferMap);
  vboBufferRecord
};

let addVboBufferToBoxGeometryBufferMap = (geometryIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord: addVboBufferToBoxGeometryBufferMapByRecord(geometryIndex, state.vboBufferRecord)
};

let addVboBufferToCustomGeometryBufferMap = (geometryIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord:
    addVboBufferToCustomGeometryBufferMapByRecord(geometryIndex, state.vboBufferRecord)
};

let addVboBufferToSourceInstanceBufferMap = (sourceInstanceIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord:
    addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state.vboBufferRecord)
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