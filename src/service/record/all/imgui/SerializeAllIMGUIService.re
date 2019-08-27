module Exec = {
  let _isCustomDataEmpty = customData => customData |> Obj.magic === "";

  let _deserializeCustomData = customData =>
    _isCustomDataEmpty(customData) ?
      Js.Nullable.null |> Obj.magic :
      customData|>  SerializeService.deserializeValueWithFunction |> Obj.magic;

  let serializeWonderIMGUIExecFuncDataArr =
      (execFuncDataArr: WonderImgui.IMGUIType.execFuncDataArr)
      : SceneGraphType.execFuncDataArr =>
    execFuncDataArr
    |> Js.Array.map(
         (
           {execFunc, customData, zIndex, name}: WonderImgui.IMGUIType.execFuncData,
         ) =>
         (
           {
             execFunc: execFunc |> SerializeService.serializeFunction,
             customData: customData |> Obj.magic |> SerializeService.serializeValueWithFunction,
             zIndex,
             name,
           }: SceneGraphType.execFuncData
         )
       );

  let deserializeExecFuncDataArrToWonderIMGUIType =
      (execFuncDataArr: SceneGraphType.execFuncDataArr)
      : WonderImgui.IMGUIType.execFuncDataArr =>
    execFuncDataArr
    |> Js.Array.map(
         ({execFunc, customData, zIndex, name}: SceneGraphType.execFuncData) =>
         (
           {
             execFunc: execFunc |> SerializeService.deserializeFunction,
             customData: customData |> _deserializeCustomData,
             zIndex,
             name,
           }: WonderImgui.IMGUIType.execFuncData
         )
       );

  let serializeWonderExecFuncDataArr =
      (execFuncDataArr: ExecIMGUIType.execFuncDataArr)
      : SceneGraphType.execFuncDataArr =>
    execFuncDataArr
    |> Js.Array.map(
         ({execFunc, customData, zIndex, name}: ExecIMGUIType.execFuncData) =>
         (
           {
             execFunc: execFunc |> SerializeService.serializeFunction,
             customData: customData |> Obj.magic |> SerializeService.serializeValueWithFunction,
             zIndex,
             name,
           }: SceneGraphType.execFuncData
         )
       );

  let deserializeExecFuncDataArrToWonderType =
      (execFuncDataArr: SceneGraphType.execFuncDataArr)
      : ExecIMGUIType.execFuncDataArr =>
    execFuncDataArr
    |> Js.Array.map(
         ({execFunc, customData, zIndex, name}: SceneGraphType.execFuncData) =>
         (
           {
             execFunc: execFunc |> SerializeService.deserializeFunction,
             customData: customData |> _deserializeCustomData,
             zIndex,
             name,
           }: ExecIMGUIType.execFuncData
         )
       );
};

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