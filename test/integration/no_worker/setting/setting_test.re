open Wonder_jest;

open Js.Promise;

open AllRenderConfigType;

open ViewService;

open DomTool;

open SettingTool;

let _ =
  describe(
    "test setting record",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "isDebug",
        () =>
          describe(
            "if true",
            () =>
              test(
                "it will open contract check",
                () => {
                  buildFakeDomForNotPassCanvasId(sandbox) |> ignore;
                  SettingTool.createStateAndSetToStateData(~isDebug="true", ()) |> ignore;
                  MainStateDataTool.getIsDebug(StateDataMain.stateData) |> expect == true
                }
              )
          )
      );
      describe(
        "gpu config",
        () => {
          open SettingType;
          open SettingGPUType;
          let _buildExpectedGPUConfig = (~useHardwareInstance=true, ()) => {
            useHardwareInstance: useHardwareInstance
          };
          describe(
            "if pass gpu config",
            () =>
              test(
                "set to setting",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let useHardwareInstance = false;
                  let state =
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~useHardwareInstance="false",
                      ()
                    );
                  state
                  |> SettingTool.unsafeGetGPU
                  |> expect == _buildExpectedGPUConfig(~useHardwareInstance, ())
                }
              )
          );
          describe(
            "else",
            () =>
              test(
                "set default data",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let state = TestTool.initWithJobConfigWithoutBuildFakeDom(~sandbox, ());
                  state
                  |> SettingTool.unsafeGetGPU
                  |> expect == _buildExpectedGPUConfig(~useHardwareInstance=true, ())
                }
              )
          )
        }
      )
    }
  );