module CustomControl = {
  let serializeFuncMap = (funcMap: ExtendIMGUIType.funcMap): string =>
    funcMap |> SerializeService.serializeValueWithFunction;

  let deserializeFuncMap = (funcMap: string): ExtendIMGUIType.funcMap =>
    funcMap |> SerializeService.deserializeValueWithFunction;
};

module Skin = {
  let serializeAllSkinDataMap =
      (allSkinDataMap: WonderImgui.SkinType.allSkinDataMap): string =>
    allSkinDataMap |> Obj.magic |> Js.Json.stringify;

  let deserializeAllSkinDataMap =
      (allSkinDataMap: string): WonderImgui.SkinType.allSkinDataMap =>
    allSkinDataMap |> Js.Json.parseExn |> Obj.magic;
};