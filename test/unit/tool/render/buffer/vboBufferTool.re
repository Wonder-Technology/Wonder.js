let getOrCreateArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    GeometryIndexUtils.getMappedIndex(geometryIndex, GeometryIndexUtils.getMappedIndexMap(state)),
    VboBufferStateUtils.getVboBufferData(state).vertexBufferMap,
    [@bs] ArrayBufferSystem.createBuffer,
    [@bs] GeometrySystem.getVertices,
    state
  );

let getOrCreateElementArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    GeometryIndexUtils.getMappedIndex(geometryIndex, GeometryIndexUtils.getMappedIndexMap(state)),
    VboBufferStateUtils.getVboBufferData(state).elementArrayBufferMap,
    [@bs] ElementArrayBufferSystem.createBuffer,
    [@bs] GeometrySystem.getIndices,
    state
  );

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: StateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  SparseMapSystem.set(geometryIndex, Obj.magic(0), vertexBufferMap);
  SparseMapSystem.set(geometryIndex, Obj.magic(0), elementArrayBufferMap);
  state
};

let getData = VboBufferStateUtils.getVboBufferData;