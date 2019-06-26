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
             |> WonderImgui.ManageIMGUIAPI.setSetting(
                  imguiData##setting |> Js.Json.parseExn |> Obj.magic,
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