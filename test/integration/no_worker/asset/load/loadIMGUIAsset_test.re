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
        IOIMGUITool.buildFakeURL(sandbox^);
        IOIMGUITool.buildFakeLoadImage(.);
        let fetch =
          IOIMGUITool.buildFakeFetch(sandbox, fntFilePath, bitmapFilePath);

        LoadIMGUIAssetTool.loadIMGUIAsset(
          fntFilePath,
          bitmapFilePath,
          fetch,
          state^,
        )
        |> then_(state => testFunc(bitmap, state));
      };

      testPromise("test load bitmap image", () =>
        _test((bitmap, state) =>
          AssetTool.unsafeGetBitmap(state.imguiRecord)
          |> Obj.magic
          |> expect == bitmap
          |> resolve
        )
      );
    });
  });