open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);

    let state =
      data##needDisposedBasicSourceTextureIndexArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. state, texture) =>
             DisposeTextureRenderWorkerService.disposeGlTextureMap(
               texture,
               state,
             ),
           state,
         );

    StateRenderWorkerService.setState(stateData, state);
    e;
  });