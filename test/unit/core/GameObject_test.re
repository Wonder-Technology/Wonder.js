open Jest;

open GameObject;

open GameObjectTool;

let _ =
  describe
    "GameObject"
    (
      fun () => {
        open Expect;
        open! Expect.Operators;
        open Sinon;
        let sandbox = getSandboxDefaultVal ();
        let state = ref (StateSystem.createState ());
        beforeEach (
          fun () => {
            sandbox := createSandbox ();
            state := TestTool.init ()
          }
        );
        afterEach (fun () => restoreSandbox (refJsObjToSandbox !sandbox));
        describe
           "createGameObject"
           (
             fun () => {
               test
                 "create a new gameObject which is just uidStr(string)"
                 (
                   fun () => {
                     let (state, gameObject) = createGameObject !state;
                     expect gameObject == "0"
                   }
                 );
               test
                 "add new transform component"
                 (
                   fun () => {
                     let (state, gameObject) = createGameObject !state;
                     hasGameObjectTransformComponent gameObject state |> expect == true
                   }
                 );
                 describe
                 "change state"
                 (
                 fun () => {
               test
                 "state->uid + 1"
                 (
                   fun () => {
                     let (state, gameObject) = createGameObject !state;
                     getData state |> (fun data => expect data.uid == 1)
                   }
                 )
                 });
             }
           );
        describe
          "addGameObjectTransformComponent"
          (
            fun () => {
              test
                "if this type of component is already exist, error"
                (
                  fun () => {
                    let (state, gameObject) = createGameObject !state;
                    expect (
                      fun () => {
                        let (state, transform) = Transform.createTransform state;
                        addGameObjectTransformComponent gameObject transform state
                      }
                    )
                    |> toThrowMessage "this type of component is already exist"
                  }
                );
              /* todo: test after add disposeGameObjectTransformComponet */
              /* test "add transform component" (fun () => {
                 }); */
              test
                "can get component's gameObject"
                (
                  fun () => {
                    let (state, gameObject) = createGameObject !state;
                    Transform.getTransformGameObject
                      (getGameObjectTransformComponent gameObject state) state
                    |> expect
                    == gameObject
                  }
                )
            }
          );
        describe
          "getGameObjectTransformComponent"
          (
            fun () =>
              test
                "get transform component"
                (
                  fun () => {
                    let (state, gameObject) = createGameObject !state;
                    getGameObjectTransformComponent gameObject state |> TransformTool.isTransform
                  }
                )
          );
        describe
          "hasGameObjectTransformComponent"
          (
            fun () =>
              test
                "has transform component"
                (
                  fun () => {
                    let (state, gameObject) = createGameObject !state;
                    hasGameObjectTransformComponent gameObject state |> expect == true;
                  }
                )
          )
      }
    );