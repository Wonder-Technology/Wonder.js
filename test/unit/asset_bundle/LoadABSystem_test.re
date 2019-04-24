open Wonder_jest;

let _ =
  describe("LoadABSystem", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("isAssetBundleArrayBufferCached", () =>
      test("return false", () =>
        LoadABSystem.isAssetBundleArrayBufferCached("", "") |> expect == false
      )
    );

    describe("getAssetBundleArrayBufferCache", () =>
      test("fatal", () =>
        expect(() =>
          LoadABSystem.getAssetBundleArrayBufferCache("")
        )
        |> toThrow
      )
    );

    describe("cacheAssetBundleArrayBuffer", () =>
      test("do nothing", () => {
        let ab = Obj.magic(-1);

        LoadABSystem.cacheAssetBundleArrayBuffer("", ab, "") |> expect == ();
      })
    );
  });