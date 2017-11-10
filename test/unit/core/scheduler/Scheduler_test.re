open Jest;

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
          state := TestTool.init()
        }
      );
      test(
        "update scheduler before update system",
        () => {
          let (state, gameObject, transform) = GameObjectTool.createGameObject(state^);
          let localPos = (1., 2., 3.);
          let state =
            state
            |> Scheduler.scheduleLoop(
                 [@bs]
                 (
                   (elapsed, state) =>
                     state |> Transform.setTransformLocalPosition(transform, localPos)
                 )
               );
          let state = state |> DirectorTool.init;
          let state = DirectorTool.sync(state, ~elapsed=1., ());
          state |> Transform.getTransformLocalPosition(transform) |> expect == localPos
        }
      );
      describe(
        "scheduleLoop",
        () =>
          test(
            "schedule the task in each frame",
            () => {
              let result = ref(0.);
              let state =
                state^
                |> Scheduler.scheduleLoop(
                     [@bs]
                     (
                       (elapsed, state) => {
                         result := result^ +. elapsed;
                         state
                       }
                     )
                   );
              let state = state |> DirectorTool.init;
              let state = DirectorTool.sync(state, ~elapsed=1., ());
              let state = DirectorTool.sync(state, ~elapsed=2., ());
              result^ |> expect == 3.
            }
          )
      )
    }
  );