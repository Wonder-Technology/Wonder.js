open StateDataRenderWorkerType;

open RenderWorkerTextureType;

open Js.Promise;

let execJob = (flags, e, stateData) => {
  let state = StateRenderWorkerService.unsafeGetState(stateData);
  let data = MessageService.getRecord(e);
  let initData = data##initData;
  let textureData = initData##textureData;
  [|
    SourceMapTextureRenderWorkerService.addSourceFromImageDataStream(
      textureData##needAddedImageDataArray,
      state
    ),
    MostUtils.callFunc(
      () => {
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
        state
      }
    )
  |]
  |> MostUtils.concatArray
  |> Most.forEach((state) => state |> StateRenderWorkerService.setState(stateData) |> ignore)
  |> then_(() => e |> resolve)
  |> Most.fromPromise
};