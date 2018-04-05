open SettingType;

let unsafeGetBuffer = ({buffer}) => buffer |> OptionService.unsafeGet;

let getTransformDataBufferCount = (record) => (record |> unsafeGetBuffer).transformDataBufferCount;

let getBoxGeometryPointDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).boxGeometryPointDataBufferCount;

let getCustomGeometryPointDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).customGeometryPointDataBufferCount;

let getBasicMaterialDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).basicMaterialDataBufferCount;

let getLightMaterialDataBufferCount = (record) =>
  (record |> unsafeGetBuffer).basicMaterialDataBufferCount;