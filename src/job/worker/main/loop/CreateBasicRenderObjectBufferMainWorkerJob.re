open StateDataMainType;

open Js.Typed_array;

let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let {gameObjectRecord, meshRendererRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      RecordRenderMainService.getRecord(state).basicRenderObjectRecord =
        CreateBasicRenderObjectBufferJobUtils.execJob(state);
      StateDataMainService.setState(stateData, state);
      None
    }
  );