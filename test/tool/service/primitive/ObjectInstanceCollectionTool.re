open SourceInstanceType;

let addObjectInstanceTransform =
    (sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, state) => {
  let {objectInstanceTransformIndexMap, objectInstanceTransformCollections} =
    SourceInstanceTool.getRecord(state);
  ObjectInstanceCollectionService.addObjectInstanceTransform(
    sourceInstance,
    objectInstanceTransform,
    objectInstanceCountPerSourceInstance,
    (objectInstanceTransformIndexMap, objectInstanceTransformCollections)
  )
};