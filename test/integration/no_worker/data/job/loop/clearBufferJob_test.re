open Wonder_jest;

let _ =
  describe(
    "test clear buffer job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _buildNoWorkerJobConfig = (flags) =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~loopPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "clear_buffer"
        }
      ]
    }
  ]
        |},
          ~loopJobs={j|
[

    {
        "name": "clear_buffer",
        "flags": $flags
    }
]
        |j},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "clear gl buffer",
        () =>
          describe(
            "clear which buffer is decide by flags",
            () => {
              test(
                "test pass COLOR_BUFFER flag",
                () => {
                  let state =
                    RenderJobsTool.initWithJobConfig(
                      sandbox,
                      _buildNoWorkerJobConfig({|["COLOR_BUFFER"]|})
                    );
                  let color_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~color_buffer_bit, ~clear, ())
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;
                  clear |> expect |> toCalledWith([|color_buffer_bit|])
                }
              );
              test(
                "test pass DEPTH_BUFFER flag",
                () => {
                  let state =
                    RenderJobsTool.initWithJobConfig(
                      sandbox,
                      _buildNoWorkerJobConfig({|["DEPTH_BUFFER"]|})
                    );
                  let depth_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~depth_buffer_bit, ~clear, ())
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;
                  clear |> expect |> toCalledWith([|depth_buffer_bit|])
                }
              );
              test(
                "test pass STENCIL_BUFFER flag",
                () => {
                  let state =
                    RenderJobsTool.initWithJobConfig(
                      sandbox,
                      _buildNoWorkerJobConfig({|["STENCIL_BUFFER"]|})
                    );
                  let stencil_buffer_bit = 1;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(~sandbox, ~stencil_buffer_bit, ~clear, ())
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;
                  clear |> expect |> toCalledWith([|stencil_buffer_bit|])
                }
              );
              test(
                "test pass all flags",
                () => {
                  let state = state^;
                  let state =
                    RenderJobsTool.initWithJobConfig(
                      sandbox,
                      _buildNoWorkerJobConfig(
                        {|["COLOR_BUFFER", "DEPTH_BUFFER", "STENCIL_BUFFER"]|}
                      )
                    );
                  let color_buffer_bit = 1;
                  let depth_buffer_bit = 2;
                  let stencil_buffer_bit = 3;
                  let clear = createEmptyStubWithJsObjSandbox(sandbox);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(
                         FakeGlTool.buildFakeGl(
                           ~sandbox,
                           ~color_buffer_bit,
                           ~depth_buffer_bit,
                           ~stencil_buffer_bit,
                           ~clear,
                           ()
                         )
                       );
                  let state = state |> DirectorTool.runWithDefaultTime;
                  clear
                  |> expect
                  |> toCalledWith([|color_buffer_bit lor depth_buffer_bit lor stencil_buffer_bit|])
                }
              )
            }
          )
      );
      describe(
        "set color write",
        () => {
          test(
            "set to all true",
            () => {
              let state =
                RenderJobsTool.initWithJobConfig(
                  sandbox,
                  _buildNoWorkerJobConfig({|["COLOR_BUFFER"]|})
                );
              let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~colorMask, ()));
              let state = state |> DirectorTool.runWithDefaultTime;
              colorMask |> expect |> toCalledWith([|Js.true_, Js.true_, Js.true_, Js.true_|])
            }
          );
          test(
            "if color write is the same as the last one, not set",
            () => {
              let state =
                RenderJobsTool.initWithJobConfig(
                  sandbox,
                  _buildNoWorkerJobConfig({|["COLOR_BUFFER"]|})
                );
              let colorMask = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~colorMask, ()));
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              let state = state |> DirectorTool.runWithDefaultTime;
              getCallCount(colorMask) |> expect == 1
            }
          )
        }
      )
    }
  );