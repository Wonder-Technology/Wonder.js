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

    describe("clearIMGUIFunc", () => {
      let _isInTestCoverage = funcStr =>
        funcStr |> Js.String.includes("istanbul");

      test("set empty imgui func", () => {
        let state = AssetIMGUITool.prepareFontAsset(state^);
        let gl = FakeGlTool.buildFakeGl(~sandbox, ()) |> Obj.magic;
        let state = state |> FakeGlTool.setFakeGl(gl);
        let state = InitIMGUIJob.execJob(None, state);
        let program = Obj.magic(1);
        let state = ProgramTool.setLastUsedProgram(program, state);

        let func = (_, _, state) => {
          Js.log("log");

          state;
        };

        let state =
          ManageIMGUIAPI.setIMGUIFunc(
            Obj.magic(-1),
            Obj.magic(func),
            state,
          );

        let state = ManageIMGUIAPI.clearIMGUIFunc(state);

        let func = ManageIMGUIMainService.getIMGUIFunc(state);

        let funcStr =
          SerializeTool.serializeFunction(func)
          |> StringTool.removeNewLines
          |> StringTool.removeSpaces;

        _isInTestCoverage(funcStr) ?
          1 |> expect == 1 :
          funcStr
          |> expect
          == (
               StringTool.removeNewLines(
                 {| function (param, param$1, state) {
          return state;
          }|},
               )
               |> StringTool.removeSpaces
             );
      });
    });

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