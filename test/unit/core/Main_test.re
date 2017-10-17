open Jest;

open Main;

open ViewSystem;

open DomTool;

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
            fun () =>
              /* describe
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
                                 expect (
                                   fun () =>
                                     setMainConfig {
                                       "canvasId": Js.Nullable.undefined,
                                       "isTest": Js.Nullable.return true,
                                       "contextConfig": Js.Nullable.undefined
                                     }
                                 )
                                 |> toThrowMessage "aaa"
                             )
                       )
                 ); */
              describe
                "canvasId"
                (
                  fun () =>
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
                              fun () =>
                                test
                                  /* todo test webgl2 context */
                                  "save canvas to state and get webgl1 context from it"
                                  (
                                    fun () => {
                                      let canvasDom = {
                                        "id": "a",
                                        "getContext": createEmptyStub !sandbox
                                      };
                                      createMethodStub !sandbox Dom.document "querySelectorAll"
                                      |> withOneArg arg::"#a"
                                      |> setReturn returnVal::[canvasDom]
                                      |> ignore;
                                      setMainConfig {
                                        "canvasId": Js.Nullable.return "a",
                                        "isTest": Js.Nullable.undefined,
                                        "contextConfig": Js.Nullable.undefined
                                      }
                                      |> getCanvas
                                      |> getId
                                      |> expect
                                      == "a"
                                    }
                                  )
                            )
                        }
                      )
                )
          )
      }
    );