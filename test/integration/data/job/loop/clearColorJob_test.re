open Wonder_jest;

let _ =
  describe(
    "test clear color job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let _buildNoWorkerJobConfig = (colorHexStr) =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "clear_color"
        }
      ]
    }
  ]
        |},
          ~loopJobs={j|
[

    {
        "name": "clear_color",
        "flags": [
            "$colorHexStr"
        ]
    }
]
        |j},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "clear gl color",
        () => {
          let colorHexStr = "#123456";
          let state =
            RenderJobsTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(colorHexStr));
          let clearColor = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~clearColor, ()));
          let state = state |> DirectorTool.runWithDefaultTime;
          let (r, g, b, a) = ColorTool.convert16HexToRGBA(colorHexStr);
          clearColor |> expect |> toCalledWith([|r, g, b, a|])
        }
      );
      test(
        "if color is the same as the last one, not clear",
        () => {
          let state =
            RenderJobsTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("#123456"));
          let clearColor = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~clearColor, ()));
          let state = state |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;
          getCallCount(clearColor) |> expect == 1
        }
      )
    }
  );