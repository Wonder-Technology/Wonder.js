module CustomControl = {
  let serializeFuncMap = funcMap =>
    funcMap |> SerializeService.serializeValueWithFunction;

  let deserializeFuncMap = funcMap =>
    funcMap |> SerializeService.deserializeValueWithFunction;
};

module Skin = {
  let serializeAllSkinDataMap = allSkinDataMap => allSkinDataMap;

  let deserializeAllSkinDataMap = allSkinDataMap => allSkinDataMap;
};