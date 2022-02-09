open Wonder_jest;

let _ =
  describe("test sinon", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    test("test1", () => {
      let stub = createEmptyStubWithJsObjSandbox(sandbox);
      let func = f => f(. 1, 2);
      func(stub);
      stub |> getCall(0) |> getArgsFromEmptyStub |> expect == [1, 2];
    });
    test("test2", () => {
      let obj = {"func": (x, y) => x + y};
      let stub = createMethodStub(sandbox^, obj, "func");
      let func = obj##func;
      func(1, 2);
      stub |> getCall(0) |> getArgs |> expect == [1, 2];
    });
    test("test withOneArg", () => {
      let stub = createEmptyStubWithJsObjSandbox(sandbox);
      stub |> withOneArg(1) |> returns(10);
      stub |> withOneArg(2) |> returns(20);
      (stub(. 1), stub(. 2)) |> expect == (10, 20);
    });
    test("test onCall,getCall", () => {
      let stub = createEmptyStubWithJsObjSandbox(sandbox);
      stub |> onCall(0) |> returns(10);
      stub |> onCall(1) |> returns(20);
      let v1 = stub(.);
      let v2 = stub(. 1, 2, "aaa");
      (v1, v2, stub |> getCall(1) |> getArgs)
      |> expect == (10, 20, [1, 2, "aaa" |> Obj.magic]);
    });
    describe("test extended sinon matcher for jest", () => {
      test("test toCalledWith", () => {
        let obj = {"func": (x, y) => x + y};
        let stub = createMethodStub(sandbox^, obj, "func");
        let func = obj##func;
        func(1, 2);
        stub |> getCall(0) |> expect |> not_ |> toCalledWith([|2, 2|]);
      });
      test("test toCalledBefore", () => {
        let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let stub2 = createMethodStub(sandbox^, obj, "func2");
        let func = obj##func1;
        func(1, 2);
        let func = obj##func2;
        func(2, 3);
        stub1 |> expect |> toCalledBefore(stub2);
      });
      test("test toCalledAfter", () => {
        let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let stub2 = createMethodStub(sandbox^, obj, "func2");
        let func = obj##func1;
        func(1, 2);
        let func = obj##func2;
        func(2, 3);
        stub2 |> expect |> toCalledAfter(stub1);
      });
      test("test toCalled", () => {
        let obj = {"func1": (x, y) => x + y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let func = obj##func1;
        func(1, 2);
        stub1 |> expect |> toCalled;
      });
      test("test toCalledOnce", () => {
        let obj = {"func1": (x, y) => x + y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let func = obj##func1;
        func(1, 2);
        func(2, 2);
        stub1 |> expect |> not_ |> toCalledOnce;
      });
      test("test toCalledTwice", () => {
        let obj = {"func1": (x, y) => x + y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let func = obj##func1;
        func(1, 2);
        func(2, 2);
        stub1 |> expect |> toCalledTwice;
      });
      test("test toCalledThrice", () => {
        let obj = {"func1": (x, y) => x + y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let func = obj##func1;
        func(1, 2);
        func(2, 2);
        func(3, 2);
        stub1 |> expect |> toCalledThrice;
      });
      test("test getCallCount", () => {
        let obj = {"func1": (x, y) => x + y, "func2": (x, y) => x - y};
        let stub1 = createMethodStub(sandbox^, obj, "func1");
        let stub2 = createMethodStub(sandbox^, obj, "func2");
        let func = obj##func1;
        func(1, 2);
        func(2, 2);
        let func = obj##func2;
        func(2, 3);
        stub2 |> getCallCount |> expect == 1;
      });
    });
  });