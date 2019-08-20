let getSettedAssetFntData = state =>
  WonderImgui.FontIMGUIService.SetAsset.getFntData(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetFntData = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetFntData(
    ManageIMGUIMainService.getRecord(state),
  );

let setSettedAssetFntData = (content, state) =>
  WonderImgui.AssetIMGUIAPI.setSettedAssetFntData(
    content,
    ManageIMGUIMainService.getRecord(state),
  )
  |> ManageIMGUIMainService.setRecord(_, state);

let getSettedAssetBitmapData = state =>
  WonderImgui.FontIMGUIService.SetAsset.getBitmapData(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetBitmapData = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetBitmapData(
    ManageIMGUIMainService.getRecord(state),
  );

let setSettedAssetBitmapData = (bitmapArrayBuffer, state) =>
  WonderImgui.AssetIMGUIAPI.setSettedAssetBitmapData(
    bitmapArrayBuffer,
    ManageIMGUIMainService.getRecord(state),
  )
  |> ManageIMGUIMainService.setRecord(_, state);

let getSettedAssetCustomImageDataArr = state =>
  WonderImgui.AssetIMGUIAPI.getSettedAssetCustomImageDataArr(
    ManageIMGUIMainService.getRecord(state),
  );

let addSettedAssetCustomImageData = (data, state) =>
  WonderImgui.AssetIMGUIAPI.addSettedAssetCustomImageData(
    data,
    ManageIMGUIMainService.getRecord(state),
  )
  |> ManageIMGUIMainService.setRecord(_, state);

let initSettedAssets = state =>
  ManageIMGUIMainService.getRecord(state)
  |> WonderImgui.AssetIMGUIAPI.initSettedAssets
  |> WonderBsMost.Most.map(imguiRecord =>
       ManageIMGUIMainService.setRecord(imguiRecord, state)
     );