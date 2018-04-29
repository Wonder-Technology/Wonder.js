open StateDataRenderWorkerType;

open RenderWorkerAmbientLightType;

let _createTypeArrays = (buffer, count, index, state) => {
  let colors = CreateTypeArrayAmbientLightService.createTypeArrays(buffer, count);
  state.ambientLightRecord = Some({index, colors});
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let ambientLightData = data##ambientLightData;
      let buffer = ambientLightData##buffer;
      let count = BufferAmbientLightService.getBufferMaxCount();
      state
      |> _createTypeArrays(buffer, count, ambientLightData##index)
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );