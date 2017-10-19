open Jest;

open CompileConfig;

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
              let judgeAndReturnStub () => {
                let stub = createEmptyStub (refJsObjToSandbox !sandbox);
                Contract.requireCheck (fun () => stub () |> ignore) |> ignore;
                stub
              };
              test
                "if CompileConfig.closeContractTest === true and state->isTest === true, check"
                (
                  fun () => {
                    compileConfig.isCompileTest = true;
                    createState () |> setIsTest isTest::true |> setState stateData |> ignore;
                    judgeAndReturnStub () |> expect |> toCalledOnce
                  }
                );
              test
                "else, not check"
                (
                  fun () => {
                    compileConfig.isCompileTest = false;
                    createState () |> setIsTest isTest::true |> setState stateData |> ignore;
                    judgeAndReturnStub () |> expect |> not_ |> toCalledOnce |> ignore;
                    compileConfig.isCompileTest = true;
                    createState () |> setIsTest isTest::false |> setState stateData |> ignore;
                    judgeAndReturnStub () |> expect |> not_ |> toCalledOnce
                  }
                )
            }
          )
      }
    );