open RenderWorkerSettingType;

let unsafeGetInstanceBuffer = ({instanceBuffer}) => instanceBuffer |> OptionService.unsafeGet;

let getSourceInstanceCount = (record) => (record |> unsafeGetInstanceBuffer).sourceInstanceCount;

let getObjectInstanceCountPerSourceInstance = (record) =>
  (record |> unsafeGetInstanceBuffer).objectInstanceCountPerSourceInstance;