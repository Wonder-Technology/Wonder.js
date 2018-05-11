open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let execJob = (flags, e, stateData) =>
  Most.empty()
  |> Most.concatMap(
       (e) => {
         let state = StateRenderWorkerService.unsafeGetState(stateData);
         let data = MessageService.getRecord(e);
         let initData = data##initData;
         let textureData = initData##textureData;
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
         let initData = data##initData;
         let textureData = initData##textureData;
         let {glTextureMap} as textureRecord = RecordTextureRenderWorkerService.getRecord(state);
         state.textureRecord =
           Some({
             ...textureRecord,
             glTextureMap:
               InitTextureService.initTexturesWithIndexArray(
                 [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                 textureData##needInitedTextureIndexArr,
                 glTextureMap
               )
           });
         state |> StateRenderWorkerService.setState(stateData) |> ignore;
         e
       }
     );