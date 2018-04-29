open StateDataRenderWorkerType;

open RenderWorkerPointLightType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let pointLightData = data##pointLightData;
      let pointLightRecord = RecordPointLightRenderWorkerService.getRecord(state);
      state.pointLightRecord =
        Some({
          ...pointLightRecord,
          index: pointLightData##index,
          positionMap: Some(pointLightData##positionMap)
        });
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );