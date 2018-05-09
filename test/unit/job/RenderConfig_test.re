open Wonder_jest;

let _ =
  describe(
    "RenderConfig",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      /* TODO test getLightMaterialShaderLibRecordArr */
      describe(
        "getBasicMaterialShaderLibRecordArr",
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
                      [@bs]
                      RenderConfigTool.getBasicMaterialShaderLibRecordArr(
                        Obj.magic(0),
                        Obj.magic(0),
                        (Obj.magic(1), [|{type_: Some("type1"), name: ""}|], Obj.magic(1)),
                        Obj.magic(1)
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
                      [@bs]
                      RenderConfigTool.getBasicMaterialShaderLibRecordArr(
                        Obj.magic(0),
                        Obj.magic(0),
                        (
                          1 |> Obj.magic,
                          [|{type_: Some("static_branch"), name: "name1"}|],
                          1 |> Obj.magic
                        ),
                        Obj.magic(1)
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