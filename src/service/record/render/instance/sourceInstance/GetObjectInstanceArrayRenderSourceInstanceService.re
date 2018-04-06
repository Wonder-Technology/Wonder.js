open RenderSourceInstanceType;

let getObjectInstanceArray = (sourceInstance, {objectInstanceArrayMap}) =>
  GetObjectInstanceArrayService.unsafeGetObjectInstanceArray(
    sourceInstance,
    objectInstanceArrayMap
  );