open Jest;

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
            "if state->isTest === true, check",
            () => {
              createState() |> setIsTest(~isTest=true) |> setState(~stateData) |> ignore;
              exec() |> expect |> toCalledOnce
            }
          );
          test(
            "else, not check",
            () => {
              createState() |> setIsTest(~isTest=true) |> setState(~stateData) |> ignore;
              exec() |> expect |> not_ |> toCalledOnce |> ignore;
              createState() |> setIsTest(~isTest=false) |> setState(~stateData) |> ignore;
              exec() |> expect |> not_ |> toCalledOnce
            }
          )
        }
      )
    }
  );
