open Wonder_jest;

let _ =
  describe("test init imgui job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
              ~initJobs=
                {|
[
        {
          "name": "init_imgui"
        }
]
        |},
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("if not load imgui asset, not error", () => {
      let state =
        state^ |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

      expect(() => {
        let state = state |> NoWorkerJobTool.execInitJobs;
        ();
      })
      |> not_
      |> toThrow;
    });

    describe("else, init imgui", () => {
      beforeEach(() =>
        state :=
          {
            ...state^,
            imguiRecord:
              state^.imguiRecord |> WonderImgui.AssetTool.prepareFontAsset,
          }
      );
      test("create program", () => {
        let createProgram = createEmptyStubWithJsObjSandbox(sandbox);

        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()),
             );

        let state = state |> NoWorkerJobTool.execInitJobs;

        createProgram |> expect |> toCalledOnce;
      });
    });
  });