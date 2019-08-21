let buildExtendData =
    (
      ~funcMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
      ~allSkinDataMap=WonderCommonlib.ImmutableHashMapService.createEmpty(),
      (),
    )
    : SceneGraphType.extendData => {
  customControlData: {
    funcMap:
      funcMap |> SerializeAllIMGUIService.CustomControl.serializeFuncMap,
  },
  skinData: {
    allSkinDataMap:
      allSkinDataMap |> SerializeAllIMGUIService.Skin.serializeAllSkinDataMap,
  },
};

/* let buildCustomImageData =
       (~id="", ~bufferView=1, ~mimeType="image/png", ())
       : SceneGraphType.customImageData => {
     id,
     bufferView,
     mimeType,
   }; */

let getSettedAssetCustomImageDataArrForTest = state =>
  SetAssetIMGUIMainService.getSettedAssetCustomImageDataArr(state)
  |> Js.Array.map(((arrayBuffer, id, mimeType)) =>
       (arrayBuffer |> Js.Typed_array.ArrayBuffer.byteLength, id, mimeType)
     );

let buildFakeFntContent = () => {|info face="Lato-Regular" size=64 bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=2 padding=0,0,0,0 spacing=0,0
common lineHeight=77 base=63 scaleW=512 scaleH=512 pages=1 packed=0 alphaChnl=0 redChnl=0 greenChnl=0 blueChnl=0
page id=0 file="lato.png"
chars count=0|};

let buildAssetData =
    (
      ~fntContent=buildFakeFntContent(),
      ~bitmapBufferView=0,
      ~customImages=[||],
      (),
    )
    : SceneGraphType.assetData => {
  fontData:
    Some({
      fntData: {
        content: fntContent,
      },
      bitmapData: {
        bufferView: bitmapBufferView,
      },
    }),
  customImagesData: Some({customImages: customImages}),
};

let buildEmptyAssetData = (): SceneGraphType.assetData => {
  fontData: None,
  customImagesData: None,
};

let buildExecFuncDataArr =
    (
      ~name="exec",
      ~customData=Obj.magic(-1),
      ~zIndex=0,
      ~func=ExecIMGUITool.buildEmptyExecFunc(),
      (),
    )
    : SceneGraphType.execFuncDataArr =>
  [|
    ({name, execFunc: func, zIndex, customData}: ExecIMGUIType.execFuncData),
  |]
  |> SerializeAllIMGUIService.Exec.serializeWonderExecFuncDataArr;

let buildExecDataToOneExecFuncData =
    (
      ~name="exec",
      ~customData=Obj.magic(-1),
      ~zIndex=0,
      ~func=ExecIMGUITool.buildEmptyExecFunc(),
      (),
    )
    : SceneGraphType.execData => {
  execFuncDataArr:
    buildExecFuncDataArr(~name, ~customData, ~zIndex, ~func, ()),
};