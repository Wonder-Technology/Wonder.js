let getSettedAssetFntContent = state =>
  WonderImgui.FontIMGUIService.SetAsset.getFntContent(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetFntContent = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetFntContent(
    ManageIMGUIMainService.getRecord(state),
  );

let getSettedAssetFntName = state =>
  WonderImgui.FontIMGUIService.SetAsset.getFntName(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetFntName = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetFntName(
    ManageIMGUIMainService.getRecord(state),
  );

let hasSettedAssetFntData = (name, state) =>
  WonderImgui.AssetIMGUIAPI.hasSettedAssetFntData(
    name,
    ManageIMGUIMainService.getRecord(state),
  );

let setSettedAssetFntData = (name, content, state) =>
  WonderImgui.AssetIMGUIAPI.setSettedAssetFntData(
    name,
    content,
    ManageIMGUIMainService.getRecord(state),
  )
  |> ManageIMGUIMainService.setRecord(_, state);

let getSettedAssetBitmapArrayBuffer = state =>
  WonderImgui.FontIMGUIService.SetAsset.getBitmapArrayBuffer(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetBitmapArrayBuffer = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetBitmapArrayBuffer(
    ManageIMGUIMainService.getRecord(state),
  );

let hasSettedAssetBitmapData = (name, state) =>
  WonderImgui.AssetIMGUIAPI.hasSettedAssetBitmapData(
    name,
    ManageIMGUIMainService.getRecord(state),
  );

let getSettedAssetBitmapName = state =>
  WonderImgui.FontIMGUIService.SetAsset.getBitmapName(
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetSettedAssetBitmapName = state =>
  WonderImgui.AssetIMGUIAPI.unsafeGetSettedAssetBitmapName(
    ManageIMGUIMainService.getRecord(state),
  );

let setSettedAssetBitmapData = (name, bitmapArrayBuffer, state) =>
  WonderImgui.AssetIMGUIAPI.setSettedAssetBitmapData(
    name,
    bitmapArrayBuffer,
    ManageIMGUIMainService.getRecord(state),
  )
  |> ManageIMGUIMainService.setRecord(_, state);

let hasSettedAssetCustomImageData = (id, state) =>
  WonderImgui.AssetIMGUIAPI.hasSettedAssetCustomImageData(
    id,
    ManageIMGUIMainService.getRecord(state),
  );

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