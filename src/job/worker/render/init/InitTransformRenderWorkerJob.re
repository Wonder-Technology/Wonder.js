open StateDataRenderWorkerType;

open RenderWorkerTransformType;

let _createTypeArrays = (buffer, count, state) => {
  let (localToWorldMatrices, localPositions) =
    CreateTypeArrayTransformService.createTypeArrays(buffer, count);
  state.transformRecord =
    Some({
      localToWorldMatrices,
      localPositions,
      localToWorldMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let transformData = data##transformData;
      let buffer = transformData##buffer;
      let count = data##bufferData##transformDataBufferCount;
      state |> _createTypeArrays(buffer, count) |> StateRenderWorkerService.setState(stateData);
      e
    }
  );