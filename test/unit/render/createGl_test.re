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
              setMainConfig (buildMainConfig isTest::(Js.Nullable.return true) ()) |> ignore;
              expect canvasDom##getContext |> toCalledWith ["webgl"]
            }
          )
      }
    );