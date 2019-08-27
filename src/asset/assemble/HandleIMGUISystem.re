open WDType;

open WonderBsMost;

let _setExtendData =
    ({customControlData, skinData}: SceneGraphType.extendData, state) =>
  state
  |> ExtendIMGUIMainService.ExtendData.CustomControl.setFuncMap(
       customControlData.funcMap
       |> SerializeAllIMGUIService.CustomControl.deserializeFuncMap,
     )
  |> ExtendIMGUIMainService.ExtendData.Skin.setAllSkinDataMap(
       skinData.allSkinDataMap
       |> SerializeAllIMGUIService.Skin.deserializeAllSkinDataMap,
     );

let _setFontData = (fontData, {bufferViews}: wd, binBuffer, state) =>
  OptionService.isJsonSerializedValueNone(fontData) ?
    state :
    {
      let {fntData, bitmapData}: SceneGraphType.fontData =
        OptionService.unsafeGetJsonSerializedValue(fontData);

      state
      |> SetAssetIMGUIMainService.setSettedAssetFntData(
           fntData.name,
           fntData.content,
         )
      |> SetAssetIMGUIMainService.setSettedAssetBitmapData(
           bitmapData.name,
           AssembleCommon.getArrayBuffer(
             binBuffer,
             bitmapData.bufferView,
             bufferViews,
           ),
         );
    };

let _setCustomImagesData =
    (customImagesData, {bufferViews}: wd, binBuffer, state) =>
  OptionService.isJsonSerializedValueNone(customImagesData) ?
    state :
    {
      let {customImages}: SceneGraphType.customImagesData =
        OptionService.unsafeGetJsonSerializedValue(customImagesData);

      customImages
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             state,
             {id, bufferView, mimeType}: SceneGraphType.customImageData,
           ) =>
             state
             |> SetAssetIMGUIMainService.addSettedAssetCustomImageData((
                  AssembleCommon.getArrayBuffer(
                    binBuffer,
                    bufferView,
                    bufferViews,
                  ),
                  id,
                  mimeType,
                )),
           state,
         );
    };

let _setAndInitAssetData =
    (
      {fontData, customImagesData}: SceneGraphType.assetData,
      wd,
      binBuffer,
      state,
    ) =>
  state
  |> _setFontData(fontData, wd, binBuffer)
  |> _setCustomImagesData(customImagesData, wd, binBuffer)
  |> SetAssetIMGUIMainService.initSettedAssets;

let _addAllExecFuncData = (execFuncDataArr, state) =>
  execFuncDataArr
  |> SerializeAllIMGUIService.Exec.deserializeExecFuncDataArrToWonderType
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         state,
         {execFunc, customData, zIndex, name}: ExecIMGUIType.execFuncData,
       ) =>
         ExecIMGUIMainService.addExecFuncData(
           name,
           customData,
           zIndex,
           execFunc,
           state,
         ),
       state,
     );

let _setExecData = ({execFuncDataArr}: SceneGraphType.execData, state) =>
  state
  |> ExecIMGUIMainService.clearExecFuncDataArr
  |> _addAllExecFuncData(execFuncDataArr);

let _handle = ({scene} as wd, binBuffer, state) => {
  let {assetData, execData, extendData}: SceneGraphType.imgui =
    OptionService.unsafeGetJsonSerializedValue(scene.imgui);

  state
  |> _setExecData(execData)
  |> _setExtendData(extendData)
  |> _setAndInitAssetData(assetData, wd, binBuffer);
};

let getHasIMGUIData = ({scene} as wd) =>
  !OptionService.isJsonSerializedValueNone(scene.imgui);

let handleIMGUI = (isHandleIMGUI, {scene} as wd, binBuffer, state) => {
  let hasIMGUIData = getHasIMGUIData(wd);

  (
    isHandleIMGUI && hasIMGUIData ?
      state |> _handle(wd, binBuffer) : Most.just(state)
  )
  |> Most.map(state =>
       StateDataMainService.setState(StateDataMain.stateData, state) |> ignore
     );
};