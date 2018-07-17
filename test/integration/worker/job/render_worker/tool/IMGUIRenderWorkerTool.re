let getBitmap = imguiRecord =>
  WonderImgui.AssetIMGUIService.getBitmap(imguiRecord);

let setBitmap = (bitmap, state) =>
  StateDataMainType.{
    ...state,
    imguiRecord:
      WonderImgui.AssetIMGUIService.setBitmap(bitmap, state.imguiRecord),
  };

let getFntData = imguiRecord =>
  WonderImgui.AssetIMGUIService.getFntData(imguiRecord);

let setFntData = (fntData, state) =>
  StateDataMainType.{
    ...state,
    imguiRecord:
      WonderImgui.AssetIMGUIService.setFntData(fntData, state.imguiRecord),
  };

let getSetting = imguiRecord =>
  WonderImgui.ManageIMGUIAPI.getSetting(imguiRecord);

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

  let state = {
    ...state,
    imguiRecord: state.imguiRecord |> WonderImgui.AssetTool.prepareFontAsset,
  };

  (state, (imageDataArrayBuffer1, context));
};

let prepareSetData = sandbox => {
  open StateDataRenderWorkerType;
  open WonderImgui.IMGUIType;

  let (state, (imageDataArrayBuffer1, context)) = prepareState(sandbox);
  let fntData = Obj.magic(2);
  let state = setFntData(fntData, state);
  let bitmap = Obj.magic({"width": 100, "height": 200});
  let state = setBitmap(bitmap, state);
  let setting = {textColorArr: [|0., 1., 0.|]};
  let state = ManageIMGUIAPI.setSetting(setting, state);

  (state, (fntData, bitmap, setting), (imageDataArrayBuffer1, context));
};