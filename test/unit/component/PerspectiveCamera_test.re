open CameraController;

open PerspectiveCamera;

open Jest;

let _ =
  describe
    "PerspectiveCamera"
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
        /* describe
           "create"
           (
             fun () => {
               test
                 "create a new cameraController which is just index(int)"
                 (
                   fun () => {
                     let (_, cameraController) = createCameraController !state;
                     expect cameraController == 0
                   }
                 );
               describe
                 "change state"
                 (
                   fun () =>
                     test
                       "state->cameraControllerData->index + 1"
                       (
                         fun () => {
                           let (state, cameraController) = createCameraController !state;
                           state |> getCameraControllerData |> (fun data => expect data.index == 1)
                         }
                       )
                 );
               test
                 "add to dirty list"
                 (
                   fun () => {
                     let (state, cameraController) = createCameraController !state;
                     state |> CameraControllerTool.getDirtyList |> expect == [|cameraController|]
                   }
                 )
             }
           ); */
        describe
          "getFovy"
          (
            fun () =>
              test
                "test"
                (
                  fun () => {
                    let (state, cameraController) = createCameraController !state;
                    let fovy = 65.;
                    let state = state |> setPerspectiveCameraFovy cameraController fovy;
                    state |> getPerspectiveCameraFovy cameraController |> expect == fovy
                  }
                )
          );
        describe
          "getAspect"
          (
            fun () =>
              test
                "test"
                (
                  fun () => {
                    let (state, cameraController) = createCameraController !state;
                    let aspect = 1.;
                    let state = state |> setPerspectiveCameraAspect cameraController aspect;
                    state |> getPerspectiveCameraAspect cameraController |> expect == aspect
                  }
                )
          );
        describe
          "getNear"
          (
            fun () =>
              test
                "test"
                (
                  fun () => {
                    let (state, cameraController) = createCameraController !state;
                    let near = 0.1;
                    let state = state |> setPerspectiveCameraNear cameraController near;
                    state |> getPerspectiveCameraNear cameraController |> expect == near
                  }
                )
          );
        describe
          "getFar"
          (
            fun () =>
              test
                "test"
                (
                  fun () => {
                    let (state, cameraController) = createCameraController !state;
                    let far = 1000.;
                    let state = state |> setPerspectiveCameraFar cameraController far;
                    state |> getPerspectiveCameraFar cameraController |> expect == far
                  }
                )
          )
      }
    );