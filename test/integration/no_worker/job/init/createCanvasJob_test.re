open Wonder_jest;

let _ =
  describe(
    "test create canvas job",
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
        }
      ]
    }
  ]
        |},
          ~initJobs={|

[
    {
        "name": "create_canvas"
    }
]
        |},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "if pass canvas id",
        () => {
          test(
            "if correspond canvas don't exist, error",
            () =>
              expect(
                () =>
                  TestTool.initWithJobConfigWithoutBuildFakeDom(
                    ~sandbox,
                    ~isDebug="true",
                    ~canvasId=Some("a"),
                    ()
                  )
                  |> DirectorTool.init
              )
              |> toThrowMessage("canvas whose id is a should exist")
          );
          describe(
            "else",
            () => {
              beforeEach(
                () => {
                  let canvasDom =
                    SettingTool.buildFakeCanvas("a", SettingTool.buildFakeGl(sandbox), sandbox);
                  let querySelectorAll =
                    createMethodStub(
                      refJsObjToSandbox(sandbox^),
                      DomTool.documentToObj(DomExtend.document),
                      "querySelectorAll"
                    );
                  querySelectorAll |> returns([||]);
                  querySelectorAll |> withOneArg("#a") |> returns([|canvasDom|]) |> ignore
                }
              );
              test
                /* TODO test webgl2 context */
                (
                  "save canvas to state and get webgl1 context from it",
                  () =>
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~canvasId=Some("a"),
                      ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
                      ()
                    )
                    |> DirectorTool.init
                    |> ViewTool.getCanvas
                    |> DomTool.getId
                    |> expect == "a"
                );
              test(
                "suppport pass canvas id which starts with #",
                () =>
                  TestTool.initWithJobConfigWithoutBuildFakeDom(
                    ~sandbox,
                    ~canvasId=Some("#a"),
                    ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
                    ()
                  )
                  |> DirectorTool.init
                  |> ViewTool.getCanvas
                  |> DomTool.getId
                  |> expect == "a"
              )
            }
          )
        }
      );
      describe(
        "else",
        () => {
          let exec = () => {
            let (canvasDom, _, div, body) = SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
              ()
            )
            |> DirectorTool.init
            |> ignore;
            (canvasDom, div, body)
          };
          test(
            "test create canvas",
            () => {
              let (_, div, _) = exec();
              Obj.magic(DomExtend.document)##createElement |> expect |> toCalledWith([|"canvas"|])
            }
          );
          test(
            "prepend to body",
            () => {
              let (canvasDom, _, body) = exec();
              body##prepend |> expect |> toCalledWith([|canvasDom|])
            }
          )
        }
      )
    }
  );