open Wonder_jest;

open Js.Promise;

open StateDataMainType;

open WonderImgui;

let _ =
  describe("load imgui asset", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("load imgui asset", () => {
      let _test = testFunc => {
        let fntFilePath =
          Node.Path.join([|
            Node.Process.cwd(),
            "./test/res/font/myFont.fnt",
          |]);
        let bitmapFilePath =
          Node.Path.join([|
            Node.Process.cwd(),
            "./test/res/font/myFont.png",
          |]);
        let bitmap = bitmapFilePath;
        let customTextureSourceSrc1 = "./test/res/image/1.jpg";
        let customTextureSourceSrc2 = "./test/res/image/2.png";
        let customTextureSourceDataArr = [|
          (customTextureSourceSrc1, "a1"),
          (customTextureSourceSrc2, "a2"),
        |];
        IOIMGUITool.buildFakeURL(sandbox^);
        IOIMGUITool.buildFakeLoadImage(.);
        let fetch =
          IOIMGUITool.buildFakeFetch(
            sandbox,
            fntFilePath,
            bitmapFilePath,
            customTextureSourceSrc1,
            customTextureSourceSrc2,
          );

        LoadIMGUIAssetTool.loadIMGUIAsset(
          fntFilePath,
          bitmapFilePath,
          customTextureSourceDataArr,
          fetch,
          state^,
        )
        |> then_(state => testFunc(bitmap, state));
      };

      testPromise("test load bitmap image", () =>
        _test((bitmap, state) =>
          AssetTool.unsafeGetBitmap(IMGUITool.getWonderIMGUIRecord(state))
          |> Obj.magic
          |> expect == bitmap
          |> resolve
        )
      );
    });
  });