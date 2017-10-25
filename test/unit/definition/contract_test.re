open Jest;

open StateSystem;

open StateData;

open InitConfigSystem;

let _ =
  describe
    "contract"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        beforeEach (fun () => sandbox := createSandbox ());
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
          "requireCheck"
          (
            fun () => {
              let exec () => {
                let stub = createEmptyStub (refJsObjToSandbox !sandbox);
                Contract.requireCheck (fun () => stub () |> ignore) |> ignore;
                stub
              };
              test
                "if state->isTest === true, check"
                (
                  fun () => {
                    createState () |> setIsTest isTest::true |> setState ::stateData |> ignore;
                    exec () |> expect |> toCalledOnce
                  }
                );
              test
                "else, not check"
                (
                  fun () => {
                    createState () |> setIsTest isTest::true |> setState ::stateData |> ignore;
                    exec () |> expect |> not_ |> toCalledOnce |> ignore;
                    createState () |> setIsTest isTest::false |> setState ::stateData |> ignore;
                    exec () |> expect |> not_ |> toCalledOnce
                  }
                )
            }
          )
      }
    );