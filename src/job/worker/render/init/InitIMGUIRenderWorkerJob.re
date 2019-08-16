open StateDataRenderWorkerType;

open WonderBsMost;

open Js.Promise;

let _getFlipY = state => false;

let execJob = (_, e, stateData) => {
  let data = MessageService.getRecord(e);
  let imguiData = data##imguiData;

  OptionService.isJsonSerializedValueNone(imguiData##fntData)
  || OptionService.isJsonSerializedValueNone(imguiData##bitmapImageData) ?
    Most.just(e) :
    {
      let state = StateRenderWorkerService.unsafeGetState(stateData);

      let extendData = imguiData##extendData;

      let customControlData = extendData##customControlData;
      let funcMap =
        customControlData##funcMap
        |> ExtendIMGUIRenderWorkerService.ExtendData.CustomControl.deserializeFuncMap;

      let skinData = extendData##skinData;
      let allSkinDataMap =
        skinData##allSkinDataMap
        |> ExtendIMGUIRenderWorkerService.ExtendData.Skin.deserializeAllSkinDataMap;

      ImageBitmapRenderWorkerService.createImageBitmapFromImageData(
        imguiData##bitmapImageData
        |> OptionService.unsafeGetJsonSerializedValue,
        _getFlipY,
        state,
      )
      |> then_(imageBitmap => {
           let state = StateRenderWorkerService.unsafeGetState(stateData);

           let imguiRecord =
             RecordIMGUIRenderWorkerService.getRecord(state)
             |> WonderImgui.AssetIMGUIAPI.setBitmap(
                  imageBitmap |> WorkerType.imageBitmapToImageElement,
                )
             |> WonderImgui.AssetIMGUIAPI.setFntData(
                  imguiData##fntData
                  |> OptionService.unsafeGetJsonSerializedValue
                  |> Js.Json.parseExn
                  |> Obj.magic,
                );

           state.imguiRecord = imguiRecord;

           state |> StateRenderWorkerService.setState(stateData) |> resolve;
         })
      |> Most.fromPromise
      |> Most.concat(
           Most.mergeArray(
             imguiData##customTextureSourceDataArr
             |> Js.Array.map(((imageData, id, imageType)) =>
                  ImageBitmapRenderWorkerService.createImageBitmapFromImageData(
                    imageData,
                    _getFlipY,
                    state,
                  )
                  |> then_(imageBitmap =>
                       (
                         imageBitmap |> WorkerType.imageBitmapToImageElement,
                         id,
                         imageType,
                       )
                       |> resolve
                     )
                  |> WonderBsMost.Most.fromPromise
                ),
           )
           |> Most.reduce(
                (customImageArr, imageData) =>
                  customImageArr |> ArrayService.push(imageData),
                [||],
              )
           |> then_(customImageArr => {
                let state =
                  StateRenderWorkerService.unsafeGetState(stateData);

                state.imguiRecord =
                  WonderImgui.AssetIMGUIAPI.setCustomImageArr(
                    customImageArr,
                    state.imguiRecord,
                  )
                  |> WonderImgui.ManageIMGUIAPI.init(
                       AllDeviceManagerService.unsafeGetGl(.
                         state.deviceManagerRecord,
                       ),
                       (imguiData##canvasWidth, imguiData##canvasHeight),
                     )
                  |> CustomControlAllIMGUIService.registerAllCustomControlsToWonderImguiIMGUIRecord(
                       funcMap,
                     )
                  |> SkinAllIMGUIService.mergeAllSkinDataMapsToWonderImguiIMGUIRecord(
                       allSkinDataMap,
                     );

                state
                |> StateRenderWorkerService.setState(stateData)
                |> resolve;
              })
           |> WonderBsMost.Most.fromPromise,
         )
      |> Most.map(_ => e);
    };
};