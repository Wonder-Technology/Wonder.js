open Jest;

open Main;

open ViewSystem;

open DomTool;

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
              let buildFakeDomForNotPassCanvasId () => {
                let canvasDom = {
                  "id": "a",
                  "nodeType": 1,
                  "getContext": createEmptyStub (refJsObjToSandbox !sandbox)
                };
                let div = {"innerHTML": "", "firstChild": canvasDom};
                let body = {"prepend": createEmptyStub (refJsObjToSandbox !sandbox)};
                createMethodStub
                  (refJsObjToSandbox !sandbox) (documentToObj Dom.document) "createElement"
                |> withOneArg arg::"div"
                |> setReturn returnVal::div
                |> ignore;
                createMethodStub
                  (refJsObjToSandbox !sandbox) (documentToObj Dom.document) "querySelectorAll"
                |> withOneArg arg::"body"
                |> setReturn returnVal::[body]
                |> ignore;
                (canvasDom, div, body)
              };
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
                                setMainConfig {
                                  "canvasId": Js.Nullable.undefined,
                                  "isTest": Js.Nullable.return true,
                                  "contextConfig": Js.Nullable.undefined
                                }
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
                                    setMainConfig {
                                      "canvasId": Js.Nullable.return "a",
                                      "isTest": Js.Nullable.undefined,
                                      "contextConfig": Js.Nullable.undefined
                                    }
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
                                      setMainConfig {
                                        "canvasId": Js.Nullable.return "a",
                                        "isTest": Js.Nullable.undefined,
                                        "contextConfig": Js.Nullable.undefined
                                      }
                                      |> getCanvas
                                      |> getId
                                      |> expect
                                      == "a"
                                  );
                                test
                                  "suppport pass canvas id which starts with #"
                                  (
                                    fun () =>
                                      setMainConfig {
                                        "canvasId": Js.Nullable.return "#a",
                                        "isTest": Js.Nullable.undefined,
                                        "contextConfig": Js.Nullable.undefined
                                      }
                                      |> getCanvas
                                      |> getId
                                      |> expect
                                      == "a"
                                  )
                              }
                            )
                        }
                      );
                    test
                      "else, create canvas and prepend to body"
                      (
                        fun () => {
                          let (canvasDom, div, body) = buildFakeDomForNotPassCanvasId ();
                          setMainConfig {
                            "canvasId": Js.Nullable.undefined,
                            "isTest": Js.Nullable.undefined,
                            "contextConfig": Js.Nullable.undefined
                          }
                          |> ignore;
                          div##innerHTML |> expect == "<canvas></canvas>" |> ignore;
                          body##prepend |> expect |> toCalledWith [canvasDom]
                        }
                      )
                  }
                );
              describe
                "contextConfig"
                (
                  fun () =>
                    describe
                      "if pass contextConfig"
                      (
                        fun () =>
                          test
                            "set webgl context option by passed data.(use default value if the field isn't passed)"
                            (
                              fun () => {
                                let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId ();
                                setMainConfig {
                                  "canvasId": Js.Nullable.undefined,
                                  "isTest": Js.Nullable.undefined,
                                  "contextConfig":
                                    Js.Nullable.return {
                                      "alpha": Js.Nullable.undefined,
                                      "depth": Js.Nullable.undefined,
                                      "stencil": Js.Nullable.return true,
                                      "antialias": Js.Nullable.return false,
                                      "premultipliedAlpha": Js.Nullable.return true,
                                      "preserveDrawingBuffer": Js.Nullable.return false
                                    }
                                }
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
                      )
                )
            }
          )
      }
    );