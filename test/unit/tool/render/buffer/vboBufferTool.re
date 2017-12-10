let getOrCreateArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    GeometryAdmin.getMappedIndex(geometryIndex, GeometryAdmin.getMappedIndexMap(state)),
    VboBufferStateUtils.getVboBufferData(state).vertexBufferMap,
    [@bs] ArrayBufferSystem.createBuffer,
    [@bs] GeometryAdmin.getVertices,
    state
  );

let getOrCreateElementArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    GeometryAdmin.getMappedIndex(geometryIndex, GeometryAdmin.getMappedIndexMap(state)),
    VboBufferStateUtils.getVboBufferData(state).elementArrayBufferMap,
    [@bs] ElementArrayBufferSystem.createBuffer,
    [@bs] GeometryAdmin.getIndices,
    state
  );

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: StateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), vertexBufferMap);
  WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), elementArrayBufferMap);
  state
};

let getVboBufferData = VboBufferStateUtils.getVboBufferData;