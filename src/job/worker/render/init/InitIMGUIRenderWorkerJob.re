open StateDataRenderWorkerType;

open WonderBsMost;

open Js.Promise;

let execJob = (_, e, stateData) => {
  let data = MessageService.getRecord(e);
  let imguiData = data##imguiData;

  OptionService.isJsonSerializedValueNone(imguiData##fntData)
  || OptionService.isJsonSerializedValueNone(imguiData##bitmapImageData) ?
    Most.just(e) :
    {
      let state = StateRenderWorkerService.unsafeGetState(stateData);

      ImageBitmapRenderWorkerService.createImageBitmap(
        imguiData##bitmapImageData
        |> OptionService.unsafeGetJsonSerializedValue,
        state => false,
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
                )
             |> WonderImgui.ManageIMGUIAPI.init(
                  DeviceManagerService.unsafeGetGl(.
                    state.deviceManagerRecord,
                  ),
                );

           state.imguiRecord = imguiRecord;
           state |> StateRenderWorkerService.setState(stateData);

           e |> resolve;
         })
      |> Most.fromPromise;
    };
};