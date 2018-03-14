open Wonder_jest;

open Js.Promise;

open RenderConfigType;

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
      let state = ref(CreateStateMainService.createState());
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
                  MainStateDataTool.getIsDebug(MainStateData.stateData) |> expect == true
                }
              )
          )
      );
      describe(
        "gpu config",
        () => {
          open SettingType;
          let _buildExpectedGPUConfig = (~useHardwareInstance=Js.true_, ()) => {
            useHardwareInstance: Js.to_bool(useHardwareInstance)
          };
          describe(
            "if pass gpu config",
            () =>
              test(
                "set to setting",
                () => {
                  let (_, _, _, _) = buildFakeDomForNotPassCanvasId(sandbox);
                  let useHardwareInstance = Js.false_;
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
                  |> expect == _buildExpectedGPUConfig(~useHardwareInstance=Js.true_, ())
                }
              )
          )
        }
      );
    }
  );