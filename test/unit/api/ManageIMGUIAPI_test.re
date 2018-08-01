open Wonder_jest;

let _ =
  describe("ManageIMGUIAPI", () => {
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

    describe("sendUniformProjectionMatData", () =>
      test("clear last send program", () => {
        let state = AssetIMGUITool.prepareFontAsset(state^);
        let gl = FakeGlTool.buildFakeGl(~sandbox, ()) |> Obj.magic;
        let state = state |> FakeGlTool.setFakeGl(gl);
        let state = InitIMGUIJob.execJob(None, state);
        let program = Obj.magic(1);
        let state = ProgramTool.setLastUsedProgram(program, state);

        let state =
          ManageIMGUIAPI.sendUniformProjectionMatData(gl, (500, 250), state);

        state.programRecord.lastUsedProgram |> expect == None;
      })
    );
  });