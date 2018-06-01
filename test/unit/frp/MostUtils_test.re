open Wonder_jest;

let _ =
  describe(
    "MostUtils",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "concatStreamFuncArray",
        () =>
          describe(
            "contract check",
            () => {
              test(
                "check stream count should >=2",
                () => {
                  let fakeDom = {
                    "addEventListener": () => createEmptyStubWithJsObjSandbox(sandbox),
                    "removeEventListener": () => createEmptyStubWithJsObjSandbox(sandbox)
                  };
                  expect(
                    () =>
                      MostUtils.concatStreamFuncArray(
                        Obj.magic(1),
                        [|Most.fromEvent("click", fakeDom |> Obj.magic, true) |> Obj.magic|]
                      )
                  )
                  |> toThrowMessage("expect stream count >= 2")
                }
              );
              test(
                "check the first stream should be fromEvent stream",
                () => {
                  let fakeDom = {
                    "addEventListener": () => createEmptyStubWithJsObjSandbox(sandbox),
                    "removeEventListener": () => createEmptyStubWithJsObjSandbox(sandbox)
                  };
                  expect(
                    () =>
                      MostUtils.concatStreamFuncArray(
                        Obj.magic(1),
                        [|
                          Most.just(1) |> Obj.magic,
                          Most.just(2) |> Obj.magic
                        |]
                      )
                  )
                  |> toThrowMessage("the first stream should be fromEvent stream")
                }
              );
              test(
                "check only the first stream should be fromEvent stream",
                () => {
                  let fakeDom = {
                    "addEventListener": () => createEmptyStubWithJsObjSandbox(sandbox),
                    "removeEventListener": () => createEmptyStubWithJsObjSandbox(sandbox)
                  };
                  expect(
                    () =>
                      MostUtils.concatStreamFuncArray(
                        Obj.magic(1),
                        [|
                          Most.fromEvent("click", fakeDom |> Obj.magic, true) |> Obj.magic,
                          Most.fromEvent("click", fakeDom |> Obj.magic, true) |> Obj.magic
                        |]
                      )
                  )
                  |> toThrowMessage("only the first stream should be fromEvent stream")
                }
              )
            }
          )
      )
    }
  );