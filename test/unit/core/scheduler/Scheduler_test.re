open Scheduler;

open Wonder_jest;

let _ =
  describe(
    "Scheduler",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithRenderConfig(~sandbox, ()) |> DirectorTool.prepare
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "update scheduler before update system",
        () => {
          TestTool.closeContractCheck();
          let (state, gameObject, transform) = GameObjectTool.createGameObject(state^);
          let localPos = (1., 2., 3.);
          let state =
            state
            |> scheduleLoop(
                 [@bs]
                 (
                   (elapsed, state) =>
                     state |> Transform.setTransformLocalPosition(transform, localPos)
                 )
               );
          let state = state |> DirectorTool.initLogic;
          let state = DirectorTool.run(state, ~time=1., ());
          state |> Transform.getTransformLocalPosition(transform) |> expect == localPos
        }
      );
      describe(
        "scheduleLoop",
        () => {
          test(
            "test no schedule shouldn't error",
            () => {
              let result = ref(0.);
              expect(
                () => {
                  let _ = state^ |> DirectorTool.initLogic;
                  ()
                }
              )
              |> not_
              |> toThrow
            }
          );
          test(
            "schedule the task in each frame",
            () => {
              TestTool.closeContractCheck();
              let result = ref(0.);
              let state =
                state^
                |> scheduleLoop(
                     [@bs]
                     (
                       (elapsed, state) => {
                         result := result^ +. elapsed;
                         state
                       }
                     )
                   );
              let state = state |> DirectorTool.initLogic;
              let state = DirectorTool.run(state, ~time=1., ());
              let state = DirectorTool.run(state, ~time=2., ());
              result^ |> expect == 3.
            }
          )
        }
      )
    }
  );