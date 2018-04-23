open StateDataRenderWorkerType;

open RenderWorkerPointLightType;

let _createTypeArrays = (buffer, count, index, state) => {
  let (colors, intensities, constants, linears, quadratics, ranges) =
    CreateTypeArrayPointLightService.createTypeArrays(buffer, count);
  state.pointLightRecord =
    Some({index, colors, intensities, constants, linears, quadratics, ranges});
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let pointLightData = data##pointLightData;
      let buffer = pointLightData##buffer;
      let count = BufferPointLightService.getBufferMaxCount();
      state |> _createTypeArrays(buffer, count, pointLightData##index) |> ignore;
      e
    }
  );