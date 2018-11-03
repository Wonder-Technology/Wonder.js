open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("TypeArrayService", () => {
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

    describe("contract check", () => {
      describe("setUint32_1", () => {
        test("test not throw", () => {
          TestTool.openContractCheck();

          expect(() =>
            TypeArrayService.setUint32_1(0, 1, Uint32Array.fromLength(1))
          )
          |> not_
          |> toThrow;
        });
        test("test throw", () => {
          TestTool.openContractCheck();

          expect(() =>
            TypeArrayService.setUint32_1(0, 1, Uint32Array.fromLength(0))
          )
          |> toThrowMessage("expect not exceed bound");
        });
      });

      describe("setFloat1", () =>
        test("test throw", () => {
          TestTool.openContractCheck();

          expect(() =>
            TypeArrayService.setFloat1(1, 1., Float32Array.fromLength(1))
          )
          |> toThrowMessage("expect not exceed bound");
        })
      );

      describe("setFloat3", () => {
        test("test not throw", () => {
          TestTool.openContractCheck();

          expect(() =>
            TypeArrayService.setFloat3(
              1,
              [|1., 2., 3.|],
              Float32Array.fromLength(4),
            )
          )
          |> not_
          |> toThrow;
        });
        test("test throw", () => {
          TestTool.openContractCheck();

          expect(() =>
            TypeArrayService.setFloat3(
              1,
              [|1., 2., 3.|],
              Float32Array.fromLength(3),
            )
          )
          |> toThrowMessage("expect not exceed bound");
        });
      });
    });
  });