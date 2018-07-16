open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test render imgui job", () => {
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
              ~loopPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
              ~loopJobs=
                {|
[
        {
          "name": "render_imgui"
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
      let canvas = {"width": 100, "height": 200} |> Obj.magic;
      let state = ViewTool.setCanvas(canvas, state^);
      let state =
        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

      expect(() => {
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state = state |> NoWorkerJobTool.execLoopJobs;
        ();
      })
      |> not_
      |> toThrow;
    });

    describe("else, render imgui", () => {
      let _getPositionBufferData = () => [|
        50.,
        60.,
        50.,
        310.,
        200.,
        60.,
        200.,
        310.,
      |];

      beforeEach(() =>
        state :=
          {
            ...state^,
            imguiRecord:
              state^.imguiRecord |> WonderImgui.AssetTool.prepareFontAsset,
          }
      );
      test("send imgui buffers data", () => {
        let state = {
          ...state^,
          imguiRecord:
            WonderImgui.RenderIMGUITool.prepareFntData(state^.imguiRecord),
        };
        let canvas = {"width": 1000, "height": 500} |> Obj.magic;
        let state = ViewTool.setCanvas(canvas, state);
        let array_buffer = 1;
        let dynamic_draw = 2;
        let getExtension =
          WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
        let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               WonderImgui.FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~array_buffer,
                 ~bufferData,
                 ~dynamic_draw,
                 ~getExtension,
                 (),
               ),
             );
        let (
          (
            (imageX1, imageY1, imageWidth1, imageHeight1),
            (imageS01, imageT01, imageS11, imageT11),
            texture1,
          ),
          _,
          _,
        ) =
          WonderImgui.RenderIMGUITool.buildImageData();
        let image1Data = _getPositionBufferData();
        let state =
          ManageIMGUIAPI.setIMGUIFunc(
            (. record) => {
              let record =
                record
                |> WonderImgui.FixedLayoutControlIMGUIAPI.image(
                     (imageX1, imageY1, imageWidth1, imageHeight1),
                     (imageS01, imageT01, imageS11, imageT11),
                     texture1,
                   );

              record;
            },
            state,
          );
        let state = state |> NoWorkerJobTool.execInitJobs;
        let bufferDataCallCountAfterInit = bufferData |> getCallCount;

        let state = state |> NoWorkerJobTool.execLoopJobs;

        bufferData
        |> getCall(bufferDataCallCountAfterInit + 0)
        |> expect
        |> toCalledWith([|
             array_buffer,
             Float32Array.make(image1Data) |> Obj.magic,
             dynamic_draw,
           |]);
      });
    });
  });