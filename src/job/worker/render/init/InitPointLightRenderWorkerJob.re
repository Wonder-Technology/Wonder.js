open StateDataRenderWorkerType;

open RenderWorkerPointLightType;

let _createRecordWithCreatedTypeArrays = (buffer, count, index, state) => {
  let (colors, intensities, constants, linears, quadratics, ranges) =
    CreateTypeArrayPointLightService.createTypeArrays(buffer, count);
  state.pointLightRecord =
    Some({
      index,
      positionMap: None,
      renderLightArr: None,
      colors,
      intensities,
      constants,
      linears,
      quadratics,
      ranges,
    });
  state;
};

let _getData = (pointLightData, state) => {
  state.pointLightRecord =
    Some({
      ...RecordPointLightRenderWorkerService.getRecord(state),
      renderLightArr: Some(pointLightData##renderLightArr),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let pointLightData = data##pointLightData;
    let buffer = pointLightData##buffer;
    let count = BufferPointLightService.getBufferMaxCount();
    state
    |> _createRecordWithCreatedTypeArrays(
         buffer,
         count,
         pointLightData##index,
       )
    |> _getData(pointLightData)
    |> StateRenderWorkerService.setState(stateData);
    e;
  });