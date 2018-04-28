open StateRenderType;

open RenderSourceInstanceType;

let build = (sourceInstance, state) => {
  let {objectInstanceTransformCollections, objectInstanceTransformIndexMap} =
    state.sourceInstanceRecord;
  let objectInstanceTransformIndex =
    ObjectInstanceCollectionService.getObjectInstanceTransformIndex(
      sourceInstance,
      objectInstanceTransformIndexMap
    );
  (
    objectInstanceTransformIndex,
    (
      sourceInstance,
      OperateRenderSettingService.unsafeGetObjectInstanceCountPerSourceInstance(
        state.settingRecord
      ),
      objectInstanceTransformIndex,
      objectInstanceTransformCollections
    )
  )
};