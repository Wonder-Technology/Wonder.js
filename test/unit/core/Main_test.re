open Jest;

open Main;

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
          "isTest"
          (
            fun () =>
              describe
                "if true"
                (
                  fun () =>
                    test
                      "it will open wonder.js contract check"
                      (fun () => {
                             expect (fun () => {
                             setMainConfig { "canvasId":Js.Nullable.undefined, "isTest": ( Js.Nullable.return true ), "contextConfig": Js.Nullable.undefined}
                             })
                             |> toThrow
                     })
                )
          )
      }
    );
/* setMainConfig {.. "isTest": Js.true_} */