open Wonder_jest;

let _ =
  describe(
    "RenderConfigData",
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
        "getMaterialShaderLibDataArr",
        () =>
          describe(
            "test fatal",
            () => {
              open RenderConfigType;
              test(
                "if shaderLibItem->type_ unknown, fatal",
                () => {
                  TestTool.closeContractCheck();
                  expect(
                    () =>
                      state^
                      |> RenderConfigDataTool.getMaterialShaderLibDataArr(
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
                      |> RenderConfigDataTool.getMaterialShaderLibDataArr(
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
      )
    }
  );