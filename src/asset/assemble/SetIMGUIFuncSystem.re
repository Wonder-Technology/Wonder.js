open WDType;

let _setExtendData =
    ({customControlData, skinData}: SceneGraphType.extendData, state) =>
  state
  |> ExtendIMGUIMainService.ExtendData.CustomControl.setFuncMap(
       customControlData.funcMap
       |> Obj.magic
       |> Js.Json.stringify
       |> SerializeAllIMGUIService.CustomControl.deserializeFuncMap,
     )
  |> ExtendIMGUIMainService.ExtendData.Skin.setAllSkinDataMap(
       skinData.allSkinDataMap
       |> SerializeAllIMGUIService.Skin.deserializeAllSkinDataMap,
     );

let _isCustomDataEmpty = customData => customData |> Obj.magic === "";

let setIMGUIFunc = ({scene}, state) => {
  let {imguiFunc, customData, extendData}: SceneGraphType.imgui =
    OptionService.unsafeGetJsonSerializedValue(scene.imgui);

  state
  |> ManageIMGUIMainService.setIMGUIFunc(
       _isCustomDataEmpty(customData) ?
         Js.Nullable.null |> Obj.magic :
         customData |> SerializeService.deserializeValueWithFunction,
       imguiFunc |> SerializeService.deserializeFunction,
     )
  |> _setExtendData(extendData);
};