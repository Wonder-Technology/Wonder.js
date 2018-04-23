open StateDataRenderWorkerType;

open RenderWorkerDirectionLightType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let directionLightData = data##directionLightData;
      let directionLightRecord = RecordDirectionLightRenderWorkerService.getRecord(state);
      state.directionLightRecord =
        Some({
          ...directionLightRecord,
          index: directionLightData##index,
          positionMap: directionLightData##positionMap
        });
      e
    }
  );