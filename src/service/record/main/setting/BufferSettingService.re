open SettingType;

let unsafeGetBuffer = ({buffer}) => buffer |> OptionService.unsafeGet;

let getTransformCount = record => (record |> unsafeGetBuffer).transformCount;

let getGeometryPointCount = record =>
  (record |> unsafeGetBuffer).geometryPointCount;

let getGeometryCount = record =>
  (record |> unsafeGetBuffer).geometryCount;

let getBasicMaterialCount = record =>
  (record |> unsafeGetBuffer).basicMaterialCount;

let getLightMaterialCount = record =>
  (record |> unsafeGetBuffer).lightMaterialCount;

let getMeshRendererCount = record =>
  (record |> unsafeGetBuffer).meshRendererCount;

let getSourceInstanceCount = record =>
  (record |> unsafeGetBuffer).instanceBuffer.sourceInstanceCount;

let getObjectInstanceCountPerSourceInstance = record =>
  (record |> unsafeGetBuffer).instanceBuffer.
    objectInstanceCountPerSourceInstance;

let getTextureCountPerMaterial = record =>
  (record |> unsafeGetBuffer).textureCountPerMaterial;

let getBasicSourceTextureCount = record =>
  (record |> unsafeGetBuffer).basicSourceTextureCount;

let getArrayBufferViewSourceTextureCount = record =>
  (record |> unsafeGetBuffer).arrayBufferViewSourceTextureCount;