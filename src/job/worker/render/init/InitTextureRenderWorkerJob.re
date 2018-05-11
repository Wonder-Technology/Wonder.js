open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let _createTypeArrays = (buffer, count, state) => {
  let (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates) =
    CreateTypeArrayTextureService.createTypeArrays(buffer, count);
  state.textureRecord =
    Some({
      wrapSs: Some(wrapSs),
      wrapTs: Some(wrapTs),
      magFilters: Some(magFilters),
      minFilters: Some(minFilters),
      isNeedUpdates: Some(isNeedUpdates),
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let textureData = data##textureData;
      let count = data##bufferData##textureDataBufferCount;
      state
      |> _createTypeArrays(textureData##buffer, count)
      |> StateRenderWorkerService.setState(stateData)
      |> ignore;
      e
    }
  )
  |> Most.concatMap(
       (e) => {
         let state = StateRenderWorkerService.unsafeGetState(stateData);
         let data = MessageService.getRecord(e);
         let textureData = data##textureData;
         SourceMapTextureRenderWorkerService.addSourceMapFromImageDataStream(
           textureData##needAddedImageDataArr,
           state
         )
         |> Most.map(
              (state) => {
                state |> StateRenderWorkerService.setState(stateData) |> ignore;
                e
              }
            )
       }
     )
  |> Most.concatMap(
       (e) => {
         let state = StateRenderWorkerService.unsafeGetState(stateData);
         let data = MessageService.getRecord(e);
         let textureData = data##textureData;
         let {glTextureMap} as textureRecord = RecordTextureRenderWorkerService.getRecord(state);
         state.textureRecord =
           Some({
             ...textureRecord,
             glTextureMap:
               InitTextureService.initTextures(
                 [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                 textureData##index,
                 glTextureMap
               )
           });
         state |> StateRenderWorkerService.setState(stateData) |> ignore;
         e
       }
     );