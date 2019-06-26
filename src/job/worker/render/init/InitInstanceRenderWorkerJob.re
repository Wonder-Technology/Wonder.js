open StateDataRenderWorkerType;

open RenderWorkerSourceInstanceType;

let _createTypeArrays = (buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance, state) => {
  let (objectInstanceTransformCollections, isTransformStatics) =
    CreateTypeArrayAllSourceInstanceService.createTypeArrays(
      buffer,
      sourceInstanceCount,
      objectInstanceCountPerSourceInstance
    );
  state.sourceInstanceRecord = {
    ...state.sourceInstanceRecord,
    objectInstanceTransformCollections: Some(objectInstanceTransformCollections),
    isTransformStatics: Some(isTransformStatics)
  };
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let {settingRecord} as state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let sourceInstanceData = data##sourceInstanceData;
      let state =
        state
        |> _createTypeArrays(
             sourceInstanceData##buffer,
             BufferRenderWorkerSettingService.getSourceInstanceCount(settingRecord),
             BufferRenderWorkerSettingService.getObjectInstanceCountPerSourceInstance(
               settingRecord
             )
           );
      state.sourceInstanceRecord = {
        ...state.sourceInstanceRecord,
        objectInstanceTransformIndexMap: Some(sourceInstanceData##objectInstanceTransformIndexMap)
      };
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );