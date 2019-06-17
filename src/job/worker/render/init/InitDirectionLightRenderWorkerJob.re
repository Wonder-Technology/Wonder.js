open StateDataRenderWorkerType;

open RenderWorkerDirectionLightType;

let _createRecordWithCreatedTypeArrays = (buffer, count, index, state) => {
  let (colors, intensities) =
    CreateTypeArrayAllDirectionLightService.createTypeArrays(buffer, count);
  state.directionLightRecord =
    Some({
      index,
      directionMap: None,
      renderLightArr: None,
      colors,
      intensities,
    });
  state;
};

let _getData = (directionLightData, state) => {
  state.directionLightRecord =
    Some({
      ...RecordDirectionLightRenderWorkerService.getRecord(state),
      renderLightArr: Some(directionLightData##renderLightArr),
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let {settingRecord} as state =
      StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let directionLightData = data##directionLightData;
    let buffer = directionLightData##buffer;
    let count =
      BufferRenderWorkerSettingService.unsafeGetPointLightCount(
        settingRecord,
      );
    state
    |> _createRecordWithCreatedTypeArrays(
         buffer,
         count,
         directionLightData##index,
       )
    |> _getData(directionLightData)
    |> StateRenderWorkerService.setState(stateData);
    e;
  });