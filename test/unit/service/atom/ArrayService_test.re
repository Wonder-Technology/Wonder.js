open Wonder_jest;

let _ =
  describe("ArrayService", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fastIntersect", () =>
      describe("get targetArr and sourceArr intersect", () => {
        test("test1", () =>
          ArrayService.fastIntersect([|2, 4|], [|5, 1, 2, 4, 3|])
          |> expect == [|2, 4|]
        );
        test("test2", () =>
          ArrayService.fastIntersect([|2, 4|], [|5, 1, 4, 3|])
          |> expect == [|4|]
        );
        test("test3", () =>
          ArrayService.fastIntersect([|6, 4|], [|5, 1, 4, 3|])
          |> expect == [|4|]
        );
      })
    );
  });