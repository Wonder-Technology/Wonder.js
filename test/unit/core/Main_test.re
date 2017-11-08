open Jest;

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
                    () =>
                      setMainConfig(MainTool.buildMainConfig(~isTest=Js.Nullable.return(true), ()))
                      |> getIsTest
                      |> expect == true
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
                            "getContext": createEmptyStub(refJsObjToSandbox(sandbox^))
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
                    let (canvasDom, div, body) = buildFakeDomForNotPassCanvasId(sandbox);
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
                      let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      setMainConfig(
                        MainTool.buildMainConfig(
                          ~contextConfig=
                            Js.Nullable.return({
                              "alpha": Js.Nullable.undefined,
                              "depth": Js.Nullable.undefined,
                              "stencil": Js.Nullable.return(true),
                              "antialias": Js.Nullable.return(false),
                              "premultipliedAlpha": Js.Nullable.return(true),
                              "preserveDrawingBuffer": Js.Nullable.return(false)
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
                             "alpha": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "depth": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "stencil": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "antialias": Js.Nullable.return(Js.Boolean.to_js_boolean(false)),
                             "premultipliedAlpha":
                               Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "preserveDrawingBuffer":
                               Js.Nullable.return(Js.Boolean.to_js_boolean(false))
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
                      let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      setMainConfig(MainTool.buildMainConfig()) |> ignore;
                      canvasDom##getContext
                      |> expect
                      |> toCalledWith([
                           matchAny,
                           {
                             "alpha": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "depth": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "stencil": Js.Nullable.return(Js.Boolean.to_js_boolean(false)),
                             "antialias": Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "premultipliedAlpha":
                               Js.Nullable.return(Js.Boolean.to_js_boolean(true)),
                             "preserveDrawingBuffer":
                               Js.Nullable.return(Js.Boolean.to_js_boolean(false))
                           }
                         ])
                    }
                  )
              );
              test(
                "set to state",
                () => {
                  let (_, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
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
              let _buildBufferConfig =
                  (
                    ~transformDataBufferCount=Js.Nullable.undefined,
                    ~geometryPointDataBufferCount=Js.Nullable.undefined,
                    ~basicMaterialDataBufferCount=Js.Nullable.undefined,
                    ()
                  ) =>
                Js.Nullable.return({
                  "transformDataBufferCount": transformDataBufferCount,
                  "geometryPointDataBufferCount": geometryPointDataBufferCount,
                  "basicMaterialDataBufferCount": basicMaterialDataBufferCount
                });
              let _buildExpectedBufferConfig =
                  (
                    ~transformDataBufferCount=20 * 1000,
                    ~geometryPointDataBufferCount=1000 * 1000,
                    ~basicMaterialDataBufferCount=20 * 1000,
                    ()
                  ) => {
                transformDataBufferCount,
                geometryPointDataBufferCount,
                basicMaterialDataBufferCount
              };
              describe(
                "if pass bufferConfig",
                () =>
                  test(
                    "set to state (use default value if the field isn't passed)",
                    () => {
                      let (_, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      let transformDataBufferCount = 100;
                      let geometryPointDataBufferCount = 200;
                      let basicMaterialDataBufferCount = 300;
                      let state =
                        setMainConfig(
                          MainTool.buildMainConfig(
                            ~bufferConfig=
                              _buildBufferConfig(
                                ~transformDataBufferCount=
                                  Js.Nullable.return(transformDataBufferCount),
                                ~geometryPointDataBufferCount=
                                  Js.Nullable.return(geometryPointDataBufferCount),
                                ~basicMaterialDataBufferCount=
                                  Js.Nullable.return(basicMaterialDataBufferCount),
                                ()
                              ),
                            ()
                          )
                        );
                      state
                      |> BufferConfigSystem.getBufferConfig
                      |>
                      expect == _buildExpectedBufferConfig(
                                  ~transformDataBufferCount,
                                  ~geometryPointDataBufferCount,
                                  ~basicMaterialDataBufferCount,
                                  ()
                                )
                    }
                  )
              );
              describe(
                "else",
                () =>
                  test(
                    "set default data",
                    () => {
                      let (_, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                      let state = setMainConfig(MainTool.buildMainConfig());
                      state
                      |> BufferConfigSystem.getBufferConfig
                      |>
                      expect == _buildExpectedBufferConfig(
                                  ~transformDataBufferCount=20 * 1000,
                                  ~geometryPointDataBufferCount=1000 * 1000,
                                  ~basicMaterialDataBufferCount=20 * 1000,
                                  ()
                                )
                    }
                  )
              )
            }
          )
        }
      )
    }
  );