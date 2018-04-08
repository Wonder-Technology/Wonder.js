open StateDataRenderWorkerType;

open StateInitBoxGeometryType;

open RenderWorkerBoxGeometryType;

let createInitBoxGeometryState =
    (
      (index, disposedIndexArray, configDataMap, isInitMap),
      state: StateDataRenderWorkerType.renderWorkerState
    ) => {
  let {vertices, normals, indices} = RecordBoxGeometryRenderWorkerService.getRecord(state);
  {
    boxGeometryRecord: {
      index,
      vertices,
      normals,
      indices,
      configDataMap,
      isInitMap,
      disposedIndexArray
    }
  }
};