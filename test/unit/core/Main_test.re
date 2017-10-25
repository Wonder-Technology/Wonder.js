open Jest;

open Main;

open ViewSystem;

open DomTool;

open MainTool;

open InitConfigSystem;

let _ =
  describe
    "Main"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        beforeEach (fun () => sandbox := createSandbox ());
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
          "setMainConfig"
          (
            fun () => {
              describe
                "isTest"
                (
                  fun () =>
                    describe
                      "if true"
                      (
                        fun () =>
                          test
                            "it will open wonder.js contract check"
                            (
                              fun () =>
                                setMainConfig (
                                  MainTool.buildMainConfig isTest::(Js.Nullable.return true) ()
                                )
                                |> getIsTest
                                |> expect
                                == true
                            )
                      )
                );
              describe
                "canvasId"
                (
                  fun () => {
                    describe
                      "if pass canvas id"
                      (
                        fun () => {
                          test
                            "if correspond canvas don't exist, error"
                            (
                              fun () =>
                                expect (
                                  fun () =>
                                    setMainConfig (
                                      MainTool.buildMainConfig
                                        canvasId::(Js.Nullable.return "a") ()
                                    )
                                )
                                |> toThrowMessage "canvas whose id is a should exist"
                            );
                          describe
                            "else"
                            (
                              fun () => {
                                beforeEach (
                                  fun () => {
                                    let canvasDom = {
                                      "id": "a",
                                      "getContext": createEmptyStub (refJsObjToSandbox !sandbox)
                                    };
                                    createMethodStub
                                      (refJsObjToSandbox !sandbox)
                                      (documentToObj Dom.document)
                                      "querySelectorAll"
                                    |> withOneArg arg::"#a"
                                    |> setReturn returnVal::[canvasDom]
                                    |> ignore
                                  }
                                );
                                test
                                  /* todo test webgl2 context */
                                  "save canvas to state and get webgl1 context from it"
                                  (
                                    fun () =>
                                      setMainConfig (
                                        MainTool.buildMainConfig
                                          canvasId::(Js.Nullable.return "a") ()
                                      )
                                      |> getCanvas
                                      |> getId
                                      |> expect
                                      == "a"
                                  );
                                test
                                  "suppport pass canvas id which starts with #"
                                  (
                                    fun () =>
                                      setMainConfig (
                                        MainTool.buildMainConfig
                                          canvasId::(Js.Nullable.return "#a") ()
                                      )
                                      |> getCanvas
                                      |> getId
                                      |> expect
                                      == "a"
                                  )
                              }
                            )
                        }
                      );
                    describe
                      "else"
                      (
                        fun () => {
                          let exec () => {
                            let (canvasDom, div, body) = buildFakeDomForNotPassCanvasId sandbox;
                            setMainConfig (MainTool.buildMainConfig ()) |> ignore;
                            (canvasDom, div, body)
                          };
                          test
                            "test create canvas"
                            (
                              fun () => {
                                let (_, div, _) = exec ();
                                div##innerHTML |> expect == "<canvas></canvas>"
                              }
                            );
                          test
                            "prepend to body"
                            (
                              fun () => {
                                let (canvasDom, _, body) = exec ();
                                body##prepend |> expect |> toCalledWith [canvasDom]
                              }
                            )
                        }
                      )
                  }
                );
              describe
                "contextConfig"
                (
                  fun () => {
                    describe
                      "if pass contextConfig"
                      (
                        fun () =>
                          test
                            "set webgl context option by passed data.(use default value if the field isn't passed)"
                            (
                              fun () => {
                                let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId sandbox;
                                setMainConfig (
                                  MainTool.buildMainConfig
                                    contextConfig::(
                                      Js.Nullable.return {
                                        "alpha": Js.Nullable.undefined,
                                        "depth": Js.Nullable.undefined,
                                        "stencil": Js.Nullable.return true,
                                        "antialias": Js.Nullable.return false,
                                        "premultipliedAlpha": Js.Nullable.return true,
                                        "preserveDrawingBuffer": Js.Nullable.return false
                                      }
                                    )
                                    ()
                                )
                                |> ignore;
                                canvasDom##getContext
                                |> expect
                                |> toCalledWith [
                                     matchAny,
                                     {
                                       "alpha": Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "depth": Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "stencil":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "antialias":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean false),
                                       "premultipliedAlpha":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "preserveDrawingBuffer":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean false)
                                     }
                                   ]
                              }
                            )
                      );
                    describe
                      "else"
                      (
                        fun () =>
                          test
                            "set default webgl context option"
                            (
                              fun () => {
                                let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId sandbox;
                                setMainConfig (MainTool.buildMainConfig ()) |> ignore;
                                canvasDom##getContext
                                |> expect
                                |> toCalledWith [
                                     matchAny,
                                     {
                                       "alpha": Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "depth": Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "stencil":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean false),
                                       "antialias":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "premultipliedAlpha":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean true),
                                       "preserveDrawingBuffer":
                                         Js.Nullable.return (Js.Boolean.to_js_boolean false)
                                     }
                                   ]
                              }
                            )
                      );
                    test
                      "set to state"
                      (
                        fun () => {
                          let (_, _, _) = buildFakeDomForNotPassCanvasId sandbox;
                          let state = setMainConfig (MainTool.buildMainConfig ());
                          state
                          |> getContextConfig
                          |> expect
                          == {
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
              describe
                "bufferConfig"
                (
                  fun () => {
                    describe
                      "if pass bufferConfig"
                      (
                        fun () =>
                          test
                            "set to state (use default value if the field isn't passed)"
                            (
                              fun () => {
                                let (_, _, _) = buildFakeDomForNotPassCanvasId sandbox;
                                let transformDataBufferCount = 100;
                                let state =
                                  setMainConfig (
                                    MainTool.buildMainConfig
                                      bufferConfig::(
                                        Js.Nullable.return {
                                          "transformDataBufferCount":
                                            Js.Nullable.return transformDataBufferCount
                                        }
                                      )
                                      ()
                                  );
                                state
                                |> BufferConfigSystem.getBufferConfig
                                |> expect
                                == {transformDataBufferCount: transformDataBufferCount}
                              }
                            )
                      );
                    describe
                      "else"
                      (
                        fun () =>
                          test
                            "set default data"
                            (
                              fun () => {
                                let (_, _, _) = buildFakeDomForNotPassCanvasId sandbox;
                                let state = setMainConfig (MainTool.buildMainConfig ());
                                state
                                |> BufferConfigSystem.getBufferConfig
                                |> expect
                                == {transformDataBufferCount: 20 * 1000}
                              }
                            )
                      )
                  }
                )
            }
          )
      }
    );