open Jest;

let _ =
  describe(
    "test sinon",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeAll(() => sandbox := createSandbox());
      afterAll(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "test1",
        () => {
          let stub = createEmptyStub(refJsObjToSandbox(sandbox^));
          let func = (f) => f((1, 2));
          func(stub);
          getCall(stub, 0) |> getArgsFromEmptyStub |> expect == [1, 2]
        }
      );
      test(
        "test2",
        () => {
          let obj = {"func": (x, y) => x + y};
          /* let obj  = {
               pub func x => {
                 x + 1;
               };
             }; */
          let stub = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func");
          let func = obj##func;
          func(1, 2);
          getCall(stub, 0) |> getArgs |> expect == [1, 2]
        }
      );
      describe(
        "test extended sinon matcher for jest",
        () => {
          test(
            "test toCalledWith",
            () => {
              let obj = {"func": (x, y) => x + y};
              let stub = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func");
              let func = obj##func;
              func(1, 2);
              getCall(stub, 0) |> expect |> toCalledWith([1, 2]);
              getCall(stub, 0) |> expect |> not_ |> toCalledWith([2, 2])
            }
          );
          test(
            "test toCalledBefore",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              expect(stub1) |> not_ |> toCalledBefore(stub2);
              let func = obj##func2;
              func(2, 3);
              expect(stub1) |> toCalledBefore(stub2)
            }
          );
          test(
            "test toCalledAfter",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              expect(stub2) |> not_ |> toCalledAfter(stub1);
              let func = obj##func2;
              func(2, 3);
              expect(stub2) |> toCalledAfter(stub1)
            }
          );
          test(
            "test toCalled",
            () => {
              let obj = {"func1": (x, y) => x + y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              expect(stub1) |> not_ |> toCalled;
              func(1, 2);
              expect(stub1) |> toCalled
            }
          );
          test(
            "test toCalledOnce",
            () => {
              let obj = {"func1": (x, y) => x + y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);
              expect(stub1) |> toCalledOnce;
              func(2, 2);
              expect(stub1) |> not_ |> toCalledOnce
            }
          );
          test(
            "test toCalledTwice",
            () => {
              let obj = {"func1": (x, y) => x + y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);
              expect(stub1) |> not_ |> toCalledTwice;
              func(2, 2);
              expect(stub1) |> toCalledTwice
            }
          );
          test(
            "test toCalledThrice",
            () => {
              let obj = {"func1": (x, y) => x + y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let func = obj##func1;
              func(1, 2);
              expect(stub1) |> not_ |> toCalledThrice;
              func(2, 2);
              expect(stub1) |> not_ |> toCalledThrice;
              func(3, 2);
              expect(stub1) |> toCalledThrice
            }
          );
          test(
            "test getCallCount",
            () => {
              let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
              let stub1 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func1");
              let stub2 = createMethodStub(refJsObjToSandbox(sandbox^), jsObjToObj(obj), "func2");
              let func = obj##func1;
              func(1, 2);
              func(2, 2);
              let func = obj##func2;
              func(2, 3);
              getCallCount(stub1) |> expect == 2;
              getCallCount(stub2) |> expect == 1
            }
          )
        }
      )
    }
  );
