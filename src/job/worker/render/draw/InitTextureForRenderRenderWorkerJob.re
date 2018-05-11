open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let execJob = (flags, e, stateData) =>
  {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let initData = data##initData;
    let textureData = initData##textureData;
    SourceMapTextureRenderWorkerService.addSourceMapFromImageDataStream(
      textureData##needAddedImageDataArray,
      state
    )
    |> Most.map(
         (state) => {
           state |> StateRenderWorkerService.setState(stateData) |> ignore;
           e
         }
       )
  }
  /* Most.empty()
     |> Most.concat(
          () => {
            let state = StateRenderWorkerService.unsafeGetState(stateData);
            let data = MessageService.getRecord(e);
            let initData = data##initData;
            let textureData = initData##textureData;
            SourceMapTextureRenderWorkerService.addSourceMapFromImageDataStream(
              textureData##needAddedImageDataArray,
              state
            )
            |> Most.map(
                 (state) => {
                   state |> StateRenderWorkerService.setState(stateData) |> ignore;
                   e
                 }
               )
          }
        ) */
  |> Most.concatMap(
       (e) => {
         let state = StateRenderWorkerService.unsafeGetState(stateData);
         let data = MessageService.getRecord(e);
         let initData = data##initData;
         let textureData = initData##textureData;
         let {glTextureMap} as textureRecord = RecordTextureRenderWorkerService.getRecord(state);
         state.textureRecord =
           Some({
             ...textureRecord,
             glTextureMap:
               InitTextureService.initTexturesWithIndexArray(
                 [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                 textureData##needInitedTextureIndexArray,
                 glTextureMap
               )
           });
         state |> StateRenderWorkerService.setState(stateData) |> ignore;
         Most.just(e)
       }
     );