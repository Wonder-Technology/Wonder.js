open SettingType;

let unsafeGetBuffer = ({buffer}) => buffer |> OptionService.unsafeGet;

let getTransformDataBufferCount = (record) => (record |> unsafeGetBuffer).transformDataBufferCount