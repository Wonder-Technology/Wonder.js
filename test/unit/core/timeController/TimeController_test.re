open TimeController;

open Wonder_jest;

let _ =
  describe(
    "TimeController",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init();
          TimeControllerTool.setStartTime(0.);
          TestTool.closeContractCheck()
        }
      );
      describe(
        "tick",
        () => {
          describe(
            "compute gameTime",
            () => {
              test(
                "gameTime's unit is second",
                () => {
                  let state = state^ |> DirectorTool.init;
                  let state = DirectorTool.sync(state, ~time=1000., ());
                  state |> getGameTime |> expect == 1.
                }
              );
              test(
                "record total game time",
                () => {
                  let state = state^ |> DirectorTool.init;
                  let state = DirectorTool.sync(state, ~time=1000., ());
                  let state = DirectorTool.sync(state, ~time=2000., ());
                  state |> getGameTime |> expect == 2.
                }
              )
            }
          );
          describe(
            "compute fps",
            () => {
              test(
                "fps is 60 on the first loop",
                () => {
                  let state = state^ |> DirectorTool.init;
                  let state = DirectorTool.sync(state, ~time=1000., ());
                  state |> getFps |> expect == 60.
                }
              );
              test(
                "test compute",
                () => {
                  let state = state^ |> DirectorTool.init;
                  let state = DirectorTool.sync(state, ~time=1000., ());
                  let state = DirectorTool.sync(state, ~time=1050., ());
                  state |> getFps |> expect == 20.
                }
              )
            }
          )
        }
      )
    }
  );