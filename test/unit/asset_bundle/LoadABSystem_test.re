open Wonder_jest;

open Js.Promise;

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
      testPromise("return false", () =>
        LoadABSystem.isAssetBundleArrayBufferCached(. "", "")
        |> then_(result => result |> expect == false |> resolve)
      )
    );

    describe("getAssetBundleArrayBufferCache", () =>
      test("fatal", () =>
        expect(() =>
          LoadABSystem.getAssetBundleArrayBufferCache(. "")
        )
        |> toThrow
      )
    );

    describe("cacheAssetBundleArrayBuffer", () =>
      testPromise("do nothing", () => {
        let ab = Obj.magic(-1);

        LoadABSystem.cacheAssetBundleArrayBuffer(. "", ab, "")
        |> then_(_ => 1 |> expect == 1 |> resolve);
      })
    );
  });