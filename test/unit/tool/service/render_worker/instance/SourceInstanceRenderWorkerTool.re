open StateDataRenderWorkerType;

let unsafeGetObjectInstanceTransformCollections = ({sourceInstanceRecord}) =>
  sourceInstanceRecord.objectInstanceTransformCollections |> OptionService.unsafeGet;

let unsafeGetIsTransformStatics = ({sourceInstanceRecord}) =>
  sourceInstanceRecord.isTransformStatics |> OptionService.unsafeGet;