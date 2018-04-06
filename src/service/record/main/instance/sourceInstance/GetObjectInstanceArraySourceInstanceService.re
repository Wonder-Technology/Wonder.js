open SourceInstanceType;

let getObjectInstanceArray = (sourceInstance, {objectInstanceArrayMap}) =>
  GetObjectInstanceArrayService.unsafeGetObjectInstanceArray(
    sourceInstance,
    objectInstanceArrayMap
  );