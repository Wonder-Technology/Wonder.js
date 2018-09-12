open Wonder_jest;

open BasicCameraViewAPI;

open ArcballCameraControllerAPI;

let _ =
  describe("test init camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("init perspectiveCameraProjection", () => {
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines=
            {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
          ~initJobs=
            {|
[
        {
          "name": "init_camera"
        }
]
        |},
          (),
        );

      beforeEach(() =>
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
            (),
          )
      );

      describe("build pMatrix", () => {
        CameraTool.testBuildPMatrix(
          () => state^,
          state => state |> DirectorTool.init,
        );

        test("if has no aspect, use canvas.width/canvas.height", () => {
          let width = 200;
          let height = 150;
          state :=
            SettingTool.buildFakeCanvasWithSize(
              ~gl=SettingTool.buildFakeGl(sandbox),
              ~sandbox,
              ~width,
              ~height,
              (),
            )
            |> Obj.magic
            |> ViewTool.setCanvas(_, state^);

          let (state, basicCameraView, perspectiveCameraProjection) =
            CameraTool.createBasicCameraViewPerspectiveCameraWithoutAspect(
              state^,
            );
          let state = state |> DirectorTool.init;

          (
            PerspectiveCameraProjectionTool.getAspect(
              perspectiveCameraProjection,
              state,
            ),
            state
            |> PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix(
                 perspectiveCameraProjection,
               ),
          )
          |>
          expect == (
                      None,
                      Js.Typed_array.Float32Array.make([|
                        1.299038052558899,
                        0.,
                        0.,
                        0.,
                        0.,
                        1.7320507764816284,
                        0.,
                        0.,
                        0.,
                        0.,
                        (-1.0002000331878662),
                        (-1.),
                        0.,
                        0.,
                        (-0.20002000033855438),
                        0.,
                      |]),
                    );
        });
      });
    });
  });