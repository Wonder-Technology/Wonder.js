open SourceInstanceType;

let getObjectInstanceTransformArray = (sourceInstance, {objectInstanceTransformArrayMap}) =>
  GetObjectInstanceArrayService.unsafeGetObjectInstanceTransformArray(
    sourceInstance,
    objectInstanceTransformArrayMap
  );

let getObjectInstanceArray = (sourceInstance, sourceInstanceRecord, transformRecord) =>
  getObjectInstanceTransformArray(sourceInstance, sourceInstanceRecord)
  |> Js.Array.map(
       (transform) => GameObjectTransformService.unsafeGetGameObject(transform, transformRecord)
     );