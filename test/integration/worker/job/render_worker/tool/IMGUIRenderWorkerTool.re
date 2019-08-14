let getBitmap = imguiRecord =>
  WonderImgui.AssetIMGUIService.getBitmap(imguiRecord);

let setBitmap = (bitmap, state) =>
  StateDataMainType.{
    ...state,
    imguiRecord: {
      ...state.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.AssetIMGUIService.setBitmap(
          bitmap,
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  };

let getFntData = imguiRecord =>
  WonderImgui.AssetIMGUIService.getFntData(imguiRecord);

let setFntData = (fntData, state) =>
  StateDataMainType.{
    ...state,
    imguiRecord: {
      ...state.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.AssetIMGUIService.setFntData(
          fntData,
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  };

let getSetting = imguiRecord =>
  WonderImgui.ManageIMGUIAPI.getSetting(imguiRecord);

let buildCustomImageData =
    (~source, ~id, ~imageType=WonderImgui.ImageType.Png, ()) => (
  source,
  id,
  imageType,
);

let getCustomImageArr = imguiRecord =>
  WonderImgui.AssetIMGUIAPI.getCustomImageArr(imguiRecord);

let setCustomImageArr = (customImageArr, state) =>
  StateDataMainType.{
    ...state,
    imguiRecord: {
      ...state.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.AssetIMGUIAPI.setCustomImageArr(
          customImageArr,
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  };

let prepareState = sandbox => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let imageDataArrayBuffer3 = Obj.magic(13);
  let imageDataArrayBuffer4 = Obj.magic(14);

  let (state, context) =
    InitBasicSourceTextureRenderWorkerTool.prepareState(
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
      ),
    );

  let state = AssetIMGUITool.prepareFontAsset(state);

  (
    state,
    (
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
      ),
      context,
    ),
  );
};

let prepareSetData = sandbox => {
  open StateDataRenderWorkerType;
  open WonderImgui.IMGUIType;

  let (state, (imageDataArrayBufferTuple, context)) = prepareState(sandbox);
  let fntData = Obj.magic(2);
  let state = setFntData(fntData, state);
  let bitmap = Obj.magic({"width": 100, "height": 200});
  let state = setBitmap(bitmap, state);

  let (state, setting) =
    IMGUITool.setTextColorSetting([|0., 1., 0.|], state);

  let id1 = "a1";
  let imageType1 = WonderImgui.ImageType.Png;
  let source1 = Obj.magic({"width": 100, "height": 200});
  let id2 = "a2";
  let imageType2 = WonderImgui.ImageType.Jpg;
  let source2 = Obj.magic({"width": 300, "height": 400});
  let customImageArr = [|
    buildCustomImageData(~source=source1, ~id=id1, ~imageType=imageType1, ()),
    buildCustomImageData(~source=source2, ~id=id2, ~imageType=imageType2, ()),
  |];
  let state = setCustomImageArr(customImageArr, state);

  (
    state,
    (fntData, bitmap, setting, customImageArr),
    (imageDataArrayBufferTuple, context),
  );
};
/* 
let getControlData = state =>
  RecordIMGUIRenderWorkerService.getRecord(state)
  |> WonderImgui.RecordIMGUIService.getControlData; */
