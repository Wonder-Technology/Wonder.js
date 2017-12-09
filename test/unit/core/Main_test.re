open Wonder_jest;

open Main;

open ViewSystem;

open DomTool;

open MainTool;

open InitConfigSystem;

let _ =
  describe(
    "Main",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "setMainConfig",
        () => {
          describe(
            "isTest",
            () =>
              describe(
                "if true",
                () =>
                  test(
                    "it will open wonder.js contract check",
                    () => {
                      buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
                      setMainConfig(
                        MainTool.buildMainConfig(~isTest=Js.Nullable.return(Js.true_), ())
                      )
                      |> ignore;
                      getIsTest(StateData.stateData) |> expect == true
                    }
                  )
              )
          );
          describe(
            "canvasId",
            () => {
              describe(
                "if pass canvas id",
                () => {
                  test(
                    "if correspond canvas don't exist, error",
                    () =>
                      expect(
                        () =>
                          setMainConfig(
                            MainTool.buildMainConfig(~canvasId=Js.Nullable.return("a"), ())
                          )
                      )
                      |> toThrowMessage("canvas whose id is a should exist")
                  );
                  describe(
                    "else",
                    () => {
                      beforeEach(
                        () => {
                          let canvasDom = {
                            "id": "a",
                            "getContext": createGetContextStub(buildFakeGl(sandbox), sandbox)
                          };
                          createMethodStub(
                            refJsObjToSandbox(sandbox^),
                            documentToObj(Dom.document),
                            "querySelectorAll"
                          )
                          |> withOneArg("#a")
                          |> returns([canvasDom])
                          |> ignore
                        }
                      );
                      test
                        /* todo test webgl2 context */
                        (
                          "save canvas to state and get webgl1 context from it",
                          () =>
                            setMainConfig(
                              MainTool.buildMainConfig(~canvasId=Js.Nullable.return("a"), ())
                            )
                            |> getCanvas
                            |> getId
                            |> expect == "a"
                        );
                      test(
                        "suppport pass canvas id which starts with #",
                        () =>
                          setMainConfig(
                            MainTool.buildMainConfig(~canvasId=Js.Nullable.return("#a"), ())
                          )
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
                    setMainConfig(MainTool.buildMainConfig()) |> ignore;
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
                      body##prepend |> expect |> toCalledWith([canvasDom])
                    }
                  )
                }
              )
            }
          );
          describe(
            "contextConfig",
            () => {
              describe(
                "if pass contextConfig",
                () =>
                  test(
                    "set webgl context option by passed data.(use default value if the field isn't passed)",
                    () => {
                      let (canvasDom, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      setMainConfig(
                        MainTool.buildMainConfig(
                          ~contextConfig=
                            Js.Nullable.return({
                              "alpha": Js.Nullable.undefined,
                              "depth": Js.Nullable.undefined,
                              "stencil": Js.Nullable.return(Js.true_),
                              "antialias": Js.Nullable.return(Js.false_),
                              "premultipliedAlpha": Js.Nullable.return(Js.true_),
                              "preserveDrawingBuffer": Js.Nullable.return(Js.false_)
                            }),
                          ()
                        )
                      )
                      |> ignore;
                      canvasDom##getContext
                      |> expect
                      |> toCalledWith([
                           matchAny,
                           {
                             "alpha": Js.Nullable.return(Js.true_),
                             "depth": Js.Nullable.return(Js.true_),
                             "stencil": Js.Nullable.return(Js.true_),
                             "antialias": Js.Nullable.return(Js.false_),
                             "premultipliedAlpha": Js.Nullable.return(Js.true_),
                             "preserveDrawingBuffer": Js.Nullable.return(Js.false_)
                           }
                         ])
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
                      setMainConfig(MainTool.buildMainConfig()) |> ignore;
                      canvasDom##getContext
                      |> expect
                      |> toCalledWith([
                           matchAny,
                           {
                             "alpha": Js.Nullable.return(Js.true_),
                             "depth": Js.Nullable.return(Js.true_),
                             "stencil": Js.Nullable.return(Js.false_),
                             "antialias": Js.Nullable.return(Js.true_),
                             "premultipliedAlpha": Js.Nullable.return(Js.true_),
                             "preserveDrawingBuffer": Js.Nullable.return(Js.false_)
                           }
                         ])
                    }
                  )
              );
              test(
                "set to state",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let state = setMainConfig(MainTool.buildMainConfig());
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
            "bufferConfig",
            () => {
              open StateDataType;
              let _buildBufferConfig = (~geometryPointDataBufferCount=Js.Nullable.undefined, ()) =>
                Js.Nullable.return({"geometryPointDataBufferCount": geometryPointDataBufferCount});
              let _buildExpectedBufferConfig = (~geometryPointDataBufferCount=1000 * 1000, ()) => {
                geometryPointDataBufferCount: geometryPointDataBufferCount
              };
              describe(
                "if pass bufferConfig",
                () =>
                  test(
                    "set to state (use default value if the field isn't passed)",
                    () => {
                      let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      let geometryPointDataBufferCount = 200;
                      let state =
                        setMainConfig(
                          MainTool.buildMainConfig(
                            ~bufferConfig=
                              _buildBufferConfig(
                                ~geometryPointDataBufferCount=
                                  Js.Nullable.return(geometryPointDataBufferCount),
                                ()
                              ),
                            ()
                          )
                        );
                      state
                      |> BufferConfigSystem.getConfig
                      |> expect == _buildExpectedBufferConfig(~geometryPointDataBufferCount, ())
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
                      let state = setMainConfig(MainTool.buildMainConfig());
                      state
                      |> BufferConfigSystem.getConfig
                      |>
                      expect == _buildExpectedBufferConfig(
                                  ~geometryPointDataBufferCount=1000 * 1000,
                                  ()
                                )
                    }
                  )
              )
            }
          );
          describe(
            "detect gpu",
            () => {
              describe(
                "detect extension",
                () =>
                  test(
                    "detect instanced_arrays",
                    () => {
                      let (_, fakeGl, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      setMainConfig(MainTool.buildMainConfig()) |> ignore;
                      fakeGl##getExtension |> expect |> toCalledWith(["ANGLE_instanced_arrays"])
                    }
                  )
              );
              describe(
                "detect capabilty",
                () => {
                  let _prepare = (sandbox) => {
                    open GPUDetectType;
                    let warn = createMethodStubWithJsObjSandbox(sandbox, LogUtils.console, "warn");
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
                      let (fakeGl, _, vertexShader, fragmentShader, highFloat, _) =
                        _prepare(sandbox);
                      fakeGl##getShaderPrecisionFormat
                      |> withTwoArgs(vertexShader, highFloat)
                      |> returns({"precision": 1})
                      |> ignore;
                      fakeGl##getShaderPrecisionFormat
                      |> withTwoArgs(fragmentShader, highFloat)
                      |> returns({"precision": 1})
                      |> ignore;
                      let state = setMainConfig(MainTool.buildMainConfig());
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
                      let state = setMainConfig(MainTool.buildMainConfig());
                      (warn |> getCallCount, GpuDetectTool.getData(state).precision)
                      |> expect == (1, Some(MEDIUMP))
                    }
                  );
                  test(
                    "else, warn and use lowp",
                    () => {
                      let (_, warn, _, _, _, _) = _prepare(sandbox);
                      let state = setMainConfig(MainTool.buildMainConfig());
                      (warn |> getCallCount, GpuDetectTool.getData(state).precision)
                      |> expect == (1, Some(LOWP))
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
  );