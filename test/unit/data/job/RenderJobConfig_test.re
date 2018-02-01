open Wonder_jest;

let _ =
  describe(
    "RenderJobConfig",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getInitPipelines",
        () =>
          describe(
            "contract check",
            () =>
              test(
                "should exist job config",
                () =>
                  expect(() => RenderJobConfigTool.getInitPipelines(state^))
                  |> toThrowMessage("expect render job config exist, but actual not")
              )
          )
      );
      describe(
        "getMaterialShaderLibDataArr",
        () =>
          describe(
            "test fatal",
            () => {
              open RenderJobConfigType;
              test(
                "if shaderLibItem->type_ unknown, fatal",
                () => {
                  TestTool.closeContractCheck();
                  expect(
                    () =>
                      state^
                      |> RenderJobConfigTool.getMaterialShaderLibDataArr(
                           0,
                           (1 |> Obj.magic, [|{type_: Some("type1"), name: ""}|], 1 |> Obj.magic)
                         )
                  )
                  |> toThrowMessage("unknown type_")
                }
              );
              test(
                "if shaderLibItem->name unknown with type=static_branch, fatal",
                () => {
                  TestTool.closeContractCheck();
                  expect(
                    () =>
                      state^
                      |> RenderJobConfigTool.getMaterialShaderLibDataArr(
                           0,
                           (
                             1 |> Obj.magic,
                             [|{type_: Some("static_branch"), name: "name1"}|],
                             1 |> Obj.magic
                           )
                         )
                  )
                  |> toThrowMessage("unknown name")
                }
              )
            }
          )
      );
      describe(
        "throwJobFlagsShouldBeDefined",
        () =>
          test(
            "throw error",
            () =>
              expect(() => RenderJobConfigTool.throwJobFlagsShouldBeDefined())
              |> toThrowMessage("jobFlags should be defined")
          )
      )
    }
  );