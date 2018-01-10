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
      );
      describe(
        "test asserts",
        () =>
          describe(
            "assertNullableExist",
            () =>
              describe(
                "assert Js.Nullable.t('a) should exist",
                () => {
                  test(
                    "Js.Nullable.empty should fail",
                    () =>
                      expect(() => Js.Nullable.empty |> Contract.assertNullableExist)
                      |> toThrowMessage("expect to be exist, but actual not")
                  );
                  test(
                    "not Js.Nullable.empty should pass",
                    () =>
                      expect(() => Js.Nullable.return(1) |> Contract.assertNullableExist)
                      |> not_
                      |> toThrow
                  )
                }
              )
          )
      )
    }
  );