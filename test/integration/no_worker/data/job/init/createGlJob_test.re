open Wonder_jest;

let _ =
  describe(
    "test create gl job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "create_canvas"
        },
        {
          "name": "create_gl"
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[
        {
          "name": "create_canvas"
        },
    {
        "name": "create_gl"
    }
]
        |},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "get webgl1 context",
        () => {
          let (canvasDom, _, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
            ()
          )
          |> DirectorTool.init
          |> ignore;
          expect(canvasDom##getContext) |> toCalledWith([|"webgl"|])
        }
      );
      describe(
        "if pass contextConfig",
        () =>
          test(
            "set webgl context option by passed record",
            () => {
              let (canvasDom, _, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
                ~context={|
                        {
                 "alpha": false,
                 "depth": true,
                 "stencil": true,
                 "antialias": false,
                 "premultiplied_alpha": false,
                 "preserve_drawing_buffer": false
               }
               |},
                ()
              )
              |> DirectorTool.init
              |> ignore;
              canvasDom##getContext
              |> expect
              |> toCalledWith([|
                   matchAny,
                   {
                     "alpha": Js.Nullable.return(Js.false_),
                     "depth": Js.Nullable.return(Js.true_),
                     "stencil": Js.Nullable.return(Js.true_),
                     "antialias": Js.Nullable.return(Js.false_),
                     "premultipliedAlpha": Js.Nullable.return(Js.false_),
                     "preserveDrawingBuffer": Js.Nullable.return(Js.false_)
                   }
                 |])
            }
          )
      );
      describe(
        "else",
        () =>
          test(
            "set default webgl context option",
            () => {
              let (canvasDom, _, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
                ()
              )
              |> DirectorTool.init
              |> ignore;
              canvasDom##getContext
              |> expect
              |> toCalledWith([|
                   matchAny,
                   {
                     "alpha": Js.Nullable.return(Js.true_),
                     "depth": Js.Nullable.return(Js.true_),
                     "stencil": Js.Nullable.return(Js.false_),
                     "antialias": Js.Nullable.return(Js.true_),
                     "premultipliedAlpha": Js.Nullable.return(Js.true_),
                     "preserveDrawingBuffer": Js.Nullable.return(Js.false_)
                   }
                 |])
            }
          )
      );
      test(
        "set to state",
        () => {
          let (_, _, _, _) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
          let state =
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
              ()
            )
            |> DirectorTool.init;
          state
          |> ViewTool.unsafeGetContext
          |>
          expect == {
                      alpha: true,
                      depth: true,
                      stencil: false,
                      antialias: true,
                      premultipliedAlpha: true,
                      preserveDrawingBuffer: false
                    }
        }
      )
    }
  );