open Wonder_jest;

open StateSystem;

open StateData;

open InitConfigSystem;

let _ =
  describe(
    "contract",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "requireCheck",
        () => {
          let exec = () => {
            let stub = createEmptyStub(refJsObjToSandbox(sandbox^));
            Contract.requireCheck(() => stub() |> ignore) |> ignore;
            stub
          };
          test(
            "if stateData->isTest === true, check",
            () => {
              setIsTest(~isTest=true, StateData.stateData) |> ignore;
              exec() |> expect |> toCalledOnce
            }
          );
          test(
            "else, not check",
            () => {
              setIsTest(~isTest=false, StateData.stateData) |> ignore;
              exec() |> expect |> not_ |> toCalledOnce
            }
          )
        }
      )
    }
  );