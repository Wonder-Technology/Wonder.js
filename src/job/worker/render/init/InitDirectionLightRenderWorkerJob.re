open StateDataRenderWorkerType;

open RenderWorkerDirectionLightType;

let _createTypeArrays = (buffer, count, index, state) => {
  let (colors, intensities) = CreateTypeArrayDirectionLightService.createTypeArrays(buffer, count);
  state.directionLightRecord = Some({index, positionMap: None, colors, intensities});
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let directionLightData = data##directionLightData;
      let buffer = directionLightData##buffer;
      let count = BufferDirectionLightService.getBufferMaxCount();
      state
      |> _createTypeArrays(buffer, count, directionLightData##index)
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );