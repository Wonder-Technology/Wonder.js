open StateDataRenderWorkerType;

open RenderWorkerSourceInstanceType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let sourceInstanceData = data##renderData##sourceInstance;
      state.sourceInstanceRecord = {
        ...state.sourceInstanceRecord,
        objectInstanceTransformIndexMap: Some(sourceInstanceData##objectInstanceTransformIndexMap)
      };
      e
    }
  );