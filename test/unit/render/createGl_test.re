open Jest;

open Main;

open MainTool;

let _ =
  describe
    "create gl"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        beforeEach (fun () => sandbox := createSandbox ());
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        test
          "get webgl1 context"
          (
            fun () => {
              let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId sandbox;
              setMainConfig {
                "canvasId": Js.Nullable.undefined,
                "isTest": Js.Nullable.return true,
                "contextConfig": Js.Nullable.undefined
              }
              |> ignore;
              expect canvasDom##getContext |> toCalledWith ["webgl"]
            }
          )
      }
    );