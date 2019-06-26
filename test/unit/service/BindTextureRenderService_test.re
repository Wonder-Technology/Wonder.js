open Wonder_jest;

let _ =
  describe("BindTextureRenderService", () => {
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

    describe("contract check", () =>
      test("unit should >= 0", () =>
        expect(() =>
          BindTextureRenderService.bind(
            Obj.magic(1),
            -1,
            (0, TextureType.BasicSource),
            Obj.magic(2),
          )
        )
        |> toThrowMessage("unit should >= 0")
      )
    );
  });