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
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init() |> DirectorTool.prepare
        }
      );
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
          let state = state |> DirectorTool.init;
          let state = DirectorTool.sync(state, ~time=1., ());
          state |> Transform.getTransformLocalPosition(transform) |> expect == localPos
        }
      );
      describe(
        "scheduleLoop",
        () =>
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
              let state = state |> DirectorTool.init;
              let state = DirectorTool.sync(state, ~time=1., ());
              let state = DirectorTool.sync(state, ~time=2., ());
              result^ |> expect == 3.
            }
          )
      )
    }
  );