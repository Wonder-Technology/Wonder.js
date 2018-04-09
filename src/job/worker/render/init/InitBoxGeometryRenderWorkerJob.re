open StateDataRenderWorkerType;

open RenderWorkerBoxGeometryType;

let _createTypeArrays = (buffer, count, state) => {
  let (vertices, normals, indices) =
    CreateTypeArrayBoxGeometryService.createTypeArrays(buffer, count);
  state.boxGeometryRecord = Some({vertices, normals, indices});
  state
};

let _initBoxGeometrys = (boxGeometryData, state) => {
  InitBoxGeometryInitBoxGeometryService.init(
    CreateInitBoxGeometryStateRenderWorkerService.createInitBoxGeometryState(
      (
        boxGeometryData##index,
        boxGeometryData##disposedIndexArray,
        boxGeometryData##configDataMap,
        boxGeometryData##isInitMap
      ),
      state
    )
  )
  |> ignore;
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let boxGeometryData = data##boxGeometryData;
      let buffer = boxGeometryData##buffer;
      let count = data##bufferData##boxGeometryPointDataBufferCount;
      state |> _createTypeArrays(buffer, count) |> _initBoxGeometrys(boxGeometryData) |> ignore;
      e
    }
  );