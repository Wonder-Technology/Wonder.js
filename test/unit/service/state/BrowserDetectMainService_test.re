open Wonder_jest;

open Js.Promise;

let _ =
  describe("BrowserDetectMainService", () => {
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

    describe("if use worker", () =>
      describe("if is mobile, error", () => {
        let _test = setBrowserFunc => {
          open Js.Promise;

          let (width, height) = RootTool.setRoot();
          let state =
            state^
            |> FakeGlWorkerTool.setFakeGl(
                 FakeGlWorkerTool.buildFakeGl(~sandbox, ()),
               );

          MainStateTool.setState(state);
          setBrowserFunc();

          let state = MainStateTool.unsafeGetState();

          expect(() =>
            BrowserDetectMainService.detectMobileNotSupportWorker(state)
          )
          |> toThrowMessage("mobile not support worker");
        };

        test("if is android, error", () =>
          _test(BrowserDetectTool.setAndroid)
        );
        test("if is ios, error", () =>
          _test(BrowserDetectTool.setIOS)
        );
      })
    );
  });