open Wonder_jest;

open Js.Promise;

open StateDataMainType;

let _ =
  describe("load imgui asset", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _test =
        (
          (
            customTextureSource1ContentLength,
            customTextureSource2ContentLength,
            bitmapFileContentLength,
            fntFileContentLength,
          ),
          handleWhenLoadingFunc,
          testFunc,
        ) => {
      let fntFilePath =
        Node.Path.join([|Node.Process.cwd(), "./test/res/font/myFont.fnt"|]);
      let bitmapFilePath =
        Node.Path.join([|Node.Process.cwd(), "./test/res/font/myFont.png"|]);
      let bitmap = bitmapFilePath;
      let customTextureSourceSrc1 = "./test/res/image/1.jpg";
      let customTextureSourceSrc2 = "./test/res/image/2.png";
      let customTextureSourceDataArr = [|
        (customTextureSourceSrc1, "a1"),
        (customTextureSourceSrc2, "a2"),
      |];
      let customImageArr = [|
        (customTextureSourceSrc1, "a1", WonderImgui.ImageType.Jpg),
        (customTextureSourceSrc2, "a2", WonderImgui.ImageType.Png),
      |];
      WonderImgui.IOIMGUITool.buildFakeURL(sandbox^);
      WonderImgui.IOIMGUITool.buildFakeLoadImage(.);
      WonderImgui.IOIMGUITool.setFakeCreateObjectURLReturnBlob();
      let fetch =
        WonderImgui.IOIMGUITool.buildFakeFetch(
          sandbox,
          fntFilePath,
          bitmapFilePath,
          (
            customTextureSource1ContentLength,
            customTextureSource2ContentLength,
            bitmapFileContentLength,
            fntFileContentLength,
          ),
          customTextureSourceSrc1,
          customTextureSourceSrc2,
        );

      LoadIMGUIAssetTool.loadIMGUIAsset(
        fntFilePath,
        bitmapFilePath,
        customTextureSourceDataArr,
        (fetch, handleWhenLoadingFunc),
        state^,
      )
      |> then_(state => testFunc(bitmap, state));
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("load bitmap image", () =>
      _test(
        (1, 2, 3, 4),
        (contentLength, filePath) => (),
        (bitmap, state) =>
          WonderImgui.AssetTool.unsafeGetBitmap(
            IMGUITool.getWonderIMGUIRecord(state),
          )
          |> Obj.magic
          |> expect == bitmap
          |> resolve,
      )
    );
  });