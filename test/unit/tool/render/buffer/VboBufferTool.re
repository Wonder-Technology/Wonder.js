let getOrCreateArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    VboBufferGetStateDataUtils.getVboBufferData(state).vertexBufferMap,
    [@bs] ArrayBufferSystem.createBuffer,
    [@bs] GeometryAdmin.unsafeGetVertices,
    state
  );

let getOrCreateElementArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    VboBufferGetStateDataUtils.getVboBufferData(state).elementArrayBufferMap,
    [@bs] ElementArrayBufferSystem.createBuffer,
    [@bs] GeometryAdmin.unsafeGetIndices,
    state
  );

let getOrCreateInstanceBuffer = (sourceInstanceIndex: int, state: StateDataType.state) =>
  InstanceBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    sourceInstanceIndex,
    (
      SourceInstanceAdmin.getSourceInstanceData(state).modelMatrixInstanceBufferCapacityMap,
      VboBufferGetStateDataUtils.getVboBufferData(state).modelMatrixInstanceBufferMap
    ),
    state
  );

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: StateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, elementArrayBufferMap} =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), vertexBufferMap);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), elementArrayBufferMap);
  state
};

let passBufferShouldExistCheckWhenDisposeSourceInstance =
    (sourceInstanceIndex, state: StateDataType.state) => {
  open VboBufferType;
  let {modelMatrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  WonderCommonlib.SparseMapSystem.set(
    sourceInstanceIndex,
    Obj.magic(0),
    modelMatrixInstanceBufferMap
  );
  state
};

let getVboBufferData = VboBufferGetStateDataUtils.getVboBufferData;