open StateDataRenderWorkerType;

open RenderWorkerMeshRendererType;

let _createTypeArrays = (buffer, meshRendererCount, state) => {
  let (drawModes, isRenders) =
    CreateTypeArrayAllMeshRendererService.createTypeArrays(
      buffer,
      meshRendererCount,
    );

  state.meshRendererRecord = Some({drawModes, isRenders});

  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let meshRendererData = data##meshRendererData;
    let buffer = meshRendererData##buffer;
    let meshRendererCount = data##bufferData##meshRendererCount;
    state
    |> _createTypeArrays(buffer, meshRendererCount)
    |> StateRenderWorkerService.setState(stateData);
    e;
  });