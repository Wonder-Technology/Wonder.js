open StateDataRenderWorkerType;

open RenderWorkerSourceInstanceType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let {sourceInstanceRecord} as state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let instanceData = data##renderData##instance;
      state.sourceInstanceRecord = {
        ...sourceInstanceRecord,
        objectInstanceTransformArrayMap: Some(instanceData##objectInstanceTransformArrayMap),
        isTransformStaticMap: Some(instanceData##isTransformStaticMap)
      };
      e
    }
  );