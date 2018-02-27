open Wonder_jest;

open Js.Promise;

open RenderConfigDataType;

open ViewSystem;

open DomTool;

open SettingTool;

open InitConfigSystem;

let _ =
  describe(
    "test setting data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(() => sandbox := createSandbox());
      /* state := TestTool.init(~sandbox, ()) */
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "isDebug",
        () =>
          describe(
            "if true",
            () =>
              test(
                "it will open contract check",
                () => {
                  buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
                  SettingTool.createStateAndSetToStateData(~isDebug="true", ()) |> ignore;
                  getIsDebug(StateData.stateData) |> expect == true
                }
              )
          )
      );
      describe(
        "canvasId",
        () => {
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
                      let canvasDom = buildFakeCanvas("a", buildFakeGl(sandbox), sandbox);
                      let querySelectorAll =
                        createMethodStub(
                          refJsObjToSandbox(sandbox^),
                          documentToObj(Dom.document),
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
                          ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
                          ()
                        )
                        |> DirectorTool.init
                        |> getCanvas
                        |> getId
                        |> expect == "a"
                    );
                  test(
                    "suppport pass canvas id which starts with #",
                    () =>
                      TestTool.initWithJobConfigWithoutBuildFakeDom(
                        ~sandbox,
                        ~canvasId=Some("#a"),
                        ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
                        ()
                      )
                      |> DirectorTool.init
                      |> getCanvas
                      |> getId
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
                let (canvasDom, _, div, body) = buildFakeDomForNotPassCanvasId(sandbox);
                TestTool.initWithJobConfigWithoutBuildFakeDom(
                  ~sandbox,
                  ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
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
                  div##innerHTML |> expect == "<canvas></canvas>"
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
      describe(
        "contextConfig",
        () => {
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
          describe(
            "if pass contextConfig",
            () =>
              test(
                "set webgl context option by passed data",
                () => {
                  let (canvasDom, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  TestTool.initWithJobConfigWithoutBuildFakeDom(
                    ~sandbox,
                    ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
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
                  let (canvasDom, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  TestTool.initWithJobConfigWithoutBuildFakeDom(
                    ~sandbox,
                    ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
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
              let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
              let state =
                TestTool.initWithJobConfigWithoutBuildFakeDom(
                  ~sandbox,
                  ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
                  ()
                )
                |> DirectorTool.init;
              state
              |> getContextConfig
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
      describe(
        "gpuConfig",
        () => {
          open StateDataType;
          let _buildExpectedGpuConfig = (~useHardwareInstance=Js.true_, ()) => {
            useHardwareInstance: Js.to_bool(useHardwareInstance)
          };
          describe(
            "if pass gpuConfig",
            () =>
              test(
                "set to state (use default value if the field isn't passed)",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let useHardwareInstance = Js.false_;
                  let state =
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~useHardwareInstance="false",
                      ()
                    );
                  state
                  |> GpuConfigSystem.getConfig
                  |> expect == _buildExpectedGpuConfig(~useHardwareInstance, ())
                }
              )
          );
          describe(
            "else",
            () =>
              test(
                "set default data",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let state = TestTool.initWithJobConfigWithoutBuildFakeDom(~sandbox, ());
                  state
                  |> GpuConfigSystem.getConfig
                  |> expect == _buildExpectedGpuConfig(~useHardwareInstance=Js.true_, ())
                }
              )
          )
        }
      );
      describe(
        "detect gpu",
        () => {
          let _buildNoWorkerJobConfig = () =>
            NoWorkerJobConfigTool.buildNoWorkerJobConfig(
              ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "detect_gl"
        }
      ]
    }
  ]
        |},
              ~initJobs={|

[

        {
          "name": "detect_gl"
        }
]
        |},
              ()
            );
          let _exec = (fakeGl) =>
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobConfig=_buildNoWorkerJobConfig(),
              ()
            )
            |> FakeGlTool.setFakeGl(fakeGl)
            |> DirectorTool.init;
          describe(
            "detect extension",
            () =>
              test(
                "detect instanced_arrays",
                () => {
                  let (_, fakeGl, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let state = _exec(fakeGl);
                  fakeGl##getExtension |> expect |> toCalledOnce
                }
              )
          );
          describe(
            "detect capabilty",
            () => {
              let _prepare = (sandbox) => {
                open GPUDetectType;
                let warn = createMethodStubWithJsObjSandbox(sandbox, Console.console, "warn");
                let (_, fakeGl, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                let vertexShader = 0;
                let fragmentShader = 1;
                let highFloat = 2;
                let mediumFloat = 3;
                fakeGl##getShaderPrecisionFormat |> returns({"precision": 0}) |> ignore;
                (fakeGl, warn, vertexShader, fragmentShader, highFloat, mediumFloat)
              };
              test(
                "if highp is available, use highp",
                () => {
                  let (fakeGl, _, vertexShader, fragmentShader, highFloat, _) = _prepare(sandbox);
                  fakeGl##getShaderPrecisionFormat
                  |> withTwoArgs(vertexShader, highFloat)
                  |> returns({"precision": 1})
                  |> ignore;
                  fakeGl##getShaderPrecisionFormat
                  |> withTwoArgs(fragmentShader, highFloat)
                  |> returns({"precision": 1})
                  |> ignore;
                  let state = _exec(fakeGl);
                  GpuDetectTool.getData(state).precision |> expect == Some(HIGHP)
                }
              );
              test(
                "else if mediump is available, warn and use mediump",
                () => {
                  let (fakeGl, warn, vertexShader, fragmentShader, _, mediumFloat) =
                    _prepare(sandbox);
                  fakeGl##getShaderPrecisionFormat
                  |> withTwoArgs(vertexShader, mediumFloat)
                  |> returns({"precision": 1})
                  |> ignore;
                  fakeGl##getShaderPrecisionFormat
                  |> withTwoArgs(fragmentShader, mediumFloat)
                  |> returns({"precision": 1})
                  |> ignore;
                  let state = _exec(fakeGl);
                  (warn |> getCallCount, GpuDetectTool.getData(state).precision)
                  |> expect == (1, Some(MEDIUMP))
                }
              );
              test(
                "else, warn and use lowp",
                () => {
                  let (fakeGl, warn, _, _, _, _) = _prepare(sandbox);
                  let state = _exec(fakeGl);
                  (warn |> getCallCount, GpuDetectTool.getData(state).precision)
                  |> expect == (1, Some(LOWP))
                }
              )
            }
          )
        }
      )
    }
  );