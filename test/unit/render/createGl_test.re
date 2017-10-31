open Jest;

open Main;

open MainTool;

let _ =
  describe(
    "create gl",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "get webgl1 context",
        () => {
          let (canvasDom, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
          setMainConfig(buildMainConfig(~isTest=Js.Nullable.return(true), ())) |> ignore;
          expect(canvasDom##getContext) |> toCalledWith(["webgl"])
        }
      )
    }
  );
